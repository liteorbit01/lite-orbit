"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type DamageLossModalProps = {
  variantId: string;
  open: boolean;
  onClose: () => void;
};

export default function DamageLossModal({
  variantId,
  open,
  onClose,
}: DamageLossModalProps) {

  const router =
    useRouter();

  const [quantity, setQuantity] =
    useState("");

  const [reason, setReason] =
    useState<
      | "Damaged"
      | "Lost"
      | "Expired"
      | "Returned Unsellable"
      | "Other"
    >("Damaged");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open) {
    return null;
  }

  async function handleSubmit() {

    setError("");

    const qty =
      Number(quantity);

    if (
      !Number.isInteger(qty) ||
      qty <= 0
    ) {
      setError(
        "Quantity must be greater than zero."
      );
      return;
    }

    try {

      setLoading(true);

      const response =
        await fetch(
          "/api/admin/inventory/transaction",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              variantId,

              operation:
                "damage",

              quantity: qty,

              reason,

              notes,

            }),

          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.error ??
            "Unable to record damage."
        );

      }

      onClose();

      router.refresh();

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : "Unexpected error."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        <h2 className="mb-6 text-2xl font-semibold">

          ⚠️ Record Damage / Loss

        </h2>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Quantity

            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
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
                  e.target.value as
                    | "Damaged"
                    | "Lost"
                    | "Expired"
                    | "Returned Unsellable"
                    | "Other"
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >

              <option>
                Damaged
              </option>

              <option>
                Lost
              </option>

              <option>
                Expired
              </option>

              <option>
                Returned Unsellable
              </option>

              <option>
                Other
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Notes

            </label>

            <textarea
              rows={3}
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>

          {error && (

            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">

              {error}

            </div>

          )}

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg
              border
              border-gray-300
              px-5
              py-3
              transition
              hover:bg-gray-100
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              rounded-lg
              bg-red-600
              px-6
              py-3
              text-white
              transition
              hover:bg-red-700
              disabled:opacity-50
            "
          >
            {loading
              ? "Saving..."
              : "Record Damage"}
          </button>

        </div>

      </div>

    </div>

  );

}