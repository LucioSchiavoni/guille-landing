"use client"

import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
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
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
                <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg mb-3">{slide.title}</h2>
                {slide.subtitle && (
                  <p className="text-xl md:text-2xl font-medium drop-shadow-md mb-2">{slide.subtitle}</p>
                )}
                {slide.description && (
                  <p className="text-lg md:text-xl font-serif italic drop-shadow-md opacity-90">{slide.description}</p>
                )}
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
              className={`transition-all ${
                index === currentSlide
                  ? "w-12 h-3 bg-primary rounded-full"
                  : "w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* CTA Button - Ver más productos */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20">
        <Link href="/productos">
          <Button
            size="lg"
            className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-6 rounded-xl shadow-2xl shadow-green-700/30 hover:shadow-green-700/50 transition-all hover:scale-105 flex items-center gap-2"
          >
            Ver más productos
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>

    </div>
  )
}
