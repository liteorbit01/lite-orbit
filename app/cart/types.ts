export type ShoppingCart = {
  id: string;
  user_id: string | null;
  session_id: string | null;

  status:
    | "active"
    | "converted"
    | "abandoned";

  created_at: string;
  updated_at: string;
};

export type ShoppingCartItem = {
  id: string;

  cart_id: string;

  variant_id: string;

  quantity: number;

  price_at_addition: number;

  created_at: string;
  updated_at: string;
};

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