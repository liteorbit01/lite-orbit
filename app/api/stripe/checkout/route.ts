import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/stripe";

import { getCartItems } from "@/lib/cart/actions";

export async function POST() {
  try {

    const cart =
      await getCartItems();

    const lineItems =
      cart.items.map((item) => ({

        price_data: {

          currency: "cad",

          product_data: {

            name: item.product_name,

            description: [
              item.size,
              item.color,
            ]
              .filter(Boolean)
              .join(" • "),

            images:
              item.image_url
                ? [item.image_url]
                : [],

          },

          unit_amount:
            Math.round(
              item.price * 100
            ),

        },

        quantity:
          item.quantity,

      }));

    return NextResponse.json({
      lineItems,
      subtotal:
        cart.summary.subtotal,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Unable to build Stripe line items.",
      },
      {
        status: 500,
      }
    );

  }
}