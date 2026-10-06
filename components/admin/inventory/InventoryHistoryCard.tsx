import { InventoryHistoryItem } from "@/lib/inventory/getInventoryHistory";

type InventoryHistoryCardProps = {
  history: InventoryHistoryItem[];
};

export default function InventoryHistoryCard({
  history,
}: InventoryHistoryCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-lg font-semibold">
            Inventory History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Complete audit trail for this inventory item.
          </p>

        </div>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium">
          {history.length} Transactions
        </span>

      </div>

      {history.length === 0 ? (

        <div className="rounded-lg border border-dashed border-gray-300 py-12 text-center text-gray-500">

          No inventory history found.

        </div>

      ) : (

        <div className="overflow-x-auto">

          <table className="min-w-full border-collapse">

            <thead>

              <tr className="border-b">

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Date
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Action
                </th>

                <th className="px-4 py-3 text-right text-sm font-semibold">
                  Change
                </th>

                <th className="px-4 py-3 text-right text-sm font-semibold">
                  Stock After
                </th>

                <th className="px-4 py-3 text-left text-sm font-semibold">
                  Notes
                </th>

              </tr>

            </thead>

            <tbody>

              {history.map((item) => {

                const isPositive =
                  item.quantity_change > 0;

                const badgeColor = (() => {

                  switch (item.action) {

                    case "shipment":
                      return "bg-green-100 text-green-700";

                    case "adjustment":
                      return "bg-blue-100 text-blue-700";

                    case "damage":
                      return "bg-red-100 text-red-700";

                    case "inventory_count":
                      return "bg-purple-100 text-purple-700";

                    case "sale":
                      return "bg-orange-100 text-orange-700";

                    case "return":
                      return "bg-emerald-100 text-emerald-700";

                    default:
                      return "bg-gray-100 text-gray-700";

                  }

                })();

                return (

                  <tr
                    key={item.id}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >

                    <td className="px-4 py-3 whitespace-nowrap">

                      {new Date(
                        item.created_at
                      ).toLocaleString()}

                    </td>

                    <td className="px-4 py-3">

                      <span
                        className={`
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-medium
                          ${badgeColor}
                        `}
                      >

                        {item.action
                          .replaceAll(
                            "_",
                            " "
                          )
                          .replace(
                            /\b\w/g,
                            (letter) =>
                              letter.toUpperCase()
                          )}

                      </span>

                    </td>

                    <td
                      className={`
                        px-4
                        py-3
                        text-right
                        font-semibold
                        ${
                          isPositive
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      `}
                    >

                      {isPositive
                        ? `+${item.quantity_change}`
                        : item.quantity_change}

                    </td>

                    <td className="px-4 py-3 text-right font-medium">

                      {item.stock_after}

                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600">

                      {item.notes || "-"}

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}