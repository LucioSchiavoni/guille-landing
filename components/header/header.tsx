"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { Phone } from "lucide-react"
import Logo from "./logo"
import { SearchCommand } from "./SearchCommand"
import MenuDesktop from "../menu/MenuDesktop"
import MenuMobile from "../menu/MenuMobile"
import { Button } from "@/components/ui/button"
import type { Rubro } from "@/types/menu"
import { cn } from "@/lib/utils"

interface HeaderProps {
  rubros: Rubro[]
  miscellaneousCategories: any[] // Using any temporarily or Categoria[] from types
}

export default function Header({ rubros, miscellaneousCategories }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  // Filtro para eliminar "Destacados" de rubros
  const filteredRubros = rubros.filter((rubro) => {
    const nombreNormalizado = rubro.nombre.trim().toLowerCase();
    return !nombreNormalizado.includes("destacados");
  });

  // Filtro para eliminar "Ofertas" y "Novedades" del menú
  // Estas categorías solo se muestran en el page principal
  const filteredCategories = miscellaneousCategories.filter((cat) => {
    const nombreNormalizado = cat.nombre.trim().toLowerCase();
    return nombreNormalizado !== "ofertas" && nombreNormalizado !== "novedades";
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-[100] transition-all duration-300",
        // Glassmorphism Base Styles
        "bg-[#0b5c1c]/75 backdrop-blur-md border-b border-white/10",
        isScrolled ? "shadow-md bg-[#0b5c1c]/90" : "shadow-sm",
      )}
    >
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex-shrink-0">
            <Logo className="w-32 h-auto sm:w-40" />
          </div>

          <MenuMobile rubros={filteredRubros} miscellaneousCategories={filteredCategories} />
        </div>
      </div>

      {/* Desktop Layout - unchanged */}
      <div className="hidden lg:block">
        {/* Top Row: Logo, Search, Actions */}
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Search - Centered & Wide on Desktop */}
            <div className="flex flex-1 max-w-2xl mx-auto">
              <Suspense fallback={<div className="w-full h-10 bg-muted/50 rounded-md animate-pulse" />}>
                <SearchCommand rubros={filteredRubros} />
              </Suspense>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button asChild variant="ghost" className="inline-flex gap-2 text-white hover:text-white hover:bg-white/10">
                <Link href="/contacto">
                  <Phone className="h-4 w-4" />
                  <span>Contactanos</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Desktop Menu */}
        <div className="border-t border-white/10 bg-black/10">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <MenuDesktop rubros={filteredRubros} miscellaneousCategories={filteredCategories} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
