import {
  getInventoryByVariant,
  updateInventory,
} from "./service";

import {
  createInventoryHistory,
} from "./history";

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
    quantity;

  await updateInventory(
    variantId,
    newQuantity
  );

  await createInventoryHistory(

    variantId,

    quantity,

    newQuantity,

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

  return {

    previousQuantity:
      inventory.quantity,

    newQuantity,

  };

}