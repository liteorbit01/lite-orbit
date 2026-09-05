import { notFound } from "next/navigation";

import ProductForm from "@/components/admin/products/ProductForm";
import ProductImages from "@/components/admin/products/ProductImages";

import {
  getCategories,
  getCollections,
  getProductById,
  updateProduct,
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

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const categories = await getCategories();
  const collections = await getCollections();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold">
          Edit Product
        </h1>

        <p className="mt-2 text-gray-500">
          Editing {product.name}
        </p>
      </div>

      <ProductForm
        initialData={product}
        categories={categories}
        collections={collections}
        action={updateProduct}
      />

      <ProductImages
        productId={product.id!}
      />
    </div>
  );
}