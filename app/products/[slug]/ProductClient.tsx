"use client"

import { useState } from "react"
import { useCart } from "@/app/context/CartContext"

type ProductSize = {
  size: string
  price: number
}

type Product = {
  id: string
  name: string
  edition: string
  description: string
  images: string[]
  sizes: ProductSize[]
}

type ProductClientProps = {
  product: Product
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<ProductSize>(product.sizes[0])

  return (
    <main className="min-h-screen bg-[#F5F1EB] text-[#2F2F2F] py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* Image */}
        <div className="overflow-hidden rounded-2xl">
          <img
            src={product.images[0]}
            alt={product.name}
            className="rounded-2xl"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
            {product.name}
          </h1>

          <p className="text-[#6B6B6B] mb-2">
            {product.edition}
          </p>

          <p className="text-xl font-medium mb-6">
            ${selectedSize.price} CAD
          </p>

          {/* Size Selector */}
          <div className="mb-8">
            <p className="mb-2 text-sm tracking-wide">Size</p>
            <div className="flex space-x-4">
              {product.sizes.map((size) => (
                <button
                  key={size.size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 border ${
                    selectedSize.size === size.size
                      ? "bg-[#2F2F2F] text-white"
                      : "border-[#2F2F2F]"
                  } transition`}
                >
                  {size.size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[#6B6B6B] leading-relaxed mb-8">
            {product.description}
          </p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: selectedSize.price,
                size: selectedSize.size,
                quantity: 1,
              })
            }
            className="px-10 py-4 border border-[#2F2F2F] hover:bg-[#2F2F2F] hover:text-white transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  )
}