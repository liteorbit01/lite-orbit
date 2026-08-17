export default function Collection() {
  return (
    <main className="bg-[#F5F1EB] text-[#2F2F2F]">

      {/* Page Intro */}
      <section className="px-6 pt-20 pb-24">
        <div className="max-w-5xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-light tracking-[0.08em] mb-10">
            The Collection
          </h1>

          <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed max-w-3xl mx-auto">
            Lite Orbit is built around carefully curated essentials,
            elevated pieces designed to integrate seamlessly into modern living.
          </p>

        </div>
      </section>

      {/* Apparel Section */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div className="overflow-hidden rounded-2xl">
            <img
              src="/apparel.jpg"
              alt="Lite Orbit Apparel"
              className="rounded-2xl shadow-md"
            />
          </div>

          <div>
            <h2 className="text-3xl font-light tracking-wide mb-6">
              Apparel
            </h2>

            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              Our apparel category focuses on timeless silhouettes and refined
              fabrics, essentials designed for comfort, confidence, and longevity.
            </p>

            <p className="text-[#6B6B6B] leading-relaxed">
              Each piece is developed with attention to texture, fit, and subtle
              detailing that elevates everyday wear.
            </p>
          </div>

        </div>
      </section>

      {/* Home Section */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-light tracking-wide mb-6">
              Home
            </h2>

            <p className="text-[#6B6B6B] leading-relaxed mb-6">
              Our home collection centers around elevated textiles —
              pieces designed to bring calm and refinement into personal spaces.
            </p>

            <p className="text-[#6B6B6B] leading-relaxed">
              From premium bedding to curated fabric selections, each item
              reflects our commitment to quiet luxury.
            </p>
          </div>

          <div className="order-1 md:order-2 overflow-hidden rounded-2xl">
            <img
              src="/home.jpg"
              alt="Lite Orbit Home"
              className="rounded-2xl shadow-md"
            />
          </div>

        </div>
      </section>

      {/* Launch Note */}
      <section className="px-6 pt-16 pb-32 text-center">
        <p className="text-sm tracking-wide text-[#6B6B6B]">
          Product releases beginning 2026.
        </p>
      </section>

    </main>
  );
}