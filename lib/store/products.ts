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

type StoreProductVariantQuery = {
  id: string;
  size: string;
  price: number;
  stock_quantity: number;
  active: boolean;
};

type StoreProductImageQuery = {
  image_url: string;
  display_order: number;
};

type StoreProductQuery = {
  id: string;
  name: string;
  slug: string;
  description: string;
  featured: boolean;

  product_images:
    | StoreProductImageQuery[]
    | null;

  product_variants:
    | StoreProductVariantQuery[]
    | null;
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
    .order(
      "created_at",
      {
        ascending: false,
      }
    );

  if (error) {

    throw error;

  }

  return (data ?? []).map(

    (
      product: StoreProductQuery
    ) => ({

      id:
        product.id,

      name:
        product.name,

      slug:
        product.slug,

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

                (
                  variant:
                    StoreProductVariantQuery
                ) =>

                  variant.price

              )

            )
          : null,

      variants:
        product.product_variants ??
        [],

    })

  );

}
// ======================================================
// Get Single Store Product
// ======================================================

export async function getStoreProductBySlug(
  slug: string
): Promise<StoreProduct | null> {

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
    .eq(
      "slug",
      slug
    )
    .eq(
      "status",
      "published"
    )
    .single();

  if (error) {

    if (
      error.code ===
      "PGRST116"
    ) {

      return null;

    }

    throw error;

  }

  const product =
    data as StoreProductQuery;

  return {

    id:
      product.id,

    name:
      product.name,

    slug:
      product.slug,

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

              (
                variant:
                  StoreProductVariantQuery
              ) =>

                variant.price

            )

          )
        : null,

    variants:
      product.product_variants ??
      [],

  };

}