"use client"
import MenuDesktop from "./MenuDesktop"
import MenuMobile from "./MenuMobile"
import { Rubro, Categoria } from "@/types/menu"

interface MenuProps {
  rubros: Rubro[]
  miscellaneousCategories: Categoria[]
}

export default function Menu({ rubros, miscellaneousCategories }: MenuProps) {
  // Filtro de seguridad para eliminar "Destacados"
  const filteredRubros = rubros.filter((c) => {
    const nombreNormalizado = c.nombre.trim().toLowerCase();
    return !nombreNormalizado.includes("destacados");
  });

  // Filtro para eliminar "Ofertas" y "Novedades" del menú
  // Estas categorías solo se muestran en el page principal
  const filteredCategories = miscellaneousCategories.filter((c) => {
    const nombreNormalizado = c.nombre.trim().toLowerCase();
    return nombreNormalizado !== "ofertas" && nombreNormalizado !== "novedades";
  });

  return (
    <div className="w-full flex items-center gap-2 justify-center">
      <MenuDesktop rubros={filteredRubros} miscellaneousCategories={filteredCategories} />
      <MenuMobile rubros={filteredRubros} miscellaneousCategories={filteredCategories} />
    </div>
  )
} 
