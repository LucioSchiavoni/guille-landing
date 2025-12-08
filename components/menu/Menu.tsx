"use client"
import MenuDesktop from "./MenuDesktop"
import MenuMobile from "./MenuMobile"
import { Categoria } from "@/types/menu"

interface MenuProps {
  categorias: Categoria[]
}

export default function Menu({ categorias }: MenuProps) {
  // Filtro de seguridad para eliminar "Destacados"
  // Usamos trim() para quitar espacios y toLowerCase() para ignorar mayúsculas
  const filteredCategorias = categorias.filter((c) => {
    const nombreNormalizado = c.nombre.trim().toLowerCase();
    return !nombreNormalizado.includes("destacados");
  });

  return (
    <div className="w-full flex items-center gap-2 justify-center">
      <MenuDesktop categorias={filteredCategorias} />
      <MenuMobile categorias={filteredCategorias} />
    </div>
  )
}
