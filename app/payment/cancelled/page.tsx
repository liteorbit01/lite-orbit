import Link from "next/link";

export default function PaymentCancelledPage() {

  return (

    <main className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-6">

      <div className="max-w-xl w-full rounded-2xl bg-white p-12 text-center shadow-sm">

        <div className="mb-6 text-6xl">

          🛒

        </div>

        <h1 className="mb-6 text-4xl font-light">

          Payment Cancelled

        </h1>

        <p className="text-lg leading-8 text-[#6B6B6B]">

          Your order has not been charged.

        </p>

        <p className="mt-4 leading-8 text-[#6B6B6B]">

          Your shopping cart has been preserved.
          You can return to checkout whenever you&apos;re ready.

        </p>

        <div className="mt-12 flex justify-center gap-6">

          <Link
            href="/checkout"
            className="
              rounded-xl
              bg-[#2F2F2F]
              px-8
              py-4
              text-white
              transition
              hover:bg-black
            "
          >

            Return to Checkout

          </Link>

          <Link
            href="/shop"
            className="
              rounded-xl
              border
              border-[#2F2F2F]
              px-8
              py-4
              transition
              hover:bg-[#2F2F2F]
              hover:text-white
            "
          >

            Continue Shopping

          </Link>

        </div>

      </div>

    </main>

  );

}