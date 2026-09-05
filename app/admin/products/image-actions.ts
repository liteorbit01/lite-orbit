"use server";

import { revalidatePath } from "next/cache";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadProductImage } from "@/lib/supabase/storage";

// ========================================
// Upload Product Image
// ========================================

export async function uploadProductImageAction(
  productId: string,
  file: File
) {
  if (!productId) {
    throw new Error("Product ID is required.");
  }

  if (!file) {
    throw new Error("Image file is required.");
  }

  // Upload to Supabase Storage
  const { filePath, publicUrl } =
    await uploadProductImage(productId, file);

  // Save metadata
  const { data, error } = await supabaseAdmin
    .from("product_images")
    .insert({
      product_id: productId,
      image_url: publicUrl,
      alt_text: "",
      image_type: "gallery",
      display_order: 1,
    })
    .select()
    .single();

  if (error) {
    // TODO:
    // Later we'll delete the uploaded file
    // if the database insert fails.
    throw error;
  }

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${productId}`);

  return data;
}

// ========================================
// Get Product Images
// ========================================

export async function getProductImages(
  productId: string
) {
  const { data, error } = await supabaseAdmin
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("display_order");

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}