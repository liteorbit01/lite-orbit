"use client";

import { useMemo, useState } from "react";

import InventorySearch from "./InventorySearch";
import InventorySummary from "./InventorySummary";
import InventoryTable from "./InventoryTable";

type InventoryItem = {
  id: string;

  quantity: number;

  reserved_quantity: number;

  low_stock_threshold: number;

  reorder_quantity: number;

  allow_backorder: boolean;

  product_variants: {
    id: string;

    sku: string;

    products: {
      name: string;
    };
  };
};

type InventoryDashboardProps = {
  inventory: InventoryItem[];
};

export default function InventoryDashboard({
  inventory,
}: InventoryDashboardProps) {

  const [search, setSearch] =
    useState("");

  const filteredInventory =
    useMemo(() => {

      const term =
        search
          .trim()
          .toLowerCase();

      if (!term) {
        return inventory;
      }

      return inventory.filter(
        (item) => {

          const product =
            item.product_variants
              .products.name
              .toLowerCase();

          const sku =
            item.product_variants
              .sku
              .toLowerCase();

          return (
            product.includes(term) ||
            sku.includes(term)
          );

        }
      );

    }, [inventory, search]);

  const totalProducts =
    filteredInventory.length;

  const totalUnits =
    filteredInventory.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );

  const lowStock =
    filteredInventory.filter(
      (item) => {

        const available =
          item.quantity -
          item.reserved_quantity;

        return (
          available > 0 &&
          available <=
          item.low_stock_threshold
        );

      }
    ).length;

  const outOfStock =
    filteredInventory.filter(
      (item) =>
        item.quantity === 0
    ).length;

  return (

    <>

      <InventorySummary
        totalProducts={
          totalProducts
        }
        totalUnits={
          totalUnits
        }
        lowStock={
          lowStock
        }
        outOfStock={
          outOfStock
        }
      />

      <InventorySearch
        value={search}
        onChange={setSearch}
      />

      <InventoryTable
        inventory={
          filteredInventory
        }
      />

    </>

  );

}