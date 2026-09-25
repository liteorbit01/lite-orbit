"use client";

import { useState } from "react";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { addItemToCart } from "@/app/cart/actions";

import type {
  StoreProduct,
} from "@/lib/store/products";

type ProductClientProps = {
  product: StoreProduct;
};

export default function ProductClient({
  product,
}: ProductClientProps) {
  const [selectedVariant, setSelectedVariant] =
    useState(
      product.variants[0] ?? null
    );

  return (
    <main className="min-h-screen bg-[#F5F1EB] text-[#2F2F2F] py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* Product Image */}

        <div className="overflow-hidden rounded-2xl">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-2xl"
          />
        </div>

        {/* Product Details */}

        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
            {product.name}
          </h1>

          <p className="text-[#6B6B6B] mb-2">
            Premium Collection
          </p>

          <p className="text-xl font-medium mb-6">
            {selectedVariant
              ? `$${selectedVariant.price} CAD`
              : "Coming Soon"}
          </p>

          {/* Size Selector */}

          {product.variants.length >
            0 && (
            <div className="mb-8">
              <p className="mb-2 text-sm tracking-wide">
                Size
              </p>

              <div className="flex flex-wrap gap-4">
                {product.variants.map(
                  (variant) => (
                    <button
                      key={
                        variant.id
                      }
                      onClick={() =>
                        setSelectedVariant(
                          variant
                        )
                      }
                      className={`px-6 py-2 border transition ${
                        selectedVariant?.id ===
                        variant.id
                          ? "bg-[#2F2F2F] text-white"
                          : "border-[#2F2F2F]"
                      }`}
                    >
                      {variant.size}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          <p className="text-[#6B6B6B] leading-relaxed mb-8">
            {product.description}
          </p>

          {selectedVariant && (
             <AddToCartButton
                variantId={selectedVariant.id}
                onAddToCart={addItemToCart}
              />
           )}
        </div>
      </div>
    </main>
  );
}