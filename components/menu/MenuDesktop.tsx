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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Set default active items
  useEffect(() => {
    if (activeMenu === 'rubros' && rubros.length > 0 && !activeRubro) {
      setActiveRubro(rubros[0])
    }
  }, [activeMenu, rubros])

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
              "group flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out",
              "hover:scale-105 hover:shadow-lg hover:shadow-white/20",
              activeMenu === 'rubros'
                ? "bg-white/15 text-white shadow-md"
                : "text-white/90 hover:text-white hover:bg-white/10",
            )}
          >
            <Package className={cn("w-4 h-4 transition-transform duration-300", activeMenu === 'rubros' && "scale-110")} />
            <span>Rubros</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeMenu === 'rubros' && "rotate-180")} />
          </Link>

          <AnimatePresence>
            {activeMenu === 'rubros' && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute top-full left-0 pt-2 z-50 w-[600px] -left-[100px]"
              >
                <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex h-[400px]">
                  {/* Column 1: Rubros List */}
                  <div className="w-64 bg-gray-50 border-r border-gray-100 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                      Selecciona un Rubro
                    </h3>
                    <div className="space-y-1">
                      {rubros.map((rubro) => (
                        <Link
                          key={rubro.id}
                          href={`/productos?q=${encodeURIComponent(rubro.nombre)}`}
                          onMouseEnter={() => setActiveRubro(rubro)}
                          className={cn(
                            "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between group",
                            "hover:translate-x-1",
                            activeRubro?.id === rubro.id
                              ? "bg-white text-green-700 shadow-md scale-[1.02]"
                              : "text-gray-600 hover:bg-white hover:text-green-700 hover:shadow-sm"
                          )}
                        >
                          {rubro.nombre}
                          <ChevronRight className={cn(
                            "w-4 h-4 text-gray-400 transition-all duration-300",
                            activeRubro?.id === rubro.id ? "opacity-100 text-green-500 translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                          )} />
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Categories of selected Rubro */}
                  <div className="flex-1 p-4 overflow-y-auto bg-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                      Categorías y Subcategorías
                    </h3>
                    {activeRubro ? (
                      <div className="space-y-3">
                        {[...activeRubro.categorias].sort((a, b) => a.nombre.localeCompare(b.nombre)).map((categoria) => (
                          <div key={categoria.id} className="rounded-lg p-2 hover:bg-gray-50 transition-all duration-300">
                            <Link
                              href={`/productos?categoria=${categoria.id}`}
                              className="block text-sm font-bold text-gray-800 hover:text-green-700 mb-1 transition-all duration-300 hover:translate-x-1"
                            >
                              {categoria.nombre}
                            </Link>
                            {categoria.subcategorias && categoria.subcategorias.length > 0 && (
                              <div className="grid grid-cols-2 gap-x-2 gap-y-1 pl-2 border-l-2 border-green-100 ml-1">
                                {categoria.subcategorias.map((sub) => (
                                  <Link
                                    key={sub.id}
                                    href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                    className="text-xs text-gray-500 hover:text-green-600 truncate py-0.5 transition-all duration-300 hover:translate-x-0.5"
                                  >
                                    {sub.nombre}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 px-3 italic">Selecciona un rubro</div>
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
            <Link
              href="/productos"
              className={cn(
                "group flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out",
                "hover:scale-105 hover:shadow-lg hover:shadow-white/20",
                activeMenu === 'categorias'
                  ? "bg-white/15 text-white shadow-md"
                  : "text-white/90 hover:text-white hover:bg-white/10",
              )}
            >
              <span>Categorías</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeMenu === 'categorias' && "rotate-180")} />
            </Link>

            <AnimatePresence>
              {activeMenu === 'categorias' && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="absolute top-full left-0 pt-2 z-50 w-[300px]"
                >
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-3 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                    <div className="px-2 space-y-2">
                      {[...miscellaneousCategories].sort((a, b) => a.nombre.localeCompare(b.nombre)).map((cat) => (
                        <div key={cat.id} className="rounded-lg p-2 hover:bg-gray-50 transition-all duration-300">
                          <Link
                            href={`/productos?categoria=${cat.id}`}
                            className="block text-sm font-bold text-gray-800 hover:text-green-700 mb-1 transition-all duration-300 hover:translate-x-1"
                          >
                            {cat.nombre}
                          </Link>
                          {cat.subcategorias && cat.subcategorias.length > 0 && (
                            <div className="flex flex-col gap-1 pl-2 border-l-2 border-green-100 ml-1">
                              {cat.subcategorias.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={`/productos?categoria=${cat.id}&subcategoria=${sub.id}`}
                                  className="text-xs text-gray-500 hover:text-green-600 truncate py-0.5 transition-all duration-300 hover:translate-x-0.5"
                                >
                                  {sub.nombre}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )}


        <li>
          <Link
            href="/nosotros"
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out",
              "text-white/90 hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            )}
          >
            Nosotros
          </Link>
        </li>
        <li>
          <Link
            href="/sostenibilidad"
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ease-out",
              "text-white/90 hover:text-white hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            )}
          >
            Sostenibilidad
          </Link>
        </li>
      </ul>
    </nav>
  )
}
