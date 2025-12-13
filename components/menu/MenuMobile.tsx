"use client"

import Link from "next/link"
import { useState, Suspense } from "react"
import { Menu, X, Search, Package, Phone, ChevronRight, Home } from "lucide-react"
import type { Categoria } from "@/types/menu"
import { Button } from "@/components/ui/button"
import { SearchCommand } from "../header/SearchCommand"
import { cn } from "@/lib/utils"

interface MenuMobileProps {
  categorias: Categoria[]
}

export default function MenuMobile({ categorias }: MenuMobileProps) {
  const [open, setOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <>
      {/* Hamburger Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="lg:hidden relative z-50 hover:bg-green-700/20"
      >
        {open ? (
          <X className="h-6 w-6 text-white font-bold" />
        ) : (
          <Menu className="h-6 w-6 text-white font-bold" />
        )}
      </Button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-40 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <h2 className="text-2xl font-bold mb-1">Menú</h2>
            <p className="text-sm text-green-100">TodoEnPackaging</p>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b bg-gray-50">
            <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />}>
              <SearchCommand categorias={categorias} onSearch={() => setOpen(false)} />
            </Suspense>
          </div>

          {/* Quick Navigation Links */}
          <div className="border-b bg-white">
            <div className="grid grid-cols-2 gap-2 p-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all group"
              >
                <div className="bg-green-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800">Inicio</span>
              </Link>

              <Link
                href="/nosotros"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 transition-all group"
              >
                <div className="bg-blue-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800">Nosotros</span>
              </Link>

              <Link
                href="/#sostenibilidad"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 transition-all group"
              >
                <div className="bg-emerald-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-800">Sostenibilidad</span>
              </Link>

              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 transition-all group"
              >
                <div className="bg-orange-600 p-3 rounded-full mb-2 group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800">Contacto</span>
              </Link>
            </div>
          </div>

          {/* Categories List */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                Explorar Categorías
              </h3>
              <div className="space-y-2">
                {categorias
                  .filter(c => !c.nombre.trim().toLowerCase().includes("destacados"))
                  .sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((categoria) => (
                    <div key={categoria.id} className="rounded-lg overflow-hidden border border-gray-200">
                      {/* Category Header */}
                      <button
                        onClick={() => toggleCategory(categoria.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors",
                          expandedCategory === categoria.id && "bg-green-50"
                        )}
                      >
                        <span className="font-semibold text-gray-800">{categoria.nombre}</span>
                        <ChevronRight
                          className={cn(
                            "h-5 w-5 text-gray-400 transition-transform",
                            expandedCategory === categoria.id && "rotate-90"
                          )}
                        />
                      </button>

                      {/* Subcategories */}
                      {expandedCategory === categoria.id && (
                        <div className="bg-gray-50 border-t border-gray-200">
                          {categoria.subcategorias.map((sub) => (
                            <Link
                              key={sub.id}
                              href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                              onClick={() => setOpen(false)}
                              className="block px-6 py-3 text-sm text-gray-700 hover:bg-green-100 hover:text-green-800 transition-colors border-b border-gray-200 last:border-b-0"
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                                {sub.nombre}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Footer CTA */}
          <div className="border-t bg-gradient-to-r from-green-600 to-emerald-600 p-4">
            <Link href="/contacto" onClick={() => setOpen(false)}>
              <Button className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold py-6 text-base">
                <Phone className="h-5 w-5 mr-2" />
                Contactanos Ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
