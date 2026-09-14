"use client";

import { useState } from "react";

type VariantFormProps = {
  productId: string;
  onCancel: () => void;
};

export default function VariantForm({
  productId,
  onCancel,
}: VariantFormProps) {
  const [saving, setSaving] =
    useState(false);

  const [form, setForm] = useState({
    size: "",
    color: "",
    material: "",
    sku: "",
    price: "",
    compareAtPrice: "",
    costPrice: "",
    barcode: "",
    weight: "",
    active: true,
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

      const response = await fetch(
        "/api/admin/products/variants",
        {
          method: "POST",
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
        Add Product Variant
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
              ? "Saving..."
              : "Save Variant"}
          </button>

        </div>

      </div>
    </div>
  );
}