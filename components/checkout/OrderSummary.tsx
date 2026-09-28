"use client";

import type {
  ShoppingCartResponse,
} from "@/app/cart/types";

import { useCheckout } from "@/context/CheckoutContext";

import { calculateTaxes } from "@/lib/checkout/calculateTaxes";

type OrderSummaryProps = {
  cart: ShoppingCartResponse;
};

export default function OrderSummary({
  cart,
}: OrderSummaryProps) {

  const {
    billing,
    useBillingForShipping,
  } = useCheckout();

  const shippingDestination =
    useBillingForShipping
      ? billing.province
      : "Separate shipping address";

  const taxes =
    calculateTaxes(
      cart.summary.subtotal,
      billing.country,
      billing.province
    );

  const total =
    cart.summary.subtotal +
    taxes;

  return (
    <aside className="bg-white rounded-2xl shadow-sm p-8 h-fit sticky top-28">

      <h2 className="text-2xl font-light mb-8">
        Order Summary
      </h2>

      <div className="space-y-6">

        {cart.items.map((item) => (
          <div
            key={item.variant_id}
            className="flex justify-between items-start gap-4"
          >
            <div>

              <p className="font-medium">
                {item.product_name}
              </p>

              <p className="text-sm text-[#6B6B6B]">
                {item.size}
                {item.color && ` • ${item.color}`}
              </p>

              <p className="text-sm text-[#6B6B6B]">
                Qty {item.quantity}
              </p>

            </div>

            <div className="font-medium">
              $
              {item.subtotal.toFixed(2)}
            </div>

          </div>
        ))}

        <hr className="border-[#E5E0D8]" />

        <div className="flex justify-between">

          <span>Subtotal</span>

          <span>
            $
            {cart.summary.subtotal.toFixed(2)}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Destination</span>

          <span className="text-[#6B6B6B]">
            {shippingDestination || "--"}
          </span>

        </div>

        <div className="flex justify-between text-[#6B6B6B]">

          <span>Shipping</span>

          <span>
            Calculated later
          </span>

        </div>

        <div className="flex justify-between">

          <span>Taxes</span>

          <span>
            $
            {taxes.toFixed(2)}
          </span>

        </div>

        <hr className="border-[#E5E0D8]" />

        <div className="flex justify-between text-xl font-semibold">

          <span>Total</span>

          <span>
            $
            {total.toFixed(2)}
          </span>

        </div>

        <button
          className="
            mt-8
            w-full
            rounded-xl
            bg-[#2F2F2F]
            py-4
            text-white
            font-medium
            transition
            hover:bg-black
          "
        >
          Continue to Payment
        </button>

      </div>

    </aside>
  );
}