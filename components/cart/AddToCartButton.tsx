"use client";

import { useState } from "react";

import type {
  AddToCartResult,
} from "@/app/cart/types";

type AddToCartButtonProps = {
  variantId: string;

  disabled?: boolean;

  onAddToCart: (
    variantId: string
  ) => Promise<AddToCartResult>;
};

export default function AddToCartButton({
  variantId,
  disabled = false,
  onAddToCart,
}: AddToCartButtonProps) {
  const [loading, setLoading] =
    useState(false);

  async function handleClick() {
    try {
      setLoading(true);

      const result =
        await onAddToCart(
          variantId
        );

      if (!result.success) {
        alert(result.message);

        return;
      }

      alert(result.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      disabled={
        disabled || loading
      }
      onClick={handleClick}
      className="
        w-full
        rounded-xl
        bg-black
        px-6
        py-4
        text-lg
        font-semibold
        text-white
        transition
        hover:bg-gray-800
        disabled:cursor-not-allowed
        disabled:bg-gray-400
      "
    >
      {loading
        ? "Adding..."
        : "Add to Cart"}
    </button>
  );
}