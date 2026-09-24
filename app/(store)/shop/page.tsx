import Link from "next/link"
import { getStoreProducts } from "@/lib/store/products";

export default async function Shop() {
  const activeProducts = await getStoreProducts();

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
                    src={product.image}
                      alt={product.name}
                      className="rounded-2xl transition-transform duration-500 group-hover:scale-105"
/>
              </div>

              <h2 className="text-lg tracking-wide mb-2">
                {product.name}
              </h2>

              <p className="text-[#6B6B6B] mb-1">
                  Premium Collection
              </p>

              <p className="text-[#2F2F2F] font-medium">
                {product.minPrice !== null
                  ? `From $${product.minPrice} CAD`
                  : "Coming Soon"}
              </p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}