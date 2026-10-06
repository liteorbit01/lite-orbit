import { getInventoryByVariant } from "@/lib/inventory/service";
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
      for (const item of cart.items) {

  const inventory =
    await getInventoryByVariant(
      item.variant_id
    );
    console.log(
  "Inventory check:",
  {
    variant: item.variant_id,
    available: inventory.quantity,
    requested: item.quantity,
  }
);

  if (!inventory) {

    return NextResponse.json(
      {
        error:
          "Inventory record not found.",
      },
      {
        status: 400,
      }
    );

  }

  if (
    inventory.quantity <
    item.quantity
  ) {

    return NextResponse.json(
      {
        error:
          `Only ${inventory.quantity} item(s) left in stock for ${item.product_name}.`,
      },
      {
        status: 400,
      }
    );

  }

}

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