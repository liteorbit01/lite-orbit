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
    <div className="rounded-2xl bg-white shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr className="text-left text-sm text-gray-600">
            <th className="p-4">Name</th>
            <th className="p-4">Category</th>
            <th className="p-4">Collection</th>
            <th className="p-4">Status</th>
            <th className="p-4">Featured</th>
            <th className="p-4">Created</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4 font-medium">
                {product.name}
              </td>

              <td className="p-4">
                {product.category}
              </td>

              <td className="p-4">
                {product.collection}
              </td>

              <td className="p-4 capitalize">
                {product.status}
              </td>

              <td className="p-4">
                {product.featured ? "Yes" : "No"}
              </td>

              <td className="p-4">
                {new Date(product.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}