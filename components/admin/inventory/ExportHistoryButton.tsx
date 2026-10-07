"use client";

import { useRef, useState, useEffect } from "react";

import {
  InventoryHistoryItem,
} from "@/lib/inventory/getInventoryHistory";

import {
  downloadCsv,
} from "@/lib/export/csv";

type ExportHistoryButtonProps = {
  currentPageHistory: InventoryHistoryItem[];
  filteredHistory: InventoryHistoryItem[];
  allHistory: InventoryHistoryItem[];
};

export default function ExportHistoryButton({
  currentPageHistory,
  filteredHistory,
  allHistory,
}: ExportHistoryButtonProps) {

  const [
    open,
    setOpen,
  ] = useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {

        setOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  function exportHistory(
    history: InventoryHistoryItem[],
    filename: string
  ) {

    downloadCsv({

      filename,

      headers: [

        "Date",

        "Action",

        "Quantity Change",

        "Stock After",

        "Notes",

      ],

      rows: history.map(
        (item) => [

          new Date(
            item.created_at
          ).toLocaleString(),

          item.action,

          item.quantity_change,

          item.stock_after,

          item.notes ?? "",

        ]
      ),

    });

    setOpen(false);

  }

  return (

    <div
      ref={menuRef}
      className="relative inline-block"
    >

      <button
        onClick={() =>
          setOpen(
            (value) => !value
          )
        }
        className="
          rounded-lg
          border
          border-gray-300
          bg-white
          px-4
          py-2
          text-sm
          font-medium
          transition
          hover:bg-gray-100
        "
      >

        Export ▼

      </button>

      {open && (

        <div
          className="
            absolute
            right-0
            z-50
            mt-2
            w-64
            rounded-xl
            border
            border-gray-200
            bg-white
            shadow-xl
          "
        >

          <button
            onClick={() =>
              exportHistory(
                currentPageHistory,
                "inventory-history-current-page.csv"
              )
            }
            className="
              block
              w-full
              px-4
              py-3
              text-left
              hover:bg-gray-100
            "
          >
            📄 Current Page
          </button>

          <button
            onClick={() =>
              exportHistory(
                filteredHistory,
                "inventory-history-filtered.csv"
              )
            }
            className="
              block
              w-full
              px-4
              py-3
              text-left
              hover:bg-gray-100
            "
          >
            📄 Filtered Results
          </button>

          <button
            onClick={() =>
              exportHistory(
                allHistory,
                "inventory-history-all.csv"
              )
            }
            className="
              block
              w-full
              px-4
              py-3
              text-left
              hover:bg-gray-100
            "
          >
            📄 Entire History
          </button>

        </div>

      )}

    </div>

  );

}