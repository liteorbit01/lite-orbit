"use client";

import { useState } from "react";

import AdminTabs from "@/components/ui/AdminTabs";
import ProductForm from "./ProductForm";
import ProductImages from "./ProductImages";

import type {
  ProductFormData,
  CategoryOption,
  CollectionOption,
  ProductImage,
} from "@/app/admin/products/types";

type ProductEditorProps = {
  product: ProductFormData;
  categories: CategoryOption[];
  collections: CollectionOption[];
  images: ProductImage[];
  action: (formData: FormData) => void | Promise<void>;
};

export default function ProductEditor({
  product,
  categories,
  collections,
  images,
  action,
}: ProductEditorProps) {
  const [activeTab, setActiveTab] =
    useState("general");

  return (
    <div className="space-y-6">
      <AdminTabs
        tabs={[
          {
            id: "general",
            label: "General",
          },
          {
            id: "images",
            label: "Images",
          },
          {
            id: "variants",
            label: "Variants",
          },
          {
            id: "inventory",
            label: "Inventory",
          },
          {
            id: "seo",
            label: "SEO",
          },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === "general" && (
        <ProductForm
          initialData={product}
          categories={categories}
          collections={collections}
          action={action}
        />
      )}

      {activeTab === "images" && (
        <ProductImages
          productId={product.id!}
          images={images}
        />
      )}

      {activeTab === "variants" && (
        <ComingSoon
          title="Variants"
          description="Product variants will be implemented in Sprint 9."
        />
      )}

      {activeTab === "inventory" && (
        <ComingSoon
          title="Inventory"
          description="Inventory management will be implemented in Sprint 10."
        />
      )}

      {activeTab === "seo" && (
        <ComingSoon
          title="SEO"
          description="SEO settings will be implemented in a future sprint."
        />
      )}
    </div>
  );
}

type ComingSoonProps = {
  title: string;
  description: string;
};

function ComingSoon({
  title,
  description,
}: ComingSoonProps) {
  return (
    <div className="rounded-2xl bg-white p-12 shadow-sm">
      <div className="text-center">
        <div className="text-5xl">
          🚧
        </div>

        <h2 className="mt-6 text-2xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}