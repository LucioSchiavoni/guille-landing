"use client"

import { useState, useEffect, useRef } from "react"
import Image, { ImageProps } from "next/image"
import { cn } from "@/lib/utils"
import { PRODUCT_SIZES_ATTR } from "@/lib/sanity"

interface LazyImageProps extends Omit<ImageProps, 'onLoad'> {
  fallbackSrc?: string
  skeletonClassName?: string
  containerClassName?: string
  showLogo?: boolean
}

/**
 * 🖼️ LazyImage - Componente de imagen con lazy loading y skeleton animado
 * Muestra el logo de la empresa mientras la imagen se carga
 */
export function LazyImage({
  src,
  alt,
  className,
  skeletonClassName,
  containerClassName,
  showLogo = true,
  fill,
  width,
  height,
  ...props
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 👁️ Intersection Observer para lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "100px" // Pre-cargar cuando está cerca del viewport
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden",
        fill ? "w-full h-full" : "",
        containerClassName
      )}
    >
      {/* 🎭 Skeleton con logo animado */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10",
          "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100",
          skeletonClassName
        )}
      >
        {showLogo && (
          <div className="relative flex flex-col items-center gap-3">
            {/* Logo con animación de pulso */}
            <div className="relative w-16 h-16 animate-pulse">
              <Image
                src="/logo-a.jpeg"
                alt="Cargando..."
                fill
                className="object-contain rounded-lg opacity-60"
                priority
              />
            </div>

            {/* Barra de progreso animada */}
            <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-loading-bar" />
            </div>
          </div>
        )}

        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* 🖼️ Imagen real - Optimizada con sizes responsivos */}
      {isInView && !hasError && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          sizes={props.sizes || PRODUCT_SIZES_ATTR}
          className={cn(
            "transition-all duration-700 ease-out",
            isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      )}

      {/* 🚫 Estado de error */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <div className="w-12 h-12 mx-auto mb-2 opacity-50">
              <Image
                src="/logo-a.jpeg"
                alt="Error"
                fill
                className="object-contain rounded-lg grayscale"
              />
            </div>
            <span className="text-xs">Sin imagen</span>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * 🖼️ LazyImg - Versión optimizada para carousels usando Image de Next.js
 * Soporta fill mode y sizes responsivos automáticamente
 */
interface LazyImgProps {
  src: string
  alt?: string
  className?: string
  skeletonClassName?: string
  containerClassName?: string
  showLogo?: boolean
  sizes?: string
  priority?: boolean
  fill?: boolean
}

export function LazyImg({
  src,
  alt,
  className,
  skeletonClassName,
  containerClassName,
  showLogo = true,
  sizes = PRODUCT_SIZES_ATTR,
  priority = false,
  fill = true,
}: LazyImgProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // 👁️ Intersection Observer para lazy loading
  useEffect(() => {
    // Si es priority, cargar inmediatamente
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "100px"
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full overflow-hidden",
        containerClassName
      )}
    >
      {/* 🎭 Skeleton con logo animado */}
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-500 z-10",
          "bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100",
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100",
          skeletonClassName
        )}
      >
        {showLogo && (
          <div className="relative flex flex-col items-center gap-3">
            <div className="relative w-16 h-16 animate-pulse">
              <Image
                src="/logo-a.jpeg"
                alt="Cargando..."
                fill
                className="object-contain rounded-lg opacity-60"
                sizes="64px"
              />
            </div>

            <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-loading-bar" />
            </div>
          </div>
        )}

        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </div>

      {/* 🖼️ Imagen real - Optimizada con Next.js Image */}
      {isInView && !hasError && (
        <Image
          src={src}
          alt={alt || ""}
          fill={fill}
          sizes={sizes}
          priority={priority}
          className={cn(
            "transition-all duration-700 ease-out",
            isLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-sm",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* 🚫 Estado de error */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <div className="relative w-12 h-12 mx-auto mb-2">
              <Image
                src="/logo-a.jpeg"
                alt="Error"
                fill
                className="object-contain rounded-lg grayscale opacity-50"
                sizes="48px"
              />
            </div>
            <span className="text-xs">Sin imagen</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default LazyImage
