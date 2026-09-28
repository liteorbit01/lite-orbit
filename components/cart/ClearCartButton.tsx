"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  emptyShoppingCart,
} from "@/app/cart/actions";

export default function ClearCartButton() {
  const router = useRouter();

  const [
    isPending,
    startTransition,
  ] = useTransition();

  function handleClearCart() {
    startTransition(async () => {
      await emptyShoppingCart();

      router.refresh();
    });
  }

  return (
    <button
      onClick={handleClearCart}
      disabled={isPending}
      className="
        border
        border-[#2F2F2F]
        px-6
        py-3
        hover:bg-[#2F2F2F]
        hover:text-white
        transition
        disabled:opacity-50
      "
    >
      {isPending
        ? "Clearing..."
        : "Clear Cart"}
    </button>
  );
}