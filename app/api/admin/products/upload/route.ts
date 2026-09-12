import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { uploadProductImage } from "@/lib/supabase/storage";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const productId = formData.get("productId")?.toString();
    const file = formData.get("file");

    if (!productId) {
      return NextResponse.json(
        {
          error: "Product ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Image file is required.",
        },
        {
          status: 400,
        }
      );
    }

    console.log("====================================");
    console.log("Starting product image upload...");
    console.log("Product:", productId);
    console.log("File:", file.name);
    console.log("====================================");

    // Upload to Supabase Storage
    const { publicUrl } =
      await uploadProductImage(
        productId,
        file
      );

    console.log("Storage upload successful.");
    console.log("Public URL:", publicUrl);

    // Determine next display order
    const {
      count,
      error: countError,
    } = await supabaseAdmin
      .from("product_images")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("product_id", productId);

    if (countError) {
      throw countError;
    }

    console.log(
      "Current image count:",
      count ?? 0
    );

    // Insert database record
    const { data, error } =
      await supabaseAdmin
        .from("product_images")
        .insert({
          product_id: productId,
          image_url: publicUrl,
          alt_text: "",
          image_type: "gallery",
          display_order: count ?? 0,
        })
        .select()
        .single();

    if (error) {
      throw error;
    }

    console.log("====================================");
    console.log("Image uploaded successfully.");
    console.table(data);
    console.log("====================================");

    return NextResponse.json(data);
  } catch (error) {
    console.error("====================================");
    console.error("IMAGE UPLOAD FAILED");
    console.error(error);
    console.error("====================================");

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : JSON.stringify(error),
      },
      {
        status: 500,
      }
    );
  }
}