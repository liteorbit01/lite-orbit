"use server";

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
  return addToCart(
    variantId,
    1
  );
}

export async function getShoppingCart() {
  return getCartItems();
}

export async function updateCartQuantity(
  cartItemId: string,
  quantity: number
) {
  return updateCartItemQuantity(
    cartItemId,
    quantity
  );
}

export async function removeItemFromCart(
  cartItemId: string
) {
  return removeCartItem(
    cartItemId
  );
}

export async function emptyShoppingCart() {
  return clearCart();
}