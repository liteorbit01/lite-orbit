"use server";

import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/admin";

import {
  CART_COOKIE_NAME,
} from "./constants";

import type {
  ShoppingCart,
  CartProduct,
  AddToCartResult,
  ShoppingCartResponse,
} from "@/app/cart/types";

import {
  calculateCartSummary,
} from "./calculations";

// ======================================================
// Get or Create Shopping Cart
// ======================================================

export async function getOrCreateCart(): Promise<ShoppingCart> {
  const cookieStore = await cookies();

  let sessionId =
    cookieStore.get(
      CART_COOKIE_NAME
    )?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    cookieStore.set(
      CART_COOKIE_NAME,
      sessionId,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          "production",
        sameSite: "lax",
        path: "/",
      }
    );
  }

  const {
    data: existingCart,
    error: existingError,
  } = await supabaseAdmin
    .from("shopping_carts")
    .select("*")
    .eq("session_id", sessionId)
    .eq("status", "active")
    .maybeSingle();

  if (existingError) {
    throw existingError;
  }

  if (existingCart) {
    return existingCart;
  }

  const {
    data: newCart,
    error: createError,
  } = await supabaseAdmin
    .from("shopping_carts")
    .insert({
      session_id: sessionId,
    })
    .select()
    .single();

  if (createError || !newCart) {
    throw new Error(
      "Unable to create shopping cart."
    );
  }

  return newCart;
}

// ======================================================
// Add Item To Cart
// ======================================================

export async function addToCart(
  variantId: string,
  quantity = 1
): Promise<AddToCartResult> {
  const cart =
    await getOrCreateCart();

  const {
    data: variant,
    error: variantError,
  } = await supabaseAdmin
    .from("product_variants")
    .select(`
      id,
      price,
      stock_quantity
    `)
    .eq("id", variantId)
    .single();

  if (variantError || !variant) {
    return {
      success: false,
      message:
        "Product variant not found.",
    };
  }

  if (quantity <= 0) {
    return {
      success: false,
      message:
        "Quantity must be greater than zero.",
    };
  }

  if (
    quantity >
    variant.stock_quantity
  ) {
    return {
      success: false,
      message: `Only ${variant.stock_quantity} item(s) available.`,
    };
  }

  const {
    data: existingItem,
  } = await supabaseAdmin
    .from("shopping_cart_items")
    .select(`
      id,
      quantity
    `)
    .eq("cart_id", cart.id)
    .eq("variant_id", variantId)
    .maybeSingle();

  if (existingItem) {
    const newQuantity =
      existingItem.quantity +
      quantity;

    if (
      newQuantity >
      variant.stock_quantity
    ) {
      return {
        success: false,
        message: `Only ${variant.stock_quantity} item(s) available.`,
      };
    }

    const { error } =
      await supabaseAdmin
        .from(
          "shopping_cart_items"
        )
        .update({
          quantity: newQuantity,
        })
        .eq(
          "id",
          existingItem.id
        );

    if (error) {
      throw error;
    }

    return {
      success: true,
      message:
        "Cart updated successfully.",
    };
  }

  const { error } =
    await supabaseAdmin
      .from(
        "shopping_cart_items"
      )
      .insert({
        cart_id: cart.id,
        variant_id: variant.id,
        quantity,
        price_at_addition:
          variant.price,
      });

  if (error) {
    throw error;
  }

  return {
    success: true,
    message:
      "Item added to cart.",
  };
}
// ======================================================
// Get Cart Items
// ======================================================

export async function getCartItems(): Promise<ShoppingCartResponse> {
  const cart =
    await getOrCreateCart();

  const {
    data: cartItems,
    error,
  } = await supabaseAdmin
    .from("shopping_cart_items")
    .select(`
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
        ...item.cart_products_view,

        quantity:
          item.quantity,

        subtotal:
          item.quantity *
          item.cart_products_view.price,
      })
    );

  return {
    items,

    summary:
      calculateCartSummary(
        items
      ),
  };
}
// ======================================================
// Update Cart Item Quantity
// ======================================================

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
): Promise<AddToCartResult> {
  if (quantity <= 0) {
    return {
      success: false,
      message:
        "Quantity must be greater than zero.",
    };
  }

  const {
    data: cartItem,
    error: cartItemError,
  } = await supabaseAdmin
    .from("shopping_cart_items")
    .select(`
      id,
      variant_id
    `)
    .eq("id", cartItemId)
    .single();

  if (cartItemError || !cartItem) {
    return {
      success: false,
      message:
        "Cart item not found.",
    };
  }

  const {
    data: variant,
    error: variantError,
  } = await supabaseAdmin
    .from("product_variants")
    .select(`
      stock_quantity
    `)
    .eq("id", cartItem.variant_id)
    .single();

  if (variantError || !variant) {
    return {
      success: false,
      message:
        "Product variant not found.",
    };
  }

  if (
    quantity >
    variant.stock_quantity
  ) {
    return {
      success: false,
      message: `Only ${variant.stock_quantity} item(s) available.`,
    };
  }

  const { error } =
    await supabaseAdmin
      .from("shopping_cart_items")
      .update({
        quantity,
      })
      .eq("id", cartItemId);

  if (error) {
    throw error;
  }

  return {
    success: true,
    message:
      "Cart updated successfully.",
  };
}

// ======================================================
// Remove Cart Item
// ======================================================

export async function removeCartItem(
  cartItemId: string
): Promise<AddToCartResult> {
  const { error } =
    await supabaseAdmin
      .from("shopping_cart_items")
      .delete()
      .eq("id", cartItemId);

  if (error) {
    throw error;
  }

  return {
    success: true,
    message:
      "Item removed from cart.",
  };
}

// ======================================================
// Clear Cart
// ======================================================

export async function clearCart(): Promise<AddToCartResult> {
  const cart =
    await getOrCreateCart();

  const { error } =
    await supabaseAdmin
      .from("shopping_cart_items")
      .delete()
      .eq("cart_id", cart.id);

  if (error) {
    throw error;
  }

  return {
    success: true,
    message:
      "Shopping cart cleared.",
  };
}