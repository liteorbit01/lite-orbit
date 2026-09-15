"use client";

import { useState } from "react";

import type {
  ProductVariant,
} from "@/app/admin/products/types";

type VariantFormProps = {
  productId: string;
  onCancel: () => void;
  variant?: ProductVariant;
};

export default function VariantForm({
  productId,
  onCancel,
  variant,
}: VariantFormProps) {
  const isEditing = !!variant;

  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    size: variant?.size ?? "",
    color: variant?.color ?? "",
    material: variant?.material ?? "",
    sku: variant?.sku ?? "",
    price:
      variant?.price?.toString() ?? "",
    compareAtPrice:
      variant?.compare_at_price?.toString() ??
      "",
    costPrice:
      variant?.cost_price?.toString() ??
      "",
    barcode:
      variant?.barcode ?? "",
    weight:
      variant?.weight?.toString() ?? "",
    active:
      variant?.active ?? true,
  });

  function update(
    key: keyof typeof form,
    value: string | boolean
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  async function saveVariant() {
    if (!form.sku.trim()) {
      alert("SKU is required.");
      return;
    }

    if (!form.price.trim()) {
      alert("Price is required.");
      return;
    }

    try {
      setSaving(true);

      const url = isEditing
        ? `/api/admin/products/variants/${variant!.id}`
        : "/api/admin/products/variants";

      const method = isEditing
        ? "PATCH"
        : "POST";

      const response = await fetch(
        url,
        {
          method,
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            productId,
            ...form,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Unable to save variant."
        );
      }

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to save variant."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mb-8 rounded-2xl border bg-gray-50 p-8">
      <h3 className="mb-6 text-xl font-semibold">
        {isEditing
          ? "Edit Product Variant"
          : "Add Product Variant"}
      </h3>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Size
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={form.size}
            onChange={(e) =>
              update(
                "size",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Color
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={form.color}
            onChange={(e) =>
              update(
                "color",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Material
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={form.material}
            onChange={(e) =>
              update(
                "material",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            SKU
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={form.sku}
            onChange={(e) =>
              update(
                "sku",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Price
          </label>

          <input
            type="number"
            step="0.01"
            className="w-full rounded-lg border p-3"
            value={form.price}
            onChange={(e) =>
              update(
                "price",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Compare At Price
          </label>

          <input
            type="number"
            step="0.01"
            className="w-full rounded-lg border p-3"
            value={form.compareAtPrice}
            onChange={(e) =>
              update(
                "compareAtPrice",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Cost Price
          </label>

          <input
            type="number"
            step="0.01"
            className="w-full rounded-lg border p-3"
            value={form.costPrice}
            onChange={(e) =>
              update(
                "costPrice",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Barcode
          </label>

          <input
            className="w-full rounded-lg border p-3"
            value={form.barcode}
            onChange={(e) =>
              update(
                "barcode",
                e.target.value
              )
            }
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Weight (kg)
          </label>

          <input
            type="number"
            step="0.01"
            className="w-full rounded-lg border p-3"
            value={form.weight}
            onChange={(e) =>
              update(
                "weight",
                e.target.value
              )
            }
          />
        </div>

      </div>

      <div className="mt-8 flex items-center justify-between">

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              update(
                "active",
                e.target.checked
              )
            }
          />
          Active
        </label>

        <div className="space-x-3">

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border px-6 py-3"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={saveVariant}
            className="rounded-lg bg-black px-6 py-3 text-white disabled:bg-gray-500"
          >
            {saving
              ? (isEditing
                  ? "Updating..."
                  : "Saving...")
              : (isEditing
                  ? "Update Variant"
                  : "Save Variant")}
          </button>

        </div>

      </div>
    </div>
  );
}