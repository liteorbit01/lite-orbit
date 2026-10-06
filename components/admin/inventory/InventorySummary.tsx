type InventorySummaryProps = {
  totalProducts: number;
  totalUnits: number;
  lowStock: number;
  outOfStock: number;
};

function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-semibold">
        {value}
      </h2>

    </div>
  );
}

export default function InventorySummary({
  totalProducts,
  totalUnits,
  lowStock,
  outOfStock,
}: InventorySummaryProps) {

  return (

    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

      <Card
        title="Products"
        value={totalProducts}
      />

      <Card
        title="Units in Stock"
        value={totalUnits}
      />

      <Card
        title="Low Stock"
        value={lowStock}
      />

      <Card
        title="Out of Stock"
        value={outOfStock}
      />

    </div>

  );

}