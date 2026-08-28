"use client";

import { useState } from "react";

import type {
  ProductFormData,
  CategoryOption,
  CollectionOption,
} from "@/app/admin/products/types";

type ProductFormProps = {
  categories: CategoryOption[];
  collections: CollectionOption[];
  initialData?: ProductFormData;
  action: (formData: FormData) => void | Promise<void>;
};

const EMPTY_PRODUCT: ProductFormData = {
  name: "",
  productCode: "",
  slug: "",
  description: "",
  categoryId: "",
  collectionId: "",
  images: [],
  sizes: [],
  status: "draft",
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function ProductForm({
  categories,
  collections,
  initialData,
  action,
}: ProductFormProps) {
  const [product, setProduct] =
    useState<ProductFormData>(
      initialData ?? EMPTY_PRODUCT
    );

  const submitLabel = initialData
    ? "💾 Save Changes"
    : "💾 Save Product";

  function update<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) {
    setProduct((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  return (
    <form
      action={action}
      className="space-y-8"
    >
      {product.id && (
        <input
          type="hidden"
          name="id"
          value={product.id}
        />
      )}

      {/* Product Information */}

      <div>
        <label className="mb-2 block font-medium">
          Product Name
        </label>

        <input
          name="name"
          className="w-full rounded-lg border p-3"
          value={product.name}
          onChange={(e) => {
            const name = e.target.value;

            update("name", name);
            update("slug", slugify(name));
          }}
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Product Code
        </label>

        <input
          name="productCode"
          className="w-full rounded-lg border p-3"
          placeholder="LO-BED-001"
          value={product.productCode}
          onChange={(e) =>
            update(
              "productCode",
              e.target.value
            )
          }
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Slug
        </label>

        <input
          name="slug"
          className="w-full rounded-lg border p-3"
          value={product.slug}
          onChange={(e) =>
            update(
              "slug",
              e.target.value
            )
          }
        />
      </div>

      <hr className="my-10" />

      <h2 className="text-xl font-semibold">
        Catalog
      </h2>
            <div>
        <label className="mb-2 block font-medium">
          Category
        </label>

        <select
          name="categoryId"
          className="w-full rounded-lg border p-3"
          value={product.categoryId}
          onChange={(e) =>
            update(
              "categoryId",
              e.target.value
            )
          }
        >
          <option value="">
            Select Category
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Collection
        </label>

        <select
          name="collectionId"
          className="w-full rounded-lg border p-3"
          value={product.collectionId}
          onChange={(e) =>
            update(
              "collectionId",
              e.target.value
            )
          }
        >
          <option value="">
            Select Collection
          </option>

          {collections.map((collection) => (
            <option
              key={collection.id}
              value={collection.id}
            >
              {collection.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Status
        </label>

        <select
          name="status"
          className="w-full rounded-lg border p-3"
          value={product.status}
          onChange={(e) =>
            update(
              "status",
              e.target.value as
                | "draft"
                | "published"
            )
          }
        >
          <option value="draft">
            Draft
          </option>

          <option value="published">
            Published
          </option>
        </select>
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          name="description"
          rows={6}
          className="w-full rounded-lg border p-3"
          value={product.description}
          onChange={(e) =>
            update(
              "description",
              e.target.value
            )
          }
        />
      </div>
            <div className="flex justify-end pt-6">
        <button
          type="submit"
          className="rounded-lg bg-black px-8 py-3 text-white transition hover:bg-gray-800"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}