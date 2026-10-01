import { generateOrderNumber } from "./numbering";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type CreateOrderInput = {
  customerId: string | null;

  cartId: string;

  stripeSessionId: string;

  stripePaymentIntent: string;

  currencyCode: string;

  subtotal: number;

  shippingTotal: number;

  taxTotal: number;

  discountTotal: number;

  grandTotal: number;

  notes?: string | null;
};

export async function createOrder(
  input: CreateOrderInput
) {
const orderNumber =
  await generateOrderNumber();
  const {
    data,
    error,
  } = await supabaseAdmin
    .from("orders")
    .insert({

      customer_id:
        input.customerId,

      order_number:
         orderNumber,

      stripe_session_id:
        input.stripeSessionId,

      stripe_payment_intent:
        input.stripePaymentIntent,

      cart_id:
        input.cartId,

      currency_code:
        input.currencyCode,

      subtotal:
        input.subtotal,

      shipping_total:
        input.shippingTotal,

      tax_total:
        input.taxTotal,

      discount_total:
        input.discountTotal,

      grand_total:
        input.grandTotal,

      payment_status:
        "paid",

      status:
        "processing",

      notes:
        input.notes ?? null,

    })

    .select()

    .single();

  if (error) {
    throw error;
  }

  return data;
}