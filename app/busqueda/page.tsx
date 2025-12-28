import { client, getOptimizedImageUrl, PRODUCT_SIZES_ATTR } from "@/lib/sanity"
import { advancedSearchQuery } from "@/lib/queries"
import { normalizeText } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 0 // Dynamic page

interface SearchPageProps {
    searchParams: Promise<{
        q?: string
        filterId?: string
        filterType?: string
    }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, filterId, filterType } = await searchParams
    const searchTerm = q || ""

    const allProducts = await client.fetch(advancedSearchQuery, {
        searchTerm: "", // Fetch all to filter client-side
        filterId: filterId || null,
        filterType: filterType || null
    })

    const products = searchTerm
        ? allProducts.filter((product: any) => {
            const normalizedQuery = normalizeText(searchTerm)
            const normalizedName = normalizeText(product.name)
            const normalizedSubcategory = product.subcategory?.name ? normalizeText(product.subcategory.name) : ""
            const normalizedCategory = product.subcategory?.category?.name ? normalizeText(product.subcategory.category.name) : ""

            return (
                normalizedName.includes(normalizedQuery) ||
                normalizedSubcategory.includes(normalizedQuery) ||
                normalizedCategory.includes(normalizedQuery)
            )
        })
        : allProducts

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">
                Resultados de búsqueda
                {searchTerm && <span> para "{searchTerm}"</span>}
            </h1>

            {products.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
                    <Link href="/" className="text-primary hover:underline mt-4 inline-block">
                        Volver al inicio
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product: any) => (
                        <Link
                            key={product._id}
                            href={`/producto/${product.slug.current}`}
                            className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all duration-300"
                        >
                            <div className="aspect-square relative bg-muted overflow-hidden">
                                {product.image ? (
                                    <Image
                                        src={getOptimizedImageUrl(product.image, { width: 500 }) || ""}
                                        alt={product.name}
                                        fill
                                        sizes={PRODUCT_SIZES_ATTR}
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/50">
                                        Sin imagen
                                    </div>
                                )}
                            </div>
                            <div className="p-4">
                                <div className="text-xs text-muted-foreground mb-1">
                                    {product.subcategory?.category?.name} • {product.subcategory?.name}
                                </div>
                                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                    {product.name}
                                </h3>
                                {product.price && (
                                    <div className="mt-2 font-bold text-primary">
                                        ${product.price.toLocaleString()}
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}
