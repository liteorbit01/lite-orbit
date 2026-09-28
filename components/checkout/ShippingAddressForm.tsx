"use client";

import { useCheckout } from "@/context/CheckoutContext";

export default function ShippingAddressForm() {
  const {
    shipping,
    setShipping,
    useBillingForShipping,
    setUseBillingForShipping,
  } = useCheckout();

  return (
    <section>

      <label className="flex items-center gap-3 mb-8 cursor-pointer">

        <input
          type="checkbox"
          checked={useBillingForShipping}
          onChange={(e) =>
            setUseBillingForShipping(
              e.target.checked
            )
          }
          className="h-5 w-5 accent-[#2F2F2F]"
        />

        <span className="text-lg">
          Shipping address is the same as billing
        </span>

      </label>

      {!useBillingForShipping && (

        <>
          <h2 className="text-2xl mb-6">
            Shipping Address
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <select
              value={shipping.country}
              onChange={(e) =>
                setShipping({
                  ...shipping,
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
              value={shipping.province}
              onChange={(e) =>
                setShipping({
                  ...shipping,
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
              value={shipping.city}
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  city: e.target.value,
                })
              }
              className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            />

            <input
              type="text"
              placeholder="Postal / ZIP Code"
              value={shipping.postalCode}
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  postalCode: e.target.value,
                })
              }
              className="border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            />

            <input
              type="text"
              placeholder="Street Address"
              value={shipping.street}
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  street: e.target.value,
                })
              }
              className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            />

            <input
              type="text"
              placeholder="Apartment / Suite (optional)"
              value={shipping.apartment}
              onChange={(e) =>
                setShipping({
                  ...shipping,
                  apartment: e.target.value,
                })
              }
              className="md:col-span-2 border border-[#D9D4CC] rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-[#2F2F2F]"
            />

          </div>
        </>

      )}

    </section>
  );
}