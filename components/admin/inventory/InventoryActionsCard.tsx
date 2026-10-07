"use client";

import { useState } from "react";

import ReceiveShipmentModal from "./ReceiveShipmentModal";
import StockAdjustmentModal from "./StockAdjustmentModal";
import DamageLossModal from "./DamageLossModal";
import InventoryCountModal from "./InventoryCountModal";
import InventoryHistoryDrawer from "./InventoryHistoryDrawer";

import {
  InventoryHistoryItem,
} from "@/lib/inventory/getInventoryHistory";

import {
  InventorySummary,
} from "@/lib/inventory/getInventorySummary";

type InventoryActionsCardProps = {
  variantId: string;
  currentStock: number;
  history: InventoryHistoryItem[];
  summary: InventorySummary;
};

export default function InventoryActionsCard({
  variantId,
  currentStock,
  history,
  summary,
}: InventoryActionsCardProps) {

  const [
    receiveOpen,
    setReceiveOpen,
  ] = useState(false);

  const [
    adjustmentOpen,
    setAdjustmentOpen,
  ] = useState(false);

  const [
    damageOpen,
    setDamageOpen,
  ] = useState(false);

  const [
    inventoryCountOpen,
    setInventoryCountOpen,
  ] = useState(false);

  const [
    historyOpen,
    setHistoryOpen,
  ] = useState(false);

  const buttonStyle = `
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
            onClick={() =>
              setDamageOpen(true)
            }
            className={buttonStyle}
          >
            ⚠️ Damage / Loss
          </button>

          <button
            onClick={() =>
              setInventoryCountOpen(true)
            }
            className={buttonStyle}
          >
            📋 Inventory Count
          </button>

          <hr className="my-4" />

          <button
            onClick={() =>
              setHistoryOpen(true)
            }
            className={buttonStyle}
          >
            🕒 View History
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

      <DamageLossModal
        variantId={variantId}
        open={damageOpen}
        onClose={() =>
          setDamageOpen(false)
        }
      />

      <InventoryCountModal
        variantId={variantId}
        currentStock={currentStock}
        open={inventoryCountOpen}
        onClose={() =>
          setInventoryCountOpen(false)
        }
      />

      <InventoryHistoryDrawer
        open={historyOpen}
        onClose={() =>
          setHistoryOpen(false)
        }
        history={history}
        summary={summary}
      />

    </>
  );

}