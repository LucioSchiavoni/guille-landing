
import SustainabilitySection from "@/components/sustainability/sustainability-section"
import Header from "@/components/header/header"
import Footer from "@/components/footer/footer"
import { client } from "@/lib/sanity"
import { menuQuery } from "@/lib/queries"
import { Suspense } from "react"
import { SearchCommand } from "@/components/header/SearchCommand"

export const revalidate = 60

export default async function SustainabilityPage() {
    const categorias = await client.fetch(menuQuery)

    return (
        <>
            <div className="min-h-screen bg-background">
                <Header categorias={categorias} />

                <div className="lg:hidden p-4 border-b bg-gray-50">
                    <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />}>
                        <SearchCommand categorias={categorias} />
                    </Suspense>
                </div>

                <SustainabilitySection />
                <Footer />
            </div>
        </>
    )
}
