"use client"

import { useState } from "react"
import type { Categoria } from "@/types/menu"

interface MenuMobileProps {
  categorias: Categoria[]
}

export default function MenuMobile({ categorias }: MenuMobileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null)

  const toggleCategory = (id: string) => {
    setOpenCategory(openCategory === id ? null : id)
    setOpenSubcategory(null)
  }

  const toggleSubcategory = (id: string) => {
    setOpenSubcategory(openSubcategory === id ? null : id)
  }

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-foreground hover:text-primary transition-colors flex items-center justify-center w-full"
        aria-label="Menú"
      >
        <span className="mr-2 font-medium">Menú</span>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-80 bg-background shadow-2xl overflow-y-auto z-[70] animate-in slide-in-from-left duration-300 border-r border-border"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-foreground">Menú</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="space-y-2">
                {categorias.map((categoria) => (
                  <div key={categoria.id} className="mb-2">
                    <button
                      onClick={() => toggleCategory(categoria.id)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 text-base font-medium rounded-lg transition-all duration-200
                        ${openCategory === categoria.id ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent/50"}
                      `}
                    >
                      <span>{categoria.nombre}</span>
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${openCategory === categoria.id ? "rotate-180" : ""
                          }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {openCategory === categoria.id && (
                      <div className="mt-2 space-y-1 pl-4 animate-in slide-in-from-top-2 duration-200">
                        {categoria.subcategorias.map((sub) => (
                          <div key={sub.id}>
                            <button
                              onClick={() => toggleSubcategory(sub.id)}
                              className={`
                                w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-md transition-colors
                                ${openSubcategory === sub.id ? "text-primary font-medium bg-accent/30" : "text-muted-foreground hover:text-foreground hover:bg-accent/30"}
                              `}
                            >
                              <span>{sub.nombre}</span>
                              {((sub.items && sub.items.length > 0) || sub.variantes) && (
                                <svg
                                  className={`w-4 h-4 transition-transform duration-200 ${openSubcategory === sub.id ? "rotate-180" : ""
                                    }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              )}
                            </button>

                            {openSubcategory === sub.id && (
                              <div className="mt-1 space-y-1 pl-4 animate-in slide-in-from-top-1 duration-200">
                                {sub.variantes
                                  ? sub.variantes.map((variante, idx) => (
                                    <div key={idx} className="py-2">
                                      <div className="px-2 text-xs font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                                        {variante.tipo}
                                      </div>
                                      {variante.items.map((item, itemIdx) => (
                                        <div
                                          key={itemIdx}
                                          className="text-sm text-foreground/80 py-1.5 px-3 hover:bg-primary/5 hover:text-primary rounded cursor-pointer transition-colors"
                                        >
                                          {item}
                                        </div>
                                      ))}
                                    </div>
                                  ))
                                  : sub.items?.map((item, idx) => (
                                    <div
                                      key={idx}
                                      className="text-sm text-foreground/80 py-1.5 px-3 hover:bg-primary/5 hover:text-primary rounded cursor-pointer transition-colors"
                                    >
                                      {item}
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
