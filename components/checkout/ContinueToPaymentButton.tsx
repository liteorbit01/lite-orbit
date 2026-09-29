"use client";

import { useState } from "react";

export default function ContinueToPaymentButton() {
  const [loading, setLoading] =
    useState(false);

  async function handleCheckout() {
    try {
      setLoading(true);

      const response =
        await fetch(
          "/api/stripe/checkout",
          {
            method: "POST",
          }
        );

   const data = await response.json();

console.log(data);

alert("Cart loaded successfully.");

setLoading(false);

    } catch (error) {

      console.error(error);

      alert(
        "Unable to start checkout."
      );

      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="
        mt-8
        w-full
        rounded-xl
        bg-[#2F2F2F]
        py-4
        text-white
        font-medium
        transition
        hover:bg-black
        disabled:opacity-50
      "
    >
      {loading
        ? "Redirecting..."
        : "Continue to Payment"}
    </button>
  );
}