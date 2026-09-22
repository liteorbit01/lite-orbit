"use client";

import {
  useEffect,
  useState,
} from "react";

type InventoryAdjustmentModalProps = {
  open: boolean;
  currentStock: number;
  onClose: () => void;
  onSave: (
    operation: "add" | "remove",
    quantity: number,
    reason: string,
    notes: string
  ) => void | Promise<void>;
};

export default function InventoryAdjustmentModal({
  open,
  currentStock,
  onClose,
  onSave,
}: InventoryAdjustmentModalProps) {
  const [operation, setOperation] =
    useState<"add" | "remove">("add");

  const [quantity, setQuantity] =
    useState(1);

  const [reason, setReason] =
    useState("shipment");

  const [notes, setNotes] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (open) {
      setOperation("add");
      setQuantity(1);
      setReason("shipment");
      setNotes("");
      setSaving(false);
    }
  }, [open]);

  if (!open) {
    return null;
  }

  async function handleSubmit() {
    try {
      setSaving(true);

      await onSave(
        operation,
        quantity,
        reason,
        notes
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="text-2xl font-semibold">
          Adjust Inventory
        </h2>

        <p className="mt-2 text-gray-500">
          Current Stock:{" "}
          <span className="font-semibold">
            {currentStock}
          </span>
        </p>

        <div className="mt-8 space-y-6">

          <div>
            <label className="mb-2 block text-sm font-medium">
              Operation
            </label>

            <select
              value={operation}
              disabled={saving}
              onChange={(e) =>
                setOperation(
                  e.target.value as
                    | "add"
                    | "remove"
                )
              }
              className="w-full rounded-lg border p-3 disabled:bg-gray-100"
            >
              <option value="add">
                Add to Stock
              </option>

              <option value="remove">
                Remove from Stock
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Quantity
            </label>

            <input
              type="number"
              min={1}
              value={quantity}
              disabled={saving}
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border p-3 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Reason
            </label>

            <select
              value={reason}
              disabled={saving}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3 disabled:bg-gray-100"
            >
              <option value="shipment">
                📦 New Shipment Received
              </option>

              <option value="adjustment">
                ⚙️ Inventory Correction
              </option>

              <option value="damaged">
                ❌ Damaged Items
              </option>

              <option value="return">
                ↩️ Customer Return
              </option>

              <option value="sample">
                🎁 Sample / Promotion
              </option>

              <option value="other">
                📝 Other
              </option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Notes
            </label>

            <textarea
              rows={4}
              value={notes}
              disabled={saving}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3 disabled:bg-gray-100"
              placeholder="Optional notes..."
            />
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            disabled={saving}
            onClick={onClose}
            className="rounded-lg border px-5 py-2 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={saving}
            onClick={handleSubmit}
            className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save"}
          </button>

        </div>

      </div>
    </div>
  );
}