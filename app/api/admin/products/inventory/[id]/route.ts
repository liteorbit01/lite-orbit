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

    // ------------------------------------
    // Load current variant
    // ------------------------------------

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

    const currentStock =
      variant.stock_quantity ?? 0;

    let newStock = currentStock;

    let quantityChange = 0;

    if (direction === "increase") {
      newStock += 1;
      quantityChange = 1;
    }

    if (direction === "decrease") {
      if (currentStock > 0) {
        newStock -= 1;
        quantityChange = -1;
      }
    }

    // ------------------------------------
    // Update variant stock
    // ------------------------------------

    const {
      data,
      error: updateError,
    } = await supabaseAdmin
      .from("product_variants")
      .update({
        stock_quantity: newStock,
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      throw updateError;
    }

    // ------------------------------------
    // Record inventory history
    // ------------------------------------

    const {
      error: historyError,
    } = await supabaseAdmin
      .from("inventory_history")
      .insert({
        variant_id: id,
        quantity_change:
          quantityChange,
        stock_after: newStock,
        action: direction,
        notes:
          direction ===
          "increase"
            ? "Manual stock increase"
            : "Manual stock decrease",
      });

    if (historyError) {
      throw historyError;
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