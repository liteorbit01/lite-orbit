
import type { Database } from "./database.types";

export type ProductStatus =
  Database["public"]["Enums"]["product_status"];

export type {
  ProductSize,
  ProductFormData,
  ProductListItem,
  CategoryOption,
  CollectionOption,
  ProductImage,
  ProductVariant,
  VariantFormData,
  InventoryHistoryItem,
} from "@/app/admin/(protected)/products/types";
