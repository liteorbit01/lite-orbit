"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import InventoryHistory from "./InventoryHistory";

import type {
  ProductVariant,
} from "@/app/admin/products/types";

type ProductInventoryProps = {
  variants: ProductVariant[];
  inventoryHistory: any[];
};

export default function ProductInventory({
  variants,
  inventoryHistory,
}: ProductInventoryProps) {
  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const router = useRouter();

  async function adjustStock(
    variant: ProductVariant,
    direction: "increase" | "decrease"
  ) {
    try {
      setUpdatingId(variant.id);

      const response = await fetch(
        `/api/admin/products/inventory/${variant.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            direction,
          }),
        }
      );

      if (!response.ok) {
        const result =
          await response.json();

        throw new Error(
          result.error ??
            "Unable to update stock."
        );
      }

      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to update stock."
      );
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <div className="space-y-8">
      <section className="rounded-2xl bg-white p-10 shadow-sm">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">
            Inventory
          </h2>

          <p className="mt-2 text-gray-500">
            Manage stock levels for each product variant.
          </p>
        </div>

        {variants.length === 0 ? (
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="text-5xl">
              📦
            </div>

            <h3 className="mt-6 text-lg font-medium">
              No variants available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Create a product variant before managing inventory.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    SKU
                  </th>

                  <th className="px-4 py-3 text-left text-sm font-semibold">
                    Size
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Stock
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Status
                  </th>

                  <th className="px-4 py-3 text-center text-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-white">
                {variants.map((variant) => {
                  const stock =
                    variant.stock_quantity;

                  return (
                    <tr key={variant.id}>
                      <td className="px-4 py-3 font-mono text-sm">
                        {variant.sku}
                      </td>

                      <td className="px-4 py-3">
                        {variant.size ?? "-"}
                      </td>

                      <td className="px-4 py-3 text-center font-semibold">
                        {stock}
                      </td>

                      <td className="px-4 py-3 text-center">
                        {stock === 0 ? (
                          <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                            Out of Stock
                          </span>
                        ) : stock <= 5 ? (
                          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                            Low Stock
                          </span>
                        ) : (
                          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                            In Stock
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            disabled={
                              updatingId ===
                              variant.id
                            }
                            onClick={() =>
                              adjustStock(
                                variant,
                                "increase"
                              )
                            }
                            className="rounded border border-green-300 px-3 py-1 text-sm text-green-700 transition hover:bg-green-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            title="Increase stock"
                          >
                            +
                          </button>

                          <button
                            type="button"
                            disabled={
                              updatingId ===
                              variant.id
                            }
                            onClick={() =>
                              adjustStock(
                                variant,
                                "decrease"
                              )
                            }
                            className="rounded border border-red-300 px-3 py-1 text-sm text-red-700 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                            title="Decrease stock"
                          >
                            −
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <InventoryHistory
        history={inventoryHistory}
      />
    </div>
  );
}