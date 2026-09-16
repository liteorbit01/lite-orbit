"use client";

import { useEffect, useState } from "react";

import AdminTabs from "@/components/ui/AdminTabs";

import ProductForm from "./ProductForm";
import ProductImages from "./ProductImages";
import ProductVariants from "./ProductVariants";
import ProductInventory from "./ProductInventory";

import type {
  ProductFormData,
  CategoryOption,
  CollectionOption,
  ProductImage,
  ProductVariant,
} from "@/app/admin/products/types";

type ProductEditorProps = {
  product: ProductFormData;
  categories: CategoryOption[];
  collections: CollectionOption[];
  images: ProductImage[];
  variants: ProductVariant[];
  inventoryHistory: any[];
  action: (formData: FormData) => void | Promise<void>;
};

export default function ProductEditor({
  product,
  categories,
  collections,
  images,
  variants,
  inventoryHistory,
  action,
}: ProductEditorProps) {
  const [activeTab, setActiveTab] =
    useState("general");

  useEffect(() => {
    const savedTab =
      sessionStorage.getItem(
        "product-editor-tab"
      );

    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  function handleTabChange(tab: string) {
    sessionStorage.setItem(
      "product-editor-tab",
      tab
    );

    setActiveTab(tab);
  }

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
        onChange={handleTabChange}
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
        <ProductVariants
          productId={product.id!}
          variants={variants}
        />
      )}

      {activeTab === "inventory" && (
        <ProductInventory
          variants={variants}
          inventoryHistory={
            inventoryHistory
          }
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