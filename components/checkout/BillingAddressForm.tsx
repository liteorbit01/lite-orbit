"use client";

import { useCheckout } from "@/context/CheckoutContext";

export default function BillingAddressForm() {
  const {
    billing,
    setBilling,
  } = useCheckout();

  return (
    <section>

      <h2 className="text-2xl mb-6">
        Billing Address
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <select
          value={billing.country}
          onChange={(e) =>
            setBilling({
              ...billing,
              country: e.target.value,
            })
          }
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        >
          <option value="">
            Select Country
          </option>

          <option value="Canada">
            Canada
          </option>

          <option value="United States">
            United States
          </option>

        </select>

        <select
          value={billing.province}
          onChange={(e) =>
            setBilling({
              ...billing,
              province: e.target.value,
            })
          }
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        >
          <option value="">
            Province / State
          </option>

          <option value="Manitoba">
            Manitoba
          </option>

          <option value="Ontario">
            Ontario
          </option>

          <option value="Alberta">
            Alberta
          </option>

          <option value="British Columbia">
            British Columbia
          </option>

          <option value="Quebec">
            Quebec
          </option>

        </select>

        <input
          type="text"
          placeholder="City"
          value={billing.city}
          onChange={(e) =>
            setBilling({
              ...billing,
              city: e.target.value,
            })
          }
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="text"
          placeholder="Postal / ZIP Code"
          value={billing.postalCode}
          onChange={(e) =>
            setBilling({
              ...billing,
              postalCode: e.target.value,
            })
          }
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="text"
          placeholder="Street Address"
          value={billing.street}
          onChange={(e) =>
            setBilling({
              ...billing,
              street: e.target.value,
            })
          }
          className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

        <input
          type="text"
          placeholder="Apartment / Suite (optional)"
          value={billing.apartment}
          onChange={(e) =>
            setBilling({
              ...billing,
              apartment: e.target.value,
            })
          }
          className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        />

      </div>

    </section>
  );
}