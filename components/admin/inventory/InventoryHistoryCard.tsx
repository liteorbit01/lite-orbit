import { InventoryHistoryItem } from "@/lib/inventory/getInventoryHistory";

type InventoryHistoryCardProps = {
  history: InventoryHistoryItem[];
};

export default function InventoryHistoryCard({
  history,
}: InventoryHistoryCardProps) {

  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white py-12 text-center text-gray-500">
        No inventory history found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="min-w-full border-collapse">

          <thead className="bg-gray-50">

            <tr>

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
                  className="border-t hover:bg-gray-50"
                >

                  <td className="whitespace-nowrap px-4 py-3">

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
                        .replaceAll("_", " ")
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
                        item.quantity_change >= 0
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    `}
                  >

                    {item.quantity_change >= 0
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

    </div>
  );

}