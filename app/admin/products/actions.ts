"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

import type {
  ProductListItem,
  CategoryOption,
  CollectionOption,
} from "./types";

// ========================================
// Products
// ========================================

export async function getProducts(): Promise<ProductListItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
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
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading products:", error.message);
    return [];
  }

  return (data ?? []).map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    status: product.status,
    featured: product.featured,
    createdAt: product.created_at,
    category: product.categories?.name ?? "-",
    collection: product.collections?.name ?? "-",
  }));
}

// ========================================
// Categories
// ========================================

export async function getCategories(): Promise<CategoryOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name")
    .eq("is_active", true)
    .order("display_order");

  if (error) {
    console.error("Error loading categories:", error.message);
    return [];
  }

  return data ?? [];
}

// ========================================
// Collections
// ========================================

export async function getCollections(): Promise<CollectionOption[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("collections")
    .select("id, name")
    .eq("is_active", true)
    .order("name");

  if (error) {
    console.error("Error loading collections:", error.message);
    return [];
  }

  return data ?? [];
}

// ========================================
// Create Product
// ========================================

export async function createProduct(
  formData: FormData
): Promise<void> {
  const product = {
    name: (formData.get("name") ?? "").toString().trim(),
    productCode: (formData.get("productCode") ?? "")
      .toString()
      .trim(),
    slug: (formData.get("slug") ?? "").toString().trim(),
    categoryId: (formData.get("categoryId") ?? "")
      .toString()
      .trim(),
    collectionId: (formData.get("collectionId") ?? "")
      .toString()
      .trim(),
    status: (formData.get("status") ?? "draft")
      .toString()
      .trim(),
    description: (formData.get("description") ?? "")
      .toString()
      .trim(),
  };

  // ========================================
  // Validation
  // ========================================

  const errors: string[] = [];

  if (!product.name) {
    errors.push("Product Name is required.");
  }

  if (!product.productCode) {
    errors.push("Product Code is required.");
  }

  if (!product.categoryId) {
    errors.push("Category is required.");
  }

  if (!product.collectionId) {
    errors.push("Collection is required.");
  }

  if (errors.length > 0) {
    console.error("Validation failed:");

    errors.forEach((error) => {
      console.error(`• ${error}`);
    });

    return;
  }

  // ========================================
  // Create Product
  // ========================================

  const supabase = supabaseAdmin;

  // Find Lite Orbit brand
  const { data: brand, error: brandError } = await supabase
    .from("brands")
    .select("id")
    .eq("slug", "lite-orbit")
    .single();

  if (brandError || !brand) {
    console.error("Unable to locate Lite Orbit brand.");
    console.error(brandError);
    return;
  }

  // Insert product
  const { data, error } = await supabase
    .from("products")
    .insert({
      brand_id: brand.id,
      name: product.name,
      product_code: product.productCode,
      slug: product.slug,
      category_id: product.categoryId,
      collection_id: product.collectionId,
      description: product.description,
      status: product.status,
    })
    .select()
    .single();

  if (error) {
    console.error("Failed to create product:");
    console.error(error);
    return;
  }

  console.log("====================================");
  console.log("Product created successfully");
  console.table(data);
  console.log("====================================");
  redirect("/admin/products");
}
