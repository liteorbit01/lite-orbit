"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ReceiveShipmentModalProps = {
  variantId: string;
  open: boolean;
  onClose: () => void;
};

export default function ReceiveShipmentModal({
  variantId,
  open,
  onClose,
}: ReceiveShipmentModalProps) {

  const router =
    useRouter();

  const [supplier, setSupplier] =
    useState("");

  const [reference, setReference] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [notes, setNotes] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  if (!open) {
    return null;
  }

  async function handleReceiveShipment() {

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
                "receive",

              quantity: qty,

              supplier,

              reference,

              notes,

            }),

          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data.error ??
          "Unable to receive shipment."
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

          📦 Receive Shipment

        </h2>

        <div className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">

              Supplier

            </label>

            <input
              value={supplier}
              onChange={(e) =>
                setSupplier(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Reference Number

            </label>

            <input
              value={reference}
              onChange={(e) =>
                setReference(
                  e.target.value
                )
              }
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">

              Quantity Received

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
            onClick={
              handleReceiveShipment
            }
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
              ? "Receiving..."
              : "Receive Shipment"}
          </button>

        </div>

      </div>

    </div>

  );

}