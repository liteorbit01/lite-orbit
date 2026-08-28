import ProductForm from "@/components/admin/products/ProductForm";

import {
  getCategories,
  getCollections,
} from "../actions";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const categories = await getCategories();
  const collections = await getCollections();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">
          Edit Product
        </h1>

        <p className="mt-2 text-gray-500">
          Editing product {id}
        </p>
      </div>

      <div className="rounded-2xl bg-white p-10 shadow-sm">
        <ProductForm
          categories={categories}
          collections={collections}
        />
      </div>
    </div>
  );
}