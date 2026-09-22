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

    const {
      operation,
      quantity,
      reason,
      notes,
    } = await request.json();

    if (
      operation !== "add" &&
      operation !== "remove"
    ) {
      return NextResponse.json(
        {
          error:
            "Invalid operation.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Quantity must be greater than zero.",
        },
        {
          status: 400,
        }
      );
    }

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

    if (
      loadError ||
      !variant
    ) {
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

    let newStock =
      currentStock;

    let quantityChange =
      quantity;

    if (
      operation === "add"
    ) {
      newStock =
        currentStock +
        quantity;
    } else {
      if (
        quantity >
        currentStock
      ) {
        return NextResponse.json(
          {
            error:
              "Cannot remove more stock than available.",
          },
          {
            status: 400,
          }
        );
      }

      newStock =
        currentStock -
        quantity;

      quantityChange =
        -quantity;
    }

    const {
      error: updateError,
    } = await supabaseAdmin
      .from(
        "product_variants"
      )
      .update({
        stock_quantity:
          newStock,
      })
      .eq("id", id);

    if (updateError) {
      throw updateError;
    }

    const {
      error: historyError,
    } = await supabaseAdmin
      .from(
        "inventory_history"
      )
      .insert({
        variant_id: id,
        quantity_change:
          quantityChange,
        stock_after:
          newStock,
        action: reason,
        notes:
          notes || null,
      });

    if (historyError) {
      throw historyError;
    }

    return NextResponse.json({
      success: true,
      stock:
        newStock,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof
          Error
            ? error.message
            : "Unable to adjust inventory.",
      },
      {
        status: 500,
      }
    );
  }
}