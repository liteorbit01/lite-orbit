export type ProductSize = {
  size: string
  price: number
  inventory: number
}

export type Product = {
  id: string
  name: string
  slug: string
  edition: string
  description: string
  images: string[]
  sizes: ProductSize[]
  active: boolean
}

export const products: Product[] = [
  {
    id: "orbit-warm-ivory",
    name: "Orbit Set - Warm Ivory",
    slug: "orbit-set-warm-ivory",
    edition: "First Edition",
    description:
      "Refined bedding designed for quiet, elevated living. Crafted from long-staple cotton with a smooth sateen weave for breathable comfort and timeless structure.",
    images: [
      "/hero.jpg",
      "/hero.jpg", // add more later
    ],
    sizes: [
      {
        size: "Queen",
        price: 149,
        inventory: 50,
      },
      {
        size: "King",
        price: 169,
        inventory: 30,
      },
    ],
    active: true,
  },
]