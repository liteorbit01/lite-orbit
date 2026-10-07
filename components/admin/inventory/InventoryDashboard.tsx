"use client";

import { useMemo, useState } from "react";

import InventorySearch from "./InventorySearch";
import InventoryTable from "./InventoryTable";
import InventorySummaryCards from "./InventorySummaryCards";
import LowStockAlerts from "./LowStockAlerts";

import {
  buildInventorySummary,
} from "@/lib/inventory/summary";

import {
  buildLowStockAlerts,
} from "@/lib/inventory/alerts";

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

    }, [
      inventory,
      search,
    ]);

  const summary =
    useMemo(
      () =>
        buildInventorySummary(
          filteredInventory
        ),
      [filteredInventory]
    );

  const alerts =
    useMemo(
      () =>
        buildLowStockAlerts(
          filteredInventory
        ),
      [filteredInventory]
    );

  return (

    <>

      {/* Dashboard Summary */}

      <InventorySummaryCards
        summary={summary}
      />

      {/* Low Stock Alerts */}

      <div className="mt-8">

        <LowStockAlerts
          alerts={alerts}
        />

      </div>

      {/* Search */}

      <div className="mt-8">

        <InventorySearch
          value={search}
          onChange={setSearch}
        />

      </div>

      {/* Inventory Table */}

      <div className="mt-8">

        <InventoryTable
          inventory={
            filteredInventory
          }
        />

      </div>

    </>

  );

}