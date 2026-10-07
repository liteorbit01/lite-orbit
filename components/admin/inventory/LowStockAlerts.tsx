import Link from "next/link";

import {
  LowStockAlert,
} from "@/lib/inventory/alerts";

import InventoryStatusBadge from "./InventoryStatusBadge";

type LowStockAlertsProps = {
  alerts: LowStockAlert[];
};

export default function LowStockAlerts({
  alerts,
}: LowStockAlertsProps) {

  return (

    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b px-6 py-4">

        <div>

          <h2 className="text-lg font-semibold">

            Low Stock Alerts

          </h2>

          <p className="mt-1 text-sm text-gray-500">

            Products that require immediate inventory attention.

          </p>

        </div>

        <div className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

          {alerts.length} Alert{alerts.length === 1 ? "" : "s"}

        </div>

      </div>

      {alerts.length === 0 ? (

        <div className="p-10 text-center">

          <div className="text-5xl">

            ✅

          </div>

          <h3 className="mt-4 text-lg font-semibold">

            Great job!

          </h3>

          <p className="mt-2 text-gray-500">

            No products are currently low or out of stock.

          </p>

        </div>

      ) : (

        <div className="divide-y">

          {alerts.map((alert) => (

            <div
              key={alert.id}
              className="flex flex-col gap-4 p-6 lg:flex-row lg:items-center lg:justify-between"
            >

              <div className="flex-1">

                <div className="flex items-center gap-3">

                  <h3 className="font-semibold">

                    {alert.productName}

                  </h3>

                  <InventoryStatusBadge
                    quantity={alert.quantity}
                    reservedQuantity={alert.reservedQuantity}
                    lowStockThreshold={alert.lowStockThreshold}
                    allowBackorder={alert.allowBackorder}
                  />

                </div>

                <div className="mt-2 text-sm text-gray-500">

                  SKU:{" "}

                  <span className="font-medium">

                    {alert.sku}

                  </span>

                </div>

              </div>

              <div className="flex gap-8 text-center">

                <div>

                  <div className="text-xs uppercase tracking-wide text-gray-400">

                    Available

                  </div>

                  <div className="mt-1 text-xl font-bold">

                    {alert.availableQuantity}

                  </div>

                </div>

                <div>

                  <div className="text-xs uppercase tracking-wide text-gray-400">

                    Threshold

                  </div>

                  <div className="mt-1 text-xl font-bold">

                    {alert.lowStockThreshold}

                  </div>

                </div>

                <div>

                  <div className="text-xs uppercase tracking-wide text-gray-400">

                    Reorder

                  </div>

                  <div className="mt-1 text-xl font-bold">

                    {alert.reorderQuantity}

                  </div>

                </div>

              </div>

              <Link
                href={`/admin/inventory/${alert.variantId}`}
                className="
                  inline-flex
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-gray-300
                  px-5
                  py-2
                  text-sm
                  font-medium
                  transition
                  hover:bg-gray-100
                "
              >

                Manage

              </Link>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}