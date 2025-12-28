"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

/**
 * 🚀 RoutePrefetch - Precarga rutas críticas después de la hidratación
 *
 * Estrategia:
 * 1. Espera a que la página se hidrate completamente
 * 2. Usa requestIdleCallback para no bloquear el main thread
 * 3. Precarga las rutas más visitadas en orden de prioridad
 */

// Rutas críticas ordenadas por prioridad de navegación
const CRITICAL_ROUTES = [
  "/productos",      // 🛒 Catálogo principal - más visitada
  "/contacto",       // 📞 CTA principal
  "/nosotros",       // ℹ️ Información de empresa
  "/sostenibilidad", // 🌱 Página de valores
] as const

export function RoutePrefetch() {
  const router = useRouter()

  useEffect(() => {
    // Función para precargar rutas
    const prefetchRoutes = () => {
      CRITICAL_ROUTES.forEach((route, index) => {
        // Escalonar las precargas para no saturar la red
        setTimeout(() => {
          router.prefetch(route)
        }, index * 100) // 100ms entre cada prefetch
      })
    }

    // Usar requestIdleCallback si está disponible (no bloquea el main thread)
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(prefetchRoutes, {
        timeout: 2000, // Timeout de 2 segundos máximo
      })
      return () => window.cancelIdleCallback(idleId)
    } else {
      // Fallback: usar setTimeout después de 1 segundo
      const timeoutId = setTimeout(prefetchRoutes, 1000)
      return () => clearTimeout(timeoutId)
    }
  }, [router])

  // Este componente no renderiza nada
  return null
}

export default RoutePrefetch
