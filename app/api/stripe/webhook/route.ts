import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe/stripe";

export async function POST(request: Request) {
  const body = await request.text();

  const signature =
    (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  try {
    const event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

    switch (event.type) {

      case "checkout.session.completed":

        console.log(
          "Checkout completed:",
          event.data.object.id
        );

        break;

      default:

        console.log(
          `Unhandled event ${event.type}`
        );

    }

    return NextResponse.json({
      received: true,
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error:
          "Invalid webhook signature.",
      },
      {
        status: 400,
      }
    );
  }
}