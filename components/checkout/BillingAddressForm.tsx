"use client";

import { useCheckout } from "@/context/CheckoutContext";
import { countries } from "@/data/countries";
import { provinces } from "@/data/provinces";

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

        {/* Country */}

        <select
          value={billing.country}
          onChange={(e) =>
            setBilling({
              ...billing,
              country: e.target.value,
              province: "",
            })
          }
          className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
        >
          <option value="">
            Select Country
          </option>

          {countries.map((country) => (
            <option
              key={country.code}
              value={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>

        {/* Province / State */}

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

          {billing.country &&
            provinces[
              billing.country as keyof typeof provinces
            ]?.map((province) => (
              <option
                key={province}
                value={province}
              >
                {province}
              </option>
            ))}
        </select>

        {/* City */}

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

        {/* Postal Code */}

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

        {/* Street */}

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

        {/* Apartment */}

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