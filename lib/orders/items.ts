import { supabaseAdmin } from "@/lib/supabase/admin";

import type { CartProduct } from "@/app/cart/types";

export async function createOrderItems(
  orderId: string,
  items: CartProduct[]
) {

  if (items.length === 0) {
    return;
  }

  const rows = items.map((item) => ({

    order_id: orderId,

    variant_id: item.variant_id,

    product_name: item.product_name,

    product_slug: item.slug,

    variant_name: [
      item.size,
      item.color,
    ]
      .filter(Boolean)
      .join(" / "),

    sku: item.sku,

    quantity: item.quantity,

    unit_price: item.price,

    line_total: item.subtotal,

  }));

  const { error } =
    await supabaseAdmin
      .from("order_items")
      .insert(rows);

  if (error) {
    throw error;
  }
}