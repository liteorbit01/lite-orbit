import Link from "next/link";

import { getInventoryDetail } from "@/lib/inventory/getInventoryDetail";
import { getInventoryHistory } from "@/lib/inventory/getInventoryHistory";
import { getInventorySummary } from "@/lib/inventory/getInventorySummary";

import InventoryActionsCard from "@/components/admin/inventory/InventoryActionsCard";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function InventoryDetailPage({
  params,
}: PageProps) {

  const { id } = await params;

  const inventory =
    await getInventoryDetail(id);

  const variantId =
    inventory.product_variants.id;

  const [
    history,
    summary,
  ] = await Promise.all([
    getInventoryHistory(
      variantId
    ),
    getInventorySummary(
      variantId
    ),
  ]);

  const available =
    inventory.quantity -
    inventory.reserved_quantity;

  return (
    <div className="mx-auto max-w-7xl p-8">

      {/* ===========================================
          Header
      =========================================== */}

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-light">
            Inventory Details
          </h1>

          <p className="mt-2 text-gray-500">
            Manage inventory for this product variant.
          </p>

        </div>

        <Link
          href="/admin/inventory"
          className="
            rounded-lg
            border
            border-gray-300
            px-4
            py-2
            transition
            hover:bg-gray-100
          "
        >
          ← Back
        </Link>

      </div>

      {/* ===========================================
          Top Cards
      =========================================== */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Product */}

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">
            Product
          </h2>

          <div className="space-y-4">

            <div>

              <p className="text-sm text-gray-500">
                Product
              </p>

              <p className="font-medium">
                {
                  inventory.product_variants
                    .products.name
                }
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                SKU
              </p>

              <p>
                {
                  inventory.product_variants
                    .sku
                }
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Size
              </p>

              <p>
                {
                  inventory.product_variants
                    .size ?? "-"
                }
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Color
              </p>

              <p>
                {
                  inventory.product_variants
                    .color ?? "-"
                }
              </p>

            </div>

          </div>

        </div>

        {/* Inventory */}

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

          <h2 className="mb-6 text-lg font-semibold">
            Inventory
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>
                Current Stock
              </span>

              <strong>
                {inventory.quantity}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>
                Reserved
              </span>

              <strong>
                {
                  inventory.reserved_quantity
                }
              </strong>

            </div>

            <div className="flex justify-between">

              <span>
                Available
              </span>

              <strong>
                {available}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>
                Low Stock Threshold
              </span>

              <strong>
                {
                  inventory.low_stock_threshold
                }
              </strong>

            </div>

            <div className="flex justify-between">

              <span>
                Reorder Quantity
              </span>

              <strong>
                {
                  inventory.reorder_quantity
                }
              </strong>

            </div>

            <div className="flex justify-between">

              <span>
                Backorders
              </span>

              <strong>
                {
                  inventory.allow_backorder
                    ? "Enabled"
                    : "Disabled"
                }
              </strong>

            </div>

          </div>

        </div>

        {/* Operations */}

        <InventoryActionsCard
          variantId={variantId}
          currentStock={inventory.quantity}
          history={history}
          summary={summary}
        />

      </div>

    </div>
  );
}