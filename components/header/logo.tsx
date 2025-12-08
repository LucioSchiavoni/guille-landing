import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="flex items-center gap-1">
        <Link href="/" className={cn("relative h-16 w-48 flex items-center justify-center", className)}>
          <img
            src="https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png"
            alt="TodoEnPackaging Logo"
            className="h-full w-full object-contain"
          />
        </Link>

      </div>
    </div>
  )
}
