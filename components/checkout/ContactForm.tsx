"use client";

export default function ContactForm() {
  return (
    <section>

      <h2 className="text-2xl mb-6">
        Contact Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          type="text"
          placeholder="First Name"
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="text"
          placeholder="Last Name"
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

      </div>

    </section>
  );
}