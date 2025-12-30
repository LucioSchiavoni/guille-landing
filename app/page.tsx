import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import Header from "@/components/header/header"
import { SearchCommand } from "@/components/header/SearchCommand"
import HeroCarousel from "@/components/carousel/hero-carousel"
import DeliverySection from "@/components/sections/DeliverySection"
import StructuredData from "@/components/seo/structured-data"
import { client, getOptimizedImageUrl } from "@/lib/sanity"
import { menuQuery, carouselQuery } from "@/lib/queries"

// 🚀 Server Components con fetch interno para carga diferida
import ProductosOfertaServer from "@/components/sections/ProductosOfertaServer"
import ProductosOfertaSkeleton from "@/components/sections/ProductosOfertaSkeleton"
import ProductListServer from "@/components/product/ProductListServer"
import ProductListSkeleton from "@/components/product/ProductListSkeleton"

// 🎯 Dynamic imports para componentes below-the-fold (no críticos para LCP)
// Estos componentes se cargan en chunks separados para reducir el bundle inicial
const FAQSection = dynamic(() => import("@/components/faq/faq-section"), {
  loading: () => (
    <section className="py-16 bg-gray-50/50">
      <div className="container mx-auto px-4">
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-8" />
        <div className="space-y-4 max-w-3xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    </section>
  ),
})

const Footer = dynamic(() => import("@/components/footer/footer"), {
  loading: () => (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 w-32 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-800 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-gray-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </footer>
  ),
})

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
  // 🎯 Solo queries CRÍTICAS para above-the-fold (Header + Hero)
  // productsQuery y offerProductsQuery se cargan en sus Server Components con Suspense
  const [menuData, carouselData] = await Promise.all([
    client.fetch(menuQuery, {}, { next: { revalidate: 60 } }),
    client.fetch(carouselQuery, {}, { next: { revalidate: 60 } })
  ])

  const { rubros, miscellaneousCategories } = menuData

  // 🚀 URL de la primera imagen del carousel para preload (LCP)
  const lcpImageUrl = carouselData?.slides?.[0]?.imagenDesktop
    ? getOptimizedImageUrl(carouselData.slides[0].imagenDesktop, { width: 1920 })
    : null

  return (
    <>
      {/* ⚡ Preload de imagen LCP del HeroCarousel */}
      {lcpImageUrl && (
        <link
          rel="preload"
          as="image"
          href={lcpImageUrl}
          fetchPriority="high"
        />
      )}
      <StructuredData />
      <div className="min-h-screen bg-background/10">
        <Header rubros={rubros} miscellaneousCategories={miscellaneousCategories} />

        <div className="lg:hidden p-4 border-b bg-white/10 backdrop-blur-md border-white/10">
          <Suspense fallback={<div className="w-full h-10 bg-gray-200/50 rounded-md animate-pulse" />}>
            <SearchCommand rubros={rubros} />
          </Suspense>
        </div>

        {/* ⚡ Above-the-fold: Carga inmediata */}
        <HeroCarousel carousel={carouselData} />

        {/* 🔄 Below-the-fold: Carga diferida con Suspense */}
        <Suspense fallback={<ProductosOfertaSkeleton />}>
          <ProductosOfertaServer />
        </Suspense>

        {/* 📦 ProductList comentado - listo para usar con Suspense cuando se necesite */}
        {/* <Suspense fallback={<ProductListSkeleton />}>
          <ProductListServer />
        </Suspense> */}

        <DeliverySection />
        <FAQSection />
        <Footer />
      </div>
    </>
  )
}
