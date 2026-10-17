
"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

type FulfillmentStatus =
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "completed";

const allowedTransitions: Record<
  FulfillmentStatus,
  FulfillmentStatus | null
> = {
  paid: "processing",
  processing: "shipped",
  shipped: "delivered",
  delivered: "completed",
  completed: null,
};

function isFulfillmentStatus(
  value: string
): value is FulfillmentStatus {
  return Object.prototype.hasOwnProperty.call(
    allowedTransitions,
    value
  );
}

export async function updateOrderStatus(
  formData: FormData
): Promise<void> {
  // Authorization must be checked inside the action.
  await requireAdmin();

  const orderId = String(
    formData.get("orderId") ?? ""
  ).trim();

  const nextStatus = String(
    formData.get("nextStatus") ?? ""
  ).trim();

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      orderId
    )
  ) {
    throw new Error("Invalid order ID.");
  }

  if (!isFulfillmentStatus(nextStatus)) {
    throw new Error("Invalid fulfillment status.");
  }

  const { data: order, error: lookupError } =
    await supabaseAdmin
      .from("orders")
      .select("id, status, payment_status")
      .eq("id", orderId)
      .single();

  if (lookupError || !order) {
    throw new Error("Order not found.");
  }

  if (order.payment_status !== "paid") {
    throw new Error(
      "Only paid orders can advance through fulfillment."
    );
  }

  if (!isFulfillmentStatus(order.status)) {
    throw new Error(
      "This order cannot be advanced through fulfillment."
    );
  }

  const expectedNextStatus =
    allowedTransitions[order.status];

  if (
    expectedNextStatus === null ||
    expectedNextStatus !== nextStatus
  ) {
    throw new Error(
      `Transition from ${order.status} to ${nextStatus} is not allowed.`
    );
  }

  // Conditional update prevents overwriting a changed
  // order status after our initial read.
  const { data: updatedOrder, error: updateError } =
    await supabaseAdmin
      .from("orders")
      .update({
        status: nextStatus,
      })
      .eq("id", orderId)
      .eq("status", order.status)
      .eq("payment_status", "paid")
      .select("id")
      .maybeSingle();

  if (updateError) {
    console.error("Order status update failed:", updateError);
    throw new Error("Unable to update order status.");
  }

  if (!updatedOrder) {
    throw new Error(
      "Order changed during processing. Refresh and try again."
    );
  }

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
