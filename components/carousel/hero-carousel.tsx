"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LazyImg } from "@/components/ui/lazy-image"
import { urlFor } from "@/lib/sanity"
import Link from "next/link"

interface Slide {
  id: number | string
  image: string
  title: string
  subtitle?: string
  description?: string
}

interface HeroCarouselProps {
  products?: any[]
}

export default function HeroCarousel({ products = [] }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Map products from Sanity to slides
  const activeSlides: Slide[] = products.map((product) => ({
    id: product._id,
    image: product.image?.asset?.url || (product.image ? urlFor(product.image).url() : "/placeholder.svg"),
    title: product.name,
    subtitle: product.price ? `$${product.price}` : undefined,
    description: product.description
  }))

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || activeSlides.length === 0) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, activeSlides.length])

  if (activeSlides.length === 0) return null

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-muted z-0"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Single Slide View - Both Mobile and Desktop */}
      <div className="w-full h-full relative">
        {activeSlides.map((slide, index) => (
          <div
            key={`slide-${slide.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
          >
            <div className="relative w-full h-full bg-slate-950 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <LazyImg
                  src={slide.image}
                  alt=""
                  className="w-full h-full object-cover blur-lg opacity-40 scale-110"
                  showLogo={false}
                  skeletonClassName="bg-slate-900"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>

              <LazyImg
                src={slide.image}
                alt={slide.title}
                className="relative w-full h-full object-contain z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                skeletonClassName="bg-slate-900/50"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-start text-center p-4 pt-12 md:pt-16 text-white z-20">
                <div className="bg-black/40 backdrop-blur-sm px-6 py-4 rounded-xl">
                  <h2 className={`text-4xl md:text-5xl font-bold mb-3 transition-all duration-700 hover:text-emerald-400 hover:scale-105 cursor-pointer [text-shadow:_2px_2px_8px_rgb(0_0_0_/_80%)] ${index === currentSlide ? 'animate-fade-in-down' : ''
                    }`}>
                    {slide.title}
                  </h2>
                  {slide.subtitle && (
                    <p className={`text-xl md:text-2xl font-medium mb-2 transition-all duration-700 hover:text-emerald-300 hover:scale-105 cursor-pointer [text-shadow:_1px_1px_6px_rgb(0_0_0_/_70%)] ${index === currentSlide ? 'animate-fade-in-up' : ''
                      }`}>
                      {slide.subtitle}
                    </p>
                  )}
                  {slide.description && (
                    <p className={`text-lg md:text-xl font-serif italic opacity-90 transition-all duration-700 hover:text-emerald-200 hover:scale-105 cursor-pointer [text-shadow:_1px_1px_4px_rgb(0_0_0_/_60%)] ${index === currentSlide ? 'animate-fade-in' : ''
                      }`}>
                      {slide.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - Only show if more than 1 slide */}
      {activeSlides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border-2 shadow-lg transition-all hover:scale-110 z-20"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border-2 shadow-lg transition-all hover:scale-110 z-20"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Slide indicators - Only show if more than 1 slide */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {activeSlides.map((_, index) => (
            <button
              key={`dot-${index}`}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all ${index === currentSlide
                ? "w-12 h-3 bg-primary rounded-full"
                : "w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full"
                }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  )
}
