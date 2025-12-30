"use client"

import { useState, useEffect } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Menu, X, Phone, ChevronRight, ChevronDown, Facebook, Instagram, Linkedin } from "lucide-react"
import type { Rubro, Categoria } from "@/types/menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface MenuMobileProps {
  rubros: Rubro[]
  miscellaneousCategories: Categoria[]
}

export default function MenuMobile({ rubros, miscellaneousCategories }: MenuMobileProps) {
  const [open, setOpen] = useState(false)
  const [expandedRubro, setExpandedRubro] = useState<string | null>(null)
  const [activeRubroId, setActiveRubroId] = useState<string | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
        className="lg:hidden relative z-[100] hover:bg-white/10 text-white transition-colors"
      >
        {open ? (
          <X className="h-7 w-7 drop-shadow-md" />
        ) : (
          <Menu className="h-7 w-7 drop-shadow-md" />
        )}
      </Button>

      {/* Portal for Menu Overlay and Sidebar */}
      {mounted && createPortal(
        <>
          {/* Overlay */}
          {open && (
            <div
              className="fixed inset-0 bg-black/60 z-[9990] lg:hidden backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setOpen(false)}
            />
          )}

          {/* Slide-in Menu with Glass Effect */}
          <div
            className={cn(
              "fixed top-0 right-0 h-full w-full sm:w-[400px] z-[9999] transform transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) lg:hidden",
              "backdrop-blur-3xl border-l border-white/10 shadow-2xl",
              open ? "translate-x-0" : "translate-x-full"
            )}
            style={{
              backgroundColor: 'rgba(63, 121, 72, 0.98)'
            }}
          >
            {/* Ambient Glow Effects */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none -z-10" style={{ backgroundColor: 'rgba(63, 121, 72, 0.3)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none -z-10" style={{ backgroundColor: 'rgba(63, 121, 72, 0.2)' }} />

            <div className="flex flex-col h-full overflow-hidden">
              {/* Close Button Header for Mobile Menu */}
              <div
                className="flex items-center justify-end p-4 border-b border-white/10 relative"
                style={{
                  backgroundImage: `linear-gradient(rgba(63, 121, 72, 0.85), rgba(63, 121, 72, 0.85)), url('/header-mobile.png')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="text-white hover:bg-white/10 relative z-10"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Quick Navigation Links */}
              <div className="px-4 py-4">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Productos", href: "/productos" },
                    { name: "Nosotros", href: "/nosotros" },
                    { name: "Sostenibilidad", href: "/sostenibilidad" },
                    { name: "Contacto", href: "/contacto" },
                  ].map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-center p-3 rounded-xl border text-sm font-semibold text-white transition-all duration-200 active:scale-95 hover:shadow-lg"
                      style={{
                        backgroundColor: 'rgba(45, 95, 55, 0.7)',
                        borderColor: 'rgba(63, 121, 72, 0.4)'
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Categories List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-4 pb-4">
                <h3 className="text-xs font-bold text-green-300/80 uppercase tracking-widest mb-3 pl-1 flex items-center gap-2">
                  <span className="w-8 h-px bg-green-300/50"></span>
                  Explorar Catálogo
                </h3>

                <div className="space-y-3">
                  {/* Categorías (Standalone) */}
                  {miscellaneousCategories && miscellaneousCategories.length > 0 && (
                    <div className="rounded-xl overflow-hidden border border-white/5 bg-black/20 hover:border-white/10 transition-colors">
                      <div
                        className={cn(
                          "w-full flex items-center justify-between pl-4 pr-1 py-1 transition-all cursor-pointer select-none",
                          expandedRubro === "general-categories" ? "bg-green-700/40 border-b border-white/5" : "hover:bg-white/5"
                        )}
                        onClick={() => toggleRubro("general-categories")}
                      >
                        <span className="font-bold text-white text-base py-3">
                          Categorías Generales
                        </span>
                        <div className={cn("p-3 text-white/70 transition-transform duration-300", expandedRubro === "general-categories" && "rotate-90 text-white")}>
                          <ChevronRight className="h-5 w-5" />
                        </div>
                      </div>

                      <div className={cn(
                        "grid transition-all duration-300 ease-in-out",
                        expandedRubro === "general-categories" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      )}>
                        <div className="overflow-hidden bg-black/20">
                          {[...miscellaneousCategories].sort((a, b) => a.nombre.localeCompare(b.nombre)).map((categoria) => (
                            <div key={categoria.id} className="border-l-2 border-green-500/30 ml-4 my-1">
                              <div className="flex items-center justify-between pl-3 pr-2 py-2 group">
                                {categoria.subcategorias && categoria.subcategorias.length > 0 ? (
                                  <button
                                    onClick={() => toggleCategory(`cat-${categoria.id}`)}
                                    className="text-sm text-white/90 group-hover:text-white font-medium flex-1 text-left py-1 transition-colors"
                                  >
                                    {categoria.nombre}
                                  </button>
                                ) : (
                                  <Link
                                    href={`/productos?categoria=${categoria.id}`}
                                    onClick={() => setOpen(false)}
                                    className="text-sm text-white/90 group-hover:text-white font-medium flex-1 py-1 transition-colors"
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
                                    className="p-1 rounded-full group-hover:bg-white/10 text-white/70 transition-all"
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
                                <div className="pl-4 pb-2 pr-2 animate-fade-in-down">
                                  <div className="flex flex-col gap-1">
                                    {categoria.subcategorias.map((sub) => (
                                      <Link
                                        key={sub.id}
                                        href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                        onClick={() => setOpen(false)}
                                        className="text-xs text-gray-400 hover:text-green-300 py-1.5 px-2 rounded hover:bg-white/5 transition-colors block"
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
                      </div>
                    </div>
                  )}

                  {/* Rubros Parent Dropdown */}
                  <div className="rounded-xl overflow-hidden border border-white/5 bg-black/20 hover:border-white/10 transition-colors">
                    <button
                      onClick={() => setExpandedRubro(expandedRubro === "main-rubros" ? null : "main-rubros")}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-1 transition-all select-none",
                        expandedRubro === "main-rubros" ? "bg-green-700/40 border-b border-white/5" : "hover:bg-white/5"
                      )}
                    >
                      <span className="font-bold text-white text-base py-3">Rubros Especializados</span>
                      <div className={cn("p-3 text-white/70 transition-transform duration-300", expandedRubro === "main-rubros" && "rotate-90 text-white")}>
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </button>

                    <div className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      expandedRubro === "main-rubros" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}>
                      <div className="overflow-hidden bg-black/20 p-2 space-y-2">
                        {rubros.map((rubro) => (
                          <div key={rubro.id} className="rounded-lg overflow-hidden border border-white/5 bg-white/5 group-rubro">
                            <div className={cn(
                              "w-full flex items-center justify-between pl-4 pr-1 py-1 hover:bg-white/5 transition-colors cursor-pointer",
                              activeRubroId === rubro.id && "bg-green-700/30"
                            )}>
                              <Link
                                href={`/productos?q=${encodeURIComponent(rubro.nombre)}`}
                                onClick={() => setOpen(false)}
                                className="font-medium text-white text-sm flex-1 py-2"
                              >
                                {rubro.nombre}
                              </Link>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setActiveRubroId(activeRubroId === rubro.id ? null : rubro.id)
                                }}
                                className="p-3 text-white/70 hover:text-white rounded-full transition-colors"
                              >
                                <ChevronRight
                                  className={cn(
                                    "h-4 w-4 transition-transform duration-200",
                                    activeRubroId === rubro.id && "rotate-90"
                                  )}
                                />
                              </button>
                            </div>

                            {/* Categories of the Rubro */}
                            {activeRubroId === rubro.id && (
                              <div className="bg-black/20 border-t border-white/5 pl-2 py-2 animate-fade-in">
                                {[...rubro.categorias].sort((a, b) => a.nombre.localeCompare(b.nombre)).map((categoria) => (
                                  <div key={categoria.id} className="border-l border-white/10 ml-2">
                                    <div className="flex items-center justify-between px-3 py-1.5 group-cat">
                                      {categoria.subcategorias && categoria.subcategorias.length > 0 ? (
                                        <button
                                          onClick={() => toggleCategory(`rubro-${categoria.id}`)}
                                          className="text-sm text-white font-medium flex-1 text-left transition-colors"
                                        >
                                          {categoria.nombre}
                                        </button>
                                      ) : (
                                        <Link
                                          href={`/productos?categoria=${categoria.id}`}
                                          onClick={() => setOpen(false)}
                                          className="text-sm text-white font-medium flex-1 transition-colors"
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
                                          className="p-1 rounded hover:bg-white/10 text-white/50 transition-colors"
                                        >
                                          {expandedCategories.has(`rubro-${categoria.id}`) ? (
                                            <ChevronDown className="h-3 w-3" />
                                          ) : (
                                            <ChevronRight className="h-3 w-3" />
                                          )}
                                        </button>
                                      )}
                                    </div>

                                    {categoria.subcategorias && categoria.subcategorias.length > 0 && expandedCategories.has(`rubro-${categoria.id}`) && (
                                      <div className="pl-4 py-1">
                                        <div className="flex flex-col gap-1 border-l border-white/5 pl-2">
                                          {categoria.subcategorias.map((sub) => (
                                            <Link
                                              key={sub.id}
                                              href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                              onClick={() => setOpen(false)}
                                              className="text-xs text-gray-500 hover:text-green-300 py-1 block transition-colors"
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
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA & Socials */}
              <div className="border-t border-white/10 p-5 bg-black/20 backdrop-blur-md">
                <Link href="/contacto" onClick={() => setOpen(false)}>
                  <Button
                    className="w-full text-white font-bold py-6 text-base shadow-lg border transition-all hover:scale-[1.02]"
                    style={{
                      backgroundColor: 'rgb(53, 111, 62)',
                      borderColor: 'rgba(63, 121, 72, 0.3)'
                    }}
                  >
                    <Phone className="h-5 w-5 mr-2" />
                    Contáctanos Ahora
                  </Button>
                </Link>

                <div className="mt-6 flex justify-center gap-6">
                  <a
                    href="https://www.instagram.com/todoenpackaging.uy?utm_source=qr&igsh=dGpmeGc4MXl2ZnB6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors hover:scale-110 transform"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.facebook.com/share/1EiUDf5JHj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors hover:scale-110 transform"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/todo-en-packaging-tep-9346a832b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/60 hover:text-white transition-colors hover:scale-110 transform"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  )
}
