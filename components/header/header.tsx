"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Phone } from "lucide-react"
import Logo from "./logo"
import { SearchCommand } from "./SearchCommand"
import MenuDesktop from "../menu/MenuDesktop"
import MenuMobile from "../menu/MenuMobile"
import { Button } from "@/components/ui/button"
import type { Categoria } from "@/types/menu"
import { cn } from "@/lib/utils"

interface HeaderProps {
  categorias: Categoria[]
}

export default function Header({ categorias }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

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
        "w-full bg-background sticky top-0 z-40 transition-shadow duration-300 ",
        isScrolled ? "shadow-md" : "shadow-sm",
      )}
    >
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between gap-3 px-2 py-2 bg-gradient-to-l from-green-700 via-green-600/50 to-white ">
          <div className="flex-shrink-0 scale-75 origin-left">
            <Logo />
          </div>

          <MenuMobile categorias={categorias} />
        </div>
      </div>

      {/* Desktop Layout - unchanged */}
      <div className="hidden lg:block bg-background ">
        {/* Top Row: Logo, Search, Actions */}
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Logo />
            </div>

            {/* Search - Centered & Wide on Desktop */}
            <div className="flex flex-1 max-w-2xl mx-auto">
              <SearchCommand categorias={categorias} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button asChild variant="ghost" className="inline-flex gap-2">
                <Link href="/contacto">
                  <Phone className="h-4 w-4" />
                  <span>Contactanos</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Row: Desktop Menu */}
        <div className="border-t border-border/30 bg-muted/10">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">
              <MenuDesktop categorias={categorias} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
