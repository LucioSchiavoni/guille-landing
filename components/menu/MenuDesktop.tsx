"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Package, ChevronRight } from "lucide-react"
import { Rubro, Categoria } from "@/types/menu"
import { cn } from "@/lib/utils"

interface MenuDesktopProps {
  rubros: Rubro[]
  miscellaneousCategories: Categoria[]
}

export default function MenuDesktop({ rubros, miscellaneousCategories }: MenuDesktopProps) {
  const [activeMenu, setActiveMenu] = useState<'rubros' | 'categorias' | null>(null)
  const [activeRubro, setActiveRubro] = useState<Rubro | null>(null)
  const [activeCategory, setActiveCategory] = useState<Categoria | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Set default active items
  useEffect(() => {
    if (activeMenu === 'rubros' && rubros.length > 0 && !activeRubro) {
      setActiveRubro(rubros[0])
    }
  }, [activeMenu, rubros])

  // Reset active category when changing rubro
  useEffect(() => {
    if (activeRubro && activeRubro.categorias.length > 0) {
      setActiveCategory(activeRubro.categorias[0])
    } else {
      setActiveCategory(null)
    }
  }, [activeRubro])

  const handleMouseEnter = (menu: 'rubros' | 'categorias') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveMenu(menu)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null)
    }, 300)
  }

  return (
    <nav className="hidden lg:block">
      <ul className="flex items-center justify-center gap-6">

        {/* Rubros Dropdown */}
        <li className="relative" onMouseEnter={() => handleMouseEnter('rubros')} onMouseLeave={handleMouseLeave}>
          <Link
            href="/productos"
            className={cn(
              "group flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
              activeMenu === 'rubros'
                ? "bg-green-50 text-green-700"
                : "text-gray-600 hover:text-green-700 hover:bg-green-50/50",
            )}
          >
            <Package className="w-4 h-4" />
            <span>Rubros</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", activeMenu === 'rubros' && "rotate-180")} />
          </Link>

          <AnimatePresence>
            {activeMenu === 'rubros' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 pt-2 z-50 w-[800px] -left-[100px]"
              >
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex h-[500px]">
                  {/* Column 1: Rubros List */}
                  <div className="w-64 bg-gray-50 border-r border-gray-100 p-4 overflow-y-auto">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                      Selecciona un Rubro
                    </h3>
                    <div className="space-y-1">
                      {rubros.map((rubro) => (
                        <button
                          key={rubro.id}
                          onMouseEnter={() => setActiveRubro(rubro)}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between group",
                            activeRubro?.id === rubro.id
                              ? "bg-white text-green-700 shadow-sm"
                              : "text-gray-600 hover:bg-white hover:text-green-700 hover:shadow-sm"
                          )}
                        >
                          {rubro.nombre}
                          <ChevronRight className={cn(
                            "w-4 h-4 text-gray-400 transition-opacity",
                            activeRubro?.id === rubro.id ? "opacity-100 text-green-500" : "opacity-0 group-hover:opacity-50"
                          )} />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Categories of selected Rubro */}
                  <div className="w-64 border-r border-gray-100 p-4 overflow-y-auto bg-white">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                      Categorías
                    </h3>
                    {activeRubro ? (
                      <div className="space-y-1">
                        {activeRubro.categorias.map((categoria) => (
                          <button
                            key={categoria.id}
                            onMouseEnter={() => setActiveCategory(categoria)}
                            className={cn(
                              "w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center justify-between group",
                              activeCategory?.id === categoria.id
                                ? "bg-green-50 text-green-700"
                                : "text-gray-600 hover:bg-gray-50 hover:text-green-700"
                            )}
                          >
                            {categoria.nombre}
                            <ChevronRight className={cn(
                              "w-4 h-4 text-gray-400 transition-opacity",
                              activeCategory?.id === categoria.id ? "opacity-100 text-green-500" : "opacity-0 group-hover:opacity-50"
                            )} />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 px-3 italic">Selecciona un rubro</div>
                    )}
                  </div>

                  {/* Column 3: Subcategories */}
                  <div className="flex-1 p-6 overflow-y-auto bg-white">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
                      {activeCategory ? `Explorar ${activeCategory.nombre}` : 'Subcategorías'}
                    </h3>

                    {activeCategory ? (
                      <div className="grid grid-cols-2 gap-4">
                        {activeCategory.subcategorias.map((sub) => (
                          <Link
                            key={sub.id}
                            href={`/productos?categoria=${activeCategory.id}&subcategoria=${sub.id}`}
                            className="group block p-3 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all"
                          >
                            <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 block mb-1">
                              {sub.nombre}
                            </span>
                            <span className="text-xs text-gray-400 group-hover:text-green-600/70">
                              Ver productos
                            </span>
                          </Link>
                        ))}
                        <Link
                          href={`/productos?categoria=${activeCategory.id}`}
                          className="flex items-center justify-center p-3 rounded-xl border border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50/50 text-sm md:col-span-2 mt-2 transition-all text-gray-500 hover:text-green-700"
                        >
                          Ver todo en {activeCategory.nombre}
                        </Link>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm">
                        <Package className="w-8 h-8 opacity-20 mb-2" />
                        Selecciona una categoría para ver opciones
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>

        {/* Categories Dropdown (Independent) */}
        {miscellaneousCategories && miscellaneousCategories.length > 0 && (
          <li className="relative" onMouseEnter={() => handleMouseEnter('categorias')} onMouseLeave={handleMouseLeave}>
            <button
              className={cn(
                "group flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                activeMenu === 'categorias'
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:text-green-700 hover:bg-green-50/50",
              )}
            >
              <span>Categorías</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", activeMenu === 'categorias' && "rotate-180")} />
            </button>

            <AnimatePresence>
              {activeMenu === 'categorias' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 pt-2 z-50 w-[240px]"
                >
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                    {miscellaneousCategories.map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/productos?categoria=${cat.id}`}
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        {cat.nombre}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )}


        <li>
          <Link
            href="/nosotros"
            className="text-sm font-medium text-muted-foreground hover:text-green-700 transition-colors"
          >
            Nosotros
          </Link>
        </li>
        <li>
          <Link
            href="/sostenibilidad"
            className="text-sm font-medium text-muted-foreground hover:text-green-700 transition-colors"
          >
            Sostenibilidad
          </Link>
        </li>
      </ul>
    </nav>
  )
}
