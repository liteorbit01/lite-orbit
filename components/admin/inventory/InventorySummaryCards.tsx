"use client";

import { memo } from "react";

import type {
  InventorySummary,
  InventoryStatusFilter,
} from "@/types/inventory";

type InventorySummaryCardsProps = {
  summary: InventorySummary;

  selectedStatus: InventoryStatusFilter;

  onStatusSelect: (
    status: InventoryStatusFilter
  ) => void;
};

type SummaryCardProps = {
  title: string;

  value: number;

  color: string;

  status: InventoryStatusFilter;

  selected: boolean;

  onClick: () => void;
};

const SummaryCard = memo(function SummaryCard({
  title,
  value,
  color,
  selected,
  onClick,
}: SummaryCardProps) {

  return (

    <button
      type="button"
      onClick={onClick}
      className={`
        w-full
        rounded-xl
        border
        bg-white
        p-5
        text-left
        shadow-sm
        transition-all

        ${
          selected
            ? "border-blue-600 ring-2 ring-blue-200"
            : "border-gray-200 hover:border-blue-300 hover:shadow-md"
        }
      `}
    >

      <div
        className={`
          inline-flex
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${color}
        `}
      >

        {title}

      </div>

      <div className="mt-4 text-3xl font-bold">

        {value}

      </div>

    </button>

  );

});

function InventorySummaryCards({
  summary,
  selectedStatus,
  onStatusSelect,
}: InventorySummaryCardsProps) {

  return (

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

      <SummaryCard
        title="Products"
        value={summary.totalProducts}
        color="bg-gray-100 text-gray-700"
        status="all"
        selected={
          selectedStatus === "all"
        }
        onClick={() =>
          onStatusSelect("all")
        }
      />

      <SummaryCard
        title="In Stock"
        value={summary.inStock}
        color="bg-green-100 text-green-700"
        status="in_stock"
        selected={
          selectedStatus ===
          "in_stock"
        }
        onClick={() =>
          onStatusSelect(
            "in_stock"
          )
        }
      />

      <SummaryCard
        title="Low Stock"
        value={summary.lowStock}
        color="bg-yellow-100 text-yellow-700"
        status="low_stock"
        selected={
          selectedStatus ===
          "low_stock"
        }
        onClick={() =>
          onStatusSelect(
            "low_stock"
          )
        }
      />

      <SummaryCard
        title="Out of Stock"
        value={summary.outOfStock}
        color="bg-red-100 text-red-700"
        status="out_of_stock"
        selected={
          selectedStatus ===
          "out_of_stock"
        }
        onClick={() =>
          onStatusSelect(
            "out_of_stock"
          )
        }
      />

      <SummaryCard
        title="Backordered"
        value={summary.backordered}
        color="bg-purple-100 text-purple-700"
        status="backordered"
        selected={
          selectedStatus ===
          "backordered"
        }
        onClick={() =>
          onStatusSelect(
            "backordered"
          )
        }
      />

    </div>

  );

}

export default memo(
  InventorySummaryCards
);