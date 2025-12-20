"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import ProductFilters from "./ProductFilters"
import { Rubro, Categoria } from "@/types/menu"

interface ProductFiltersSheetProps {
    rubros: Rubro[]
    miscellaneousCategories: Categoria[]
}

export default function ProductFiltersSheet({ rubros, miscellaneousCategories }: ProductFiltersSheetProps) {
    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="default"
                    className="gap-2 whitespace-nowrap"
                >
                    <Filter className="h-4 w-4" />
                    Filtros
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Filtrar productos</SheetTitle>
                </SheetHeader>
                <ProductFilters
                    rubros={rubros}
                    miscellaneousCategories={miscellaneousCategories}
                    onClose={() => setOpen(false)}
                />
            </SheetContent>
        </Sheet>
    )
}
