import Header from "@/components/header/header"
import { client } from "@/lib/sanity"
import { menuQuery } from "@/lib/queries"
import AboutSection from "@/components/about/about-section"

export const revalidate = 60

export default async function Nosotros() {
    const categorias = await client.fetch(menuQuery)

    return (
        <div className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <Header categorias={categorias} />

            <main className="bg-white min-h-screen">
                <AboutSection />

                {/* Bottom spacing */}
                <div className="h-32" />
            </main>
        </div>
    )
}
