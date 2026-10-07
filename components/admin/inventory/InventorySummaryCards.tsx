import {
  InventorySummary,
} from "@/lib/inventory/summary";

type InventorySummaryCardsProps = {
  summary: InventorySummary;
};

type SummaryCardProps = {
  title: string;
  value: number;
  color: string;
};

function SummaryCard({
  title,
  value,
  color,
}: SummaryCardProps) {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div
        className={`
          inline-flex
          rounded-full
          px-3
          py-1
          text-xs
          font-semibold
          ${color}
        `}
      >
        {title}
      </div>

      <div className="mt-4 text-3xl font-bold">

        {value}

      </div>

    </div>

  );

}

export default function InventorySummaryCards({
  summary,
}: InventorySummaryCardsProps) {

  return (

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

      <SummaryCard
        title="Products"
        value={summary.totalProducts}
        color="bg-gray-100 text-gray-700"
      />

      <SummaryCard
        title="In Stock"
        value={summary.inStock}
        color="bg-green-100 text-green-700"
      />

      <SummaryCard
        title="Low Stock"
        value={summary.lowStock}
        color="bg-yellow-100 text-yellow-700"
      />

      <SummaryCard
        title="Out of Stock"
        value={summary.outOfStock}
        color="bg-red-100 text-red-700"
      />

      <SummaryCard
        title="Backordered"
        value={summary.backordered}
        color="bg-purple-100 text-purple-700"
      />

    </div>

  );

}