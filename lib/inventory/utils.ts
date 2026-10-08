import { getInventoryStatus } from "./status";

/* -------------------------------- */

export function getAvailableQuantity(
  quantity: number,
  reservedQuantity: number
): number {

  return Math.max(
    quantity - reservedQuantity,
    0
  );

}

/* -------------------------------- */

export function isInStock(
  quantity: number,
  reservedQuantity: number
): boolean {

  return (
    getAvailableQuantity(
      quantity,
      reservedQuantity
    ) > 0
  );

}

/* -------------------------------- */

export function isOutOfStock(
  quantity: number,
  reservedQuantity: number
): boolean {

  return (
    getAvailableQuantity(
      quantity,
      reservedQuantity
    ) === 0
  );

}

/* -------------------------------- */

export function isLowStock(
  quantity: number,
  reservedQuantity: number,
  lowStockThreshold: number
): boolean {

  const available =
    getAvailableQuantity(
      quantity,
      reservedQuantity
    );

  return (

    available > 0 &&

    available <=
      lowStockThreshold

  );

}

/* -------------------------------- */

export function isBackordered(
  quantity: number,
  reservedQuantity: number,
  allowBackorder: boolean
): boolean {

  return (

    allowBackorder &&

    isOutOfStock(
      quantity,
      reservedQuantity
    )

  );

}

/* -------------------------------- */

export function needsReorder(
  quantity: number,
  reservedQuantity: number,
  lowStockThreshold: number
): boolean {

  return isLowStock(

    quantity,

    reservedQuantity,

    lowStockThreshold

  );

}

/* -------------------------------- */

export function getInventoryHealth(
  quantity: number,
  reservedQuantity: number,
  lowStockThreshold: number,
  allowBackorder: boolean
) {

  const available =
    getAvailableQuantity(

      quantity,

      reservedQuantity

    );

  const status =
    getInventoryStatus({

      quantity,

      reservedQuantity,

      lowStockThreshold,

      allowBackorder,

    });

  return {

    available,

    status,

    inStock:
      isInStock(

        quantity,

        reservedQuantity

      ),

    outOfStock:
      isOutOfStock(

        quantity,

        reservedQuantity

      ),

    lowStock:
      isLowStock(

        quantity,

        reservedQuantity,

        lowStockThreshold

      ),

    backordered:
      isBackordered(

        quantity,

        reservedQuantity,

        allowBackorder

      ),

    needsReorder:
      needsReorder(

        quantity,

        reservedQuantity,

        lowStockThreshold

      ),

  };

}
/* -------------------------------- */

export function hasReservedInventory(
  reservedQuantity: number
): boolean {

  return reservedQuantity > 0;

}

/* -------------------------------- */

export function getStockPercentage(
  quantity: number,
  reservedQuantity: number
): number {

  if (quantity <= 0) {

    return 0;

  }

  return Math.round(

    (
      getAvailableQuantity(
        quantity,
        reservedQuantity
      ) /
      quantity
    ) * 100

  );

}

/* -------------------------------- */

export function getReservedPercentage(
  quantity: number,
  reservedQuantity: number
): number {

  if (quantity <= 0) {

    return 0;

  }

  return Math.round(

    (
      reservedQuantity /
      quantity
    ) * 100

  );

}

/* -------------------------------- */

export function shouldHighlightRow(
  quantity: number,
  reservedQuantity: number,
  lowStockThreshold: number,
  allowBackorder: boolean
): boolean {

  return (

    isLowStock(

      quantity,

      reservedQuantity,

      lowStockThreshold

    ) ||

    isBackordered(

      quantity,

      reservedQuantity,

      allowBackorder

    )

  );

}
/* -------------------------------- */

export function getInventoryStatusKey(
  quantity: number,
  reservedQuantity: number,
  lowStockThreshold: number,
  allowBackorder: boolean
) {

  return getInventoryHealth(

    quantity,

    reservedQuantity,

    lowStockThreshold,

    allowBackorder

  ).status.status;

}

/* -------------------------------- */

export function getInventoryStatusLabel(
  quantity: number,
  reservedQuantity: number,
  lowStockThreshold: number,
  allowBackorder: boolean
) {

  return getInventoryHealth(

    quantity,

    reservedQuantity,

    lowStockThreshold,

    allowBackorder

  ).status.label;

}

/* -------------------------------- */

export function getInventoryBadgeClass(
  quantity: number,
  reservedQuantity: number,
  lowStockThreshold: number,
  allowBackorder: boolean
) {

  return getInventoryHealth(

    quantity,

    reservedQuantity,

    lowStockThreshold,

    allowBackorder

  ).status.badgeClass;

}