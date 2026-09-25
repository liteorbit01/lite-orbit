"use server";

import { revalidatePath } from "next/cache";

import {
  addToCart,
  getCartItems,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
} from "@/lib/cart/actions";

// ======================================================
// Shopping Cart Server Actions
// ======================================================

export async function addItemToCart(
  variantId: string
) {
  const result = await addToCart(
    variantId,
    1
  );

  revalidatePath("/cart");

  return result;
}

export async function getShoppingCart() {
  return getCartItems();
}

export async function updateCartQuantity(
  cartItemId: string,
  quantity: number
) {
  const result =
    await updateCartItemQuantity(
      cartItemId,
      quantity
    );

  revalidatePath("/cart");

  return result;
}

export async function removeItemFromCart(
  cartItemId: string
) {
  const result =
    await removeCartItem(
      cartItemId
    );

  revalidatePath("/cart");

  return result;
}

export async function emptyShoppingCart() {
  const result =
    await clearCart();

  revalidatePath("/cart");

  return result;
}