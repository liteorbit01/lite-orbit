import {
  getInventoryStatus,
} from "./status";

export type ReorderPriority =
  | "critical"
  | "high"
  | "medium";

export type ReorderSuggestion = {
  id: string;
  variantId: string;
  productName: string;
  sku: string;

  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;

  lowStockThreshold: number;
  reorderQuantity: number;

  shouldReorder: boolean;

  priority: ReorderPriority;

  reason: string;
};

type InventoryItem = {
  id: string;

  quantity: number;

  reserved_quantity: number;

  low_stock_threshold: number;

  reorder_quantity: number;

  allow_backorder: boolean;

  product_variants: {
    id: string;

    sku: string;

    products: {
      name: string;
    };
  };
};

export function buildReorderSuggestions(
  inventory: InventoryItem[]
): ReorderSuggestion[] {

  return inventory

    .map((item) => {

      const availableQuantity =
        item.quantity -
        item.reserved_quantity;

      const status =
        getInventoryStatus({

          quantity:
            item.quantity,

          reservedQuantity:
            item.reserved_quantity,

          lowStockThreshold:
            item.low_stock_threshold,

          allowBackorder:
            item.allow_backorder,

        });

      let shouldReorder =
        false;

      let priority:
        ReorderPriority =
          "medium";

      let reason =
        "";

      switch (
        status.status
      ) {

        case "out_of_stock":

          shouldReorder =
            true;

          priority =
            "critical";

          reason =
            "Product is out of stock.";

          break;

        case "low_stock":

          shouldReorder =
            true;

          priority =
            "high";

          reason =
            "Available stock is below the configured threshold.";

          break;

        case "backordered":

          shouldReorder =
            true;

          priority =
            "critical";

          reason =
            "Backorders exist and inventory is unavailable.";

          break;

        default:

          shouldReorder =
            false;

          priority =
            "medium";

          reason =
            "Inventory level is healthy.";

      }

      return {

        id:
          item.id,

        variantId:
          item.product_variants.id,

        productName:
          item.product_variants.products.name,

        sku:
          item.product_variants.sku,

        quantity:
          item.quantity,

        reservedQuantity:
          item.reserved_quantity,

        availableQuantity,

        lowStockThreshold:
          item.low_stock_threshold,

        reorderQuantity:
          item.reorder_quantity,

        shouldReorder,

        priority,

        reason,

      };

    })

    .filter(
      (item) =>
        item.shouldReorder
    )

    .sort((a, b) => {

      const priorityOrder = {
        critical: 0,
        high: 1,
        medium: 2,
      };

      if (
        priorityOrder[a.priority] !==
        priorityOrder[b.priority]
      ) {

        return (
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
        );

      }

      if (
        a.availableQuantity !==
        b.availableQuantity
      ) {

        return (
          a.availableQuantity -
          b.availableQuantity
        );

      }

      return a.productName.localeCompare(
        b.productName
      );

    });

}