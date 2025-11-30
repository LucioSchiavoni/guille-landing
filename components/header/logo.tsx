import Image from "next/image"

export default function Logo() {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="flex items-center gap-1">
        <div className="relative h-16 w-48 flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png"
            alt="TodoEnPackaging Logo"
            className="h-full w-full object-contain"
          />
        </div>

      </div>
    </div>
  )
}
