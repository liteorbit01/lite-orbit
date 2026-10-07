import { supabaseAdmin } from "@/lib/supabase/admin";

export type InventorySummary = {
  totalTransactions: number;
  currentStock: number;
  lastShipment: string | null;
  lastInventoryCount: string | null;
};

export async function getInventorySummary(
  variantId: string
): Promise<InventorySummary> {

  // ----------------------------------------------------
  // Current Inventory
  // ----------------------------------------------------

  const {
    data: inventory,
    error: inventoryError,
  } = await supabaseAdmin
    .from("inventory")
    .select("quantity")
    .eq("variant_id", variantId)
    .single();

  if (inventoryError) {
    throw inventoryError;
  }

  // ----------------------------------------------------
  // Inventory History
  // ----------------------------------------------------

  const {
    data: history,
    error: historyError,
  } = await supabaseAdmin
    .from("inventory_history")
    .select(
      `
      action,
      created_at
      `
    )
    .eq("variant_id", variantId)
    .order("created_at", {
      ascending: false,
    });

  if (historyError) {
    throw historyError;
  }

  const totalTransactions =
    history?.length ?? 0;

  const lastShipment =
    history?.find(
      (item) =>
        item.action === "shipment"
    )?.created_at ?? null;

  const lastInventoryCount =
    history?.find(
      (item) =>
        item.action ===
        "inventory_count"
    )?.created_at ?? null;

  return {

    totalTransactions,

    currentStock:
      inventory.quantity,

    lastShipment,

    lastInventoryCount,

  };

}