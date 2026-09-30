import Link from "next/link";

export default function PaymentCancelledPage() {
  return (
    <main className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm p-12 text-center">

        <div className="text-6xl mb-6">
          🛒
        </div>

        <h1 className="text-4xl font-light mb-6">
          Payment Cancelled
        </h1>

        <p className="text-[#6B6B6B] text-lg leading-8">

          Your order has not been charged.

        </p>

        <p className="text-[#6B6B6B] mt-4 leading-8">

          Your shopping cart has been preserved.
          You can return to checkout whenever you're ready.

        </p>

        <div className="flex justify-center gap-6 mt-12">

          <Link
            href="/checkout"
            className="
              bg-[#2F2F2F]
              text-white
              px-8
              py-4
              rounded-xl
              transition
              hover:bg-black
            "
          >
            Return to Checkout
          </Link>

          <Link
            href="/shop"
            className="
              border
              border-[#2F2F2F]
              px-8
              py-4
              rounded-xl
              hover:bg-[#2F2F2F]
              hover:text-white
              transition
            "
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}