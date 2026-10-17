
import Link from "next/link";

import { requireAdmin } from "@/lib/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  await requireAdmin();

  const { data: orders, error } = await supabaseAdmin
    .from("orders")
    .select(
      "id, order_number, created_at, customer_id, grand_total, currency_code, payment_status, status"
    )
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("Failed to load admin orders:", error);

    throw new Error("Unable to load orders.");
  }

  const formatMoney = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Orders</h1>
        <p className="mt-1 text-sm text-gray-500">
          Review customer orders and payment statuses.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {orders?.length ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-medium">
                    {order.order_number}
                  </td>

                  <td className="px-4 py-3">
                    {new Date(order.created_at).toLocaleDateString(
                      "en-CA"
                    )}
                  </td>

                  <td className="px-4 py-3">
                    {order.customer_id ?? "Guest / Unlinked"}
                  </td>

                  <td className="px-4 py-3">
                    {formatMoney(
                      order.grand_total,
                      order.currency_code
                    )}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {order.payment_status.replaceAll("_", " ")}
                  </td>

                  <td className="px-4 py-3 capitalize">
                    {order.status.replaceAll("_", " ")}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-gray-500">
        Showing up to 100 most recent orders.
      </p>
    </div>
  );
}
