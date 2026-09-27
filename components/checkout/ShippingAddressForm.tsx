"use client";

import { useState } from "react";

export default function ShippingAddressForm() {
  const [sameAsBilling, setSameAsBilling] =
    useState(true);

  return (
    <section>

      <label className="flex items-center gap-3 mb-8 cursor-pointer">

        <input
          type="checkbox"
          checked={sameAsBilling}
          onChange={() =>
            setSameAsBilling(!sameAsBilling)
          }
          className="h-5 w-5 accent-[#2F2F2F]"
        />

        <span className="text-lg">
          Shipping address is the same as billing
        </span>

      </label>

      {!sameAsBilling && (

        <>
          <h2 className="text-2xl mb-6">
            Shipping Address
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <select
              defaultValue=""
              className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            >
              <option value="" disabled>
                Select Country
              </option>

              <option>
                Canada
              </option>

              <option>
                United States
              </option>

            </select>

            <select
              defaultValue=""
              className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            >
              <option value="" disabled>
                Province / State
              </option>

              <option>
                Manitoba
              </option>

              <option>
                Ontario
              </option>

              <option>
                Alberta
              </option>

              <option>
                British Columbia
              </option>

            </select>

            <input
              placeholder="City"
              className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            />

            <input
              placeholder="Postal / ZIP Code"
              className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            />

            <input
              placeholder="Street Address"
              className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            />

            <input
              placeholder="Apartment / Suite (optional)"
              className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            />

          </div>
        </>

      )}

    </section>
  );
}