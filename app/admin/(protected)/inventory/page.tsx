import { getInventoryDashboard } from "@/lib/inventory/queries";

import {
  buildInventorySummary,
} from "@/lib/inventory/summary";

import InventoryDashboard from "@/components/admin/inventory/InventoryDashboard";

import InventorySummaryCards from "@/components/admin/inventory/InventorySummaryCards";

export default async function InventoryPage() {

  const inventory =
    await getInventoryDashboard();

  const summary =
    buildInventorySummary(
      inventory
    );

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

      {/* Inventory Summary */}

      <div className="mb-8">

        <InventorySummaryCards
          summary={summary}
        />

      </div>

      {/* Inventory Dashboard */}

      <InventoryDashboard
        inventory={inventory}
      />

    </div>

  );

}