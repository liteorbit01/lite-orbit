import type {
  CartProduct,
} from "@/app/cart/types";

// ======================================================
// Cart Calculations
// ======================================================

export function calculateSubtotal(
  items: CartProduct[]
): number {
  return items.reduce(
    (total, item) =>
      total + item.subtotal,
    0
  );
}

export function calculateItemCount(
  items: CartProduct[]
): number {
  return items.reduce(
    (count, item) =>
      count + item.quantity,
    0
  );
}

export function calculateCartSummary(
  items: CartProduct[]
) {
  return {
    subtotal:
      calculateSubtotal(items),

    itemCount:
      calculateItemCount(items),
  };
}