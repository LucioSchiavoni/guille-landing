"use client"

import type React from "react"

import { Search, X } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isMobileSearchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isMobileSearchOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // Add your search logic here
    setIsMobileSearchOpen(false)
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
      <form onSubmit={handleSearch} className="hidden lg:block flex-1 max-w-2xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 pr-12 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-accent rounded-md transition-colors"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </form>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 bg-background p-4 shadow-md lg:hidden animate-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 pr-10 border border-input rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(false)}
              className="p-2 text-muted-foreground hover:text-foreground"
            >
              <span className="sr-only">Cerrar</span>
              <X className="h-6 w-6" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
