import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const direction =
      body.direction as
        | "increase"
        | "decrease";

    // Load current stock
    const {
      data: variant,
      error: loadError,
    } = await supabaseAdmin
      .from("product_variants")
      .select(
        "id, stock_quantity"
      )
      .eq("id", id)
      .single();

    if (loadError || !variant) {
      return NextResponse.json(
        {
          error:
            "Variant not found.",
        },
        {
          status: 404,
        }
      );
    }

    let stock =
      variant.stock_quantity ?? 0;

    if (direction === "increase") {
      stock += 1;
    }

    if (direction === "decrease") {
      stock = Math.max(
        0,
        stock - 1
      );
    }

    const {
      data,
      error: updateError,
    } = await supabaseAdmin
      .from("product_variants")
      .update({
        stock_quantity: stock,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    return NextResponse.json(
      data
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update inventory.",
      },
      {
        status: 500,
      }
    );
  }
}