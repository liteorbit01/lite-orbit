import { NextResponse } from "next/server";

import { getCartItems } from "@/lib/cart/actions";

export async function POST() {
  try {
    const cart = await getCartItems();

    return NextResponse.json(cart);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Unable to load shopping cart.",
      },
      {
        status: 500,
      }
    );
  }
}