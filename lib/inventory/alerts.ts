import {
  getInventoryStatus,
  InventoryStatus,
} from "./status";

export type LowStockAlert = {
  id: string;
  variantId: string;
  productName: string;
  sku: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  lowStockThreshold: number;
  reorderQuantity: number;
  allowBackorder: boolean;
  status: InventoryStatus;
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

export function buildLowStockAlerts(
  inventory: InventoryItem[]
): LowStockAlert[] {

  return inventory

    .map((item) => {

      const availableQuantity =
        item.quantity -
        item.reserved_quantity;

      const inventoryStatus =
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

      return {

        id: item.id,

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

        allowBackorder:
          item.allow_backorder,

        status:
          inventoryStatus.status,

      };

    })

    .filter(

      (item) =>

        item.status ===
          "low_stock" ||

        item.status ===
          "out_of_stock"

    )

    .sort(

      (a, b) =>

        a.availableQuantity -
        b.availableQuantity

    );

}