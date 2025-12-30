"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Phone, Menu, Instagram, Facebook, Linkedin } from "lucide-react"
import { SearchCommand } from "./SearchCommand"
import MenuDesktop from "../menu/MenuDesktop"
import { Button } from "@/components/ui/button"
import type { Rubro } from "@/types/menu"
import { cn } from "@/lib/utils"

// 🚀 MenuMobile: carga diferida con ssr: false
// Solo muestra el botón hamburger inicialmente, el sidebar completo
// se carga después de la primera interacción del usuario
const MenuMobile = dynamic(() => import("../menu/MenuMobile"), {
  ssr: false,
  loading: () => (
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden relative z-[100] hover:bg-white/10 text-white transition-colors"
      aria-label="Menú"
    >
      <Menu className="h-7 w-7 drop-shadow-md" />
    </Button>
  ),
})

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
        "backdrop-blur-md border-b border-white/10",
        isScrolled ? "shadow-md" : "shadow-sm",
      )}
      style={{
        backgroundColor: 'rgb(63, 121, 72)',
        backgroundImage: `linear-gradient(rgba(63, 121, 72, 0.95), rgba(63, 121, 72, 0.98))`
      }}
    >
      {/* Mobile Layout */}
      <div className="lg:hidden relative">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 relative">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 relative z-10">
            <div
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-lg"
              style={{
                backgroundImage: `url('/logo.png')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',

              }}
            />
            <span className="text-white font-bold text-sm sm:text-white tracking-tight ">
              TODO EN PACKAGING
            </span>
          </Link>

          <div className="relative z-10">
            <MenuMobile rubros={filteredRubros} miscellaneousCategories={filteredCategories} />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        {/* Top Row: Logo, Search, Actions */}
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo integrado con fondo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3 transition-opacity hover:opacity-90 relative">
              <div
                className="h-12 w-12 rounded-lg relative shadow-lg"
                style={{
                  backgroundImage: `url('/logo.png')`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <span className="text-xl font-bold tracking-tight text-white">
                TodoEnPackaging
              </span>
            </Link>

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

              {/* Social Media Icons */}
              <div className="flex items-center gap-2 ml-2 border-l border-white/20 pl-3">
                <a
                  href="https://www.instagram.com/todoenpackaging.uy?utm_source=qr&igsh=dGpmeGc4MXl2ZnB6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-md transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/1EiUDf5JHj/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-md transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/todo-en-packaging-tep-9346a832b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-md transition-all"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
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
