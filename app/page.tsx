import type { Metadata } from "next"
import Header from "@/components/header/header"
import { SearchCommand } from "@/components/header/SearchCommand"
import HeroCarousel from "@/components/carousel/hero-carousel"
import FeaturedProducts from "@/components/product/featured-products"
import ProductosOferta from "@/components/sections/ProductosOferta"
import ProductList from "@/components/product/product-list"
import SustainabilitySection from "@/components/sustainability/sustainability-section"
import DeliverySection from "@/components/sections/DeliverySection"
import FAQSection from "@/components/faq/faq-section"
import Footer from "@/components/footer/footer"
import StructuredData from "@/components/seo/structured-data"
import { client } from "@/lib/sanity"
import { menuQuery, productsQuery, featuredProductsQuery, offerProductsQuery } from "@/lib/queries"
import { Suspense } from "react"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Inicio - Packaging Eco-Friendly para tu Negocio",
  description: "Descubre nuestra amplia gama de productos eco-friendly: envoltorios descartables, packaging de bambú, caña de azúcar y más. Envíos a todo Uruguay. Atención personalizada de Lunes a Viernes 08:00-19:00 hs.",
  openGraph: {
    title: "TodoEnPackaging - Inicio",
    description: "Descubre nuestra amplia gama de productos eco-friendly para tu negocio",
    images: [
      {
        url: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163500/Generated_Image_October_15_2025_-_3_08PM_sskozd.png",
        width: 1200,
        height: 630,
        alt: "Productos Eco-Friendly TodoEnPackaging",
      },
    ],
  },
}

export default async function Home() {
  const [menuData, products, featuredProducts, offerProducts] = await Promise.all([
    client.fetch(menuQuery),
    client.fetch(productsQuery),
    client.fetch(featuredProductsQuery),
    client.fetch(offerProductsQuery)
  ])

  const { rubros, miscellaneousCategories } = menuData

  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-background">
        <Header rubros={rubros} miscellaneousCategories={miscellaneousCategories} />

        <div className="lg:hidden p-4 border-b bg-gray-50">
          <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />}>
            <SearchCommand rubros={rubros} />
          </Suspense>
        </div>

        <HeroCarousel products={featuredProducts} />
        <ProductosOferta products={offerProducts} />


        {/* <ProductList products={products} /> */}
        <DeliverySection />
        <FAQSection />
        <Footer />
      </div>
    </>
  )
}
