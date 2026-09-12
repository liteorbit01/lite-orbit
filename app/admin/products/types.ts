export type ProductStatus = "draft" | "published";

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