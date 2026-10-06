"use client";

import { useState } from "react";

import ReceiveShipmentModal from "./ReceiveShipmentModal";
import StockAdjustmentModal from "./StockAdjustmentModal";

type InventoryActionsCardProps = {
  variantId: string;
};

export default function InventoryActionsCard({
  variantId,
}: InventoryActionsCardProps) {

  const [
    receiveOpen,
    setReceiveOpen,
  ] = useState(false);

  const [
    adjustmentOpen,
    setAdjustmentOpen,
  ] = useState(false);

  const buttonStyle =
    `
      w-full
      rounded-xl
      border
      border-gray-300
      bg-white
      px-5
      py-3
      text-left
      font-medium
      transition
      hover:bg-gray-100
    `;

  return (
    <>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-lg font-semibold">

          Inventory Operations

        </h2>

        <div className="space-y-4">

          <button
            onClick={() =>
              setReceiveOpen(true)
            }
            className={buttonStyle}
          >
            📦 Receive Shipment
          </button>

          <button
            onClick={() =>
              setAdjustmentOpen(true)
            }
            className={buttonStyle}
          >
            ➕ Stock Adjustment
          </button>

          <button
            className={buttonStyle}
          >
            ⚠️ Damage / Loss
          </button>

          <button
            className={buttonStyle}
          >
            📋 Inventory Count
          </button>

          <button
            className={buttonStyle}
          >
            🕒 Inventory History
          </button>

        </div>

      </div>

      <ReceiveShipmentModal
        variantId={variantId}
        open={receiveOpen}
        onClose={() =>
          setReceiveOpen(false)
        }
      />

      <StockAdjustmentModal
        variantId={variantId}
        open={adjustmentOpen}
        onClose={() =>
          setAdjustmentOpen(false)
        }
      />

    </>
  );

}