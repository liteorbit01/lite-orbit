import {
  getInventoryStatus,
} from "@/lib/inventory/status";

type InventoryStatusBadgeProps = {
  quantity: number;
  reservedQuantity?: number;
  lowStockThreshold: number;
  allowBackorder?: boolean;
};

export default function InventoryStatusBadge({
  quantity,
  reservedQuantity = 0,
  lowStockThreshold,
  allowBackorder = false,
}: InventoryStatusBadgeProps) {

  const status =
    getInventoryStatus({

      quantity,

      reservedQuantity,

      lowStockThreshold,

      allowBackorder,

    });

  return (

    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${status.color}
      `}
    >

      {status.label}

    </span>

  );

}