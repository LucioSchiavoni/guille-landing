"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Rubro, Categoria } from "@/types/menu"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface ProductFiltersProps {
    rubros: Rubro[]
    miscellaneousCategories: Categoria[]
    onClose?: () => void
}

export default function ProductFilters({ rubros, miscellaneousCategories, onClose }: ProductFiltersProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [selectedRubro, setSelectedRubro] = useState<string>("")

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
        router.push("/productos")
        setSelectedRubro("")
        onClose?.()
    }

    const hasFilters = currentCategory || currentSearch

    // Get categories from selected rubro
    const selectedRubroCategories = selectedRubro
        ? rubros.find(r => r.id === selectedRubro)?.categorias || []
        : []

    return (
        <div className="space-y-6 px-4 py-6">
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
                    setSelectedRubro("")
                    onClose?.()
                }}
                className="w-full rounded-full"
            >
                Todos los productos
            </Button>

            {/* Rubros Dropdown */}
            {rubros.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Por Rubro</h4>
                    <Select value={selectedRubro} onValueChange={setSelectedRubro}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecciona un rubro" />
                        </SelectTrigger>
                        <SelectContent>
                            {rubros.map((rubro) => (
                                <SelectItem key={rubro.id} value={rubro.id}>
                                    {rubro.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Categories from selected rubro */}
                    {selectedRubro && selectedRubroCategories.length > 0 && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                            <h5 className="text-xs font-medium text-gray-600 uppercase tracking-wide">Categorías</h5>
                            <div className="space-y-2">
                                {selectedRubroCategories.map((categoria) => (
                                    <div key={categoria.id} className="space-y-2">
                                        <Button
                                            variant={currentCategory === categoria.id ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleCategoryClick(categoria.id)}
                                            className="w-full justify-start"
                                        >
                                            {categoria.nombre}
                                        </Button>

                                        {/* Subcategories */}
                                        {currentCategory === categoria.id && categoria.subcategorias.length > 0 && (
                                            <div className="pl-4 space-y-1 animate-in fade-in slide-in-from-top-2">
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
                        </div>
                    )}
                </div>
            )}

            {/* Miscellaneous Categories */}
            {miscellaneousCategories.length > 0 && (
                <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Otras Categorías</h4>
                    <div className="space-y-2">
                        {miscellaneousCategories.map((categoria) => (
                            <div key={categoria.id} className="space-y-2">
                                <Button
                                    variant={currentCategory === categoria.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handleCategoryClick(categoria.id)}
                                    className="w-full justify-start"
                                >
                                    {categoria.nombre}
                                </Button>

                                {/* Subcategories */}
                                {currentCategory === categoria.id && categoria.subcategorias.length > 0 && (
                                    <div className="pl-4 space-y-1 animate-in fade-in slide-in-from-top-2">
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
                </div>
            )}
        </div>
    )
}
