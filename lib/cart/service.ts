import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/admin";

import { CART_COOKIE_NAME } from "./constants";

import type {
  ShoppingCart,
} from "@/app/cart/types";

/**
 * Returns the current shopping cart if one exists.
 * Does not create a new cart.
 */
export async function getExistingCart(): Promise<ShoppingCart | null> {
  const cookieStore = await cookies();

  const sessionId =
    cookieStore.get(CART_COOKIE_NAME)?.value;

  if (!sessionId) {
    return null;
  }

  const {
    data,
    error,
  } = await supabaseAdmin
    .from("shopping_carts")
    .select("*")
    .eq("session_id", sessionId)
    .eq("status", "active")
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
import type {
  ShoppingCartResponse,
  CartProduct,
} from "@/app/cart/types";

import {
  calculateCartSummary,
} from "./calculations";

export async function getExistingCartItems(): Promise<ShoppingCartResponse> {

  const cart =
    await getExistingCart();

  if (!cart) {
    return {
      items: [],
      summary: {
        subtotal: 0,
        itemCount: 0,
      },
    };
  }

  const {
    data: cartItems,
    error,
  } = await supabaseAdmin
    .from("shopping_cart_items")
    .select(`
      id,
      quantity,
      cart_products_view (
        variant_id,
        product_name,
        sku,
        slug,
        image_url,
        size,
        color,
        price,
        stock_quantity
      )
    `)
    .eq("cart_id", cart.id);

  if (error) {
    throw error;
  }

  const items: CartProduct[] =
    (cartItems ?? []).map(
      (item: any) => ({
        cart_item_id: item.id,

        ...item.cart_products_view,

        quantity: item.quantity,

        subtotal:
          item.quantity *
          item.cart_products_view.price,
      })
    );

  return {
    items,
    summary:
      calculateCartSummary(items),
  };
}