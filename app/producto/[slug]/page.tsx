import type { Metadata } from "next"
import { client, getOptimizedImageUrl } from "@/lib/sanity"
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

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { slug } = await params
    const product = await client.fetch(productBySlugQuery, { slug })

    if (!product) {
        return {
            title: "Producto no encontrado",
            description: "El producto que buscas no está disponible",
        }
    }

    const productName = product.name || "Producto"
    const categoryName = product.subcategory?.category?.name || ""
    const subcategoryName = product.subcategory?.name || ""
    const description = product.description || `${productName} - ${subcategoryName} de ${categoryName}. Producto eco-friendly de TodoEnPackaging.`
    const imageUrl = (product.image ? getOptimizedImageUrl(product.image, { width: 1200, height: 630 }) : null) || "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png"

    return {
        title: `${productName} - ${categoryName} Eco-Friendly`,
        description: description.substring(0, 160),
        keywords: [
            productName,
            categoryName,
            subcategoryName,
            "packaging eco-friendly",
            "productos descartables",
            "packaging sostenible Uruguay"
        ],
        openGraph: {
            title: productName,
            description: description.substring(0, 160),
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: productName,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: productName,
            description: description.substring(0, 160),
            images: [imageUrl],
        },
    }
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
                href="/productos"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver al catálogo
            </Link>

            <ProductDetails product={product} />
        </div>
    )
}
