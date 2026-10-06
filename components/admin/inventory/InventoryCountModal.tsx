"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type InventoryCountModalProps = {
  variantId: string;
  currentStock: number;
  open: boolean;
  onClose: () => void;
};

export default function InventoryCountModal({
  variantId,
  currentStock,
  open,
  onClose,
}: InventoryCountModalProps) {

  const router =
    useRouter();

  const [
    actualQuantity,
    setActualQuantity,
  ] = useState("");

  const [
    notes,
    setNotes,
  ] = useState("");

  const [
    loading,
    setLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  const difference =
    useMemo(() => {

      const qty =
        Number(actualQuantity);

      if (
        !Number.isFinite(qty)
      ) {
        return 0;
      }

      return qty - currentStock;

    }, [
      actualQuantity,
      currentStock,
    ]);

  if (!open) {
    return null;
  }

  async function handleSubmit() {

    setError("");

    const qty =
      Number(actualQuantity);

    if (
      !Number.isInteger(qty) ||
      qty < 0
    ) {

      setError(
        "Please enter a valid inventory count."
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
                "inventory_count",

              actualQuantity:
                qty,

              notes,

            }),

          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.error ??
          "Unable to save inventory count."
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

          📋 Inventory Count

        </h2>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Current Stock

            </label>

            <div className="rounded-lg bg-gray-100 px-4 py-3 text-lg font-semibold">

              {currentStock}

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Actual Count

            </label>

            <input
              type="number"
              min="0"
              value={actualQuantity}
              onChange={(e) =>
                setActualQuantity(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Difference

            </label>

            <div
              className={`
                rounded-lg
                px-4
                py-3
                text-lg
                font-semibold
                ${
                  difference > 0
                    ? "bg-green-100 text-green-700"
                    : difference < 0
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100"
                }
              `}
            >

              {difference > 0
                ? `+${difference}`
                : difference}

            </div>

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
              bg-black
              px-6
              py-3
              text-white
              transition
              hover:bg-gray-800
              disabled:opacity-50
            "
          >
            {loading
              ? "Saving..."
              : "Save Count"}
          </button>

        </div>

      </div>

    </div>

  );

}