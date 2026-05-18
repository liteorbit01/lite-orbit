import { notFound } from "next/navigation"
import { products } from "@/lib/products"
import ProductClient from "./ProductClient"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params

  const product = products.find(
    (p) => p.slug === resolvedParams.slug
  )

  if (!product) {
    notFound()
  }

  return <ProductClient product={product} />
}