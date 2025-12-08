"use client"

import Link from "next/link"
import { useState, Suspense } from "react"
import { Search } from "lucide-react"
import type { Categoria } from "@/types/menu"
import { Button } from "@/components/ui/button"
import Logo from "../header/logo"
import { SearchCommand } from "../header/SearchCommand"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface MenuMobileProps {
  categorias: Categoria[]
}

export default function MenuMobile({ categorias }: MenuMobileProps) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Search className="h-8 w-8 font-extrabold" />
          <span className="sr-only">Buscar y Menú</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:w-[400px] p-0 border-l">
        <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
        <div className="flex flex-col h-full bg-background">
          {/* Top Section: Search Bar (Aligned with Header) */}
          <div className="px-4 py-3 border-b flex items-center justify-between gap-4 bg-background z-10">
            <div className="flex-1">
              <Suspense fallback={<div className="w-full h-10 bg-muted/50 rounded-md animate-pulse" />}>
                <SearchCommand categorias={categorias} onSearch={() => setOpen(false)} />
              </Suspense>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* Navigation Links */}
            <div className="py-4 flex items-center justify-center gap-8 border-b border-border/40 bg-muted/5">
              <Link
                href="/nosotros"
                className="text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Nosotros
              </Link>
              <div className="w-px h-3 bg-border" />
              <Link
                href="/productos"
                className="text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Productos
              </Link>
              <div className="w-px h-3 bg-border" />
              <Link
                href="/contacto"
                className="text-sm font-medium text-muted-foreground hover:text-emerald-600 transition-colors"
                onClick={() => setOpen(false)}
              >
                Contacto
              </Link>
            </div>

            {/* Categories Accordion */}
            <div className="p-4">
              <h3 className="font-semibold text-sm text-muted-foreground mb-2 uppercase tracking-wider">Categorías</h3>
              <Accordion type="single" collapsible className="w-full">
                {categorias
                  .filter(c => !c.nombre.trim().toLowerCase().includes("destacados"))
                  .sort((a, b) => a.nombre.localeCompare(b.nombre))
                  .map((categoria) => (
                    <AccordionItem key={categoria.id} value={categoria.id}>
                      <AccordionTrigger className="text-base font-medium hover:no-underline py-3">
                        {categoria.nombre}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-1 pl-2">
                          {categoria.subcategorias.map((sub) => (
                            <div key={sub.id} className="border-l-2 border-muted pl-3 py-1">
                              <Link
                                href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                className="block font-medium text-sm py-1 hover:text-primary"
                                onClick={() => setOpen(false)}
                              >
                                {sub.nombre}
                              </Link>
                              {/* Sub-items links */}
                              <div className="mt-1 space-y-1 pl-2">
                                {sub.variantes ? (
                                  sub.variantes.map((v, idx) => (
                                    <div key={idx}>
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{v.nombre}</span>
                                      {v.items.map((item, i) => (
                                        <Link
                                          key={i}
                                          href={`/producto/${item.slug}`}
                                          className="block text-sm text-muted-foreground hover:text-foreground py-0.5"
                                          onClick={() => setOpen(false)}
                                        >
                                          {item.name}
                                        </Link>
                                      ))}
                                    </div>
                                  ))
                                ) : (
                                  sub.items?.slice(0, 5).map((item, idx) => (
                                    <Link
                                      key={idx}
                                      href={`/producto/${item.slug}`}
                                      className="block text-sm text-muted-foreground hover:text-foreground py-0.5"
                                      onClick={() => setOpen(false)}
                                    >
                                      {item.name}
                                    </Link>
                                  ))
                                )}
                                {(sub.items?.length || 0) > 5 && (
                                  <Link
                                    href={`/productos?categoria=${categoria.id}&subcategoria=${sub.id}`}
                                    className="text-xs text-primary underline py-1 block"
                                    onClick={() => setOpen(false)}
                                  >
                                    Ver todos
                                  </Link>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
