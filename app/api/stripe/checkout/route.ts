import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/stripe";

export async function POST() {
  try {
    const session =
      await stripe.checkout.sessions.create({
        mode: "payment",

        payment_method_types: [
          "card",
        ],

        line_items: [
          {
            price_data: {
              currency: "cad",

              product_data: {
                name: "Lite Orbit Test Order",
              },

              unit_amount: 1000, // $10.00 CAD
            },

            quantity: 1,
          },
        ],

        success_url:
          "http://localhost:3000/payment/success",

        cancel_url:
          "http://localhost:3000/checkout",
      });

    return NextResponse.json({
      url: session.url,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Unable to create Stripe session",
      },
      {
        status: 500,
      }
    );
  }
}