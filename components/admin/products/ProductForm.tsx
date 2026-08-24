"use client";

import { useState } from "react";
import type { ProductFormData } from "@/app/admin/products/types";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function ProductForm() {
  const [product, setProduct] =
    useState<ProductFormData>({
      name: "",
      slug: "",
      description: "",
      category: "",
      images: [],
      sizes: [],
      status: "draft",
    });

  function update<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) {
    setProduct((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  return (
    <form className="space-y-8">

      <div>
        <label className="block mb-2 font-medium">
          Product Name
        </label>

        <input
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
        <label className="block mb-2 font-medium">
          Slug
        </label>

        <input
          className="w-full rounded-lg border p-3"
          value={product.slug}
          onChange={(e) =>
            update("slug", e.target.value)
          }
        />
      </div>

      {/* Everything else stays exactly the same */}

    </form>
  );
}