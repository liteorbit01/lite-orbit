import { createClient } from "../supabase/server";

// ======================================================
// Store Types
// ======================================================

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  featured: boolean;
  image: string;
  minPrice: number | null;

  variants: {
    id: string;
    size: string;
    price: number;
    stock_quantity: number;
    active: boolean;
  }[];
};

// ======================================================
// Store Product Queries
// ======================================================

export async function getStoreProducts(): Promise<
  StoreProduct[]
> {
  const supabase =
    await createClient();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      featured,
      status,

      product_images(
        image_url,
        display_order
      ),

      product_variants(
        id,
        size,
        price,
        stock_quantity,
        active
      )
    `)
    .eq("status", "published")
    .order("created_at", {
      ascending: false,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map(
    (product: any) => ({
      id: product.id,

      name: product.name,

      slug: product.slug,

      description:
        product.description,

      featured:
        product.featured,

      image:
        product.product_images?.[0]
          ?.image_url ??
        "/hero.jpg",

      minPrice:
        product.product_variants?.length
          ? Math.min(
              ...product.product_variants.map(
                (variant: any) =>
                  variant.price
              )
            )
          : null,

      variants:
        product.product_variants ?? [],
    })
  );
}