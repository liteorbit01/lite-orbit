"use client";

export default function BillingAddressForm() {
  return (
    <section>

      <h2 className="text-2xl mb-6">
        Billing Address
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Country */}

        <select
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
          defaultValue=""
        >
          <option value="" disabled>
            Select Country
          </option>

          <option value="Canada">
            Canada
          </option>

          <option value="United States">
            United States
          </option>

        </select>

        {/* Province / State */}

        <select
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
          defaultValue=""
        >
          <option value="" disabled>
            Province / State
          </option>

          <option>Manitoba</option>
          <option>Ontario</option>
          <option>Alberta</option>
          <option>British Columbia</option>
          <option>Quebec</option>

        </select>

        <input
          type="text"
          placeholder="City"
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="text"
          placeholder="Postal / ZIP Code"
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="text"
          placeholder="Street Address"
          className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="text"
          placeholder="Apartment / Suite (optional)"
          className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

      </div>

    </section>
  );
}