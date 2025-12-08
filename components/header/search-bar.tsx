"use client"

import type React from "react"

import { Search, X, Filter, ChevronRight, ChevronDown } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Categoria } from "@/types/menu"

interface SearchBarProps {
  categorias?: Categoria[]
}

export default function SearchBar({ categorias = [] }: SearchBarProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<{ id: string, name: string, type: 'category' | 'subcategory' } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isMobileSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMobileSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (searchQuery) params.set("q", searchQuery)
    if (selectedFilter) {
      params.set("filterId", selectedFilter.id)
      params.set("filterType", selectedFilter.type)
    }

    if (searchQuery || selectedFilter) {
      router.push(`/busqueda?${params.toString()}`)
      setIsMobileSearchOpen(false)
      setIsFilterOpen(false)
    }
  }

  const clearFilter = () => {
    setSelectedFilter(null)
    setIsFilterOpen(false)
  }

  return (
    <>
      {/* Mobile Search Toggle */}
      <button
        type="button"
        className="lg:hidden p-2 text-foreground hover:bg-accent rounded-md transition-colors"
        onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
        aria-label="Buscar"
      >
        <Search className="h-6 w-6" />
      </button>

      {/* Desktop Search Bar */}
      <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-2xl relative z-50">
        <div className="relative flex items-center">
          <div className="relative" ref={filterRef}>
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex items-center gap-2 px-3 py-2.5 border border-r-0 border-input rounded-l-lg bg-background hover:bg-accent transition-colors",
                selectedFilter && "bg-primary/10 text-primary border-primary/20"
              )}
            >
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium max-w-[100px] truncate">
                {selectedFilter ? selectedFilter.name : "Filtrar"}
              </span>
              <ChevronDown className="h-3 w-3 opacity-50" />
            </button>

            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[300px] overflow-y-auto p-2">
                  {selectedFilter && (
                    <button
                      type="button"
                      onClick={clearFilter}
                      className="w-full text-left px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-md mb-2 flex items-center gap-2"
                    >
                      <X className="h-3 w-3" />
                      Limpiar filtro
                    </button>
                  )}
                  {categorias.map((cat) => (
                    <div key={cat.id} className="mb-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFilter({ id: cat.id, name: cat.nombre, type: 'category' })
                          setIsFilterOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-accent rounded-md flex items-center justify-between group"
                      >
                        {cat.nombre}
                        <span className="text-xs text-muted-foreground group-hover:text-foreground">
                          {cat.subcategorias.length}
                        </span>
                      </button>
                      <div className="pl-4 mt-1 space-y-1 border-l border-border/50 ml-3">
                        {cat.subcategorias.map((sub) => (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => {
                              setSelectedFilter({ id: sub.id, name: sub.nombre, type: 'subcategory' })
                              setIsFilterOpen(false)
                            }}
                            className="w-full text-left px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md"
                          >
                            {sub.nombre}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              placeholder={selectedFilter ? `Buscar en ${selectedFilter.name}...` : "Buscar productos..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pr-12 border border-input rounded-r-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all border-l-0"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-accent rounded-md transition-colors"
              aria-label="Buscar"
            >
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </form>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 bg-background p-4 shadow-md lg:hidden animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative flex items-center w-full">
              <Search className="absolute left-4 h-4 w-4 text-muted-foreground/70 pointer-events-none" />
              <input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-11 pr-4 h-11",
                  "bg-white/70 dark:bg-black/30",
                  "backdrop-blur-xl backdrop-saturate-150",
                  "border border-white/30 dark:border-white/10",
                  "shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
                  "rounded-2xl",
                  "text-sm font-medium placeholder:text-muted-foreground/60",
                  "focus-visible:ring-2 focus-visible:ring-emerald-500/30",
                  "focus-visible:border-emerald-500/50",
                  "focus-visible:bg-white/90 dark:focus-visible:bg-black/50",
                  "transition-all duration-300",
                )}
              />
            </div>
          </form>
        </div>
      )}
    </>
  )
}
