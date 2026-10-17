"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import type {
  ProductFormData,
  ProductListItem,
  CategoryOption,
  CollectionOption,
  ProductImage,
  ProductVariant,
  InventoryHistoryItem,
} from "./types";
import type { Database } from "@/types/database.types";


type ProductStatus =
  Database["public"]["Enums"]["product_status"];

const VALID_PRODUCT_STATUSES: ProductStatus[] = [
  "draft",
  "review",
  "published",
  "archived",
];

function parseProductStatus(
  value: FormDataEntryValue | null
): ProductStatus {
  const status = String(value ?? "").trim();

  if (
    VALID_PRODUCT_STATUSES.some(
      (allowed) => allowed === status
    )
  ) {
    return status as ProductStatus;
  }

  throw new Error("Invalid product status.");
}


/* =======================================
   Product Query Result
======================================= */

type ProductQueryResult = {
  id: string;

  name: string;

  product_code: string | null;

  slug: string;

  status: Database["public"]["Enums"]["product_status"];

  featured: boolean;

  created_at: string;

  categories: {
    name: string;
  } | null;

  collections: {
    name: string;
  } | null;
};

/* =======================================
   Products
======================================= */

export async function getProducts(): Promise<ProductListItem[]> {

  const supabase =
    supabaseAdmin;

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(`
      id,
      name,
      product_code,
      slug,
      status,
      featured,
      created_at,
      categories (
        name
      ),
      collections (
        name
      )
    `)
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {

    console.error(
      "Error loading products:",
      error.message
    );

    return [];

  }

  return (data ?? []).map(

    (
      product: ProductQueryResult
    ) => ({

      id:
        product.id,

      name:
        product.name,

      productCode:
        product.product_code ?? "",

      slug:
        product.slug,

      status:
        product.status,

      featured:
        product.featured,

      createdAt:
        product.created_at,

      category:
        product.categories?.name ??
        "-",

      collection:
        product.collections?.name ??
        "-",

    })

  );

}

/* =======================================
   Get Product By Id
======================================= */

export async function getProductById(
  id: string
): Promise<ProductFormData | null> {

  const supabase =
    supabaseAdmin;

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(`
      id,
      name,
      product_code,
      slug,
      description,
      category_id,
      collection_id,
      status
    `)
    .eq(
      "id",
      id
    )
    .single();

  if (error) {

    console.error(
      "Error loading product:",
      error.message
    );

    return null;

  }

  return {

    id:
      data.id,

    name:
      data.name,

    productCode:
      data.product_code ?? "",

    slug:
      data.slug,

    description:
      data.description ??
      "",

    categoryId:
      data.category_id,

    collectionId:
      data.collection_id ?? "",

    status:
      data.status,

    images: [],

    sizes: [],

  };

}

/* =======================================
   Categories
======================================= */

export async function getCategories(): Promise<CategoryOption[]> {

  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("categories")
    .select(
      "id, name"
    )
    .eq(
      "is_active",
      true
    )
    .order(
      "display_order"
    );

  if (error) {

    console.error(
      "Error loading categories:",
      error.message
    );

    return [];

  }

  return data ?? [];

}

/* =======================================
   Collections
======================================= */

export async function getCollections(): Promise<CollectionOption[]> {

  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("collections")
    .select(
      "id, name"
    )
    .eq(
      "is_active",
      true
    )
    .order(
      "name"
    );

  if (error) {

    console.error(
      "Error loading collections:",
      error.message
    );

    return [];

  }

  return data ?? [];

}

/* =======================================
   Create Product
======================================= */

export async function createProduct(
  formData: FormData
): Promise<void> {

  const product = {

    name:
      (formData.get("name") ?? "")
        .toString()
        .trim(),

    productCode:
      (formData.get("productCode") ?? "")
        .toString()
        .trim(),

    slug:
      (formData.get("slug") ?? "")
        .toString()
        .trim(),

    categoryId:
      (formData.get("categoryId") ?? "")
        .toString()
        .trim(),

    collectionId:
      (formData.get("collectionId") ?? "")
        .toString()
        .trim(),

    status: parseProductStatus
    (formData.get("status")),

    description:
      (formData.get("description") ?? "")
        .toString()
        .trim(),

  };
    const errors: string[] = [];

  if (!product.name) {

    errors.push(
      "Product Name is required."
    );

  }

  if (!product.productCode) {

    errors.push(
      "Product Code is required."
    );

  }

  if (!product.categoryId) {

    errors.push(
      "Category is required."
    );

  }

  if (!product.collectionId) {

    errors.push(
      "Collection is required."
    );

  }

  if (errors.length > 0) {

    console.error(
      "Validation failed:"
    );

    errors.forEach(
      (error) =>

        console.error(
          `• ${error}`
        )

    );

    return;

  }

  const supabase =
    supabaseAdmin;

  const {
    data: brand,
    error: brandError,
  } = await supabase
    .from("brands")
    .select("id")
    .eq(
      "slug",
      "lite-orbit"
    )
    .single();

  if (
    brandError ||
    !brand
  ) {

    console.error(
      "Unable to locate Lite Orbit brand."
    );

    return;

  }

  const {
    error,
  } = await supabase
    .from("products")
    .insert({

      brand_id:
        brand.id,

      name:
        product.name,

      product_code:
        product.productCode,

      slug:
        product.slug,

      category_id:
        product.categoryId,

      collection_id:
        product.collectionId,

      description:
        product.description,

      status:
        product.status,

    });

  if (error) {

    console.error(
      "Failed to create product:"
    );

    console.error(
      error
    );

    return;

  }

  redirect(
    "/admin/products"
  );

}

