"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import InventorySearch from "./InventorySearch";
import InventorySummaryCards from "./InventorySummaryCards";
import LowStockAlerts from "./LowStockAlerts";
import ReorderSuggestions from "./ReorderSuggestions";
import InventoryAnalytics from "./InventoryAnalytics";
import InventoryTable from "./InventoryTable";

import {
  buildInventorySummary,
} from "@/lib/inventory/summary";

import {
  buildLowStockAlerts,
} from "@/lib/inventory/alerts";

import {
  buildReorderSuggestions,
} from "@/lib/inventory/reorder";

import {
  buildInventoryAnalytics,
} from "@/lib/inventory/analytics";

import {
  getInventoryStatusKey,
} from "@/lib/inventory/utils";

import type {
  InventoryItem,
  InventoryStatusFilter,
} from "@/types/inventory";

const STORAGE_KEY =
  "inventory-dashboard-preferences";

type InventoryDashboardProps = {
  inventory: InventoryItem[];
};

export default function InventoryDashboard({
  inventory,
}: InventoryDashboardProps) {

  const [search, setSearch] =
    useState(() => {

      if (
        typeof window === "undefined"
      ) {

        return "";

      }

      try {

        const saved =
          localStorage.getItem(
            STORAGE_KEY
          );

        if (!saved) {

          return "";

        }

        return JSON.parse(saved)
          .search ?? "";

      } catch {

        return "";

      }

    });

  const [
    statusFilter,
    setStatusFilter,
  ] =
    useState<InventoryStatusFilter>(
      () => {

        if (
          typeof window ===
          "undefined"
        ) {

          return "all";

        }

        try {

          const saved =
            localStorage.getItem(
              STORAGE_KEY
            );

          if (!saved) {

            return "all";

          }

          return (
            JSON.parse(saved)
              .status ??
            "all"
          );

        } catch {

          return "all";

        }

      }
    );

  useEffect(() => {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify({

        search,

        status:
          statusFilter,

      })

    );

  }, [

    search,

    statusFilter,

  ]);

  /* -------------------------------- */

  const handleSearchChange =
    useCallback(

      (
        value: string
      ) => {

        setSearch(
          value
        );

      },

      []

    );

  const handleStatusChange =
    useCallback(

      (
        status:
          InventoryStatusFilter
      ) => {

        setStatusFilter(
          status
        );

      },

      []

    );

  /* -------------------------------- */

  const filteredInventory =
    useMemo(() => {

      const term =
        search
          .trim()
          .toLowerCase();

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

          const matchesSearch =

            !term ||

            product.includes(term) ||

            sku.includes(term);

          const matchesStatus =

            statusFilter ===
              "all" ||

            getInventoryStatusKey(

              item.quantity,

              item.reserved_quantity,

              item.low_stock_threshold,

              item.allow_backorder

            ) ===
              statusFilter;

          return (

            matchesSearch &&

            matchesStatus

          );

        }

      );

    }, [

      inventory,

      search,

      statusFilter,

    ]);

  /*
    Dashboard summary should always
    represent the COMPLETE inventory.
  */

  const summary =
    useMemo(
      () =>
        buildInventorySummary(
          inventory
        ),
      [inventory]
    );

  /*
    Everything below follows
    the current filter.
  */

  const alerts =
    useMemo(
      () =>
        buildLowStockAlerts(
          filteredInventory
        ),
      [filteredInventory]
    );

  const suggestions =
    useMemo(
      () =>
        buildReorderSuggestions(
          filteredInventory
        ),
      [filteredInventory]
    );

  const analytics =
    useMemo(
      () =>
        buildInventoryAnalytics(
          filteredInventory
        ),
      [filteredInventory]
    );
      return (

    <div className="space-y-8">

      {/* Summary */}

      <InventorySummaryCards
        summary={summary}
        selectedStatus={
          statusFilter
        }
        onStatusSelect={
          handleStatusChange
        }
      />

      {/* Low Stock Alerts */}

      <LowStockAlerts
        alerts={alerts}
      />

      {/* Reorder Suggestions */}

      <ReorderSuggestions
        suggestions={
          suggestions
        }
      />

      {/* Analytics */}

      <InventoryAnalytics
        analytics={
          analytics
        }
      />

      {/* Sticky Toolbar */}

      <div
        className="
          sticky
          top-4
          z-30
          rounded-xl
          bg-gray-50/95
          backdrop-blur
          py-4
        "
      >

        <InventorySearch
          value={search}
          onChange={
            handleSearchChange
          }
        />

        {/*
          Future filters:

          • Status
          • Warehouse
          • Supplier
          • Category
          • Stock Level
          • Export
        */}

      </div>

      {/* Inventory Table */}

      <InventoryTable
        inventory={
          filteredInventory
        }
      />

    </div>

  );

}