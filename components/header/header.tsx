"use client"

import { useState, useEffect, Suspense } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import Image from "next/image"
import { Phone, Menu, Instagram, Facebook, Linkedin } from "lucide-react"
import { SearchCommand } from "./SearchCommand"
import MenuDesktop from "../menu/MenuDesktop"
import { Button } from "@/components/ui/button"
import type { Rubro } from "@/types/menu"
import { cn } from "@/lib/utils"

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
  miscellaneousCategories: any[]
}

export default function Header({ rubros, miscellaneousCategories }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  const filteredRubros = rubros.filter((rubro) => {
    const nombreNormalizado = rubro.nombre.trim().toLowerCase();
    return !nombreNormalizado.includes("destacados");
  });

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
        "w-full fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        "backdrop-blur-md",
        isScrolled ? "shadow-md" : "shadow-sm",
      )}
    >
      <Image
        src="/header_.png"
        alt=""
        fill
        className="object-cover -z-10"
        priority
        quality={90}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgb(63,121,72)]/95 to-[rgb(63,121,72)]/98" />

      {/* Mobile Layout */}
      <div className="lg:hidden relative">
        <div
          className="flex items-center justify-end px-4 py-4 relative h-20"
          style={{
            backgroundImage: `url('/header-mobile.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <Link
            href="/"
            className="absolute inset-0 z-0"
            aria-label="Ir al inicio"
          />

          <div className="relative z-10">
            <MenuMobile rubros={filteredRubros} miscellaneousCategories={filteredCategories} />
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            <div
              className="flex-shrink-0 relative h-16 w-80 cursor-pointer"
              style={{
                backgroundImage: `url('/header-mobile.png')`,
                backgroundSize: 'contain',
                backgroundPosition: 'left center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Link
                href="/"
                className="absolute inset-0 z-10"
                aria-label="Ir al inicio"
              />
            </div>
            <div className="flex flex-1 max-w-2xl mx-auto">
              <Suspense fallback={<div className="w-full h-10 bg-muted/50 rounded-md animate-pulse" />}>
                <SearchCommand rubros={filteredRubros} />
              </Suspense>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <Button asChild variant="ghost" className="inline-flex gap-2 text-white hover:text-white hover:bg-white/10">
                <Link href="/contacto">
                  <Phone className="h-4 w-4" />
                  <span>Contactanos</span>
                </Link>
              </Button>

              <div className="flex items-center gap-2 ml-2 pl-3">
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

        <div className="bg-black/10">
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