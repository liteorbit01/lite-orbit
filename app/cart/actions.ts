"use server";

import { cookies } from "next/headers";

import { supabaseAdmin } from "@/lib/supabase/admin";

import type {
  ShoppingCart,
  CartProduct,
} from "@/app/cart/types";

// ======================================================
// Get or Create Shopping Cart
// ======================================================

export async function getOrCreateCart(): Promise<ShoppingCart> {
  const cookieStore = await cookies();

  let sessionId =
    cookieStore.get("cart_session")?.value;

  if (!sessionId) {
    sessionId = crypto.randomUUID();

    cookieStore.set(
      "cart_session",
      sessionId,
      {
        httpOnly: true,
        sameSite: "lax",
        secure:
          process.env.NODE_ENV ===
          "production",
        path: "/",
      }
    );
  }

  const {
    data: existingCart,
  } = await supabaseAdmin
    .from("shopping_carts")
    .select("*")
    .eq("session_id", sessionId)
    .eq("status", "active")
    .maybeSingle();

  if (existingCart) {
    return existingCart;
  }

  const {
    data: cart,
    error,
  } = await supabaseAdmin
    .from("shopping_carts")
    .insert({
      session_id: sessionId,
    })
    .select()
    .single();

  if (error || !cart) {
    throw new Error(
      "Unable to create shopping cart."
    );
  }

  return cart;
}

// ======================================================
// Get Cart Items
// ======================================================

export async function getCartItems(): Promise<
  CartProduct[]
> {
  const cart =
    await getOrCreateCart();

  const {
    data,
    error,
  } = await supabaseAdmin
    .from("shopping_cart_items")
    .select(`
      quantity,
      price_at_addition,
      product_variants (
        id,
        sku,
        size,
        color,
        stock_quantity,
        products (
          name,
          slug
        ),
        product_images (
          image_url
        )
      )
    `)
    .eq("cart_id", cart.id);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []).map(
    (item: any) => {
      const variant =
        item.product_variants;

      const product =
        variant.products;

      return {
        variant_id: variant.id,

        product_name:
          product.name,

        slug: product.slug,

        sku: variant.sku,

        size: variant.size,

        color: variant.color,

        image_url:
          variant.product_images?.[0]
            ?.image_url ?? null,

        price:
          item.price_at_addition,

        quantity:
          item.quantity,

        subtotal:
          item.quantity *
          item.price_at_addition,

        stock_quantity:
          variant.stock_quantity,
      };
    }
  );
}