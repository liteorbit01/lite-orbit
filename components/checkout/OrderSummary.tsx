"use client";
import Link from "next/link";
import type {
  ShoppingCartResponse,
} from "@/app/cart/types";

import { useCheckout } from "@/context/CheckoutContext";

import { calculateTaxes } from "@/lib/checkout/calculateTaxes";
import { calculateShipping } from "@/lib/checkout/calculateShipping";
import { validateCheckout } from "@/lib/validation/validateCheckout";

type OrderSummaryProps = {
  cart: ShoppingCartResponse;
};

export default function OrderSummary({
  cart,
}: OrderSummaryProps) {

  const {
    contact,
    billing,
    shipping,
    useBillingForShipping,
  } = useCheckout();

  const shippingDestination =
    useBillingForShipping
      ? billing.province
      : shipping.province;

  const shippingCost =
    calculateShipping(
      cart.summary.subtotal,
      billing.country
    );

  const taxes =
    calculateTaxes(
      cart.summary.subtotal,
      billing.country,
      billing.province
    );

  const total =
    cart.summary.subtotal +
    shippingCost +
    taxes;

  const isCheckoutValid =
    validateCheckout(
      contact,
      billing,
      useBillingForShipping,
      shipping
    );

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
            ${cart.summary.subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Destination</span>

          <span className="text-[#6B6B6B]">
            {shippingDestination || "--"}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>

          <span>
            {shippingCost === 0
              ? "FREE"
              : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Taxes</span>

          <span>
            ${taxes.toFixed(2)}
          </span>
        </div>

        <hr className="border-[#E5E0D8]" />

        <div className="flex justify-between text-xl font-semibold">
          <span>Total</span>

          <span>
            ${total.toFixed(2)}
          </span>
        </div>

        {!isCheckoutValid && (
          <p className="text-sm text-red-600">
            Please complete all required checkout information.
          </p>
        )}
        <Link
            href="/cart"
            className="
            mb-4
            flex
            w-full
            items-center
            justify-center
            rounded-xl
            border
            border-[#2F2F2F]
            py-4
            font-medium
            text-[#2F2F2F]
            transition
            hover:bg-[#F5F1EB]
            "
        >
           ← Back to Cart
        </Link>

        <button
          disabled={!isCheckoutValid}
          className={`
            mt-8
            w-full
            rounded-xl
            py-4
            text-white
            font-medium
            transition
            ${
              isCheckoutValid
                ? "bg-[#2F2F2F] hover:bg-black"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
              >
          Continue to Payment
        </button>

      </div>

    </aside>
  );
}