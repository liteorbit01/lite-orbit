export default function About() {
  return (
    <main className="bg-[#F5F1EB] text-[#2F2F2F]">

      {/* Intro Section */}
      <section className="px-6 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-4xl md:text-5xl font-light tracking-[0.08em] mb-10">
            About Lite Orbit
          </h1>

          <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed mb-10">
            Lite Orbit was founded on the belief that refinement does not need
            to be loud. True quality is felt, in texture, in construction,
            in intention.
          </p>

          <p className="text-lg md:text-xl text-[#6B6B6B] leading-relaxed">
            We create elevated essentials for modern living, thoughtfully
            designed apparel and home textiles crafted with quiet confidence.
          </p>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-16 text-center">

          <div>
            <h3 className="text-xl tracking-wide mb-4">
              Intentional Design
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed">
              Every detail matters. From fabric selection to finishing touches,
              our pieces are created with purpose.
            </p>
          </div>

          <div>
            <h3 className="text-xl tracking-wide mb-4">
              Elevated Simplicity
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed">
              We embrace timeless silhouettes and refined palettes that endure
              beyond seasons.
            </p>
          </div>

          <div>
            <h3 className="text-xl tracking-wide mb-4">
              Modern Craft
            </h3>
            <p className="text-[#6B6B6B] leading-relaxed">
              Partnering with skilled manufacturers, we focus on materials and
              processes that meet a high standard of quality.
            </p>
          </div>

        </div>
      </section>

      {/* Closing Statement */}
      <section className="px-6 pt-16 pb-32">
        <div className="max-w-3xl mx-auto text-center">

          <p className="text-xl font-light leading-relaxed">
            Lite Orbit is not about excess.
          </p>

          <p className="text-xl font-light leading-relaxed mt-4">
            It is about refinement, thoughtfully expressed.
          </p>

        </div>
      </section>

    </main>
  );
}