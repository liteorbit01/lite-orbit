import {
  getInventoryByVariant,
  updateInventory,
} from "./service";

import {
  createInventoryHistory,
} from "./history";

export async function decreaseInventory(
  variantId: string,
  quantityPurchased: number
) {

  const inventory =
    await getInventoryByVariant(
      variantId
    );

  if (!inventory) {

    throw new Error(
      `Inventory not found for ${variantId}`
    );

  }

  if (
    inventory.quantity <
    quantityPurchased
  ) {

    throw new Error(
      `Insufficient inventory for ${variantId}`
    );

  }

  const newQuantity =
    inventory.quantity -
    quantityPurchased;

  await updateInventory(
    variantId,
    newQuantity
  );

  await createInventoryHistory(

    variantId,

    -quantityPurchased,

    newQuantity,

    "decrease",

    "Customer purchase"

  );

  return newQuantity;

}