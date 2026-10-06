import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getInventoryDetail(
  variantId: string
) {

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

      product_variants(
        id,
        sku,
        size,
        color,

        products(
          id,
          name
        )
      )
    `)
    .eq(
      "variant_id",
      variantId
    )
    .single();

  if (error) {
    throw error;
  }

  return data;

}