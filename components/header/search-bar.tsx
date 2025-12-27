"use client"

import type React from "react"

import { Search, X, Filter, ChevronRight, ChevronDown, FolderTree } from "lucide-react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { Categoria, Rubro } from "@/types/menu"

interface SearchBarProps {
  categorias?: Categoria[]
  rubros?: Rubro[]
}

export default function SearchBar({ categorias = [], rubros = [] }: SearchBarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "")
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<{ id: string, name: string, type: 'category' | 'subcategory' | 'rubro' } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

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

  const performSearch = useCallback(() => {
    const params = new URLSearchParams()

    // Combine search query with filter if both exist
    if (selectedFilter) {
      if (selectedFilter.type === 'rubro') {
        // For rubros, combine with search query or use rubro name
        const combinedQuery = searchQuery
          ? `${searchQuery} ${selectedFilter.name}`.trim()
          : selectedFilter.name
        params.set("q", combinedQuery)
      } else if (selectedFilter.type === 'category') {
        params.set("categoria", selectedFilter.id)
        if (searchQuery) params.set("q", searchQuery)
      } else if (selectedFilter.type === 'subcategory') {
        params.set("subcategoria", selectedFilter.id)
        if (searchQuery) params.set("q", searchQuery)
      }
    } else if (searchQuery) {
      params.set("q", searchQuery)
    }

    // Update URL - this will trigger page revalidation
    const queryString = params.toString()
    const newUrl = queryString ? `/productos?${queryString}` : "/productos"
    router.push(newUrl, { scroll: false })
  }, [searchQuery, selectedFilter, router])

  // Auto-search with debounce when searchQuery changes
  useEffect(() => {
    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Only trigger auto-search if on productos page
    if (pathname === "/productos") {
      debounceTimerRef.current = setTimeout(() => {
        performSearch()
      }, 400) // 400ms debounce
    }

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [searchQuery, selectedFilter, pathname, performSearch])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // If not on productos page, navigate there
    if (pathname !== "/productos") {
      const params = new URLSearchParams()

      if (selectedFilter) {
        if (selectedFilter.type === 'rubro') {
          const combinedQuery = searchQuery
            ? `${searchQuery} ${selectedFilter.name}`.trim()
            : selectedFilter.name
          params.set("q", combinedQuery)
        } else if (selectedFilter.type === 'category') {
          params.set("categoria", selectedFilter.id)
          if (searchQuery) params.set("q", searchQuery)
        } else if (selectedFilter.type === 'subcategory') {
          params.set("subcategoria", selectedFilter.id)
          if (searchQuery) params.set("q", searchQuery)
        }
      } else if (searchQuery) {
        params.set("q", searchQuery)
      }

      if (searchQuery || selectedFilter) {
        router.push(`/productos?${params.toString()}`)
        setIsMobileSearchOpen(false)
        setIsFilterOpen(false)
      }
    } else {
      // Already on productos page, just perform search
      performSearch()
      setIsMobileSearchOpen(false)
      setIsFilterOpen(false)
    }
  }

  const clearFilter = () => {
    setSelectedFilter(null)
    setIsFilterOpen(false)
  }

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery("")
    if (pathname === "/productos") {
      // Clear search and filters
      router.push("/productos", { scroll: false })
    }
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
              <div className="absolute top-full left-0 mt-2 w-72 bg-popover border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="max-h-[400px] overflow-y-auto p-2">
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

                  {rubros.map((rubro) => (
                    <div key={rubro.id} className="mb-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFilter({ id: rubro.id, name: rubro.nombre, type: 'rubro' })
                          setIsFilterOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm font-semibold hover:bg-accent rounded-md flex items-center gap-2 group bg-muted/50"
                      >
                        <FolderTree className="h-4 w-4 text-primary" />
                        {rubro.nombre}
                        <span className="text-xs text-muted-foreground group-hover:text-foreground ml-auto">
                          {rubro.categorias.length}
                        </span>
                      </button>

                      <div className="pl-2 mt-1 space-y-1">
                        {rubro.categorias.map((cat) => (
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
                  ))}

                  {categorias.length > 0 && (
                    <>
                      <div className="border-t border-border my-2" />
                      <div className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Otras categorias
                      </div>
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
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative flex-1">
            <input
              type="text"
              placeholder={selectedFilter ? `Buscar en ${selectedFilter.name}...` : "Buscar productos..."}
              value={searchQuery}
              onChange={handleQueryChange}
              className="w-full px-4 py-2.5 pr-24 border border-input rounded-r-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all border-l-0"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-12 top-1/2 -translate-y-1/2 p-2 hover:bg-accent rounded-md transition-colors"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
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
                ref={inputRef}
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={handleQueryChange}
                className={cn(
                  "w-full pl-11 pr-12 h-11",
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
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-accent rounded-md transition-colors"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </>
  )
}
