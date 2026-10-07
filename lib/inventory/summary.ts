import {
  getInventoryStatus,
} from "./status";

export type InventorySummary = {
  totalProducts: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  backordered: number;
};

type InventoryItem = {
  quantity: number;
  reserved_quantity: number;
  low_stock_threshold: number;
  allow_backorder: boolean;
};

export function buildInventorySummary(
  inventory: InventoryItem[]
): InventorySummary {

  const summary: InventorySummary = {
    totalProducts: inventory.length,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
    backordered: 0,
  };

  inventory.forEach((item) => {

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

    switch (
      status.status
    ) {

      case "in_stock":

        summary.inStock++;

        break;

      case "low_stock":

        summary.lowStock++;

        break;

      case "out_of_stock":

        summary.outOfStock++;

        break;

      case "backordered":

        summary.backordered++;

        break;

    }

  });

  return summary;

}