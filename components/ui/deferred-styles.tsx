"use client"

/**
 * 🎬 Componente DeferredStyles
 * Importa los estilos no críticos (animaciones, scrollbars)
 * Este componente client hace que el CSS se cargue en el bundle del cliente
 * y no bloquee el renderizado inicial del servidor
 */

// Importar estilos no críticos
import "@/app/globals.css"

export default function DeferredStyles() {
  return null
}
