import type { Metadata } from "next"
import { client, getOptimizedImageUrl } from "@/lib/sanity"
import { subcategoryBySlugQuery, menuQuery } from "@/lib/queries"
import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, ChevronRight } from "lucide-react"
import Header from "@/components/header/header"
import { notFound } from "next/navigation"

const BASE_URL = "https://todoenpackaging.com.uy"

interface SubcategoryPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
    const { slug } = await params
    const subcategory = await client.fetch(subcategoryBySlugQuery, { slug })

    if (!subcategory) {
        return {
            title: "Subcategoría no encontrada",
        }
    }

    const title = `${subcategory.name} | TODO EN PACKAGING`
    const description = `Encontrá ${subcategory.name} y más envases descartables en TODO EN PACKAGING Uruguay. Productos de calidad para tu comercio.`

    // Get image from first product or use default
    const defaultImage = "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png"
    let ogImage = defaultImage

    if (subcategory.products && subcategory.products.length > 0 && subcategory.products[0].image) {
        ogImage = getOptimizedImageUrl(subcategory.products[0].image, { width: 1200, height: 630 }) || defaultImage
    } else if (subcategory.image) {
        ogImage = getOptimizedImageUrl(subcategory.image, { width: 1200, height: 630 }) || defaultImage
    }

    return {
        title,
        description,
        keywords: [
            subcategory.name.toLowerCase(),
            subcategory.category?.name.toLowerCase() || "",
            "envases descartables",
            "packaging uruguay",
            "todo en packaging",
            `${subcategory.name.toLowerCase()} uruguay`,
        ],
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/subcategoria/${slug}`,
            siteName: "TODO EN PACKAGING",
            locale: "es_UY",
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: subcategory.name,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
        alternates: {
            canonical: `${BASE_URL}/subcategoria/${slug}`,
        },
    }
}

export default async function SubcategoryPage({ params }: SubcategoryPageProps) {
    const { slug } = await params
    const subcategory = await client.fetch(subcategoryBySlugQuery, { slug })

    if (!subcategory) {
        notFound()
    }

    const { rubros, miscellaneousCategories } = await client.fetch(menuQuery)
    const products = subcategory.products || []

    return (
        <div className="min-h-screen bg-stone-100">
            <Header rubros={rubros} miscellaneousCategories={miscellaneousCategories} />

            <div className="container mx-auto py-10 px-4 lg:py-12">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-stone-600 mb-6">
                    <Link href="/" className="hover:text-green-700 transition-colors">
                        Inicio
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/productos" className="hover:text-green-700 transition-colors">
                        Productos
                    </Link>
                    {subcategory.category && (
                        <>
                            <ChevronRight className="w-4 h-4" />
                            <Link
                                href={`/categoria/${subcategory.category.slug.current}`}
                                className="hover:text-green-700 transition-colors"
                            >
                                {subcategory.category.name}
                            </Link>
                        </>
                    )}
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-green-800 font-medium">{subcategory.name}</span>
                </div>

                {/* Subcategory Header */}
                <div className="mb-8">
                    {subcategory.category && (
                        <p className="text-green-700 font-medium mb-2">
                            {subcategory.category.name}
                        </p>
                    )}
                    <h1 className="text-3xl lg:text-4xl font-bold text-stone-800 mb-3">
                        {subcategory.name}
                    </h1>
                    {subcategory.description && (
                        <p className="text-stone-600 text-lg max-w-3xl">
                            {subcategory.description}
                        </p>
                    )}
                </div>

                {/* Products Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-gradient-to-b from-stone-50 to-white rounded-3xl border border-stone-200/40">
                        <p className="text-stone-600 text-lg font-medium mb-4">
                            No hay productos disponibles en esta subcategoría
                        </p>
                        <Link
                            href="/productos"
                            className="text-green-800 hover:text-green-900 mt-2 inline-block font-semibold hover:underline decoration-2 underline-offset-4 transition-all"
                        >
                            Ver todos los productos
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                        {products.map((product: any) => (
                            <Link
                                key={product._id}
                                href={`/producto/${product.slug.current}`}
                                className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 flex flex-col border border-stone-200/60"
                            >
                                <div className="aspect-square relative bg-stone-50 overflow-hidden">
                                    {product.image ? (
                                        <Image
                                            src={getOptimizedImageUrl(product.image, { width: 500, height: 500 }) || ""}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                            className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-stone-400 bg-stone-100">
                                            <ShoppingBag className="w-16 h-16 opacity-10 stroke-1" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col bg-gradient-to-b from-white to-stone-50/30">
                                    <h3 className="font-semibold text-stone-800 group-hover:text-green-800 transition-colors duration-300 line-clamp-2 mb-3 flex-1 text-base leading-snug">
                                        {product.name}
                                    </h3>
                                    {product.price && (
                                        <div className="flex items-baseline gap-1 pt-2 border-t border-stone-100">
                                            <span className="font-bold text-xl text-green-900">
                                                ${product.price.toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