/* =======================================
   Update Product
======================================= */

export async function updateProduct(
  formData: FormData
): Promise<void> {

  const id =
    (formData.get("id") ?? "")
      .toString()
      .trim();

  const product = {

    name:
      (formData.get("name") ?? "")
        .toString()
        .trim(),

    productCode:
      (formData.get("productCode") ?? "")
        .toString()
        .trim(),

    slug:
      (formData.get("slug") ?? "")
        .toString()
        .trim(),

    categoryId:
      (formData.get("categoryId") ?? "")
        .toString()
        .trim(),

    collectionId:
      (formData.get("collectionId") ?? "")
        .toString()
        .trim(),

    status:
      parseProductStatus
      (formData.get("status")),

    description:
      (formData.get("description") ?? "")
        .toString()
        .trim(),

  };

  const errors: string[] = [];

  if (!id) {

    errors.push(
      "Product id is missing."
    );

  }

  if (!product.name) {

    errors.push(
      "Product Name is required."
    );

  }

  if (!product.productCode) {

    errors.push(
      "Product Code is required."
    );

  }

  if (!product.categoryId) {

    errors.push(
      "Category is required."
    );

  }

  if (!product.collectionId) {

    errors.push(
      "Collection is required."
    );

  }

  if (errors.length > 0) {

    console.error(
      "Validation failed:"
    );

    errors.forEach(
      (error) =>

        console.error(
          `• ${error}`
        )

    );

    return;

  }

  const supabase =
    supabaseAdmin;

  const {
    error,
  } = await supabase
    .from("products")
    .update({

      name:
        product.name,

      product_code:
        product.productCode,

      slug:
        product.slug,

      category_id:
        product.categoryId,

      collection_id:
        product.collectionId,

      description:
        product.description,

      status:
        product.status,

    })
    .eq(
      "id",
      id
    );

  if (error) {

    console.error(
      "Failed to update product:"
    );

    console.error(
      error
    );

    return;

  }

  redirect(
    "/admin/products"
  );

}

/* =======================================
   Get Product Images
======================================= */

export async function getProductImages(
  productId: string
): Promise<ProductImage[]> {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("product_images")
    .select("*")
    .eq("product_id", productId)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Error loading product images:",
      error.message
    );
    throw new Error("Unable to load product images.");
  }

  return data ?? [];
}

/* =======================================
   Get Product Variants
======================================= */

export async function getProductVariants(
  productId: string
): Promise<ProductVariant[]> {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("product_variants")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: true,
    });

  if (error) {
    console.error(
      "Error loading product variants:",
      error.message
    );
    throw new Error("Unable to load product variants.");
  }

  return data ?? [];
}

/* =======================================
   Get Product Inventory History
======================================= */

export async function getInventoryHistory(
  productId: string
): Promise<InventoryHistoryItem[]> {
  await requireAdmin();

  const { data, error } = await supabaseAdmin
    .from("inventory_history")
    .select(`
      id,
      variant_id,
      quantity_change,
      stock_after,
      action,
      notes,
      created_at,
      product_variants!inner (
        sku,
        size,
        product_id
      )
    `)
    .eq("product_variants.product_id", productId)
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "Error loading inventory history:",
      error.message
    );
    throw new Error("Unable to load inventory history.");
  }

  return (data ?? []).map((item) => ({
    id: item.id,
    variant_id: item.variant_id,
    quantity_change: item.quantity_change,
    stock_after: item.stock_after,
    action: item.action,
    notes: item.notes,
    created_at: item.created_at,
    product_variants: {
      sku: item.product_variants.sku,
      size: item.product_variants.size,
    },
  }));
}
