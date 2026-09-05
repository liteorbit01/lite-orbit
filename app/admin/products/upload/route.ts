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
        { error: "Product ID is required." },
        { status: 400 }
      );
    }

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Image file is required." },
        { status: 400 }
      );
    }

    const { publicUrl } = await uploadProductImage(
      productId,
      file
    );

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
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 }
    );
  }
}