"use client"

import { useCart } from "@/app/context/CartContext"

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
  } = useCart()

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <main className="min-h-screen bg-[#F5F1EB] py-24 px-6 text-[#2F2F2F]">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl mb-12 font-light">Cart</h1>

        {cart.length === 0 && (
          <p className="text-[#6B6B6B]">Your cart is empty.</p>
        )}

        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}`}
            className="flex justify-between items-center mb-8 border-b pb-6"
          >
            <div>
              <p className="text-lg">{item.name}</p>
              <p className="text-sm text-[#6B6B6B]">{item.size}</p>

              {/* Quantity Controls */}
              <div className="flex items-center mt-4 space-x-4">
                <button
                  onClick={() => decreaseQuantity(item.id, item.size)}
                  className="border px-3 py-1"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id, item.size)}
                  className="border px-3 py-1"
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg">
                ${item.price * item.quantity} CAD
              </p>

              <button
                onClick={() => removeFromCart(item.id, item.size)}
                className="text-sm text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {cart.length > 0 && (
          <>
            <div className="text-right text-xl font-medium mt-12">
              Total: ${total} CAD
            </div>

            <div className="flex justify-end mt-8 space-x-6">
              <button
                onClick={clearCart}
                className="border px-6 py-3"
              >
                Clear Cart
              </button>

              <button className="bg-[#2F2F2F] text-white px-8 py-3">
                Checkout
              </button>
            </div>
          </>
        )}

      </div>
    </main>
  )
}