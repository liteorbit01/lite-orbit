import Link from "next/link";
import { getProducts } from "./actions";
import ProductTable from "@/components/admin/products/ProductTable";

export default async function ProductsPage() {
  const products = await getProducts();

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

        {products.length > 0 && (
  <Link
    href="/admin/products/new"
    className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800 transition"
  >
    + New Product
  </Link>
)}
      </div>

      <ProductTable products={products} />
    </div>
  );
}