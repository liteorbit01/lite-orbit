import { NextResponse } from "next/server";

import { receiveShipment } from "@/lib/inventory/transaction";

export async function POST(
  request: Request
) {
  try {

    const {
      variantId,
      operation,
      quantity,
      supplier,
      reference,
      notes,
    } = await request.json();

    switch (operation) {

      case "receive": {

        const result =
          await receiveShipment(
            variantId,
            quantity,
            supplier,
            reference,
            notes
          );

        return NextResponse.json({
          success: true,
          ...result,
        });

      }

      default:

        return NextResponse.json(
          {
            error:
              "Unsupported inventory operation.",
          },
          {
            status: 400,
          }
        );

    }

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Inventory transaction failed.",
      },
      {
        status: 500,
      }
    );

  }
}