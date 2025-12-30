"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LazyImg } from "@/components/ui/lazy-image"
import { getOptimizedImageUrl } from "@/lib/sanity"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface SlideData {
  _key: string
  imagenDesktop: any
  imagenMobile: any
  titulo?: string
  subtitulo?: string
  link?: string
}

interface CarouselData {
  _id: string
  nombre: string
  slides: SlideData[]
  activo: boolean
}

interface HeroCarouselProps {
  carousel?: CarouselData
}

export default function HeroCarousel({ carousel }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const slides = carousel?.slides || []

  const activeSlides = slides.map((slide, index) => ({
    id: slide._key || `slide-${index}`,
    imageDesktop: getOptimizedImageUrl(slide.imagenDesktop, { width: 1920 }) || "/placeholder.svg",
    imageMobile: getOptimizedImageUrl(slide.imagenMobile, { width: 800 }) || "/placeholder.svg",
    titulo: slide.titulo,
    subtitulo: slide.subtitulo,
    link: slide.link
  }))

  const goToSlide = useCallback((index: number, direction: 'left' | 'right') => {
    if (isAnimating) return

    setIsAnimating(true)
    setShowContent(false)
    setSlideDirection(direction)

    setTimeout(() => {
      setCurrentSlide(index)

      setTimeout(() => {
        setShowContent(true)
        setIsAnimating(false)
      }, 600)
    }, 400)
  }, [isAnimating])

  const nextSlide = useCallback(() => {
    const next = (currentSlide + 1) % activeSlides.length
    goToSlide(next, 'right')
  }, [currentSlide, activeSlides.length, goToSlide])

  const prevSlide = useCallback(() => {
    const prev = (currentSlide - 1 + activeSlides.length) % activeSlides.length
    goToSlide(prev, 'left')
  }, [currentSlide, activeSlides.length, goToSlide])

  // Initial content show
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Auto-play cada 5 segundos
  useEffect(() => {
    if (!isAutoPlaying || activeSlides.length <= 1 || isAnimating) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeSlides.length, isAnimating, nextSlide])

  if (activeSlides.length === 0) return null

  const currentSlideData = activeSlides[currentSlide]

  return (
    <div
      className="relative w-full h-[50vh] md:h-[55vh] lg:h-[60vh] overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Glass - Imagen difuminada de fondo con efecto parallax */}
      <div className="absolute inset-0">
        {activeSlides.map((slide, index) => (
          <div
            key={`bg-${slide.id}`}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-out",
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
            )}
          >
            <LazyImg
              src={isMobile ? slide.imageMobile : slide.imageDesktop}
              alt=""
              className="w-full h-full object-cover blur-2xl opacity-50 scale-125"
              showLogo={false}
              skeletonClassName="bg-slate-900"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/70 via-slate-900/50 to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Image - Con animación creativa de zoom y rotación sutil */}
      <div className="absolute inset-0 flex items-center justify-center">
        {activeSlides.map((slide, index) => (
          <div
            key={`main-${slide.id}`}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
              index === currentSlide
                ? "opacity-100 translate-x-0 scale-100 rotate-0 duration-1000"
                : slideDirection === 'right'
                  ? index < currentSlide
                    ? "opacity-0 -translate-x-[30%] scale-90 -rotate-3 duration-700"
                    : "opacity-0 translate-x-[30%] scale-90 rotate-3 duration-700"
                  : index > currentSlide
                    ? "opacity-0 translate-x-[30%] scale-90 rotate-3 duration-700"
                    : "opacity-0 -translate-x-[30%] scale-90 -rotate-3 duration-700"
            )}
          >
            <div className="relative w-full h-full">
              {/* Efecto de brillo animado en la imagen */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-transform duration-1000",
                  index === currentSlide && showContent ? "translate-x-[200%]" : "-translate-x-[200%]"
                )}
                style={{ transitionDelay: '300ms' }}
              />
              <img
                src={isMobile ? slide.imageMobile : slide.imageDesktop}
                alt={slide.titulo || "Slide"}
                className={cn(
                  "w-full h-full object-cover transition-transform duration-[2000ms] ease-out",
                  index === currentSlide ? "scale-100" : "scale-105"
                )}
              />
              {/* Overlay gradient para mejor lectura del texto */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Título y Subtítulo - Arriba a la izquierda con animaciones creativas */}
      <div className="absolute top-6 md:top-12 lg:top-16 left-4 md:left-8 lg:left-12 z-30 w-[90%] md:w-[80%] lg:w-[75%] xl:w-[70%]">
        {activeSlides.map((slide, index) => (
          <div
            key={`text-${slide.id}`}
            className={cn(
              "absolute top-0 left-0 transition-all duration-700",
              index === currentSlide && showContent
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-8 pointer-events-none"
            )}
          >
            {/* Línea decorativa animada */}
            <div
              className={cn(
                "h-1 md:h-1.5 bg-gradient-to-r from-green-500 to-green-300 rounded-full mb-3 md:mb-4 lg:mb-5 transition-all duration-700 ease-out",
                index === currentSlide && showContent ? "w-12 md:w-20 lg:w-28" : "w-0"
              )}
              style={{ transitionDelay: '200ms' }}
            />

            {/* Título con efecto de escritura */}
            {slide.titulo && (
              <h2
                className={cn(
                  "text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-2 md:mb-3 lg:mb-4 transition-all duration-700 ease-out leading-tight",
                  "drop-shadow-[0_4px_20px_rgba(0,0,0,0.5)]",
                  index === currentSlide && showContent
                    ? "opacity-100 translate-x-0 blur-0"
                    : "opacity-0 -translate-x-8 blur-sm"
                )}
                style={{ transitionDelay: '300ms' }}
              >
                {slide.titulo.split('').map((char, charIndex) => (
                  <span
                    key={charIndex}
                    className={cn(
                      "inline-block transition-all duration-300",
                      index === currentSlide && showContent
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    )}
                    style={{
                      transitionDelay: `${400 + charIndex * 30}ms`,
                      textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                    }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </h2>
            )}

            {/* Subtítulo con fade elegante */}
            {slide.subtitulo && (
              <p
                className={cn(
                  "text-base md:text-xl lg:text-2xl xl:text-3xl text-white/90 font-light tracking-wide transition-all duration-700 ease-out leading-relaxed",
                  "drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]",
                  index === currentSlide && showContent
                    ? "opacity-100 translate-x-0 blur-0"
                    : "opacity-0 -translate-x-4 blur-sm"
                )}
                style={{ transitionDelay: '600ms' }}
              >
                {slide.subtitulo}
              </p>
            )}

            {/* Botón CTA si hay link */}
            {slide.link && (
              <Link
                href={slide.link}
                className={cn(
                  "inline-flex items-center gap-1.5 mt-4 md:mt-5 ml-4 md:ml-8 lg:ml-12 px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 bg-green-500 hover:bg-green-400 text-white text-sm md:text-base font-medium rounded-full transition-all duration-500 ease-out",
                  "hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]",
                  index === currentSlide && showContent
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                )}
                style={{ transitionDelay: '800ms' }}
              >
                Ver más
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        <div
          className={cn(
            "absolute top-20 right-10 w-32 h-32 md:w-64 md:h-64 rounded-full bg-green-500/10 blur-3xl transition-all duration-1000",
            showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{ transitionDelay: '400ms' }}
        />
        <div
          className={cn(
            "absolute bottom-20 left-20 w-24 h-24 md:w-48 md:h-48 rounded-full bg-blue-500/10 blur-3xl transition-all duration-1000",
            showContent ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
          style={{ transitionDelay: '600ms' }}
        />
      </div>

      {/* Navigation Arrows - Estilo mejorado */}
      {activeSlides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-2 md:left-6 top-[60%] md:top-[55%] -translate-y-1/2 h-10 w-10 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:border-green-500/50 z-20 disabled:opacity-50 group"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5 md:h-7 md:w-7 transition-transform group-hover:-translate-x-0.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-2 md:right-6 top-[60%] md:top-[55%] -translate-y-1/2 h-10 w-10 md:h-14 md:w-14 rounded-full bg-white/10 backdrop-blur-xl hover:bg-white/20 border border-white/20 text-white transition-all duration-300 hover:scale-110 hover:border-green-500/50 z-20 disabled:opacity-50 group"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5 md:h-7 md:w-7 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </>
      )}

      {/* Slide Indicators - Estilo mejorado */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-20">
          {activeSlides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => {
                if (index !== currentSlide && !isAnimating) {
                  goToSlide(index, index > currentSlide ? 'right' : 'left')
                }
              }}
              disabled={isAnimating}
              className={cn(
                "h-2.5 rounded-full transition-all duration-500 ease-out",
                index === currentSlide
                  ? "w-10 bg-gradient-to-r from-green-500 to-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
                  : "w-2.5 bg-white/30 hover:bg-white/50 hover:scale-125"
              )}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar - Estilo mejorado */}
      {activeSlides.length > 1 && isAutoPlaying && !isAnimating && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-20">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-400"
            style={{
              animation: 'progress 5s linear infinite',
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  )
}
