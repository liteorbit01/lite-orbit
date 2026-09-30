import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <main className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-white rounded-2xl shadow-sm p-12 text-center">

        <div className="text-6xl mb-6">
          ✅
        </div>

        <h1 className="text-4xl font-light mb-6">
          Thank You!
        </h1>

        <p className="text-[#6B6B6B] text-lg leading-8">

          Your payment has been received successfully.

        </p>

        <p className="text-[#6B6B6B] mt-4 leading-8">

          We are now preparing your order.
          You will receive an order confirmation
          email as soon as your purchase has been processed.

        </p>

        <div className="mt-12">

          <Link
            href="/shop"
            className="
              inline-block
              bg-[#2F2F2F]
              text-white
              px-10
              py-4
              rounded-xl
              transition
              hover:bg-black
            "
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </main>
  );
}