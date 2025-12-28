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
        src="/background.png"
        alt=""
        fill
        loading="lazy"
        quality={50}
        className="object-cover object-center"
        sizes="100vw"
      />
    </div>
  )
}
