import type { Metadata } from "next"
import { client, urlFor } from "@/lib/sanity"
import { advancedSearchQuery, menuQuery } from "@/lib/queries"
import { normalizeText } from "@/lib/utils"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Categoria } from "@/types/menu"
import Header from "@/components/header/header"
import { Suspense } from "react"
import { SearchCommand } from "@/components/header/SearchCommand"

export const revalidate = 0 // Dynamic page

export const metadata: Metadata = {
    title: "Productos - Catálogo de Packaging Eco-Friendly",
    description: "Explora nuestro catálogo completo de productos eco-friendly: vasos, platos, bandejas, envases de bambú, caña de azúcar, cartón y más. Soluciones sostenibles para tu negocio gastronómico en Uruguay.",
    keywords: [
        "catálogo packaging",
        "productos eco-friendly",
        "envases descartables",
        "vasos biodegradables",
        "platos ecológicos",
        "packaging restaurantes Uruguay",
        "envases delivery"
    ],
    openGraph: {
        title: "Productos - TodoEnPackaging",
        description: "Catálogo completo de soluciones eco-friendly para packaging alimenticio",
    },
}

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
    // IMPORTANT: If there's a search term, ignore category filters to search globally
    let filterType = ""
    let filterId = ""

    if (!searchTerm) {
        // Only apply category filters when there's no search term
        if (subcategoria) {
            filterType = "subcategory"
            filterId = subcategoria
        } else if (categoria) {
            filterType = "category"
            filterId = categoria
        }
    }

    // Fetch categories for the filter component
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

            // Find rubro for this product
            let normalizedRubro = ""
            if (product.subcategory?.category?._id) {
                const categoryId = product.subcategory.category._id
                for (const rubro of rubros) {
                    const hasCategory = rubro.categorias.some((cat: any) => cat.id === categoryId)
                    if (hasCategory) {
                        normalizedRubro = normalizeText(rubro.nombre)
                        break
                    }
                }
            }

            return normalizedName.includes(normalizedQuery) ||
                normalizedSubcategory.includes(normalizedQuery) ||
                normalizedCategory.includes(normalizedQuery) ||
                normalizedRubro.includes(normalizedQuery)
        })
        : allProducts

    return (
        <div className="min-h-screen bg-gradient-to-b from-stone-50/50 via-white to-stone-50/30">
            <Header rubros={rubros} miscellaneousCategories={miscellaneousCategories} />

            {/* Mobile: Search */}
            <div className="lg:hidden p-4 border-b bg-stone-50/80 backdrop-blur-sm">
                <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />}>
                    <SearchCommand rubros={rubros} />
                </Suspense>
            </div>

            <div className="container mx-auto py-10 px-4 lg:py-12">
                {/* Results Grid */}
                {products.length === 0 ? (
                    <div className="text-center py-20 bg-gradient-to-b from-stone-50 to-white rounded-3xl border border-stone-200/40">
                        <p className="text-stone-600 text-lg font-medium mb-4">No se encontraron productos con estos filtros</p>
                        {(q || categoria || subcategoria) && (
                            <Link href="/productos" className="text-green-800 hover:text-green-900 mt-2 inline-block font-semibold hover:underline decoration-2 underline-offset-4 transition-all">
                                Ver todos los productos
                            </Link>
                        )}
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
                                        <img
                                            src={urlFor(product.image).width(500).height(500).url()}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full text-stone-400 bg-stone-100">
                                            <ShoppingBag className="w-16 h-16 opacity-10 stroke-1" />
                                        </div>
                                    )}
                                    {/* Badge for Category - Natural Style */}
                                    {product.subcategory?.category?.name && (
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-white/95 backdrop-blur-sm text-[10px] px-3 py-1.5 rounded-full border border-stone-200/80 shadow-sm font-medium text-stone-700 tracking-wide">
                                                {product.subcategory.category.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex-1 flex flex-col bg-gradient-to-b from-white to-stone-50/30">
                                    {product.subcategory?.name && (
                                        <div className="text-[11px] text-stone-500 mb-2 uppercase tracking-wider font-medium">
                                            {product.subcategory.name}
                                        </div>
                                    )}
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
