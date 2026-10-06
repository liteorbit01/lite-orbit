import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getInventoryDashboard() {

  const {
    data,
    error,
  } = await supabaseAdmin
    .from("inventory")
    .select(`
      id,
      quantity,
      reserved_quantity,
      low_stock_threshold,
      reorder_quantity,
      allow_backorder,
      product_variants (
        id,
        sku,
        products (
          name
        )
      )
    `)
    .order("created_at");

  if (error) {
    throw error;
  }

  return data ?? [];

}