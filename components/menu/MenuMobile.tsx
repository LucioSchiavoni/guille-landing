"use client"

import Link from "next/link"
import { useState, Suspense } from "react"
import { Menu, X, Phone, ChevronRight } from "lucide-react"
import type { Rubro, Categoria } from "@/types/menu"
import { Button } from "@/components/ui/button"
import { SearchCommand } from "../header/SearchCommand"
import { cn } from "@/lib/utils"
import Logo from "../header/logo"

interface MenuMobileProps {
  rubros: Rubro[]
  miscellaneousCategories: Categoria[]
}

export default function MenuMobile({ rubros, miscellaneousCategories }: MenuMobileProps) {
  const [open, setOpen] = useState(false)
  const [expandedRubro, setExpandedRubro] = useState<string | null>(null)
  const [activeRubroId, setActiveRubroId] = useState<string | null>(null)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)



  const toggleRubro = (rubroId: string) => {
    setExpandedRubro(expandedRubro === rubroId ? null : rubroId)
    setExpandedCategory(null)
  }

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
          <X className="h-6 w-6 text-green-900 font-bold" />
        ) : (
          <Menu className="h-6 w-6 text-green-900 font-bold" />
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
          {/* Header - Clean & Professional */}
          <div className="flex items-center p-4 border-b bg-white">
            <div onClick={() => setOpen(false)} className="flex items-center cursor-pointer">
              <div className="scale-50 origin-left">
                <Logo />
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="p-4 border-b bg-gray-50">
            <Suspense fallback={<div className="w-full h-10 bg-gray-200 rounded-md animate-pulse" />}>
              <SearchCommand categorias={[]} onSearch={() => setOpen(false)} />
            </Suspense>
          </div>

          {/* Quick Navigation Links */}
          <div className="border-b bg-white">
            <div className="grid grid-cols-2 gap-2 p-4">
              <Link
                href="/productos"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-100 transition-all"
              >
                Productos
              </Link>
              <Link
                href="/nosotros"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-100 transition-all"
              >
                Nosotros
              </Link>
              <Link
                href="/sostenibilidad"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-100 transition-all"
              >
                Sostenibilidad
              </Link>
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-green-700 hover:border-green-100 transition-all"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Categories List (Rubros -> Categories) */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">
                Explorar por Rubro
              </h3>
              <div className="space-y-1">
                {/* Rubros Parent Dropdown */}
                <div className="rounded-lg overflow-hidden border border-gray-100 mb-2">
                  <button
                    onClick={() => setExpandedRubro(expandedRubro === "main-rubros" ? null : "main-rubros")}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors",
                      expandedRubro === "main-rubros" && "bg-gray-50"
                    )}
                  >
                    <span className="font-bold text-gray-900 text-sm">Rubros</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-gray-400 transition-transform",
                        expandedRubro === "main-rubros" && "rotate-90"
                      )}
                    />
                  </button>

                  {/* Rubros List */}
                  {expandedRubro === "main-rubros" && (
                    <div className="bg-gray-50/30 border-t border-gray-100 pl-4 py-2 space-y-2">
                      {rubros.map((rubro) => (
                        <div key={rubro.id} className="rounded-lg overflow-hidden border border-gray-200 bg-white">
                          <button
                            onClick={() => setActiveRubroId(activeRubroId === rubro.id ? null : rubro.id)}
                            className={cn(
                              "w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors",
                              activeRubroId === rubro.id && "bg-gray-50"
                            )}
                          >
                            <span className="font-bold text-gray-900 text-sm">{rubro.nombre}</span>
                            <ChevronRight
                              className={cn(
                                "h-4 w-4 text-gray-400 transition-transform",
                                activeRubroId === rubro.id && "rotate-90"
                              )}
                            />
                          </button>

                          {/* Categories of the Rubro */}
                          {activeRubroId === rubro.id && (
                            <div className="bg-gray-50/50 border-t border-gray-100 pl-4">
                              {rubro.categorias.map((categoria) => (
                                <div key={categoria.id} className="border-l border-gray-200">
                                  <button
                                    onClick={() => toggleCategory(categoria.id)}
                                    className={cn(
                                      "w-full flex items-center justify-between px-4 py-2 hover:bg-green-50 transition-colors text-left",
                                      expandedCategory === categoria.id && "bg-green-50/50 text-green-700"
                                    )}
                                  >
                                    <span className="font-medium text-gray-700 text-sm">{categoria.nombre}</span>
                                    <ChevronRight
                                      className={cn(
                                        "h-3 w-3 text-gray-400 transition-transform",
                                        expandedCategory === categoria.id && "rotate-90"
                                      )}
                                    />
                                  </button>

                                  {/* Subcategories */}
                                  {expandedCategory === categoria.id && (
                                    <div className="bg-green-50/10 pl-4 pb-2">
                                      {categoria.subcategorias.map((sub) => (
                                        <Link
                                          key={sub.id}
                                          href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                          onClick={() => setOpen(false)}
                                          className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 transition-colors border-l-2 border-transparent hover:border-green-400"
                                        >
                                          {sub.nombre}
                                        </Link>
                                      ))}
                                      <Link
                                        href={`/productos?categoria=${categoria.id}`}
                                        onClick={() => setOpen(false)}
                                        className="block px-4 py-2 text-xs text-green-600 hover:underline font-medium"
                                      >
                                        Ver todo en {categoria.nombre}
                                      </Link>
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

                {/* Otras Categorías (Standalone) */}
                {miscellaneousCategories && miscellaneousCategories.length > 0 && (
                  <div className="rounded-lg overflow-hidden border border-gray-100 mb-2">
                    <button
                      onClick={() => toggleRubro("general-categories")}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition-colors",
                        expandedRubro === "general-categories" && "bg-gray-50"
                      )}
                    >
                      <span className="font-bold text-gray-900 text-sm">Otras Categorías</span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 text-gray-400 transition-transform",
                          expandedRubro === "general-categories" && "rotate-90"
                        )}
                      />
                    </button>

                    {expandedRubro === "general-categories" && (
                      <div className="bg-gray-50/30 border-t border-gray-100 pl-4">
                        {miscellaneousCategories.map((categoria) => (
                          <div key={categoria.id} className="border-l border-gray-200">
                            <button
                              onClick={() => toggleCategory(categoria.id)}
                              className={cn(
                                "w-full flex items-center justify-between px-4 py-2 hover:bg-green-50 transition-colors text-left",
                                expandedCategory === categoria.id && "bg-green-50/50 text-green-700"
                              )}
                            >
                              <span className="font-medium text-gray-700 text-sm">{categoria.nombre}</span>
                              <ChevronRight
                                className={cn(
                                  "h-3 w-3 text-gray-400 transition-transform",
                                  expandedCategory === categoria.id && "rotate-90"
                                )}
                              />
                            </button>

                            {/* Subcategories */}
                            {expandedCategory === categoria.id && (
                              <div className="bg-green-50/10 pl-4 pb-2">
                                {categoria.subcategorias.map((sub) => (
                                  <Link
                                    key={sub.id}
                                    href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                    onClick={() => setOpen(false)}
                                    className="block px-4 py-2 text-sm text-gray-600 hover:text-green-700 transition-colors border-l-2 border-transparent hover:border-green-400"
                                  >
                                    {sub.nombre}
                                  </Link>
                                ))}
                                <Link
                                  href={`/productos?categoria=${categoria.id}`}
                                  onClick={() => setOpen(false)}
                                  className="block px-4 py-2 text-xs text-green-600 hover:underline font-medium"
                                >
                                  Ver todo en {categoria.nombre}
                                </Link>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer CTA - Clean without gradient */}
          <div className="border-t bg-white p-4">
            <Link href="/contacto" onClick={() => setOpen(false)}>
              <Button className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-6 text-base shadow-lg">
                <Phone className="h-5 w-5 mr-2" />
                Contáctanos Ahora
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
