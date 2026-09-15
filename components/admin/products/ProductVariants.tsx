"use client";

import { useState } from "react";

import VariantForm from "./VariantForm";

import type {
  ProductVariant,
} from "@/app/admin/products/types";

type ProductVariantsProps = {
  productId: string;
  variants: ProductVariant[];
};

export default function ProductVariants({
  productId,
  variants,
}: ProductVariantsProps) {
  const [showForm, setShowForm] =
    useState(false);

  const [editingVariant, setEditingVariant] =
    useState<ProductVariant | undefined>(
      undefined
    );

  return (
    <section className="rounded-2xl bg-white p-10 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">
            Product Variants
          </h2>

          <p className="mt-2 text-gray-500">
            Manage sizes, colors, pricing and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditingVariant(undefined);
            setShowForm(true);
          }}
          className="rounded-lg bg-black px-6 py-3 text-white transition hover:bg-gray-800"
        >
          + Add Variant
        </button>
      </div>

      {showForm && (
        <VariantForm
          productId={productId}
          variant={editingVariant}
          onCancel={() => {
            setEditingVariant(undefined);
            setShowForm(false);
          }}
        />
      )}

      {variants.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <div className="text-5xl">
            📦
          </div>

          <h3 className="mt-6 text-lg font-medium">
            No variants created yet
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Add your first product variant to manage
            pricing and inventory.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Size
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Color
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  SKU
                </th>

                <th className="px-4 py-3 text-right text-sm font-semibold">
                  Price
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold">
                  Active
                </th>

                <th className="px-4 py-3 text-center text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">
              {variants.map((variant) => (
                <tr key={variant.id}>
                  <td className="px-4 py-3">
                    {variant.size ?? "-"}
                  </td>

                  <td className="px-4 py-3">
                    {variant.color ?? "-"}
                  </td>

                  <td className="px-4 py-3 font-mono text-sm">
                    {variant.sku}
                  </td>

                  <td className="px-4 py-3 text-right">
                    $
                    {Number(
                      variant.price
                    ).toFixed(2)}
                  </td>

                  <td className="px-4 py-3 text-center">
                    {variant.active
                      ? "✅"
                      : "❌"}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingVariant(
                          variant
                        );
                        setShowForm(true);
                      }}
                      className="rounded border px-3 py-1 text-sm transition hover:bg-gray-100"
                    >
                      ✏️ Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}