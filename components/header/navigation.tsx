"use client"

import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const navItems = [
  { label: "Productos", href: "#productos" },
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
  { label: "Destacados", href: "#destacados" },
]

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* Menu button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-4 text-primary-foreground hover:bg-primary-foreground/10 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex items-center gap-8 py-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="text-sm font-medium hover:text-primary-foreground/80 transition-colors">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile menu - simplified for this example */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-primary shadow-lg lg:hidden z-50">
              <ul className="py-4">
                {navItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="block px-4 py-3 text-sm font-medium hover:bg-primary-foreground/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
