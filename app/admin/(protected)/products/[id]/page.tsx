import { notFound } from "next/navigation";

import ProductEditor from "@/components/admin/products/ProductEditor";

import {
  getCategories,
  getCollections,
  getInventoryHistory,
  getProductById,
  getProductImages,
  getProductVariants,
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

  const product =
    await getProductById(id);

  if (!product) {
    notFound();
  }

  const categories =
    await getCategories();

  const collections =
    await getCollections();

  const images =
    await getProductImages(id);

  const variants =
    await getProductVariants(id);

  const inventoryHistory =
    await getInventoryHistory(id);

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

      <ProductEditor
        product={product}
        categories={categories}
        collections={collections}
        images={images}
        variants={variants}
        inventoryHistory={
          inventoryHistory
        }
        action={updateProduct}
      />
    </div>
  );
}