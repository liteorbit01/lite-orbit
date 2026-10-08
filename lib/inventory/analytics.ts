import {
  getInventoryStatus,
} from "./status";

export type InventoryAnalytics = {
  stock: {
    totalUnits: number;
    availableUnits: number;
    reservedUnits: number;
    averageUnits: number;
  };

  products: {
    total: number;
    inStock: number;
    lowStock: number;
    outOfStock: number;
    backordered: number;
    lowStockPercentage: number;
    outOfStockPercentage: number;
  };

  health: {
    score: number;
    label: string;
  };
};

type InventoryItem = {
  quantity: number;

  reserved_quantity: number;

  low_stock_threshold: number;

  allow_backorder: boolean;
};

export function buildInventoryAnalytics(
  inventory: InventoryItem[]
): InventoryAnalytics {

  const totalProducts =
    inventory.length;

  let totalUnits = 0;

  let reservedUnits = 0;

  let availableUnits = 0;

  let inStock = 0;

  let lowStock = 0;

  let outOfStock = 0;

  let backordered = 0;

  inventory.forEach((item) => {

    totalUnits +=
      item.quantity;

    reservedUnits +=
      item.reserved_quantity;

    availableUnits +=
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

    switch (
      status.status
    ) {

      case "in_stock":

        inStock++;

        break;

      case "low_stock":

        lowStock++;

        break;

      case "out_of_stock":

        outOfStock++;

        break;

      case "backordered":

        backordered++;

        break;

    }

  });

  const averageUnits =
    totalProducts === 0
      ? 0
      : Number(
          (
            totalUnits /
            totalProducts
          ).toFixed(1)
        );

  const lowStockPercentage =
    totalProducts === 0
      ? 0
      : Number(
          (
            (lowStock /
              totalProducts) *
            100
          ).toFixed(1)
        );

  const outOfStockPercentage =
    totalProducts === 0
      ? 0
      : Number(
          (
            (outOfStock /
              totalProducts) *
            100
          ).toFixed(1)
        );

  const healthyProducts =
    inStock + backordered;

  const healthScore =
    totalProducts === 0
      ? 100
      : Number(
          (
            (healthyProducts /
              totalProducts) *
            100
          ).toFixed(1)
        );

  let healthLabel =
    "Healthy";

  if (
    healthScore < 90
  ) {

    healthLabel =
      "Needs Attention";

  }

  if (
    healthScore < 75
  ) {

    healthLabel =
      "Critical";

  }

  return {

    stock: {

      totalUnits,

      availableUnits,

      reservedUnits,

      averageUnits,

    },

    products: {

      total:
        totalProducts,

      inStock,

      lowStock,

      outOfStock,

      backordered,

      lowStockPercentage,

      outOfStockPercentage,

    },

    health: {

      score:
        healthScore,

      label:
        healthLabel,

    },

  };

}