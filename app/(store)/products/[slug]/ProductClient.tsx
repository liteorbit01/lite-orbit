"use client";

import Image from "next/image";
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
    <main className="min-h-screen bg-[#F5F1EB] px-6 py-24 text-[#2F2F2F]">

      <div className="mx-auto grid max-w-6xl items-start gap-16 md:grid-cols-2">

        {/* Product Image */}

        <div className="overflow-hidden rounded-2xl">

          <Image
            src={product.image}
            alt={product.name}
            width={800}
            height={1000}
            className="h-auto w-full rounded-2xl"
            priority
          />

        </div>

        {/* Product Details */}

        <div>

          <h1 className="mb-4 text-3xl font-light tracking-wide md:text-4xl">
            {product.name}
          </h1>

          <p className="mb-2 text-[#6B6B6B]">
            Premium Collection
          </p>

          <p className="mb-6 text-xl font-medium">
            {selectedVariant
              ? `$${selectedVariant.price} CAD`
              : "Coming Soon"}
          </p>

          {/* Size Selector */}

          {product.variants.length > 0 && (

            <div className="mb-8">

              <p className="mb-2 text-sm tracking-wide">
                Size
              </p>

              <div className="flex flex-wrap gap-4">

                {product.variants.map(
                  (variant) => (

                    <button
                      key={variant.id}
                      onClick={() =>
                        setSelectedVariant(
                          variant
                        )
                      }
                      className={`border px-6 py-2 transition ${
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

          <p className="mb-8 leading-relaxed text-[#6B6B6B]">
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