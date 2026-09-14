import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const { data: image, error } =
      await supabaseAdmin
        .from("product_images")
        .select("id, image_url")
        .eq("id", id)
        .single();

    if (error || !image) {
      return NextResponse.json(
        {
          error: "Image not found.",
        },
        {
          status: 404,
        }
      );
    }

    const marker = "/products/";

    const index =
      image.image_url.indexOf(marker);

    if (index >= 0) {
      const storagePath =
        image.image_url.substring(
          index + marker.length
        );

      const { error: storageError } =
        await supabaseAdmin.storage
          .from("products")
          .remove([storagePath]);

      if (storageError) {
        console.error(storageError);
      }
    }

    const { error: deleteError } =
      await supabaseAdmin
        .from("product_images")
        .delete()
        .eq("id", id);

    if (deleteError) {
      throw deleteError;
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Delete failed.",
      },
      {
        status: 500,
      }
    );
  }
}