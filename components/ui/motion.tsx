"use client"

/**
 * 🚀 LazyMotion wrapper para framer-motion
 * Carga solo las features necesarias de forma diferida
 * Reduce el bundle de ~127KB a ~15KB para animaciones básicas
 */

import { LazyMotion, domAnimation, m } from "framer-motion"
import type { ReactNode } from "react"

interface MotionProviderProps {
  children: ReactNode
}

/**
 * Wrapper que usa domAnimation (features reducidas)
 * Incluye: animate, exit, variants, transition, layout
 * NO incluye: drag, pan, tap gestures (usar domMax si se necesitan)
 */
export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  )
}

// Re-exportar 'm' como componente motion optimizado
export { m }

// Tipos útiles
export type { Variants } from "framer-motion"
