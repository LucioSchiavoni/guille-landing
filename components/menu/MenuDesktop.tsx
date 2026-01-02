"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { ChevronDown, Package, ChevronRight } from "lucide-react"
import { Rubro, Categoria } from "@/types/menu"
import { cn } from "@/lib/utils"

// 🚀 Reemplazamos framer-motion con CSS puro para mejor rendimiento
// Las animaciones se manejan con clases de Tailwind

interface MenuDesktopProps {
  rubros: Rubro[]
  miscellaneousCategories: Categoria[]
}

export default function MenuDesktop({ rubros, miscellaneousCategories }: MenuDesktopProps) {
  const [activeMenu, setActiveMenu] = useState<'rubros' | 'categorias' | null>(null)
  const [activeRubro, setActiveRubro] = useState<Rubro | null>(null)
  const [activeCategoria, setActiveCategoria] = useState<Categoria | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Set default active items
  useEffect(() => {
    if (activeMenu === 'rubros' && rubros.length > 0 && !activeRubro) {
      setActiveRubro(rubros[0])
    }
    if (activeMenu === 'categorias' && miscellaneousCategories.length > 0 && !activeCategoria) {
      setActiveCategoria(miscellaneousCategories[0])
    }
  }, [activeMenu, rubros, miscellaneousCategories])

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

          {/* 🎨 Dropdown con CSS animations - sin framer-motion */}
          <div
            className={cn(
              "absolute top-full left-0 pt-2 z-50 w-[600px] -left-[100px]",
              "transition-all duration-200 ease-out origin-top",
              activeMenu === 'rubros'
                ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
            )}
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
                  activeRubro.categorias && activeRubro.categorias.length > 0 ? (
                    <div className="space-y-3">
                      {[...activeRubro.categorias].sort((a, b) => a.nombre.localeCompare(b.nombre)).map((categoria) => (
                        <div key={categoria.id} className="rounded-lg p-2 hover:bg-gray-50 transition-all duration-300">
                          <Link
                            href={categoria.slug ? `/categoria/${categoria.slug}` : `/productos?categoria=${categoria.id}`}
                            className="block text-sm font-bold text-gray-800 hover:text-green-700 mb-1 transition-all duration-300 hover:translate-x-1"
                          >
                            {categoria.nombre}
                          </Link>
                          {categoria.subcategorias?.length > 0 ? (
                            <div className="grid grid-cols-2 gap-x-2 gap-y-1 pl-2 border-l-2 border-green-100 ml-1">
                              {categoria.subcategorias.map((sub) => (
                                <Link
                                  key={sub.id}
                                  href={sub.slug ? `/subcategoria/${sub.slug}` : `/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                  className="text-xs text-gray-500 hover:text-green-600 truncate py-0.5 transition-all duration-300 hover:translate-x-0.5"
                                >
                                  {sub.nombre}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 pl-2 border-l-2 border-green-100 ml-1 py-1">
                              Consultanos por stock y disponibilidad
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                      <span className="text-2xl mb-2">📦</span>
                      <p className="text-sm font-medium text-gray-600 mb-1">¿Buscás algo específico?</p>
                      <p className="text-xs text-gray-400">Consultanos por stock y disponibilidad</p>
                    </div>
                  )
                ) : (
                  <div className="text-sm text-gray-400 px-3 italic">Selecciona un rubro</div>
                )}
              </div>
            </div>
          </div>
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
              <Package className={cn("w-4 h-4 transition-transform duration-300", activeMenu === 'categorias' && "scale-110")} />
              <span>Categorías</span>
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", activeMenu === 'categorias' && "rotate-180")} />
            </Link>

            {/* 🎨 Dropdown con CSS animations - sin framer-motion */}
            <div
              className={cn(
                "absolute top-full left-0 pt-2 z-50 w-[500px] -left-[50px]",
                "transition-all duration-200 ease-out origin-top",
                activeMenu === 'categorias'
                  ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              )}
            >
              <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden flex h-[400px]">
                {/* Column 1: Categories List */}
                <div className="w-56 bg-gray-50 border-r border-gray-100 p-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                    Selecciona una Categoría
                  </h3>
                  <div className="space-y-1">
                    {[...miscellaneousCategories].sort((a, b) => a.nombre.localeCompare(b.nombre)).map((categoria) => (
                      <Link
                        key={categoria.id}
                        href={categoria.slug ? `/categoria/${categoria.slug}` : `/productos?categoria=${categoria.id}`}
                        onMouseEnter={() => setActiveCategoria(categoria)}
                        className={cn(
                          "w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-between group",
                          "hover:translate-x-1",
                          activeCategoria?.id === categoria.id
                            ? "bg-white text-green-700 shadow-md scale-[1.02]"
                            : "text-gray-600 hover:bg-white hover:text-green-700 hover:shadow-sm"
                        )}
                      >
                        {categoria.nombre}
                        <ChevronRight className={cn(
                          "w-4 h-4 text-gray-400 transition-all duration-300",
                          activeCategoria?.id === categoria.id ? "opacity-100 text-green-500 translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                        )} />
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Column 2: Subcategories of selected Category */}
                <div className="flex-1 p-4 overflow-y-auto bg-white [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-400">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                    Subcategorías
                  </h3>
                  {activeCategoria ? (
                    activeCategoria.subcategorias && activeCategoria.subcategorias.length > 0 ? (
                      <div className="grid grid-cols-1 gap-1">
                        {activeCategoria.subcategorias.map((sub) => (
                          <Link
                            key={sub.id}
                            href={sub.slug ? `/subcategoria/${sub.slug}` : `/productos?categoria=${activeCategoria.id}&subcategoria=${sub.id}`}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-green-700 hover:bg-gray-50 rounded-lg transition-all duration-300 hover:translate-x-1"
                          >
                            {sub.nombre}
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-center px-4">
                        <span className="text-2xl mb-2">📦</span>
                        <p className="text-sm font-medium text-gray-600 mb-1">¿Buscás algo específico?</p>
                        <p className="text-xs text-gray-400">Consultanos por stock y disponibilidad</p>
                      </div>
                    )
                  ) : (
                    <div className="text-sm text-gray-400 px-3 italic">Selecciona una categoría 👈</div>
                  )}
                </div>
              </div>
            </div>
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
