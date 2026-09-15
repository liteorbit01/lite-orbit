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

    const {
      sku,
      size,
      color,
      material,
      barcode,
      weight,
      price,
      compareAtPrice,
      costPrice,
      active,
    } = body;

    if (!sku) {
      return NextResponse.json(
        {
          error: "SKU is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return NextResponse.json(
        {
          error: "Price is required.",
        },
        {
          status: 400,
        }
      );
    }

    const { data, error } =
      await supabaseAdmin
        .from("product_variants")
        .update({
          sku,
          size: size || null,
          color: color || null,
          material: material || null,
          barcode: barcode || null,
          weight:
            weight === ""
              ? null
              : Number(weight),
          price: Number(price),
          compare_at_price:
            compareAtPrice === ""
              ? null
              : Number(compareAtPrice),
          cost_price:
            costPrice === ""
              ? null
              : Number(costPrice),
          active,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
      throw error;
    }

    console.log(
      "Variant updated successfully."
    );

    console.table(data);

    return NextResponse.json(data);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unable to update variant.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const { error } =
      await supabaseAdmin
        .from("product_variants")
        .delete()
        .eq("id", id);

    if (error) {
      throw error;
    }

    console.log(
      "Variant deleted successfully."
    );

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
            : "Unable to delete variant.",
      },
      {
        status: 500,
      }
    );
  }
}