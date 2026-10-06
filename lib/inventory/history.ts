import { supabaseAdmin } from "@/lib/supabase/admin";

export type InventoryAction =
  | "shipment"
  | "purchase"
  | "sale"
  | "adjustment"
  | "damage"
  | "inventory_count"
  | "return"
  | "reservation"
  | "release";

export async function createInventoryHistory(
  variantId: string,
  quantityChange: number,
  stockAfter: number,
  action: InventoryAction,
  notes?: string
) {

  const { error } =
    await supabaseAdmin
      .from("inventory_history")
      .insert({

        variant_id:
          variantId,

        quantity_change:
          quantityChange,

        stock_after:
          stockAfter,

        action,

        notes:
          notes ?? null,

      });

  if (error) {
    throw error;
  }

}