import Header from "@/components/header/header"
import HeroCarousel from "@/components/carousel/hero-carousel"
import ProductList from "@/components/product/product-list"
import { client } from "@/lib/sanity"
import { menuQuery, productsQuery, featuredProductsQuery } from "@/lib/queries"

// Revalidate every 60 seconds
export const revalidate = 60

export default async function Home() {
  const [categorias, products, featuredProducts] = await Promise.all([
    client.fetch(menuQuery),
    client.fetch(productsQuery),
    client.fetch(featuredProductsQuery)
  ])

  return (
    <div className="min-h-screen bg-background">
      <Header categorias={categorias} />
      <HeroCarousel products={featuredProducts} />
      <ProductList products={products} />
    </div>
  )
}
