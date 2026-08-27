"use server";

import { createClient } from "@/lib/supabase/server";

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