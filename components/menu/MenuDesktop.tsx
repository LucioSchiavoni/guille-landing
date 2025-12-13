"use client"

import Link from "next/link"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown, Star, Package, Utensils, Coffee, ShoppingBag, Box, ChevronRight,
  Soup, Wine, GlassWater, UtensilsCrossed, Scroll, Disc, Circle, Milk, CakeSlice,
  Archive, PartyPopper, Layers
} from "lucide-react"
import type { Categoria } from "@/types/menu"
import { urlFor } from "@/lib/sanity"
import { cn } from "@/lib/utils"

interface MenuDesktopProps {
  categorias: Categoria[]
}

const CATEGORY_GROUPS: Record<string, string[]> = {
  "Para Servir": ["BANDEJAS", "BOWLS", "COPAS"],
  "Para Beber": ["BOTELLAS PET", "COPAS"],
  "Para Comer": ["CUBIERTOS", "BROCHETAS"],
  Empaque: ["BOLSAS", "CAJAS", "BUDINERAS"],
  Extras: ["CINTA ADHESIVA", "DISCOS", "GLOBOS"],
}

const getGroupColor = (group: string) => {
  switch (group) {
    case "Para Servir": return "bg-orange-500"
    case "Para Beber": return "bg-blue-500"
    case "Para Comer": return "bg-green-500"
    case "Empaque": return "bg-purple-500"
    case "Extras": return "bg-gray-500"
    default: return "bg-primary"
  }
}

const getCategoryIcon = (name: string) => {
  const lower = name.toLowerCase()

  // Para Servir
  if (lower.includes("bowl") || lower.includes("tazon")) return <Soup className="w-4 h-4" />
  if (lower.includes("bandeja")) return <Layers className="w-4 h-4" />

  // Para Beber
  if (lower.includes("copa")) return <Wine className="w-4 h-4" />
  if (lower.includes("vaso")) return <GlassWater className="w-4 h-4" />
  if (lower.includes("botella")) return <Milk className="w-4 h-4" />
  if (lower.includes("cafe") || lower.includes("taza")) return <Coffee className="w-4 h-4" />

  // Para Comer
  if (lower.includes("cubierto")) return <UtensilsCrossed className="w-4 h-4" />
  if (lower.includes("brocheta")) return <UtensilsCrossed className="w-4 h-4 rotate-45" /> // Improvisación para brocheta

  // Empaque
  if (lower.includes("caja")) return <Box className="w-4 h-4" />
  if (lower.includes("bolsa")) return <ShoppingBag className="w-4 h-4" />
  if (lower.includes("budinera")) return <CakeSlice className="w-4 h-4" />
  if (lower.includes("packaging") || lower.includes("empaque")) return <Package className="w-4 h-4" />

  // Extras
  if (lower.includes("cinta")) return <Scroll className="w-4 h-4" />
  if (lower.includes("disco")) return <Disc className="w-4 h-4" />
  if (lower.includes("rollo")) return <Circle className="w-4 h-4" />
  if (lower.includes("globo") || lower.includes("fiesta")) return <PartyPopper className="w-4 h-4" />

  return <Package className="w-4 h-4" />
}

