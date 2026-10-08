"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleSubmit = async () => {
    if (!email) {
      setError("Please enter an email.");
      setSuccess("");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.status === 409) {
        setError(data.message);
        setSuccess("");
        return;
      }

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        setSuccess("");
        return;
      }

      setSuccess(data.message);
      setError("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Server error.");
      setSuccess("");
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F1EB] text-[#2F2F2F]">

      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-20 px-16 py-40 md:grid-cols-2">

        <div>

          <h1 className="text-6xl font-light leading-tight tracking-[0.08em] md:text-7xl">
            Refined Essentials
            <br />
            for Modern Living
          </h1>

          <p className="mt-8 max-w-md text-xl font-light text-[#6B6B6B]">
            Thoughtfully crafted apparel and home textiles
            designed with quiet confidence.
          </p>

          <button className="mt-10 border border-[#2F2F2F] px-8 py-2 text-sm tracking-wide transition-all duration-300 hover:bg-[#2F2F2F] hover:text-white">
            Explore Collection
          </button>

        </div>

        <div className="mt-16 md:mt-0">

          <Image
            src="/hero.jpg"
            alt="Lite Orbit Lifestyle"
            width={900}
            height={1100}
            priority
            className="h-auto w-full rounded-2xl shadow-lg"
          />

        </div>

      </section>

      {/* COLLECTION SECTION */}
      <section className="bg-[#EFEAE3] px-10 py-40">

        <div className="mx-auto max-w-7xl">

          <div className="mb-24 text-center">

            <h2 className="mb-4 text-5xl font-light tracking-[0.15em] md:text-6xl">
              The Collection
            </h2>

            <div className="mx-auto mt-6 h-px w-16 bg-[#2F2F2F]" />

          </div>

          <div className="grid gap-16 md:grid-cols-2">

            <div className="group cursor-pointer">

              <div className="overflow-hidden rounded-2xl">

                <Image
                  src="/apparel.jpg"
                  alt="Lite Orbit Apparel"
                  width={700}
                  height={900}
                  className="h-auto w-full rounded-2xl transition duration-700 group-hover:scale-105"
                />

              </div>

              <h3 className="mt-8 text-2xl font-light tracking-wide">
                Apparel
              </h3>

              <p className="mt-3 text-lg text-[#6B6B6B]">
                Timeless essentials designed for modern living.
              </p>

            </div>

            <div className="group cursor-pointer">

              <div className="overflow-hidden rounded-2xl">

                <Image
                  src="/home.jpg"
                  alt="Lite Orbit Home"
                  width={700}
                  height={900}
                  className="h-auto w-full rounded-2xl transition duration-700 group-hover:scale-105"
                />

              </div>

              <h3 className="mt-8 text-2xl font-light tracking-wide">
                Home
              </h3>

              <p className="mt-3 text-lg text-[#6B6B6B]">
                Elevated textiles crafted for comfort and calm.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* EMAIL SECTION */}
      <section className="bg-[#F5F1EB] px-6 py-40 text-center">

        <div className="mx-auto max-w-2xl">

          <h2 className="mb-6 text-5xl font-light tracking-[0.08em]">
            Launching Soon
          </h2>

          <p className="mb-12 text-lg leading-relaxed text-[#6B6B6B]">
            Join the Lite Orbit community and be the first to experience
            our refined essentials.
          </p>

          <div className="flex flex-col justify-center gap-4 md:flex-row">

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border border-[#2F2F2F] bg-transparent px-6 py-3 text-sm tracking-wide focus:outline-none"
            />

            <button
              onClick={handleSubmit}
              className="border border-[#2F2F2F] px-8 py-3 text-sm tracking-wide transition-all duration-300 hover:bg-[#2F2F2F] hover:text-white"
            >
              Subscribe
            </button>

          </div>

          {error && (
            <p className="mt-4 text-red-500">
              {error}
            </p>
          )}

          {success && (
            <p className="mt-4 text-green-600">
              {success}
            </p>
          )}

        </div>

      </section>

    </main>
  );
}