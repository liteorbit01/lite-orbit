import { notFound } from "next/navigation";

import {
  getStoreProductBySlug,
} from "@/lib/store/products";

import ProductClient from "./ProductClient";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({
  params,
}: PageProps) {
  const { slug } =
    await params;

  const product =
    await getStoreProductBySlug(
      slug
    );

  if (!product) {
    notFound();
  }

  return (
    <ProductClient
      product={product}
    />
  );
}