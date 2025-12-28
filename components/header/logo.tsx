import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="flex items-center gap-1">
        <Link href="/" className={cn("flex items-center gap-3 transition-opacity hover:opacity-90", className)}>
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/20 shadow-lg bg-white/10 backdrop-blur-sm p-1">
            <img
              src="/logo-a.jpeg"
              alt="TodoEnPackaging Logo"
              className="h-full w-full object-contain rounded-lg"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:inline-block">
            TodoEnPackaging
          </span>
        </Link>

      </div>
    </div>
  )
}
