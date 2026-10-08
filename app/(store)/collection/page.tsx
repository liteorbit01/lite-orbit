import Image from "next/image";

export default function Collection() {
  return (
    <main className="bg-[#F5F1EB] text-[#2F2F2F]">

      {/* Page Intro */}
      <section className="px-6 pt-20 pb-24">
        <div className="mx-auto max-w-5xl text-center">

          <h1 className="mb-10 text-4xl font-light tracking-[0.08em] md:text-5xl">
            The Collection
          </h1>

          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-[#6B6B6B] md:text-xl">
            Lite Orbit is built around carefully curated essentials,
            elevated pieces designed to integrate seamlessly into modern living.
          </p>

        </div>
      </section>

      {/* Apparel Section */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">

          <div className="overflow-hidden rounded-2xl">

            <Image
              src="/apparel.jpg"
              alt="Lite Orbit Apparel"
              width={800}
              height={1000}
              className="h-auto w-full rounded-2xl shadow-md"
              priority
            />

          </div>

          <div>

            <h2 className="mb-6 text-3xl font-light tracking-wide">
              Apparel
            </h2>

            <p className="mb-6 leading-relaxed text-[#6B6B6B]">
              Our apparel category focuses on timeless silhouettes and refined
              fabrics, essentials designed for comfort, confidence, and longevity.
            </p>

            <p className="leading-relaxed text-[#6B6B6B]">
              Each piece is developed with attention to texture, fit, and subtle
              detailing that elevates everyday wear.
            </p>

          </div>

        </div>
      </section>

      {/* Home Section */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-2">

          <div className="order-2 md:order-1">

            <h2 className="mb-6 text-3xl font-light tracking-wide">
              Home
            </h2>

            <p className="mb-6 leading-relaxed text-[#6B6B6B]">
              Our home collection centers around elevated textiles —
              pieces designed to bring calm and refinement into personal spaces.
            </p>

            <p className="leading-relaxed text-[#6B6B6B]">
              From premium bedding to curated fabric selections, each item
              reflects our commitment to quiet luxury.
            </p>

          </div>

          <div className="order-1 overflow-hidden rounded-2xl md:order-2">

            <Image
              src="/home.jpg"
              alt="Lite Orbit Home"
              width={800}
              height={1000}
              className="h-auto w-full rounded-2xl shadow-md"
            />

          </div>

        </div>
      </section>

      {/* Launch Note */}
      <section className="px-6 pb-32 pt-16 text-center">

        <p className="text-sm tracking-wide text-[#6B6B6B]">
          Product releases beginning 2026.
        </p>

      </section>

    </main>
  );
}