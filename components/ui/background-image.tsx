"use client"

import Image from "next/image"

/**
 * 🖼️ Componente BackgroundImage optimizado
 * Usa next/image para lazy loading y optimización automática
 * No bloquea el renderizado inicial (loading="lazy")
 */
export default function BackgroundImage() {
  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <Image
        src="/fondo-descartables-ecologicos-biodegradables.png"
        alt=""
        fill
        loading="lazy"
        quality={60}
        className="object-cover object-center opacity-90"
        sizes="100vw"
        unoptimized
      />
    </div>
  )
}
