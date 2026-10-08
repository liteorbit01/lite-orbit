"use client";

import { memo } from "react";

import {
  InventoryAnalytics as InventoryAnalyticsData,
} from "@/lib/inventory/analytics";

type InventoryAnalyticsProps = {
  analytics: InventoryAnalyticsData;
};

type AnalyticsCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
};

const AnalyticsCard = memo(function AnalyticsCard({
  title,
  value,
  subtitle,
}: AnalyticsCardProps) {

  return (

    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="text-sm font-medium text-gray-500">

        {title}

      </div>

      <div className="mt-3 text-3xl font-bold">

        {value}

      </div>

      {subtitle && (

        <div className="mt-2 text-sm text-gray-500">

          {subtitle}

        </div>

      )}

    </div>

  );

});

function InventoryAnalytics({
  analytics,
}: InventoryAnalyticsProps) {

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h2 className="text-xl font-semibold">

          Inventory Analytics

        </h2>

        <p className="mt-1 text-gray-500">

          Key inventory performance indicators.

        </p>

      </div>

      {/* Stock */}

      <section>

        <h3 className="mb-4 text-lg font-semibold">

          📦 Stock

        </h3>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <AnalyticsCard
            title="Total Units"
            value={analytics.stock.totalUnits}
          />

          <AnalyticsCard
            title="Available Units"
            value={analytics.stock.availableUnits}
          />

          <AnalyticsCard
            title="Reserved Units"
            value={analytics.stock.reservedUnits}
          />

          <AnalyticsCard
            title="Average Units"
            value={analytics.stock.averageUnits}
            subtitle="Per product"
          />

        </div>

      </section>

      {/* Products */}

      <section>

        <h3 className="mb-4 text-lg font-semibold">

          📊 Products

        </h3>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">

          <AnalyticsCard
            title="Products"
            value={analytics.products.total}
          />

          <AnalyticsCard
            title="In Stock"
            value={analytics.products.inStock}
          />

          <AnalyticsCard
            title="Low Stock"
            value={analytics.products.lowStock}
            subtitle={`${analytics.products.lowStockPercentage}%`}
          />

          <AnalyticsCard
            title="Out of Stock"
            value={analytics.products.outOfStock}
            subtitle={`${analytics.products.outOfStockPercentage}%`}
          />

          <AnalyticsCard
            title="Backordered"
            value={analytics.products.backordered}
          />

        </div>

      </section>

      {/* Health */}

      <section>

        <h3 className="mb-4 text-lg font-semibold">

          ❤️ Inventory Health

        </h3>

        <div className="grid gap-6 md:grid-cols-2">

          <AnalyticsCard
            title="Health Score"
            value={`${analytics.health.score}%`}
          />

          <AnalyticsCard
            title="Status"
            value={analytics.health.label}
          />

        </div>

      </section>

    </div>

  );

}

export default memo(
  InventoryAnalytics
);