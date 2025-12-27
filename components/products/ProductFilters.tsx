"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X, ChevronDown, ChevronRight } from "lucide-react"
import { Rubro, Categoria } from "@/types/menu"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface ProductFiltersProps {
    rubros: Rubro[]
    miscellaneousCategories: Categoria[]
    onClose?: () => void
}

export default function ProductFilters({ rubros, miscellaneousCategories, onClose }: ProductFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [expandedRubros, setExpandedRubros] = useState<Set<string>>(new Set())
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

    const currentCategory = searchParams.get("categoria")
    const currentSubcategory = searchParams.get("subcategoria")
    const currentSearch = searchParams.get("q") || ""

    const toggleRubro = (rubroId: string) => {
        const newExpanded = new Set(expandedRubros)
        if (newExpanded.has(rubroId)) {
            newExpanded.delete(rubroId)
        } else {
            newExpanded.add(rubroId)
        }
        setExpandedRubros(newExpanded)
    }

    const toggleCategory = (categoryId: string) => {
        const newExpanded = new Set(expandedCategories)
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId)
        } else {
            newExpanded.add(categoryId)
        }
        setExpandedCategories(newExpanded)
    }

    const handleCategoryClick = (categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString())

        if (currentCategory === categoryId && !currentSubcategory) {
            params.delete("categoria")
            params.delete("subcategoria")
        } else {
            params.set("categoria", categoryId)
            params.delete("subcategoria")
        }
        router.push(`/productos?${params.toString()}`)
        onClose?.()
    }

    const handleSubcategoryClick = (subcategoryId: string, categoryId: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("categoria", categoryId)

        if (currentSubcategory === subcategoryId) {
            params.delete("subcategoria")
        } else {
            params.set("subcategoria", subcategoryId)
        }
        router.push(`/productos?${params.toString()}`)
        onClose?.()
    }

    const clearFilters = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("categoria")
        params.delete("subcategoria")

        if (params.toString()) {
            router.push(`/productos?${params.toString()}`)
        } else {
            router.push("/productos")
        }
        onClose?.()
    }

    const hasFilters = currentCategory

    return (
        <div className="space-y-3 px-4 py-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Filtros</h3>
                {hasFilters && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-muted-foreground h-auto p-2 hover:text-red-600"
                    >
                        Limpiar <X className="ml-1 w-4 h-4" />
                    </Button>
                )}
            </div>

            {/* All Products Button */}
            <Button
                variant={!currentCategory ? "default" : "outline"}
                size="sm"
                onClick={() => {
                    const params = new URLSearchParams(searchParams.toString())
                    params.delete("categoria")
                    params.delete("subcategoria")
                    router.push(`/productos?${params.toString()}`)
                    onClose?.()
                }}
                className="w-full rounded-full"
            >
                Todos los productos
            </Button>

            {/* Rubros Dropdown */}
            {rubros.length > 0 && (
                <div className="space-y-2">
                    {rubros.map((rubro) => (
                        <div key={rubro.id} className="border rounded-lg overflow-hidden">
                            {/* Rubro Header */}
                            <button
                                onClick={() => toggleRubro(rubro.id)}
                                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                                    {rubro.nombre}
                                </span>
                                {expandedRubros.has(rubro.id) ? (
                                    <ChevronDown className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <ChevronRight className="h-5 w-5 text-gray-600" />
                                )}
                            </button>

                            {/* Categorias del Rubro */}
                            {expandedRubros.has(rubro.id) && (
                                <div className="p-2 space-y-1 bg-white">
                                    {rubro.categorias.map((categoria) => (
                                        <div key={categoria.id} className="space-y-1">
                                            {/* Categoria Dropdown */}
                                            <div className="flex items-center gap-1">
                                                {categoria.subcategorias.length > 0 && (
                                                    <button
                                                        onClick={() => toggleCategory(categoria.id)}
                                                        className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                        aria-label="Toggle subcategories"
                                                    >
                                                        {expandedCategories.has(categoria.id) ? (
                                                            <ChevronDown className="h-4 w-4 text-gray-600" />
                                                        ) : (
                                                            <ChevronRight className="h-4 w-4 text-gray-600" />
                                                        )}
                                                    </button>
                                                )}
                                                <Button
                                                    variant={currentCategory === categoria.id && !currentSubcategory ? "default" : "ghost"}
                                                    size="sm"
                                                    onClick={() => handleCategoryClick(categoria.id)}
                                                    className={cn(
                                                        "flex-1 justify-start text-sm font-medium",
                                                        !categoria.subcategorias.length && "ml-6"
                                                    )}
                                                >
                                                    {categoria.nombre}
                                                </Button>
                                            </div>

                                            {/* Subcategorias */}
                                            {expandedCategories.has(categoria.id) && categoria.subcategorias.length > 0 && (
                                                <div className="ml-6 pl-4 border-l-2 border-gray-200 space-y-1">
                                                    {categoria.subcategorias.map((sub) => (
                                                        <Button
                                                            key={sub.id}
                                                            variant={currentSubcategory === sub.id ? "secondary" : "ghost"}
                                                            size="sm"
                                                            onClick={() => handleSubcategoryClick(sub.id, categoria.id)}
                                                            className={cn(
                                                                "w-full justify-start text-xs",
                                                                currentSubcategory === sub.id && "bg-green-100 text-green-800 font-medium hover:bg-green-200"
                                                            )}
                                                        >
                                                            {sub.nombre}
                                                        </Button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
