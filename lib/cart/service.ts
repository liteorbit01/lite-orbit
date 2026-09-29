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