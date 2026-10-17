
import Link from "next/link";
import { notFound } from "next/navigation";

import { requireAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetailsPage({
  params,
}: PageProps) {
  await requireAdmin();

  const { id } = await params;

  const { data: order, error: orderError } =
    await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("id", id)
      .maybeSingle();

  if (orderError) {
    console.error("Unable to retrieve order:", orderError);
    throw new Error("Unable to load order details.");
  }

  if (!order) {
    notFound();
  }

  const { data: items, error: itemsError } =
    await supabaseAdmin
      .from("order_items")
      .select(
        "id, product_name, variant_name, sku, quantity, unit_price, line_total"
      )
      .eq("order_id", order.id);

  if (itemsError) {
    console.error("Unable to retrieve order items:", itemsError);
    throw new Error("Unable to load purchased items.");
  }

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: order.currency_code.toUpperCase(),
    }).format(amount);

  const formatStatus = (status: string) =>
    status.replaceAll("_", " ");

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/orders"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Orders
        </Link>

        <h1 className="mt-3 text-2xl font-semibold">
          Order {order.order_number}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Placed on{" "}
          {new Date(order.created_at).toLocaleString("en-CA")}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-gray-500">
            Payment Status
          </p>
          <p className="mt-2 font-semibold capitalize">
            {formatStatus(order.payment_status)}
          </p>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-gray-500">
            Order Status
          </p>
          <p className="mt-2 font-semibold capitalize">
            {formatStatus(order.status)}
          </p>
        </div>

        <div className="rounded-lg border bg-white p-5">
          <p className="text-sm text-gray-500">
            Order Total
          </p>
          <p className="mt-2 text-xl font-semibold">
            {formatMoney(order.grand_total)}
          </p>
        </div>
      </div>

      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-lg font-semibold">
          Customer Information
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          {order.customer_id
            ? `Customer ID: ${order.customer_id}`
            : "Guest / Unlinked customer"}
        </p>
      </section>

      <section className="overflow-hidden rounded-lg border bg-white">
        <div className="border-b p-5">
          <h2 className="text-lg font-semibold">
            Purchased Items
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Unit Price</th>
                <th className="px-4 py-3">Line Total</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {items?.length ? (
                items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium">
                        {item.product_name}
                      </p>

                      {item.variant_name && (
                        <p className="text-xs text-gray-500">
                          {item.variant_name}
                        </p>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      {item.sku ?? "—"}
                    </td>

                    <td className="px-4 py-3">
                      {item.quantity}
                    </td>

                    <td className="px-4 py-3">
                      {formatMoney(item.unit_price)}
                    </td>

                    <td className="px-4 py-3 font-medium">
                      {formatMoney(item.line_total)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No purchased items recorded for this order.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-lg border bg-white p-5">
        <h2 className="text-lg font-semibold">
          Order Summary
        </h2>

        <dl className="mt-4 space-y-3 text-sm">
          {[
            ["Subtotal", order.subtotal],
            ["Shipping", order.shipping_total],
            ["Tax", order.tax_total],
            ["Discount", -order.discount_total],
          ].map(([label, amount]) => (
            <div
              key={String(label)}
              className="flex justify-between"
            >
              <dt>{label}</dt>
              <dd>{formatMoney(Number(amount))}</dd>
            </div>
          ))}

          <div className="flex justify-between border-t pt-3 font-semibold">
            <dt>Grand Total</dt>
            <dd>{formatMoney(order.grand_total)}</dd>
          </div>
        </dl>
      </section>

      {order.notes && (
        <section className="rounded-lg border bg-white p-5">
          <h2 className="text-lg font-semibold">
            Order Notes
          </h2>
          <p className="mt-3 whitespace-pre-wrap text-sm">
            {order.notes}
          </p>
        </section>
      )}
    </div>
  );
}
