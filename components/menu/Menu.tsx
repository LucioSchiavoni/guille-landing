"use client"
import MenuDesktop from "./MenuDesktop"
import MenuMobile from "./MenuMobile"
import { Categoria } from "@/types/menu"

interface MenuProps {
  categorias: Categoria[]
}

export default function Menu({ categorias }: MenuProps) {
  return (
    <div className="w-full">
      <MenuDesktop categorias={categorias} />
      <MenuMobile categorias={categorias} />
    </div>
  )
}
