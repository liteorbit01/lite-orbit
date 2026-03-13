
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F1EB] text-[#2F2F2F]">

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 items-center px-16 py-40 max-w-7xl mx-auto gap-20">

        <div>
          <h1 className="text-6xl md:text-7xl font-light tracking-[0.08em] leading-tight">
            Refined Essentials<br />for Modern Living
          </h1>

          <p className="text-xl text-[#6B6B6B] font-light mt-8 max-w-md">
            Thoughtfully crafted apparel and home textiles
            designed with quiet confidence.
          </p>

          <button className="mt-10 px-8 py-2 border border-[#2F2F2F] tracking-wide text-sm hover:bg-[#2F2F2F] hover:text-white transition-all duration-300">
            Explore Collection
          </button>
        </div>

        <div className="mt-16 md:mt-0">
          <img
            src="/hero.jpg"
            alt="Lite Orbit Lifestyle"
            className="rounded-2xl shadow-lg"
          />
        </div>

      </section>

      {/* COLLECTION SECTION */}
      <section className="py-40 px-10 bg-[#EFEAE3]">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-light tracking-[0.15em] mb-4">
              The Collection
            </h2>
            <div className="w-16 h-[1px] bg-[#2F2F2F] mx-auto mt-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">

            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/apparel.jpg"
                  alt="Lite Orbit Apparel"
                  className="rounded-2xl group-hover:scale-105 transition duration-700"
                />
              </div>

              <h3 className="mt-8 text-2xl font-light tracking-wide">
                Apparel
              </h3>

              <p className="text-[#6B6B6B] mt-3 text-lg">
                Timeless essentials designed for modern living.
              </p>
            </div>

            <div className="group cursor-pointer">
              <div className="overflow-hidden rounded-2xl">
                <img
                  src="/home.jpg"
                  alt="Lite Orbit Home"
                  className="rounded-2xl group-hover:scale-105 transition duration-700"
                />
              </div>

              <h3 className="mt-8 text-2xl font-light tracking-wide">
                Home
              </h3>

              <p className="text-[#6B6B6B] mt-3 text-lg">
                Elevated textiles crafted for comfort and calm.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* EMAIL SECTION */}
<section className="py-40 bg-[#F5F1EB] text-center px-6">
  <div className="max-w-2xl mx-auto">

    <h2 className="text-5xl font-light tracking-[0.08em] mb-6">
      Launching Soon
    </h2>

    <p className="text-lg text-[#6B6B6B] mb-12 leading-relaxed">
      Join the Lite Orbit community and be the first to experience
      our refined essentials.
    </p>

    <div className="flex justify-center gap-4 flex-col md:flex-row">
      <input
        type="email"
        placeholder="Enter your email"
        className="px-6 py-3 border border-[#2F2F2F] bg-transparent text-sm tracking-wide focus:outline-none"
      />
      <button className="px-8 py-3 border border-[#2F2F2F] text-sm tracking-wide hover:bg-[#2F2F2F] hover:text-white transition-all duration-300">
        Subscribe
      </button>
    </div>

  </div>
</section>

    </main>
  );
}