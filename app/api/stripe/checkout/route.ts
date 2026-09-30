import {
  getExistingCart,
} from "@/lib/cart/service";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/stripe";

import {
  getExistingCartItems,
} from "@/lib/cart/service";

export async function POST() {
  try {

    const cart =
      await getExistingCartItems();
      const shoppingCart =
  await getExistingCart();

if (!shoppingCart) {
  return NextResponse.json(
    {
      error: "Shopping cart not found.",
    },
    {
      status: 400,
    }
  );
}

    if (cart.items.length === 0) {
      return NextResponse.json(
        {
          error: "Shopping cart is empty.",
        },
        {
          status: 400,
        }
      );
    }

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

    const session =
      await stripe.checkout.sessions.create({

        mode: "payment",
        customer_creation: "always",

        billing_address_collection: "required",

        phone_number_collection: {
        enabled: true,
          },

              metadata: {

                cart_id:
                shoppingCart.id,

        },

        payment_method_types: [
          "card",
        ],

        line_items:
          lineItems,

        success_url:
          "http://localhost:3000/payment/success",

        cancel_url:
          "http://localhost:3000/payment/cancelled",

      });

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Unable to create Stripe Checkout session.",
      },
      {
        status: 500,
      }
    );

  }
}