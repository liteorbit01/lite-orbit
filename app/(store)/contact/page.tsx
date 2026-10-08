"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setSuccess("");
    setError("");

    if (!form.name || !form.email || !form.message) {
      setError("Please complete all fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        return;
      }

      setSuccess("Message sent successfully.");
      setForm({
        name: "",
        email: "",
        message: "",
      });

    } catch {
      setError("Server error.");
    }
  };

  return (
    <main className="bg-[#F5F1EB] text-[#2F2F2F]">

      {/* Intro Section */}
      <section className="px-6 pt-20 pb-24">

        <div className="mx-auto max-w-2xl text-center">

          <h1 className="mb-6 text-4xl font-light tracking-[0.08em] md:text-5xl">
            Contact
          </h1>

          <p className="leading-relaxed text-[#6B6B6B]">
            We would love to hear from you.
          </p>

        </div>

      </section>

      {/* Form Section */}
      <section className="px-6 pb-32">

        <div className="mx-auto max-w-2xl">

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              className="w-full border border-[#2F2F2F] bg-transparent px-6 py-3 transition-colors focus:border-black focus:outline-none"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full border border-[#2F2F2F] bg-transparent px-6 py-3 transition-colors focus:border-black focus:outline-none"
            />

            <textarea
              placeholder="Your Message"
              rows={5}
              value={form.message}
              onChange={(e) =>
                setForm({
                  ...form,
                  message: e.target.value,
                })
              }
              className="w-full border border-[#2F2F2F] bg-transparent px-6 py-3 transition-colors focus:border-black focus:outline-none"
            />

            <button
              onClick={handleSubmit}
              className="mt-4 border border-[#2F2F2F] px-8 py-3 transition-all duration-300 hover:bg-[#2F2F2F] hover:text-white"
            >
              Send Message
            </button>

            {success && (
              <p className="mt-4 text-sm text-green-600">
                {success}
              </p>
            )}

            {error && (
              <p className="mt-4 text-sm text-red-600">
                {error}
              </p>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}