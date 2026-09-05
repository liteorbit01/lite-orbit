import { supabaseAdmin } from "./admin";

export async function uploadProductImage(
  productId: string,
  file: File
) {
  const extension =
    file.name.split(".").pop()?.toLowerCase() ?? "jpg";

  const fileName = `${Date.now()}.${extension}`;

  const filePath = `${productId}/${fileName}`;

  const { error } = await supabaseAdmin.storage
    .from("products")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabaseAdmin.storage
    .from("products")
    .getPublicUrl(filePath);

  return {
    filePath,
    publicUrl: data.publicUrl,
  };
}