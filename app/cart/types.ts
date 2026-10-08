import type { Database } from "@/types/database.types";

/* =====================================================
   Database Types
===================================================== */

export type ShoppingCart =
  Database["public"]["Tables"]["shopping_carts"]["Row"];

export type ShoppingCartItem =
  Database["public"]["Tables"]["shopping_cart_items"]["Row"];

/* =====================================================
   Application Types
===================================================== */

export type CartProduct = {
  cart_item_id: string;

  variant_id: string;

  product_name: string;

  sku: string;

  slug: string;

  image_url: string | null;

  size: string | null;

  color: string | null;

  price: number;

  quantity: number;

  subtotal: number;

  stock_quantity: number;
};

export type CartSummary = {
  subtotal: number;

  itemCount: number;
};

export type AddToCartResult = {
  success: boolean;

  message: string;
};

export type ShoppingCartResponse = {
  items: CartProduct[];

  summary: CartSummary;
};