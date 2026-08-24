import ProductForm from "@/components/admin/products/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-semibold">
          Create Product
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new product to the Lite Orbit catalog.
        </p>

      </div>

      <div className="rounded-2xl bg-white p-10 shadow-sm">

        <ProductForm />

      </div>

    </div>
  );
}