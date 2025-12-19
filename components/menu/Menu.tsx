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
  // Usamos trim() para quitar espacios y toLowerCase() para ignorar mayúsculas
  const filteredRubros = rubros.filter((c) => {
    const nombreNormalizado = c.nombre.trim().toLowerCase();
    return !nombreNormalizado.includes("destacados");
  });

  return (
    <div className="w-full flex items-center gap-2 justify-center">
      <MenuDesktop rubros={filteredRubros} miscellaneousCategories={miscellaneousCategories} />
      <MenuMobile rubros={filteredRubros} miscellaneousCategories={miscellaneousCategories} />
    </div>
  )
} 
