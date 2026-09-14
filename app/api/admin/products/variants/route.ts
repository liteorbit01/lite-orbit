import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      productId,
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

    // Validation
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
        .insert({
          product_id: productId,
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
        .select()
        .single();

    if (error) {
      throw error;
    }

    console.log(
      "Variant created successfully."
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
            : "Unable to create variant.",
      },
      {
        status: 500,
      }
    );
  }
}