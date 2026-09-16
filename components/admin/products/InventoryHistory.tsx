type InventoryHistoryProps = {
  history: any[];
};

export default function InventoryHistory({
  history,
}: InventoryHistoryProps) {
  return (
    <section className="mt-8 rounded-2xl bg-white p-10 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">
          Recent Inventory Activity
        </h2>

        <p className="mt-2 text-gray-500">
          Latest stock movements for this product.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 p-10 text-center text-gray-500">
          No inventory history available.
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border p-5"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">
                    {item.product_variants?.sku}
                  </div>

                  <div className="text-sm text-gray-500">
                    {item.product_variants?.size ??
                      "-"}
                  </div>
                </div>

                <span
                  className={[
                    "rounded-full px-3 py-1 text-sm font-medium",
                    item.quantity_change > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700",
                  ].join(" ")}
                >
                  {item.quantity_change > 0
                    ? `+${item.quantity_change}`
                    : item.quantity_change}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">
                    Action:
                  </span>{" "}
                  {item.action === "increase"
                    ? "🟢 Stock Added"
                    : "🔴 Stock Removed"}
                </div>

                <div>
                  <span className="font-medium">
                    Stock After:
                  </span>{" "}
                  {item.stock_after}
                </div>

                <div className="col-span-2 text-gray-500">
                  {item.notes}
                </div>

                <div className="col-span-2 text-xs text-gray-400">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}