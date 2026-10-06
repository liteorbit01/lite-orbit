import Link from "next/link";

import { getInventoryDetail } from "@/lib/inventory/getInventoryDetail";

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

  const available =
    inventory.quantity -
    inventory.reserved_quantity;

  return (
    <div className="mx-auto max-w-6xl p-8">

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

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Product Information */}

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
                  inventory.product_variants.products
                    .name
                }
              </p>

            </div>

            <div>

              <p className="text-sm text-gray-500">
                SKU
              </p>

              <p>
                {
                  inventory.product_variants.sku
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
                    .size || "-"
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
                    .color || "-"
                }
              </p>

            </div>

          </div>

        </div>

        {/* Inventory Information */}

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
                {inventory.allow_backorder
                  ? "Enabled"
                  : "Disabled"}
              </strong>

            </div>

          </div>

        </div>

        {/* Inventory Operations */}

        <InventoryActionsCard
          variantId={
            inventory.product_variants.id
          }
          currentStock={
            inventory.quantity
          }
        />

      </div>

    </div>
  );
}