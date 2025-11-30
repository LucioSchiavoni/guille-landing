"use client"

import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import type { Categoria } from "@/types/menu"

interface MenuDesktopProps {
  categorias: Categoria[]
}

export default function MenuDesktop({ categorias }: MenuDesktopProps) {
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [openSubcategory, setOpenSubcategory] = useState<string | null>(null)
  const menuRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenCategory(null)
        setOpenSubcategory(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleCategory = (id: string) => {
    if (openCategory === id) {
      setOpenCategory(null)
      setOpenSubcategory(null)
    } else {
      setOpenCategory(id)
      setOpenSubcategory(null)
    }
  }

  return (
    <nav className="hidden lg:block">
      <ul ref={menuRef} className="flex items-center gap-2">
        {categorias.map((categoria) => (
          <li key={categoria.id} className="relative group h-full">
            <button
              onClick={() => toggleCategory(categoria.id)}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${openCategory === categoria.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                }
              `}
            >
              {categoria.nombre}
            </button>

            {openCategory === categoria.id && (
              <div className="absolute top-full left-0 pt-2 w-64 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="bg-popover rounded-xl shadow-xl border border-border/50">
                  <ul className="py-2">
                    {categoria.subcategorias.map((sub) => (
                      <li
                        key={sub.id}
                        className="relative"
                        onMouseEnter={() => setOpenSubcategory(sub.id)}
                      >
                        <button
                          className={`
                            w-full px-4 py-2.5 text-left text-sm flex items-center justify-between transition-colors
                            ${openSubcategory === sub.id
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground/80 hover:bg-accent/50 hover:text-foreground"
                            }
                          `}
                        >
                          <span className="font-medium">{sub.nombre}</span>
                          {((sub.items && sub.items.length > 0) || sub.variantes) && (
                            <svg
                              className="w-4 h-4 opacity-50"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          )}
                        </button>

                        {openSubcategory === sub.id &&
                          ((sub.items && sub.items.length > 0) || sub.variantes) && (
                            <div className="absolute left-full top-0 pl-2 w-56 z-50 animate-in fade-in slide-in-from-left-2 duration-200">
                              <div className="bg-popover rounded-xl shadow-xl border border-border/50 overflow-hidden">
                                <div className="py-2 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                                  {sub.variantes ? (
                                    sub.variantes.map((variante, idx) => (
                                      <div key={idx} className="px-2 py-1">
                                        <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                                          {variante.tipo}
                                        </div>
                                        {variante.items.map((item, itemIdx) => (
                                          <Link
                                            key={itemIdx}
                                            href={`/producto/${item.slug}`}
                                            className="block px-2 py-1.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md cursor-pointer transition-colors"
                                          >
                                            {item.name}
                                          </Link>
                                        ))}
                                      </div>
                                    ))
                                  ) : (
                                    <div className="px-2">
                                      {sub.items?.map((item, idx) => (
                                        <Link
                                          key={idx}
                                          href={`/producto/${item.slug}`}
                                          className="block px-2 py-1.5 text-sm text-foreground/80 hover:text-primary hover:bg-primary/5 rounded-md cursor-pointer transition-colors"
                                        >
                                          {item.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
