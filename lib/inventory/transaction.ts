import {
  getInventoryByVariant,
  updateInventory,
} from "./service";

import {
  createInventoryHistory,
  InventoryAction,
} from "./history";

/* ===========================================================
   CORE INVENTORY ENGINE
=========================================================== */

async function changeInventory(
  variantId: string,
  quantityChange: number,
  action: InventoryAction,
  notes?: string
) {

  const inventory =
    await getInventoryByVariant(
      variantId
    );

  if (!inventory) {
    throw new Error(
      "Inventory not found."
    );
  }

  const newQuantity =
    inventory.quantity +
    quantityChange;

  if (newQuantity < 0) {
    throw new Error(
      "Inventory cannot become negative."
    );
  }

  await updateInventory(
    variantId,
    newQuantity
  );

  await createInventoryHistory(
    variantId,
    quantityChange,
    newQuantity,
    action,
    notes
  );

  return {
    previousQuantity:
      inventory.quantity,
    newQuantity,
    quantityChange,
  };

}

/* ===========================================================
   RECEIVE SHIPMENT
=========================================================== */

export async function receiveShipment(
  variantId: string,
  quantity: number,
  supplier: string,
  reference: string,
  notes?: string
) {

  if (quantity <= 0) {
    throw new Error(
      "Quantity must be greater than zero."
    );
  }

  return changeInventory(
    variantId,
    quantity,
    "shipment",
    [
      supplier
        ? `Supplier: ${supplier}`
        : null,
      reference
        ? `Reference: ${reference}`
        : null,
      notes || null,
    ]
      .filter(Boolean)
      .join(" | ")
  );

}

/* ===========================================================
   STOCK ADJUSTMENT
=========================================================== */

export async function adjustStock(
  variantId: string,
  adjustmentType:
    | "increase"
    | "decrease",
  quantity: number,
  reason: string,
  notes?: string
) {

  if (quantity <= 0) {
    throw new Error(
      "Quantity must be greater than zero."
    );
  }

  const quantityChange =
    adjustmentType ===
    "increase"
      ? quantity
      : -quantity;

  return changeInventory(
    variantId,
    quantityChange,
    "adjustment",
    [
      `Reason: ${reason}`,
      notes || null,
    ]
      .filter(Boolean)
      .join(" | ")
  );

}

/* ===========================================================
   DAMAGE / LOSS
=========================================================== */

export async function recordDamage(
  variantId: string,
  quantity: number,
  reason:
    | "Damaged"
    | "Lost"
    | "Expired"
    | "Returned Unsellable"
    | "Other",
  notes?: string
) {

  if (quantity <= 0) {
    throw new Error(
      "Quantity must be greater than zero."
    );
  }

  return changeInventory(
    variantId,
    -quantity,
    "damage",
    [
      `Reason: ${reason}`,
      notes || null,
    ]
      .filter(Boolean)
      .join(" | ")
  );

}

/* ===========================================================
   INVENTORY COUNT
=========================================================== */

export async function countInventory(
  variantId: string,
  actualQuantity: number,
  notes?: string
) {

  if (actualQuantity < 0) {
    throw new Error(
      "Actual quantity cannot be negative."
    );
  }

  const inventory =
    await getInventoryByVariant(
      variantId
    );

  if (!inventory) {
    throw new Error(
      "Inventory not found."
    );
  }

  const difference =
    actualQuantity -
    inventory.quantity;

  if (difference === 0) {

    return {
      previousQuantity:
        inventory.quantity,
      newQuantity:
        inventory.quantity,
      quantityChange: 0,
    };

  }

  return changeInventory(

    variantId,

    difference,

    "inventory_count",

    [
      `Physical Count: ${actualQuantity}`,
      notes || null,
    ]
      .filter(Boolean)
      .join(" | ")

  );

}