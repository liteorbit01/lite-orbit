"use client";

import { memo } from "react";

import Link from "next/link";

import {
  ReorderSuggestion,
} from "@/lib/inventory/reorder";

type ReorderSuggestionsProps = {
  suggestions: ReorderSuggestion[];
};

const PriorityBadge = memo(function PriorityBadge({
  priority,
}: {
  priority: ReorderSuggestion["priority"];
}) {

  const styles = {

    critical:
      "bg-red-100 text-red-700",

    high:
      "bg-orange-100 text-orange-700",

    medium:
      "bg-yellow-100 text-yellow-700",

  };

  const labels = {

    critical:
      "Critical",

    high:
      "High",

    medium:
      "Medium",

  };

  return (

    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[priority]}
      `}
    >

      {labels[priority]}

    </span>

  );

});

const SuggestionRow = memo(function SuggestionRow({
  item,
}: {
  item: ReorderSuggestion;
}) {

  return (

    <div
      className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between"
    >

      <div className="flex-1">

        <div className="flex items-center gap-3">

          <h3 className="text-lg font-semibold">

            {item.productName}

          </h3>

          <PriorityBadge
            priority={
              item.priority
            }
          />

        </div>

        <div className="mt-2 text-sm text-gray-500">

          SKU:

          <span className="ml-2 font-medium">

            {item.sku}

          </span>

        </div>

        <p className="mt-3 text-sm text-gray-600">

          {item.reason}

        </p>

      </div>

      <div className="grid grid-cols-3 gap-8 text-center">

        <div>

          <div className="text-xs uppercase tracking-wide text-gray-400">

            Available

          </div>

          <div className="mt-2 text-xl font-bold">

            {item.availableQuantity}

          </div>

        </div>

        <div>

          <div className="text-xs uppercase tracking-wide text-gray-400">

            Threshold

          </div>

          <div className="mt-2 text-xl font-bold">

            {item.lowStockThreshold}

          </div>

        </div>

        <div>

          <div className="text-xs uppercase tracking-wide text-gray-400">

            Order

          </div>

          <div className="mt-2 text-xl font-bold text-blue-600">

            {item.reorderQuantity}

          </div>

        </div>

      </div>

      <Link
        href={`/admin/inventory/${item.variantId}`}
        className="
          inline-flex
          items-center
          justify-center
          rounded-lg
          border
          border-gray-300
          px-5
          py-2
          text-sm
          font-medium
          transition
          hover:bg-gray-100
        "
      >

        Manage

      </Link>

    </div>

  );

});

function ReorderSuggestions({
  suggestions,
}: ReorderSuggestionsProps) {

  return (

    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b px-6 py-4">

        <div>

          <h2 className="text-lg font-semibold">

            Reorder Suggestions

          </h2>

          <p className="mt-1 text-sm text-gray-500">

            Recommended replenishment based on current inventory levels.

          </p>

        </div>

        <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">

          {suggestions.length} Suggestion{suggestions.length === 1 ? "" : "s"}

        </div>

      </div>

      {suggestions.length === 0 ? (

        <div className="p-10 text-center">

          <div className="text-5xl">

            📦

          </div>

          <h3 className="mt-4 text-lg font-semibold">

            Inventory is Healthy

          </h3>

          <p className="mt-2 text-gray-500">

            No products currently require replenishment.

          </p>

        </div>

      ) : (

        <div className="divide-y">

          {suggestions.map((item) => (

            <SuggestionRow
              key={item.id}
              item={item}
            />

          ))}

        </div>

      )}

    </div>

  );

}

export default memo(
  ReorderSuggestions
);