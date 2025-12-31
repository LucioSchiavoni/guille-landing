import type { Metadata } from "next"
import SustainabilitySection from "@/components/sustainability/sustainability-section"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import { client } from "@/lib/sanity"
import { menuQuery } from "@/lib/queries"
import { Suspense } from "react"
import { SearchCommand } from "@/components/header/SearchCommand"

export const revalidate = 60

export const metadata: Metadata = {
    title: "Sostenibilidad - Compromiso Eco-Friendly y Packaging Sostenible",
    description: "Somos una empresa que mantiene el compromiso de ofrecer soluciones de packaging eco-friendly para la industria alimenticia. Productos a base de pulpa de papel, bagazo de caña, fibra de bambú o cartón, resistentes a la grasa y la humedad.",
    keywords: [
        "packaging sostenible",
        "eco-friendly",
        "packaging biodegradable",
        "bagazo de caña",
        "fibra de bambú",
        "pulpa de papel",
        "packaging ecológico",
        "sostenibilidad",
        "medio ambiente",
        "packaging verde"
    ],
    openGraph: {
        title: "TodoEnPackaging - Sostenibilidad",
        description: "Compromiso con el medio ambiente a través de soluciones de packaging eco-friendly",
        images: [
            {
                url: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png",
                width: 1200,
                height: 630,
                alt: "Sostenibilidad TodoEnPackaging",
            },
        ],
    },
}

export default async function SustainabilityPage() {
    const { rubros, miscellaneousCategories } = await client.fetch(menuQuery)

    return (
        <>
            <div className="min-h-screen bg-stone-100 pt-20 lg:pt-[116px]">
                <Header rubros={rubros} miscellaneousCategories={miscellaneousCategories} />

                <div className="lg:hidden px-4 py-2 border-stone-200">
                    <Suspense fallback={<div className="w-full h-10 bg-gray-200/50 rounded-md animate-pulse" />}>
                        <SearchCommand rubros={rubros} />
                    </Suspense>
                </div>

                <SustainabilitySection />
                <Footer />
            </div>
        </>
    )
}
