import { supabaseAdmin } from "@/lib/supabase/admin";

export type InventoryHistoryItem = {
  id: string;

  action: string;

  quantity_change: number;

  stock_after: number;

  notes: string | null;

  created_at: string;
};

export async function getInventoryHistory(
  variantId: string
): Promise<
  InventoryHistoryItem[]
> {

  const {
    data,
    error,
  } = await supabaseAdmin

    .from("inventory_history")

    .select(`
      id,
      action,
      quantity_change,
      stock_after,
      notes,
      created_at
    `)

    .eq(
      "variant_id",
      variantId
    )

    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {
    throw error;
  }

  return data ?? [];

}