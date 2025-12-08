"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Categoria } from "@/types/menu"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
    categorias: Categoria[]
}

export default function ProductFilters({ categorias }: ProductFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const currentCategory = searchParams.get("categoria")
    const currentSubcategory = searchParams.get("subcategoria")
    const currentSearch = searchParams.get("q") || ""

    const handleCategoryClick = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (currentCategory === categoryId && !currentSubcategory) {
            params.delete("categoria")
            params.delete("subcategoria")
        } else {
            params.set("categoria", categoryId)
            params.delete("subcategoria") // Reset subcategory when changing category
        }
        router.push(`/productos?${params.toString()}`)
    }

    const handleSubcategoryClick = (subcategoryId: string, categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString())

        // Ensure category is set
        params.set("categoria", categoryId)

        // Toggle subcategory
        if (currentSubcategory === subcategoryId) {
            params.delete("subcategoria")
        } else {
            params.set("subcategoria", subcategoryId)
        }
        router.push(`/productos?${params.toString()}`)
    }

    const clearFilters = () => {
        router.push("/productos")
    }

    const hasFilters = currentCategory || currentSearch

    return (
        <div className="space-y-6 mb-8">


            {/* Categories Buttons */}
            <div className="flex flex-wrap gap-2 justify-center">
                <Button
                    variant={!currentCategory ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                        const params = new URLSearchParams(searchParams.toString())
                        params.delete("categoria")
                        params.delete("subcategoria")
                        router.push(`/productos?${params.toString()}`)
                    }}
                    className="rounded-full"
                >
                    Todos
                </Button>
                {categorias.map((categoria) => (
                    <Button
                        key={categoria.id}
                        variant={currentCategory === categoria.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleCategoryClick(categoria.id)}
                        className="rounded-full"
                    >
                        {categoria.nombre}
                    </Button>
                ))}
            </div>

            {/* Subcategories (only if a category is selected and has children) */}
            {currentCategory && (
                <div className="flex flex-wrap gap-2 justify-center animate-in fade-in slide-in-from-top-2">
                    {categorias
                        .find(c => c.id === currentCategory)
                        ?.subcategorias.map((sub) => (
                            <Button
                                key={sub.id}
                                variant={currentSubcategory === sub.id ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => handleSubcategoryClick(sub.id, currentCategory)}
                                className={cn(
                                    "text-xs h-7 px-3",
                                    currentSubcategory === sub.id && "bg-secondary text-secondary-foreground font-medium"
                                )}
                            >
                                {sub.nombre}
                            </Button>
                        ))}
                </div>
            )}

            {/* Active Filters Summary */}
            {hasFilters && (
                <div className="text-center">
                    <Button variant="link" size="sm" onClick={clearFilters} className="text-muted-foreground h-auto p-0">
                        Limpiar filtros <X className="ml-1 w-3 h-3" />
                    </Button>
                </div>
            )}
        </div>
    )
}
