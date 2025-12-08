"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Categoria } from "@/types/menu"

interface SearchCommandProps {
    categorias: Categoria[]
    onSearch?: () => void
}

export function SearchCommand({ categorias, onSearch }: SearchCommandProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get("q") || ""
    const [query, setQuery] = React.useState(initialQuery)

    // Update internal state if URL changes
    React.useEffect(() => {
        setQuery(searchParams.get("q") || "")
    }, [searchParams])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Always redirect to /productos with the query
        const params = new URLSearchParams(searchParams.toString())
        if (query.trim()) {
            params.set("q", query)
        } else {
            params.delete("q")
        }

        router.push(`/productos?${params.toString()}`)

        if (onSearch) {
            onSearch()
        }
    }

    return (
        <form onSubmit={handleSearch} className="relative w-full flex items-center gap-2">
            <div className="relative w-full">
                {/* Make icon clickable as a submit button for mobile */}
                <button
                    type="submit"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-0 border-0 bg-transparent cursor-pointer z-10"
                    aria-label="Buscar"
                >
                    <Search className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </button>
                <Input
                    type="search"
                    placeholder="Buscar productos..."
                    className="w-full pl-9 bg-muted/50 border-transparent focus:bg-background focus:border-border transition-colors h-10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <Button type="submit" size="sm" variant="ghost" className="hidden sm:inline-flex">
                Buscar
            </Button>
        </form>
    )
}
