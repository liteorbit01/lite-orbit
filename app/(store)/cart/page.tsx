import {
  getShoppingCart,
} from "@/app/cart/actions";

export default async function CartPage() {
  const cart =
    await getShoppingCart();

  return (
    <main className="min-h-screen bg-[#F5F1EB] py-24 px-6 text-[#2F2F2F]">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl mb-12 font-light">
          Cart
        </h1>

        {cart.items.length === 0 ? (
          <p className="text-[#6B6B6B]">
            Your cart is empty.
          </p>
        ) : (
          <>
            {cart.items.map((item) => (
              <div
                key={item.variant_id}
                className="flex justify-between items-center mb-8 border-b pb-6"
              >
                <div>
                  <p className="text-lg">
                    {item.product_name}
                  </p>

                  <p className="text-sm text-[#6B6B6B]">
                    {item.size}
                  </p>

                  <p className="mt-2">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-lg">
                    ${item.subtotal.toFixed(2)} CAD
                  </p>
                </div>
              </div>
            ))}

            <div className="text-right text-xl font-medium mt-12">
              Total: $
              {cart.summary.subtotal.toFixed(
                2
              )}{" "}
              CAD
            </div>

            <div className="flex justify-end mt-8">
              <button
                className="bg-[#2F2F2F] text-white px-8 py-3"
              >
                Checkout
              </button>
            </div>
          </>
        )}

      </div>
    </main>
  );
}