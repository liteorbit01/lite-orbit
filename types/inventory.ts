/* =======================================================
   CORE PRODUCT TYPES
======================================================= */

export type Product = {
  id: string;

  name: string;
};

export type ProductVariant = {
  id: string;

  sku: string;

  products: Product;
};

/* =======================================================
   INVENTORY
======================================================= */

export type InventoryItem = {
  id: string;

  quantity: number;

  reserved_quantity: number;

  low_stock_threshold: number;

  reorder_quantity: number;

  allow_backorder: boolean;

  product_variants: ProductVariant;
};

/*
 * Alias used by tables.
 * Keeps future flexibility if
 * table-specific fields are added.
 */

export type InventoryRow =
  InventoryItem;

/* =======================================================
   INVENTORY STATUS
======================================================= */

export type InventoryStatus =

  | "in_stock"

  | "low_stock"

  | "out_of_stock"

  | "backordered";

export type InventoryStatusInfo = {

  status: InventoryStatus;

  label: string;

  badgeClass: string;

};

/* =======================================================
   SUMMARY
======================================================= */

export type InventorySummary = {

  totalProducts: number;

  inStock: number;

  lowStock: number;

  outOfStock: number;

  backordered: number;

};

/* =======================================================
   ANALYTICS
======================================================= */

export type InventoryAnalytics = {

  totalQuantity: number;

  totalReserved: number;

  totalAvailable: number;

  inventoryValue?: number;

  averageStock?: number;

};

/* =======================================================
   LOW STOCK ALERT
======================================================= */

export type LowStockAlert = {

  id: string;

  productName: string;

  sku: string;

  available: number;

  threshold: number;

};

/* =======================================================
   REORDER SUGGESTION
======================================================= */

export type ReorderSuggestion = {

  id: string;

  productName: string;

  sku: string;

  currentQuantity: number;

  reorderQuantity: number;

};

/* =======================================================
   INVENTORY HISTORY
======================================================= */

export type InventoryHistoryItem = {

  id: string;

  action: string;

  quantity_before: number;

  quantity_after: number;

  notes: string | null;

  created_at: string;

};

/* =======================================================
   FILTERS
======================================================= */

export type InventoryStatusFilter =

  | "all"

  | InventoryStatus;

export type InventorySortField =

  | "product"

  | "sku"

  | "stock"

  | "reserved"

  | "available"

  | "threshold"

  | "status";

export type InventorySortDirection =

  | "asc"

  | "desc";

/* =======================================================
   DASHBOARD PREFERENCES
======================================================= */

export type InventoryDashboardPreferences = {

  search: string;

  status: InventoryStatusFilter;

};