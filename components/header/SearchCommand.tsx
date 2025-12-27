"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Rubro } from "@/types/menu"

interface SearchCommandProps {
    rubros?: Rubro[]
    categorias?: any[]
    onSearch?: () => void
}

export function SearchCommand({ rubros = [], onSearch }: SearchCommandProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get("q") || ""
    const [query, setQuery] = React.useState(initialQuery)

    React.useEffect(() => {
        setQuery(searchParams.get("q") || "")
    }, [searchParams])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()

        const params = new URLSearchParams()

        if (query.trim()) {
            params.set("q", query)
        }

        const queryString = params.toString()
        const newUrl = queryString ? `/productos?${queryString}` : "/productos"

        router.push(newUrl, { scroll: false })

        if (onSearch) {
            onSearch()
        }
    }

    const handleClear = () => {
        setQuery("")
        router.push("/productos", { scroll: false })
    }

    return (
        <div className="relative w-full">
            <form onSubmit={handleSearch} className="w-full flex items-center gap-2">
                <div className="relative w-full">
                    <button
                        type="submit"
                        className="absolute left-3 top-1/2 -translate-y-1/2 p-0 border-0 bg-transparent cursor-pointer z-10"
                        aria-label="Buscar"
                    >
                        <Search className="h-4 w-4 text-gray-500" />
                    </button>
                    <Input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full pl-9 pr-9 bg-white text-black placeholder:text-gray-500 border-none rounded-full h-10 shadow-sm focus-visible:ring-2 focus-visible:ring-green-400"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-0 border-0 bg-transparent cursor-pointer z-10 hover:bg-muted rounded-full p-1 transition-colors"
                            aria-label="Limpiar búsqueda"
                        >
                            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}
