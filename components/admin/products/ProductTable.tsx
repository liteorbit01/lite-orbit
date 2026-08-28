import Link from "next/link";
import type { ProductListItem } from "@/app/admin/products/types";

type ProductTableProps = {
  products: ProductListItem[];
};

export default function ProductTable({
  products,
}: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-8">
        <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
          <div className="text-6xl">📦</div>

          <h2 className="mt-6 text-2xl font-semibold">
            No products yet
          </h2>

          <p className="mt-3 text-gray-500">
            Create your first Lite Orbit product.
          </p>

          <Link
            href="/admin/products/new"
            className="mt-8 inline-block rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800 transition"
          >
            + Create Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left text-sm font-semibold text-gray-600">
            <th className="p-4 w-20">Image</th>
            <th className="p-4">Product</th>
            <th className="p-4">Code</th>
            <th className="p-4">Category</th>
            <th className="p-4">Collection</th>
            <th className="p-4">Status</th>
            <th className="p-4 w-36 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-100 text-2xl">
                  📦
                </div>
              </td>

              <td className="p-4">
                <div className="font-semibold">
                  {product.name}
                </div>

                <div className="text-sm text-gray-500">
                  {product.slug}
                </div>
              </td>

              <td className="p-4 font-mono text-sm">
                {product.productCode}
              </td>

              <td className="p-4">
                {product.category}
              </td>

              <td className="p-4">
                {product.collection}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    product.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {product.status}
                </span>
              </td>

              <td className="p-4">
                <div className="flex justify-center gap-2">
                  <Link
                        href={`/admin/products/${product.id}`}
                            className="rounded-md border px-3 py-1 hover:bg-gray-100"
                            title="Edit Product"
                  >
                    ✏️
                  </Link>

                  <button
                    className="rounded-md border px-3 py-1 hover:bg-red-50"
                    title="Delete Product"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}