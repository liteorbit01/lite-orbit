import {
  getShoppingCart,
} from "@/app/cart/actions";

import CheckoutForm from "@/components/checkout/CheckoutForm";

export default async function CheckoutPage() {
  const cart =
    await getShoppingCart();

  if (cart.items.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F1EB] py-24 px-6">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl font-light mb-6">
            Checkout
          </h1>

          <p className="text-[#6B6B6B]">
            Your cart is empty.
          </p>

        </div>
      </main>
    );
  }

  return (
    <CheckoutForm
      cart={cart}
    />
  );
}