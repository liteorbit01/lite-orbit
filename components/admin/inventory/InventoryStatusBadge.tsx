"use client";

import { memo } from "react";

import {
  getInventoryStatus,
} from "@/lib/inventory/status";

type InventoryStatusBadgeProps = {
  quantity: number;
  reservedQuantity: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
};

function InventoryStatusBadge({
  quantity,
  reservedQuantity,
  lowStockThreshold,
  allowBackorder,
}: InventoryStatusBadgeProps) {

  const status =
    getInventoryStatus({

      quantity,

      reservedQuantity,

      lowStockThreshold,

      allowBackorder,

    });

  return (

    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${status.badgeClass}
      `}
    >

      {status.label}

    </span>

  );

}

export default memo(
  InventoryStatusBadge
);