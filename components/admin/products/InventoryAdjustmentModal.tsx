"use client";

import { useState } from "react";

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

  if (!open) {
    return null;
  }

  async function handleSubmit() {
    await onSave(
      operation,
      quantity,
      reason,
      notes
    );

    onClose();
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
              onChange={(e) =>
                setOperation(
                  e.target.value as
                    | "add"
                    | "remove"
                )
              }
              className="w-full rounded-lg border p-3"
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
              onChange={(e) =>
                setQuantity(
                  Number(e.target.value)
                )
              }
              className="w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Reason
            </label>

            <select
              value={reason}
              onChange={(e) =>
                setReason(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
            >
              <option value="shipment">
                New Shipment Received
              </option>

              <option value="adjustment">
                Inventory Correction
              </option>

              <option value="damaged">
                Damaged Items
              </option>

              <option value="return">
                Customer Return
              </option>

              <option value="sample">
                Sample / Promotion
              </option>

              <option value="other">
                Other
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
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
              placeholder="Optional notes..."
            />
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-lg bg-black px-5 py-2 text-white"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}