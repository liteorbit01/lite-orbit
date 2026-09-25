"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  removeItemFromCart,
  updateCartQuantity,
} from "@/app/cart/actions";

import type {
  CartProduct,
} from "@/app/cart/types";

type CartItemProps = {
  item: CartProduct;
};

export default function CartItem({
  item,
}: CartItemProps) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  function refreshAfter(
    action: () => Promise<any>
  ) {
    startTransition(async () => {
      await action();

      router.refresh();
    });
  }

  function handleIncrease() {
    refreshAfter(() =>
      updateCartQuantity(
        item.cart_item_id,
        item.quantity + 1
      )
    );
  }

  function handleDecrease() {
    if (item.quantity === 1) {
      handleRemove();
      return;
    }

    refreshAfter(() =>
      updateCartQuantity(
        item.cart_item_id,
        item.quantity - 1
      )
    );
  }

  function handleRemove() {
    refreshAfter(() =>
      removeItemFromCart(
        item.cart_item_id
      )
    );
  }

  return (
    <div className="flex justify-between items-center mb-8 border-b pb-6">

      <div>
        <p className="text-lg">
          {item.product_name}
        </p>

        <p className="text-sm text-[#6B6B6B]">
          {item.size}
        </p>

        <div className="flex items-center gap-4 mt-4">

          <button
            onClick={handleDecrease}
            disabled={isPending}
            className="border w-8 h-8 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            −
          </button>

          <span className="min-w-[20px] text-center">
            {item.quantity}
          </span>

          <button
            onClick={handleIncrease}
            disabled={isPending}
            className="border w-8 h-8 rounded hover:bg-gray-100 disabled:opacity-50"
          >
            +
          </button>

        </div>
      </div>

      <div className="text-right">

        <p className="text-lg mb-4">
          ${item.subtotal.toFixed(2)} CAD
        </p>

        <button
          onClick={handleRemove}
          disabled={isPending}
          className="text-red-600 hover:underline disabled:opacity-50"
        >
          {isPending
            ? "Updating..."
            : "Remove"}
        </button>

      </div>

    </div>
  );
}