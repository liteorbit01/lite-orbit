"use client";

import Link from "next/link";

import {
  useMemo,
  useState,
} from "react";

import InventoryStatusBadge from "./InventoryStatusBadge";

import {
  getInventoryStatus,
} from "@/lib/inventory/status";

import {
  getAvailableQuantity,
  getInventoryHealth,
} from "@/lib/inventory/utils";

import type {
  InventoryRow,
} from "@/types/inventory";

type InventoryTableProps = {
  inventory: InventoryRow[];
};

type SortField =
  | "product"
  | "sku"
  | "stock"
  | "reserved"
  | "available"
  | "status"
  | "threshold";

type SortDirection =
  | "asc"
  | "desc";

type SortHeaderProps = {
  label: string;
  field: SortField;
  align?: "left" | "center";
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (
    field: SortField
  ) => void;
};

/* =======================================================
   Row Styling
======================================================= */

function getRowClasses(
  row: InventoryRow
) {

  const health =
    getInventoryHealth(

      row.quantity,

      row.reserved_quantity,

      row.low_stock_threshold,

      row.allow_backorder

    );

  switch (
    health.status.status
  ) {

    case "out_of_stock":

      return `
        border-l-[6px]
        border-red-500
        bg-red-50
        hover:bg-red-100
      `;

    case "backordered":

      return `
        border-l-[6px]
        border-purple-500
        bg-purple-50
        hover:bg-purple-100
      `;

    case "low_stock":

      return `
        border-l-[6px]
        border-yellow-500
        bg-yellow-50
        hover:bg-yellow-100
      `;

    default:

      return `
        border-l-[6px]
        border-transparent
        bg-white
        hover:bg-gray-50
      `;

  }

}

/* =======================================================
   Sort Header
======================================================= */

function SortHeader({

  label,

  field,

  align = "left",

  sortField,

  sortDirection,

  onSort,

}: SortHeaderProps) {

  return (

    <th
      onClick={() =>
        onSort(field)
      }
      className={`
        sticky
        top-0
        z-20

        cursor-pointer
        select-none

        bg-gray-50

        px-6
        py-4

        text-sm
        font-semibold
        text-gray-600

        hover:bg-gray-100

        ${
          align === "center"
            ? "text-center"
            : "text-left"
        }
      `}
    >

      <span className="inline-flex items-center gap-2">

        {label}

        {sortField === field && (

          <span className="text-xs">

            {sortDirection === "asc"
              ? "▲"
              : "▼"}

          </span>

        )}

      </span>

    </th>

  );

}

/* =======================================================
   Inventory Table
======================================================= */

export default function InventoryTable({
  inventory,
}: InventoryTableProps) {

  const [
    sortField,
    setSortField,
  ] =
    useState<SortField>(
      "product"
    );

  const [
    sortDirection,
    setSortDirection,
  ] =
    useState<SortDirection>(
      "asc"
    );

  function handleSort(
    field: SortField
  ) {

    if (
      field === sortField
    ) {

      setSortDirection(
        (
          direction
        ) =>

          direction ===
          "asc"

            ? "desc"

            : "asc"
      );

      return;

    }

    setSortField(field);

    setSortDirection(
      "asc"
    );

  }
    const sortedInventory =
    useMemo(() => {

      const rows =
        [...inventory];

      const statusOrder = {

        out_of_stock: 0,

        backordered: 1,

        low_stock: 2,

        in_stock: 3,

      };

      rows.sort(
        (a, b) => {

          let result = 0;

          switch (
            sortField
          ) {

            case "product":

              result =
                a.product_variants.products.name.localeCompare(
                  b.product_variants.products.name
                );

              break;

            case "sku":

              result =
                a.product_variants.sku.localeCompare(
                  b.product_variants.sku
                );

              break;

            case "stock":

              result =
                a.quantity -
                b.quantity;

              break;

            case "reserved":

              result =
                a.reserved_quantity -
                b.reserved_quantity;

              break;

            case "available":

              result =

                getAvailableQuantity(

                  a.quantity,

                  a.reserved_quantity

                ) -

                getAvailableQuantity(

                  b.quantity,

                  b.reserved_quantity

                );

              break;

            case "threshold":

              result =
                a.low_stock_threshold -
                b.low_stock_threshold;

              break;

            case "status":

              result =

                statusOrder[
                  getInventoryStatus({

                    quantity:
                      a.quantity,

                    reservedQuantity:
                      a.reserved_quantity,

                    lowStockThreshold:
                      a.low_stock_threshold,

                    allowBackorder:
                      a.allow_backorder,

                  }).status
                ]

                -

                statusOrder[
                  getInventoryStatus({

                    quantity:
                      b.quantity,

                    reservedQuantity:
                      b.reserved_quantity,

                    lowStockThreshold:
                      b.low_stock_threshold,

                    allowBackorder:
                      b.allow_backorder,

                  }).status
                ];

              break;

          }

          return sortDirection === "asc"
            ? result
            : -result;

        }

      );

      return rows;

    }, [

      inventory,

      sortField,

      sortDirection,

    ]);
      return (

    <div className="max-h-[calc(100vh-280px)] overflow-auto rounded-xl border border-gray-200 bg-white shadow-sm">

      <table className="min-w-full border-separate border-spacing-0">

        <thead className="sticky top-0 z-20 bg-gray-50 shadow-sm">

          <tr className="border-b">

            <SortHeader
              label="Product"
              field="product"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <SortHeader
              label="SKU"
              field="sku"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <SortHeader
              label="Stock"
              field="stock"
              align="center"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <SortHeader
              label="Reserved"
              field="reserved"
              align="center"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <SortHeader
              label="Available"
              field="available"
              align="center"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <SortHeader
              label="Status"
              field="status"
              align="center"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <SortHeader
              label="Threshold"
              field="threshold"
              align="center"
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />

            <th
              className="
                sticky
                top-0
                z-20
                bg-gray-50
                px-6
                py-4
                text-center
                text-sm
                font-semibold
                text-gray-600
              "
            >

              Action

            </th>

          </tr>

        </thead>

        <tbody>

          {sortedInventory.map((item) => {

            const available =
              getAvailableQuantity(

                item.quantity,

                item.reserved_quantity

              );

            return (

              <tr
                key={item.id}
                className={`
                  border-b
                  transition-colors
                  duration-150
                  ${getRowClasses(item)}
                `}
              >

                <td className="px-6 py-4 font-medium">

                  {item.product_variants.products.name}

                </td>

                <td className="px-6 py-4 text-gray-600">

                  {item.product_variants.sku}

                </td>

                <td className="px-6 py-4 text-center">

                  {item.quantity}

                </td>

                <td className="px-6 py-4 text-center">

                  {item.reserved_quantity}

                </td>

                <td className="px-6 py-4 text-center font-semibold">

                  {available}

                </td>

                <td className="px-6 py-4 text-center">

                  <InventoryStatusBadge
                    quantity={item.quantity}
                    reservedQuantity={
                      item.reserved_quantity
                    }
                    lowStockThreshold={
                      item.low_stock_threshold
                    }
                    allowBackorder={
                      item.allow_backorder
                    }
                  />

                </td>

                <td className="px-6 py-4 text-center">

                  {item.low_stock_threshold}

                </td>

                <td className="px-6 py-4 text-center">

                  <Link
                    href={`/admin/inventory/${item.product_variants.id}`}
                    className="
                      inline-flex
                      rounded-lg
                      border
                      border-gray-300
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition
                      hover:bg-gray-100
                    "
                  >

                    Manage

                  </Link>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );

}