export type ProductStatus = "draft" | "published";

export type ProductSize = {
  size: string;
  price: number;
  inventory: number;
};

export type ProductFormData = {
  id?: string;

  name: string;

  slug: string;

  description: string;

  category: string;

  images: string[];

  sizes: ProductSize[];

  status: ProductStatus;
};