export default function MenuDesktop({ categorias }: MenuDesktopProps) {
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsProductsOpen(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false)
      setHoveredCategory(null)
      setHoveredSubcategory(null)
    }, 300)
  }

  const handleCategoryHover = (categoryId: string) => {
    setHoveredCategory(categoryId)
    setHoveredSubcategory(null)
  }

  return (
    <nav className="hidden lg:block w-full">
      <ul className="flex items-center justify-center gap-6">
        {/* Productos Dropdown */}
        <li className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button
            className={cn(
              "group flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
              isProductsOpen
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
            )}
          >
            <Package className="w-4 h-4" />
            <span>Productos</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isProductsOpen && "rotate-180")} />
          </button>

          <AnimatePresence>
            {isProductsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 z-50"
              >
                <div className="flex bg-popover rounded-xl shadow-2xl border border-border/50 overflow-hidden h-[550px]">
                  {/* Left Column: Categories List */}
                  <div
                    className="w-72 h-full overflow-y-auto border-r border-border/50 bg-background flex-shrink-0"
                    style={{ direction: 'rtl' }}
                  >
                    <div className="p-2 flex flex-col gap-1" style={{ direction: 'ltr' }}>
                      {categorias
                        .filter(c => !c.nombre.trim().toLowerCase().includes("destacados"))
                        .sort((a, b) => a.nombre.localeCompare(b.nombre))
                        .map((categoria) => {
                          const groupEntry = Object.entries(CATEGORY_GROUPS).find(([_, keywords]) =>
                            keywords.some((k) => categoria.nombre.toUpperCase().includes(k)),
                          )
                          const groupName = groupEntry ? groupEntry[0] : null
                          const groupColor = groupName ? getGroupColor(groupName) : "bg-transparent"

                          return (
                            <div
                              key={categoria.id}
                              onMouseEnter={() => handleCategoryHover(categoria.id)}
                            >
                              <Link
                                href={`/productos?categoria=${categoria.id}`}
                                className={cn(
                                  "flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group/cat",
                                  hoveredCategory === categoria.id
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground hover:bg-accent/50",
                                )}
                              >
                                <div className="flex items-center gap-3">
                                  {groupName && (
                                    <span className={cn("w-2 h-2 rounded-full shrink-0", groupColor)} title={groupName} />
                                  )}
                                  {getCategoryIcon(categoria.nombre)}
                                  <span className="font-medium text-sm text-left">{categoria.nombre}</span>
                                </div>
                                <ChevronRight className={cn("w-4 h-4 opacity-50", hoveredCategory === categoria.id && "opacity-100 text-primary")} />
                              </Link>
                            </div>
                          )
                        })}
                    </div>
                  </div>

                  {/* Right Panel: Content (Subcategories and Products) */}
                  <div className="bg-muted/10 h-full flex">
                    {hoveredCategory ? (
                      (() => {
                        const activeCategory = categorias.find(c => c.id === hoveredCategory)
                        if (!activeCategory) return null

                        // Get all products from this category for the "hasProducts" check logic if needed
                        // But mostly we need to display subcategories
                        const hasProductsInCat = activeCategory.subcategorias.some(s => (s.items?.length || 0) > 0)

                        return (
                          <>
                            {/* Subcategories Column */}
                            <div className={cn(
                              "p-4 min-w-[240px] overflow-y-auto",
                              hasProductsInCat && "border-r border-border/50 bg-muted/20"
                            )}>
                              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-2">
                                Subcategorías
                              </h4>
                              <ul className="space-y-1">
                                {activeCategory.subcategorias.map((sub) => (
                                  <li key={sub.id} onMouseEnter={() => setHoveredSubcategory(sub.id)}>
                                    <Link
                                      href={`/productos?categoria=${activeCategory.id}&subcategoria=${sub.id}`}
                                      className={cn(
                                        "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                                        hoveredSubcategory === sub.id
                                          ? "bg-accent text-primary font-medium"
                                          : "text-muted-foreground hover:text-primary hover:bg-accent/50"
                                      )}
                                    >
                                      {getCategoryIcon(sub.nombre)}
                                      <span className="break-words">{sub.nombre}</span>
                                      <ChevronRight className={cn("ml-auto w-3 h-3 opacity-0 transition-opacity", hoveredSubcategory === sub.id && "opacity-100")} />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Products Column */}
                            <div className="p-4 min-w-[280px] bg-muted/10 overflow-y-auto">
                              {hoveredSubcategory ? (
                                (() => {
                                  const activeSub = activeCategory.subcategorias.find(s => s.id === hoveredSubcategory)
                                  const products = activeSub?.items || []
                                  const subHasProducts = products.length > 0

                                  return (
                                    <div className="animate-in fade-in slide-in-from-left-2 duration-200">
                                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-2 flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-500" />
                                        Productos en {activeSub?.nombre}
                                      </h4>
                                      {subHasProducts ? (
                                        <div className="space-y-2">
                                          {products.slice(0, 8).map((item, idx) => (
                                            <Link
                                              key={idx}
                                              href={`/producto/${item.slug}`}
                                              className="flex items-start gap-2 group/item p-2 rounded-lg hover:bg-background hover:shadow-sm transition-all border border-transparent hover:border-border/50"
                                            >
                                              <div className="w-10 h-10 bg-muted rounded-md shrink-0 flex items-center justify-center overflow-hidden relative">
                                                {item.image ? (
                                                  <img
                                                    src={urlFor(item.image).width(80).height(80).url()}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                  />
                                                ) : (
                                                  <ShoppingBag className="w-5 h-5 text-muted-foreground/50" />
                                                )}
                                              </div>
                                              <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium group-hover/item:text-primary transition-colors line-clamp-2 break-words">
                                                  {item.name}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground mt-0.5">Ver detalles</p>
                                              </div>
                                            </Link>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="p-4 text-center text-muted-foreground text-sm italic">
                                          No hay productos destacados en esta subcategoría.
                                        </div>
                                      )}
                                    </div>
                                  )
                                })()
                              ) : (
                                <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center opacity-60">
                                  <Package className="w-10 h-10 mb-2 opacity-20" />
                                  <p className="text-sm">Selecciona una subcategoría para ver sus productos</p>
                                </div>
                              )}
                            </div>
                          </>
                        )
                      })()
                    ) : (
                      <div className="w-[520px] h-full flex flex-col items-center justify-center text-muted-foreground opacity-50">
                        <Package className="w-16 h-16 mb-4 opacity-20" />
                        <p>Selecciona una categoría</p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>

        {/* Otros items del menú pueden ir aquí */}
        <li>
          <Link
            href="/nosotros"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Nosotros
          </Link>
        </li>
        <li>
          <Link
            href="/#sostenibilidad"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Sostenibilidad
          </Link>
        </li>
        <li>
          <Link
            href="/contacto"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  )
}
