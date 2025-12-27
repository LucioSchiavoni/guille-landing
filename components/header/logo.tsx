import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="flex items-center gap-1">
        <Link href="/" className={cn("relative h-16 w-48 flex items-center justify-center overflow-hidden rounded-md", className)}>
          <img
            src="/Logo-b.jpeg"
            alt="TodoEnPackaging Logo"
            className="h-full w-full object-cover"
          />
        </Link>

      </div>
    </div>
  )
}
