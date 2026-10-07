export type InventoryStatus =
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "backordered";

export type InventoryStatusResult = {
  status: InventoryStatus;
  label: string;
  color: string;
};

type InventoryStatusOptions = {
  quantity: number;
  reservedQuantity?: number;
  lowStockThreshold: number;
  allowBackorder?: boolean;
};

export function getInventoryStatus({
  quantity,
  reservedQuantity = 0,
  lowStockThreshold,
  allowBackorder = false,
}: InventoryStatusOptions): InventoryStatusResult {

  const available =
    quantity - reservedQuantity;

  if (available <= 0) {

    if (allowBackorder) {

      return {
        status: "backordered",
        label: "Backordered",
        color:
          "bg-purple-100 text-purple-700",
      };

    }

    return {
      status: "out_of_stock",
      label: "Out of Stock",
      color:
        "bg-red-100 text-red-700",
    };

  }

  if (
    available <= lowStockThreshold
  ) {

    return {
      status: "low_stock",
      label: "Low Stock",
      color:
        "bg-yellow-100 text-yellow-700",
    };

  }

  return {

    status: "in_stock",

    label: "In Stock",

    color:
      "bg-green-100 text-green-700",

  };

}