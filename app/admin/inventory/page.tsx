import { getInventoryDashboard } from "@/lib/inventory/queries";

import InventoryDashboard from "@/components/admin/inventory/InventoryDashboard";

export default async function InventoryPage() {

  const inventory =
    await getInventoryDashboard();

  return (

    <div className="p-8">

      <div className="mb-8">

        <h1 className="text-3xl font-light">
          Inventory
        </h1>

        <p className="mt-2 text-gray-500">
          Manage stock levels across all products.
        </p>

      </div>

      <InventoryDashboard
        inventory={inventory}
      />

    </div>

  );

}