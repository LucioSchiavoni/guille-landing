import type { Metadata } from "next"
import Header from "@/components/header/header"
import { client } from "@/lib/sanity"
import { menuQuery } from "@/lib/queries"
import { Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "@/components/contact/ContactForm"

export const revalidate = 60

export const metadata: Metadata = {
    title: "Contacto - TodoEnPackaging Uruguay",
    description: "Contáctanos para consultas sobre packaging eco-friendly y productos descartables. Atención de Lunes a Viernes 08:00-19:00 hs. Email: todoenpackaging@gmail.com, Tel: +598 99222608. Montevideo, Uruguay.",
    keywords: [
        "contacto packaging Uruguay",
        "todoenpackaging contacto",
        "packaging eco-friendly Uruguay contacto",
        "proveedor packaging Montevideo"
    ],
    openGraph: {
        title: "Contacto - TodoEnPackaging",
        description: "Ponte en contacto con nosotros para soluciones de packaging eco-friendly",
    },
}

export default async function ContactPage() {
    const { rubros, miscellaneousCategories } = await client.fetch(menuQuery)

    const contactInfo = [
        {
            icon: "mail",
            label: "Email",
            value: "todoenpackaging@gmail.com",
            color: "emerald"
        },
        {
            icon: "phone",
            label: "Teléfono",
            value: "+598 99222608",
            color: "blue"
        },
        {
            icon: "mapPin",
            label: "Ubicación",
            value: "Montevideo, Uruguay",
            color: "purple"
        }
    ]

    return (
        <div className="min-h-screen bg-stone-100 flex flex-col">
            <Header rubros={rubros} miscellaneousCategories={miscellaneousCategories} />
            <ContactForm contactInfo={contactInfo} />
        </div>
    )
}
