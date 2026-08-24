"use client";

import type { ProductFormData } from "@/app/admin/products/types";

type Props = {
  product: ProductFormData;
  update: <K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K]
  ) => void;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function ProductBasicInfo({
  product,
  update,
}: Props) {
  return (
    <div className="space-y-6">

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

      <div>
        <label className="block mb-2 font-medium">
          Description
        </label>

        <textarea
          rows={6}
          className="w-full rounded-lg border p-3"
          value={product.description}
          onChange={(e) =>
            update("description", e.target.value)
          }
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">
          Category
        </label>

        <select
          className="w-full rounded-lg border p-3"
          value={product.category}
          onChange={(e) =>
            update("category", e.target.value)
          }
        >
          <option value="">Select a category</option>
          <option value="bedding">Bedding</option>
          <option value="loungewear">Loungewear</option>
          <option value="bath">Bath</option>
          <option value="home-decor">Home Décor</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

    </div>
  );
}