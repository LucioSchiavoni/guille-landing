"use client"

import type React from "react"

import { GitCompare, Heart, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  count: number
  onClick?: () => void
}

function ActionButton({ icon, label, count, onClick }: ActionButtonProps) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className="flex flex-col items-center gap-1 hover:bg-accent relative group p-3"
    >
      <div className="relative">
        {icon}
        {count > 0 && (
          <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {count}
          </span>
        )}
      </div>
      <span className="text-xs text-foreground">{label}</span>
    </Button>
  )
}

export default function ActionButtons() {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <ActionButton
        icon={<GitCompare className="h-5 w-5" />}
        label="Comparar"
        count={0}
        onClick={() => console.log("Compare clicked")}
      />
      <ActionButton
        icon={<Heart className="h-5 w-5" />}
        label="Favoritos"
        count={0}
        onClick={() => console.log("Favorites clicked")}
      />
      <ActionButton
        icon={<ShoppingCart className="h-5 w-5" />}
        label="Pedido"
        count={0}
        onClick={() => console.log("Cart clicked")}
      />
    </div>
  )
}
