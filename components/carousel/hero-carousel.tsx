"use client"

import { useEffect, useState, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LazyImg } from "@/components/ui/lazy-image"
import { getOptimizedImageUrl } from "@/lib/sanity"
import { cn } from "@/lib/utils"

interface Slide {
  id: number | string
  image: string
  title: string
  subtitle?: string
  description?: string
  slug?: string
}

interface HeroCarouselProps {
  products?: any[]
}

export default function HeroCarousel({ products = [] }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right')

  const activeSlides: Slide[] = products.map((product) => ({
    id: product._id,
    image: getOptimizedImageUrl(product.image, { width: 1400 }) || "/placeholder.svg",
    title: product.name,
    subtitle: product.price ? `$${product.price}` : undefined,
    description: product.description,
    slug: product.slug?.current
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

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || activeSlides.length <= 1 || isAnimating) return

    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeSlides.length, isAnimating, nextSlide])

  if (activeSlides.length === 0) return null

  const currentSlideData = activeSlides[currentSlide]

  return (
    <div
      className="relative w-full h-[70vh] md:h-[80vh] lg:h-[85vh] overflow-hidden bg-slate-950"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Glass - Imagen difuminada de fondo */}
      <div className="absolute inset-0">
        {activeSlides.map((slide, index) => (
          <div
            key={`bg-${slide.id}`}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <LazyImg
              src={slide.image}
              alt=""
              className="w-full h-full object-cover blur-2xl opacity-60 scale-125"
              showLogo={false}
              skeletonClassName="bg-slate-900"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-slate-950/30" />
          </div>
        ))}
      </div>

      {/* Main Image - Imagen completa centrada */}
      <div className="absolute inset-0 flex items-center justify-center">
        {activeSlides.map((slide, index) => (
          <div
            key={`main-${slide.id}`}
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out",
              index === currentSlide
                ? "opacity-100 translate-x-0 scale-100"
                : slideDirection === 'right'
                  ? index < currentSlide ? "opacity-0 -translate-x-full scale-95" : "opacity-0 translate-x-full scale-95"
                  : index > currentSlide ? "opacity-0 translate-x-full scale-95" : "opacity-0 -translate-x-full scale-95"
            )}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {activeSlides.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            disabled={isAnimating}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 h-8 w-8 md:h-12 md:w-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white transition-all hover:scale-110 z-20 disabled:opacity-50"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-4 w-4 md:h-6 md:w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            disabled={isAnimating}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 h-8 w-8 md:h-12 md:w-12 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 text-white transition-all hover:scale-110 z-20 disabled:opacity-50"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-4 w-4 md:h-6 md:w-6" />
          </Button>
        </>
      )}

      {/* Slide Indicators */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
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
                "h-2 rounded-full transition-all duration-500",
                index === currentSlide
                  ? "w-8 bg-green-500"
                  : "w-2 bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {activeSlides.length > 1 && isAutoPlaying && !isAnimating && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
          <div
            className="h-full bg-green-500 animate-progress"
            style={{
              animation: 'progress 6s linear infinite',
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
