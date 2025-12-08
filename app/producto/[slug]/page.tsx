import { client, urlFor } from "@/lib/sanity"
import { productBySlugQuery } from "@/lib/queries"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import ProductDetails from "@/components/products/ProductDetails"
import Header from "@/components/header/header"

export const revalidate = 60 // Revalidate every minute

interface ProductPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { slug } = await params
    const product = await client.fetch(productBySlugQuery, { slug })

    if (!product) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">

            <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al inicio
            </Link>

            <ProductDetails product={product} />
        </div>
    )
}
