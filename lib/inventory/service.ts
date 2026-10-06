import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getInventoryByVariant(
  variantId: string
) {

  const {
    data,
    error,
  } = await supabaseAdmin
    .from("inventory")
    .select("*")
    .eq("variant_id", variantId)
    .single();

  if (error) {
    throw error;
  }

  return data;

}

export async function updateInventory(
  variantId: string,
  newQuantity: number
) {

  const {
    data,
    error,
  } = await supabaseAdmin
    .from("inventory")
    .update({
      quantity: newQuantity,
    })
    .eq("variant_id", variantId)
    .select();

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error(
      `Inventory record not found for variant ${variantId}`
    );
  }

  return data[0];

}