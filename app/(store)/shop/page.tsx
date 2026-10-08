import Image from "next/image";
import Link from "next/link";

import { getStoreProducts } from "@/lib/store/products";

export default async function Shop() {
  const activeProducts = await getStoreProducts();

  return (
    <main className="min-h-screen bg-[#F5F1EB] px-6 py-24 text-[#2F2F2F]">

      <div className="mx-auto max-w-7xl">

        <h1 className="mb-16 text-center text-4xl font-light tracking-[0.08em] md:text-5xl">
          Shop
        </h1>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">

          {activeProducts.map((product) => (

            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group block"
            >

              <div className="mb-6 overflow-hidden rounded-2xl">

                <Image
                  src={product.image}
                  alt={product.name}
                  width={700}
                  height={900}
                  className="h-auto w-full rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />

              </div>

              <h2 className="mb-2 text-lg tracking-wide">
                {product.name}
              </h2>

              <p className="mb-1 text-[#6B6B6B]">
                Premium Collection
              </p>

              <p className="font-medium text-[#2F2F2F]">
                {product.minPrice !== null
                  ? `From $${product.minPrice} CAD`
                  : "Coming Soon"}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}