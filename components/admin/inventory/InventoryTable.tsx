import Link from "next/link";

import InventoryStatusBadge from "./InventoryStatusBadge";

type InventoryRow = {
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

type InventoryTableProps = {
  inventory: InventoryRow[];
};

export default function InventoryTable({
  inventory,
}: InventoryTableProps) {

  return (

    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-gray-50">

          <tr className="border-b text-left text-sm font-semibold text-gray-600">

            <th className="px-6 py-4">
              Product
            </th>

            <th className="px-6 py-4">
              SKU
            </th>

            <th className="px-6 py-4 text-center">
              Stock
            </th>

            <th className="px-6 py-4 text-center">
              Reserved
            </th>

            <th className="px-6 py-4 text-center">
              Available
            </th>

            <th className="px-6 py-4 text-center">
              Status
            </th>

            <th className="px-6 py-4 text-center">
              Threshold
            </th>

            <th className="px-6 py-4 text-center">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {inventory.map((item) => {

            const available =
              item.quantity -
              item.reserved_quantity;

            return (

              <tr
                key={item.id}
                className="border-b transition hover:bg-gray-50"
              >

                <td className="px-6 py-4 font-medium">

                  {item.product_variants.products.name}

                </td>

                <td className="px-6 py-4 text-gray-600">

                  {item.product_variants.sku}

                </td>

                <td className="px-6 py-4 text-center">

                  {item.quantity}

                </td>

                <td className="px-6 py-4 text-center">

                  {item.reserved_quantity}

                </td>

                <td className="px-6 py-4 text-center font-semibold">

                  {available}

                </td>

                <td className="px-6 py-4 text-center">

                  <InventoryStatusBadge
                    quantity={
                      item.quantity
                    }
                    reservedQuantity={
                      item.reserved_quantity
                    }
                    lowStockThreshold={
                      item.low_stock_threshold
                    }
                    allowBackorder={
                      item.allow_backorder
                    }
                  />

                </td>

                <td className="px-6 py-4 text-center">

                  {item.low_stock_threshold}

                </td>

                <td className="px-6 py-4 text-center">

                  <Link
                    href={`/admin/inventory/${item.product_variants.id}`}
                    className="
                      inline-flex
                      rounded-lg
                      border
                      border-gray-300
                      px-4
                      py-2
                      text-sm
                      font-medium
                      transition
                      hover:bg-gray-100
                    "
                  >

                    Manage

                  </Link>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>

  );

}