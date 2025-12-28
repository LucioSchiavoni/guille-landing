"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Phone, ChevronRight, ChevronDown } from "lucide-react"
import type { Rubro, Categoria } from "@/types/menu"
import { Button } from "@/components/ui/button"
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleRubro = (rubroId: string) => {
    setExpandedRubro(expandedRubro === rubroId ? null : rubroId)
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
          "fixed top-0 right-0 h-full w-full sm:w-[400px] bg-gradient-to-b from-green-800 to-green-900 z-40 transform transition-transform duration-300 ease-in-out lg:hidden shadow-2xl",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header - Clean & Professional */}
          <div className="flex items-center p-4 border-b border-green-700">
            <div onClick={() => setOpen(false)} className="w-full flex items-center cursor-pointer">
              <Logo className="w-60 h-auto object-contain" />
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="border-b border-green-700">
            <div className="grid grid-cols-2 gap-2 p-4">
              <Link
                href="/productos"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-green-700 border border-green-600 text-sm font-medium text-white hover:bg-green-600 transition-all"
              >
                Productos
              </Link>
              <Link
                href="/nosotros"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-green-700 border border-green-600 text-sm font-medium text-white hover:bg-green-600 transition-all"
              >
                Nosotros
              </Link>
              <Link
                href="/sostenibilidad"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-green-700 border border-green-600 text-sm font-medium text-white hover:bg-green-600 transition-all"
              >
                Sostenibilidad
              </Link>
              <Link
                href="/contacto"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center p-2.5 rounded-lg bg-green-700 border border-green-600 text-sm font-medium text-white hover:bg-green-600 transition-all"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Categories List (Rubros -> Categories) */}
          <div className="flex-1 overflow-y-auto">
            <div className="px-4 py-2">
              <h3 className="text-xs font-bold text-green-200 uppercase tracking-wider mb-2 px-2">
                Explorar por Rubro
              </h3>
              <div className="space-y-1">
                {/* Categorías (Standalone) - Now First */}
                {miscellaneousCategories && miscellaneousCategories.length > 0 && (
                  <div className="rounded-lg overflow-hidden border border-green-600 mb-2">
                    <div
                      className={cn(
                        "w-full flex items-center justify-between pl-4 pr-1 py-1 bg-green-700 hover:bg-green-600 transition-colors cursor-pointer",
                        expandedRubro === "general-categories" && "bg-green-600"
                      )}
                      onClick={() => toggleRubro("general-categories")}
                    >
                      <span className="font-bold text-white text-sm flex-1 py-2">
                        Categorías
                      </span>
                      <button
                        className="p-3 text-white hover:bg-green-500/20 rounded-full"
                      >
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform",
                            expandedRubro === "general-categories" && "rotate-90"
                          )}
                        />
                      </button>
                    </div>

                    {expandedRubro === "general-categories" && (
                      <div className="bg-green-800/50 border-t border-green-700 pl-4 py-2">
                        {[...miscellaneousCategories].sort((a, b) => a.nombre.localeCompare(b.nombre)).map((categoria) => (
                          <div key={categoria.id}>
                            <div className="flex items-center justify-between border-l border-green-600 px-4 py-2">
                              {categoria.subcategorias && categoria.subcategorias.length > 0 ? (
                                <button
                                  onClick={() => toggleCategory(`cat-${categoria.id}`)}
                                  className="text-sm text-white hover:text-green-100 font-medium flex-1 truncate mr-2 text-left"
                                >
                                  {categoria.nombre}
                                </button>
                              ) : (
                                <Link
                                  href={`/productos?categoria=${categoria.id}`}
                                  onClick={() => setOpen(false)}
                                  className="text-sm text-white hover:text-green-100 font-medium flex-1 truncate mr-2"
                                >
                                  {categoria.nombre}
                                </Link>
                              )}

                              {categoria.subcategorias && categoria.subcategorias.length > 0 && (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    toggleCategory(`cat-${categoria.id}`)
                                  }}
                                  className="p-1 rounded hover:bg-green-700/50 text-white"
                                >
                                  {expandedCategories.has(`cat-${categoria.id}`) ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </button>
                              )}
                            </div>

                            {categoria.subcategorias && categoria.subcategorias.length > 0 && expandedCategories.has(`cat-${categoria.id}`) && (
                              <div className="pl-6 pb-2 pr-2 bg-green-800/20">
                                <div className="border-l border-green-600/50 pl-3 flex flex-col gap-2 pt-2 pb-1">
                                  {categoria.subcategorias.map((sub) => (
                                    <Link
                                      key={sub.id}
                                      href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                      onClick={() => setOpen(false)}
                                      className="text-xs text-green-100/90 hover:text-white py-1 block"
                                    >
                                      {sub.nombre}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Rubros Parent Dropdown - Now Second */}
                <div className="rounded-lg overflow-hidden border border-green-600 mb-2">
                  <button
                    onClick={() => setExpandedRubro(expandedRubro === "main-rubros" ? null : "main-rubros")}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3 bg-green-700 hover:bg-green-600 transition-colors",
                      expandedRubro === "main-rubros" && "bg-green-600"
                    )}
                  >
                    <span className="font-bold text-white text-sm">Rubros</span>
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 text-white transition-transform",
                        expandedRubro === "main-rubros" && "rotate-90"
                      )}
                    />
                  </button>

                  {/* Rubros List */}
                  {expandedRubro === "main-rubros" && (
                    <div className="bg-green-900/30 border-t border-green-700 pl-4 py-2 space-y-2">
                      {rubros.map((rubro) => (
                        <div key={rubro.id} className="rounded-lg overflow-hidden border border-green-600 bg-green-700">
                          <div className={cn(
                            "w-full flex items-center justify-between pl-4 pr-1 py-1 hover:bg-green-600 transition-colors",
                            activeRubroId === rubro.id && "bg-green-600"
                          )}>
                            <Link
                              href={`/productos?q=${encodeURIComponent(rubro.nombre)}`}
                              onClick={() => setOpen(false)}
                              className="font-bold text-white text-sm flex-1 py-2"
                            >
                              {rubro.nombre}
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setActiveRubroId(activeRubroId === rubro.id ? null : rubro.id)
                              }}
                              className="p-3 text-white hover:bg-green-500/20 rounded-full"
                            >
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 transition-transform",
                                  activeRubroId === rubro.id && "rotate-90"
                                )}
                              />
                            </button>
                          </div>

                          {/* Categories of the Rubro */}
                          {activeRubroId === rubro.id && (
                            <div className="bg-green-800/50 border-t border-green-700 pl-4 py-2">
                              {[...rubro.categorias].sort((a, b) => a.nombre.localeCompare(b.nombre)).map((categoria) => (
                                <div key={categoria.id}>
                                  <div className="flex items-center justify-between border-l border-green-600 px-4 py-2">
                                    {categoria.subcategorias && categoria.subcategorias.length > 0 ? (
                                      <button
                                        onClick={() => toggleCategory(`rubro-${categoria.id}`)}
                                        className="text-sm text-white hover:text-green-100 font-medium flex-1 truncate mr-2 text-left"
                                      >
                                        {categoria.nombre}
                                      </button>
                                    ) : (
                                      <Link
                                        href={`/productos?categoria=${categoria.id}`}
                                        onClick={() => setOpen(false)}
                                        className="text-sm text-white hover:text-green-100 font-medium flex-1 truncate mr-2"
                                      >
                                        {categoria.nombre}
                                      </Link>
                                    )}

                                    {categoria.subcategorias && categoria.subcategorias.length > 0 && (
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault()
                                          e.stopPropagation()
                                          toggleCategory(`rubro-${categoria.id}`)
                                        }}
                                        className="p-1 rounded hover:bg-green-700/50 text-white"
                                      >
                                        {expandedCategories.has(`rubro-${categoria.id}`) ? (
                                          <ChevronDown className="h-4 w-4" />
                                        ) : (
                                          <ChevronRight className="h-4 w-4" />
                                        )}
                                      </button>
                                    )}
                                  </div>

                                  {categoria.subcategorias && categoria.subcategorias.length > 0 && expandedCategories.has(`rubro-${categoria.id}`) && (
                                    <div className="pl-6 pb-2 pr-2 bg-green-800/20">
                                      <div className="border-l border-green-600/50 pl-3 flex flex-col gap-2 pt-2 pb-1">
                                        {categoria.subcategorias.map((sub) => (
                                          <Link
                                            key={sub.id}
                                            href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                            onClick={() => setOpen(false)}
                                            className="text-xs text-green-100/90 hover:text-white py-1 block"
                                          >
                                            {sub.nombre}
                                          </Link>
                                        ))}
                                      </div>
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
              </div>
            </div>
          </div>

          {/* Footer CTA - Clean without gradient */}
          <div className="border-t border-green-700 p-4">
            <Link href="/contacto" onClick={() => setOpen(false)}>
              <Button className="w-full bg-white hover:bg-green-50 text-green-700 font-semibold py-6 text-base shadow-lg">
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
