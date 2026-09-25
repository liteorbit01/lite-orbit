import CartItem from "@/components/cart/CartItem";
import {
  getShoppingCart,
  removeItemFromCart,
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
              <CartItem
                 key={item.cart_item_id}
                 item={item}
              />
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