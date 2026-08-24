import Link from "next/link";

export default function ProductsPage() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-semibold">
            Products
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your Lite Orbit catalog.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800 transition"
        >
          + New Product
        </Link>

      </div>

      <div className="rounded-2xl bg-white shadow-sm p-8">

        <div className="text-center py-20">

          <div className="text-6xl">
            📦
          </div>

          <h2 className="mt-6 text-2xl font-semibold">
            No products yet
          </h2>

          <p className="mt-3 text-gray-500">
            Create your first Lite Orbit product.
          </p>

        </div>

      </div>

    </div>
  );
}