import { NextResponse } from "next/server";

import {
  receiveShipment,
  adjustStock,
} from "@/lib/inventory/transaction";

export async function POST(
  request: Request
) {
  try {

    const body =
      await request.json();

    const {
      variantId,
      operation,
    } = body;

    switch (operation) {

      /* ===========================================
         RECEIVE SHIPMENT
      =========================================== */

      case "receive": {

        const result =
          await receiveShipment(

            variantId,

            body.quantity,

            body.supplier,

            body.reference,

            body.notes

          );

        return NextResponse.json({

          success: true,

          operation,

          ...result,

        });

      }

      /* ===========================================
         STOCK ADJUSTMENT
      =========================================== */

      case "adjustment": {

        const result =
          await adjustStock(

            variantId,

            body.adjustmentType,

            body.quantity,

            body.reason,

            body.notes

          );

        return NextResponse.json({

          success: true,

          operation,

          ...result,

        });

      }

      /* ===========================================
         UNKNOWN OPERATION
      =========================================== */

      default:

        return NextResponse.json(

          {

            success: false,

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