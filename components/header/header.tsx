import Logo from "./logo"
import SearchBar from "./search-bar"
import Menu from "../menu/Menu"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Categoria } from "@/types/menu"

interface HeaderProps {
  categorias: Categoria[]
}

export default function Header({ categorias }: HeaderProps) {
  return (
    <header className="w-full bg-background shadow-sm sticky top-0 z-40">
      {/* Top header section */}
      <div className="container mx-auto px-4 py-3 lg:py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Logo - Left aligned */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-start">
            <Logo />
          </div>

          {/* Search Bar - Centered */}
          <div className="flex-1 w-full max-w-2xl flex justify-center">
            <SearchBar categorias={categorias} />
          </div>

          {/* Contact Button - Right aligned */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
            <Link href="/contacto">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Contactanos
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation bar - Below header, centered */}
      <div className="border-t border-border/50 lg:border-none flex justify-center py-2">
        <Menu categorias={categorias} />
      </div>
    </header>
  )
}
