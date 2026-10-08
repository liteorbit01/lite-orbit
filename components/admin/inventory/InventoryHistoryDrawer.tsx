"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import InventoryHistoryCard from "./InventoryHistoryCard";
import InventoryHistorySummary from "./InventoryHistorySummary";
import ExportHistoryButton from "./ExportHistoryButton";

import {
  InventoryHistoryItem,
} from "@/lib/inventory/getInventoryHistory";

import {
  InventorySummary,
} from "@/lib/inventory/getInventorySummary";

type InventoryHistoryDrawerProps = {
  open: boolean;
  onClose: () => void;
  history: InventoryHistoryItem[];
  summary: InventorySummary;
};

export default function InventoryHistoryDrawer({
  open,
  onClose,
  history,
  summary,
}: InventoryHistoryDrawerProps) {

  const [search, setSearch] =
    useState("");

  const [
    actionFilter,
    setActionFilter,
  ] = useState("all");

  const [
    dateFilter,
    setDateFilter,
  ] = useState("all");

  const [
    currentPage,
    setCurrentPage,
  ] = useState(1);

  const [
    rowsPerPage,
    setRowsPerPage,
  ] = useState(20);

  /* =======================================================
     Event Handlers
  ======================================================= */

  const handleSearchChange =
    useCallback(

      (
        value: string
      ) => {

        setSearch(value);

        setCurrentPage(1);

      },

      []

    );

  const handleActionFilterChange =
    useCallback(

      (
        value: string
      ) => {

        setActionFilter(value);

        setCurrentPage(1);

      },

      []

    );

  const handleDateFilterChange =
    useCallback(

      (
        value: string
      ) => {

        setDateFilter(value);

        setCurrentPage(1);

      },

      []

    );

  const handleRowsPerPageChange =
    useCallback(

      (
        value: number
      ) => {

        setRowsPerPage(value);

        setCurrentPage(1);

      },

      []

    );

  /* =======================================================
     Escape Key
  ======================================================= */

  useEffect(() => {

    function handleEscape(
      event: KeyboardEvent
    ) {

      if (
        event.key === "Escape"
      ) {

        onClose();

      }

    }

    if (open) {

      document.addEventListener(
        "keydown",
        handleEscape
      );

    }

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, [

    open,

    onClose,

  ]);

  /* =======================================================
     Filtering
  ======================================================= */

  const filteredHistory =
    useMemo(() => {

      const term =
        search
          .trim()
          .toLowerCase();

      const now =
        new Date();

      return history.filter(
        (item) => {

          const matchesSearch =

            !term ||

            item.action
              .toLowerCase()
              .includes(term) ||

            item.notes
              ?.toLowerCase()
              .includes(term);

          const matchesAction =

            actionFilter ===
              "all" ||

            item.action ===
              actionFilter;

          let matchesDate =
            true;

          if (
            dateFilter !== "all"
          ) {

            const created =
              new Date(
                item.created_at
              );

            const diffDays =
              (
                now.getTime() -
                created.getTime()
              ) /
              (
                1000 *
                60 *
                60 *
                24
              );

            switch (
              dateFilter
            ) {

              case "today":

                matchesDate =
                  created.toDateString() ===
                  now.toDateString();

                break;

              case "7":

                matchesDate =
                  diffDays <= 7;

                break;

              case "30":

                matchesDate =
                  diffDays <= 30;

                break;

              case "month":

                matchesDate =

                  created.getMonth() ===
                    now.getMonth() &&

                  created.getFullYear() ===
                    now.getFullYear();

                break;

            }

          }

          return (

            matchesSearch &&

            matchesAction &&

            matchesDate

          );

        }

      );

    }, [

      history,

      search,

      actionFilter,

      dateFilter,

    ]);
      /* =======================================================
     Pagination
  ======================================================= */

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filteredHistory.length /
          rowsPerPage
      )
    );

  const currentSafePage =
    Math.min(
      currentPage,
      totalPages
    );

  const startIndex =
    (currentSafePage - 1) *
    rowsPerPage;

  const endIndex =
    startIndex +
    rowsPerPage;

  const paginatedHistory =
    filteredHistory.slice(
      startIndex,
      endIndex
    );

  if (!open) {

    return null;

  }

  return (

    <>

      {/* Overlay */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40 bg-black/40"
      />

      {/* Drawer */}

      <aside
        className="
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-full
          max-w-4xl
          flex-col
          bg-gray-50
          shadow-2xl
        "
      >

        {/* Header */}

        <div className="border-b bg-white px-6 py-5">

          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-semibold">

                Inventory History

              </h2>

              <p className="mt-1 text-sm text-gray-500">

                Complete audit trail
                for this inventory item.

              </p>

            </div>

            <button
              onClick={onClose}
              className="
                rounded-lg
                border
                border-gray-300
                px-4
                py-2
                transition
                hover:bg-gray-100
              "
            >

              ✕

            </button>

          </div>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">

          <InventoryHistorySummary
            summary={summary}
          />

          {/* Toolbar */}

          <div className="mb-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="grid gap-4 lg:grid-cols-3">

              {/* Search */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Search

                </label>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    handleSearchChange(
                      e.target.value
                    )
                  }
                  placeholder="Search history..."
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    px-4
                    py-3
                    focus:border-black
                    focus:outline-none
                  "
                />

              </div>

              {/* Action */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Action

                </label>

                <select
                  value={actionFilter}
                  onChange={(e) =>
                    handleActionFilterChange(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    focus:border-black
                    focus:outline-none
                  "
                >

                  <option value="all">

                    All Actions

                  </option>

                  <option value="shipment">

                    Shipment

                  </option>

                  <option value="adjustment">

                    Adjustment

                  </option>

                  <option value="damage">

                    Damage / Loss

                  </option>

                  <option value="inventory_count">

                    Inventory Count

                  </option>

                  <option value="sale">

                    Sale

                  </option>

                  <option value="return">

                    Return

                  </option>

                </select>

              </div>

              {/* Date */}

              <div>

                <label className="mb-2 block text-sm font-medium">

                  Date Range

                </label>

                <select
                  value={dateFilter}
                  onChange={(e) =>
                    handleDateFilterChange(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    focus:border-black
                    focus:outline-none
                  "
                >

                  <option value="all">

                    All Time

                  </option>

                  <option value="today">

                    Today

                  </option>

                  <option value="7">

                    Last 7 Days

                  </option>

                  <option value="30">

                    Last 30 Days

                  </option>

                  <option value="month">

                    This Month

                  </option>

                </select>

              </div>

            </div>

            <div className="mt-4 text-sm text-gray-500">

              Showing{" "}

              <strong>

                {filteredHistory.length}

              </strong>

              {" "}of{" "}

              <strong>

                {history.length}

              </strong>

              {" "}transactions

            </div>

          </div>
                    {/* History Table */}

          <InventoryHistoryCard
            history={
              paginatedHistory
            }
          />

          {/* Pagination */}

          <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

            <div className="text-sm text-gray-500">

              Showing{" "}

              <strong>

                {filteredHistory.length === 0
                  ? 0
                  : startIndex + 1}

              </strong>

              –

              <strong>

                {Math.min(
                  endIndex,
                  filteredHistory.length
                )}

              </strong>

              {" "}of{" "}

              <strong>

                {filteredHistory.length}

              </strong>

              {" "}transactions

            </div>

            <div className="flex flex-wrap items-center gap-4">

              <div className="flex items-center gap-2">

                <span className="text-sm">

                  Rows

                </span>

                <select
                  value={rowsPerPage}
                  onChange={(e) =>
                    handleRowsPerPageChange(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="rounded-lg border border-gray-300 px-2 py-1"
                >

                  <option value={10}>

                    10

                  </option>

                  <option value={20}>

                    20

                  </option>

                  <option value={50}>

                    50

                  </option>

                  <option value={100}>

                    100

                  </option>

                </select>

              </div>

              <button
                disabled={
                  currentSafePage === 1
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.max(
                        1,
                        page - 1
                      )
                  )
                }
                className="
                  rounded-lg
                  border
                  border-gray-300
                  px-3
                  py-2
                  disabled:opacity-40
                "
              >

                Previous

              </button>

              <span className="text-sm font-medium">

                Page{" "}

                {currentSafePage}

                {" "}of{" "}

                {totalPages}

              </span>

              <button
                disabled={
                  currentSafePage >=
                  totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) =>
                      Math.min(
                        totalPages,
                        page + 1
                      )
                  )
                }
                className="
                  rounded-lg
                  border
                  border-gray-300
                  px-3
                  py-2
                  disabled:opacity-40
                "
              >

                Next

              </button>

            </div>

          </div>

          {/* Export */}

          <div className="mt-6 flex justify-end">

            <ExportHistoryButton
              currentPageHistory={
                paginatedHistory
              }
              filteredHistory={
                filteredHistory
              }
              allHistory={
                history
              }
            />

          </div>

        </div>

      </aside>

    </>

  );

}
