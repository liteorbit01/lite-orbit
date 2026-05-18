import Link from "next/link"
import { products } from "@/lib/products"

export default function Shop() {
  const activeProducts = products.filter((p) => p.active)

  return (
    <main className="min-h-screen bg-[#F5F1EB] text-[#2F2F2F] py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-light tracking-[0.08em] text-center mb-16">
          Shop
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {activeProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl mb-6">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h2 className="text-lg tracking-wide mb-2">
                {product.name}
              </h2>

              <p className="text-[#6B6B6B] mb-1">
                {product.edition}
              </p>

              <p className="text-[#2F2F2F] font-medium">
                From ${Math.min(...product.sizes.map(s => s.price))} CAD
              </p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}