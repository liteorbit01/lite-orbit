import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

import { stripe } from "@/lib/stripe/stripe";

import { createOrder } from "@/lib/orders/service";
import { createOrderItems } from "@/lib/orders/items";

import {
  getCartItemsByCartId,
  clearCartById,
  completeCartById,
} from "@/lib/cart/service";

export async function POST(
  request: Request
) {
  const body =
    await request.text();

  const signature =
    (await headers()).get(
      "stripe-signature"
    );

  if (!signature) {
    return NextResponse.json(
      {
        error:
          "Missing Stripe signature.",
      },
      {
        status: 400,
      }
    );
  }

  try {

    const event =
      stripe.webhooks.constructEvent(
        body,
        signature,
        process.env
          .STRIPE_WEBHOOK_SECRET!
      );

    console.log(
      "Stripe Event:",
      event.type
    );

    switch (event.type) {

      case "checkout.session.completed": {

        const session =
          event.data.object as Stripe.Checkout.Session;

        const cartId =
          session.metadata?.cart_id;

        console.log(
          "Webhook cartId:",
          cartId
        );

        if (!cartId) {
          throw new Error(
            "Missing cart_id in Stripe metadata."
          );
        }

        const cart =
          await getCartItemsByCartId(
            cartId
          );

        console.log(
          "Cart items found:",
          cart.items.length
        );

        const order =
          await createOrder({

            customerId: null,

            cartId,

            stripeSessionId:
              session.id,

            stripePaymentIntent:
              String(
                session.payment_intent
              ),

            currencyCode:
              (
                session.currency ??
                "cad"
              ).toUpperCase(),

            subtotal:
              (
                session.amount_subtotal ??
                0
              ) / 100,

            shippingTotal:
              (
                session.total_details
                  ?.amount_shipping ??
                0
              ) / 100,

            taxTotal:
              (
                session.total_details
                  ?.amount_tax ??
                0
              ) / 100,

            discountTotal:
              (
                session.total_details
                  ?.amount_discount ??
                0
              ) / 100,

            grandTotal:
              (
                session.amount_total ??
                0
              ) / 100,

            notes: null,

          });

        console.log(
          "Order created:",
          order.order_number
        );

        await createOrderItems(
          order.id,
          cart.items
        );

        console.log(
          "Order items created."
        );

        await clearCartById(
          cartId
        );

        console.log(
          "Cart items cleared."
        );

        await completeCartById(
          cartId
        );

        console.log(
          "Cart marked completed."
        );

        break;
      }

      default:

        console.log(
          `Unhandled event ${event.type}`
        );

    }

    return NextResponse.json({
      received: true,
    });

  } catch (error) {

    console.error(
      "Webhook Error:",
      error
    );

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