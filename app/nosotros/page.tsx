import type { Metadata } from "next"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import AboutSection from "@/components/about/about-section"
import EcoFeatures from "@/components/features/eco-features"
import { client } from "@/lib/sanity"
import { menuQuery } from "@/lib/queries"

export const revalidate = 60

export const metadata: Metadata = {
  title: "Nosotros - Compromiso Eco-Friendly",
  description: "Conoce nuestra empresa dedicada a ofrecer soluciones de packaging eco-friendly para la industria alimenticia. Productos sostenibles, compromiso verde y atención personalizada.",
  openGraph: {
    title: "TodoEnPackaging - Nosotros",
    description: "Compromiso con el futuro sostenible del packaging alimenticio",
  },
}

export default async function Nosotros() {
  const { rubros, miscellaneousCategories } = await client.fetch(menuQuery)

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header rubros={rubros} miscellaneousCategories={miscellaneousCategories} />

      <main className="bg-background">
        <AboutSection />
        <EcoFeatures />
      </main>

      <Footer />
    </div>
  )
}
