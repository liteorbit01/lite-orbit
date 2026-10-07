import { InventorySummary } from "@/lib/inventory/getInventorySummary";

type InventoryHistorySummaryProps = {
  summary: InventorySummary;
};

function formatDate(
  value: string | null
) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );
}

export default function InventoryHistorySummary({
  summary,
}: InventoryHistorySummaryProps) {
  return (
    <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

      {/* Transactions */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <p className="text-sm text-gray-500">
          Transactions
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {summary.totalTransactions}
        </h3>

      </div>

      {/* Current Stock */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <p className="text-sm text-gray-500">
          Current Stock
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-600">
          {summary.currentStock}
        </h3>

      </div>

      {/* Last Shipment */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <p className="text-sm text-gray-500">
          Last Shipment
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {formatDate(
            summary.lastShipment
          )}
        </h3>

      </div>

      {/* Last Inventory Count */}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

        <p className="text-sm text-gray-500">
          Last Count
        </p>

        <h3 className="mt-2 text-lg font-semibold">
          {formatDate(
            summary.lastInventoryCount
          )}
        </h3>

      </div>

    </div>
  );
}