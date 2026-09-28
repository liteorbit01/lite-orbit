"use client";
import { CheckoutProvider } from "@/context/CheckoutContext";
import type {
  ShoppingCartResponse,
} from "@/app/cart/types";

import ContactForm from "./ContactForm";
import BillingAddressForm from "./BillingAddressForm";
import ShippingAddressForm from "./ShippingAddressForm";
import OrderSummary from "./OrderSummary";

type CheckoutFormProps = {
  cart: ShoppingCartResponse;
};

export default function CheckoutForm({
  cart,
}: CheckoutFormProps) {
  return (
  <CheckoutProvider>
    <main className="min-h-screen bg-[#F5F1EB] py-24 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">

        {/* LEFT COLUMN */}

        <div className="lg:col-span-2 space-y-12">

          <h1 className="text-4xl font-light">
            Checkout
          </h1>

          <ContactForm />

          <BillingAddressForm />

          <ShippingAddressForm />

        </div>

        {/* RIGHT COLUMN */}

        <OrderSummary
          cart={cart}
        />

      </div>

    </main>
  </CheckoutProvider>
  );
}