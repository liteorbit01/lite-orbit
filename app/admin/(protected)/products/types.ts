export type ProductStatus =
  | "draft"
  | "published";

export type ProductSize = {
  size: string;
  price: number;
  inventory: number;
};

export type ProductFormData = {
  id?: string;
  name: string;
  productCode: string;
  slug: string;
  description: string;
  categoryId: string;
  collectionId: string;
  images: string[];
  sizes: ProductSize[];
  status: ProductStatus;
};

export type ProductListItem = {
  id: string;
  name: string;
  productCode: string;
  slug: string;
  category: string;
  collection: string;
  status: ProductStatus;
  featured: boolean;
  createdAt: string;
};

export type CategoryOption = {
  id: string;
  name: string;
};

export type CollectionOption = {
  id: string;
  name: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  image_type: string;
  display_order: number;
  created_at: string;
};

export type ProductVariant = {
  id: string;
  product_id: string;
  sku: string;
  size: string | null;
  color: string | null;
  material: string | null;
  barcode: string | null;
  weight: number | null;
  price: number;
  compare_at_price: number | null;
  cost_price: number | null;
  stock_quantity: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type VariantFormData = {
  sku: string;
  size: string;
  color: string;
  material: string;
  barcode: string;
  weight: number | null;
  price: number;
  compareAtPrice: number | null;
  costPrice: number | null;
  active: boolean;
};

export type InventoryHistoryItem = {
  id: string;
  variant_id: string;
  quantity_change: number;
  stock_after: number;
  action: string;
  notes: string | null;
  created_at: string;
  product_variants: {
    sku: string;
    size: string | null;
  } | null;
};