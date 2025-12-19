import { client, urlFor } from "@/lib/sanity"
import { advancedSearchQuery, menuQuery } from "@/lib/queries"
import { normalizeText } from "@/lib/utils"
import ProductFilters from "@/components/products/ProductFilters"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Categoria } from "@/types/menu"
import Header from "@/components/header/header"
import { Suspense } from "react"
import { SearchCommand } from "@/components/header/SearchCommand"

export const revalidate = 0 // Dynamic page

interface ProductosPageProps {
    searchParams: Promise<{
        q?: string
        categoria?: string
        subcategoria?: string
    }>
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
    const { q, categoria, subcategoria } = await searchParams
    const searchTerm = q || ""

    // Determine filter type and ID for the query
    let filterType = ""
    let filterId = ""

    if (subcategoria) {
        filterType = "subcategory"
        filterId = subcategoria
    } else if (categoria) {
        filterType = "category"
        filterId = categoria
    }

    // Fetch categories for the filter component
    // Note: menuQuery now returns { rubros, miscellaneousCategories }
    const { rubros, miscellaneousCategories } = await client.fetch(menuQuery)

    // Fetch all products based on filters (ignoring search term at Sanity level)
    const allProducts = await client.fetch(advancedSearchQuery, {
        searchTerm: "", // Pass empty to get all suitable products for client-side filtering
        filterId: filterId || null,
        filterType: filterType || null
    })

    // Filter products client-side for accent-insensitive search
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
        <div className="">
            <Header rubros={rubros} miscellaneousCategories={miscellaneousCategories} />

            <div className="lg:hidden p-4 border-b bg-gray-50">
                <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />}>
                    <SearchCommand rubros={rubros} />
                </Suspense>
            </div>
            {/* Filters Component
            <ProductFilters categorias={categorias} /> */}

            {/* Results Grid */}
            {products.length === 0 ? (
                <div className="text-center py-12 bg-muted/20 rounded-xl">
                    <p className="text-muted-foreground text-lg">No se encontraron productos con estos filtros.</p>
                    {(q || categoria || subcategoria) && (
                        <Link href="/productos" className="text-primary hover:underline mt-4 inline-block font-medium">
                            Ver todos los productos
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product: any) => (
                        <Link
                            key={product._id}
                            href={`/producto/${product.slug.current}`}
                            className="group bg-card rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
                        >
                            <div className="aspect-square relative bg-muted overflow-hidden">
                                {product.image ? (
                                    <img
                                        src={urlFor(product.image).width(400).height(400).url()}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground bg-secondary/50">
                                        <ShoppingBag className="w-12 h-12 opacity-20" />
                                    </div>
                                )}
                                {/* Badge for Category */}
                                <div className="absolute top-2 left-2">
                                    <span className="bg-background/80 backdrop-blur-sm text-[10px] px-2 py-1 rounded-full border shadow-sm font-medium">
                                        {product.subcategory?.category?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="text-xs text-muted-foreground mb-1">
                                    {product.subcategory?.name}
                                </div>
                                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 flex-1">
                                    {product.name}
                                </h3>
                                {product.price && (
                                    <div className="font-bold text-lg text-primary">
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
