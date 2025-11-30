"use client"


import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

import { urlFor } from "@/lib/sanity"

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


const slides: Slide[] = [
  {
    id: 1,
    image: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163500/Generated_Image_October_15_2025_-_3_08PM_sskozd.png",
    title: "10% OFF",
    subtitle: "en tu primera compra online",
    description: "Ecoamigable",
  },
  {
    id: 2,
    image: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163499/Generated_Image_October_15_2025_-_3_14PM_uz21dl.png",
    title: "20% OFF",
    subtitle: "Caja de masas",
    description: "Ecoamigable",
  },
  {
    id: 3,
    image: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163497/Generated_Image_October_15_2025_-_2_49PM_hyep06.png",
    title: "30% OFF",
    subtitle: "Sobre antigrasa",
    description: "Ecoamigable",
  },
  {
    id: 4,
    image: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163498/Generated_Image_October_15_2025_-_3_16PM_nylkek.png",
    title: "40% OFF",
    subtitle: "Caja de masas",
    description: "Ecoamigable",
  },
]

export default function HeroCarousel({ products = [] }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Map products to slides if available, otherwise use default slides
  const activeSlides: Slide[] = products.length > 0
    ? products.map((product) => ({
      id: product._id,
      image: product.image?.asset?._ref ? urlFor(product.image).url() : "/placeholder.svg",
      title: product.name,
      subtitle: product.price ? `$${product.price}` : undefined,
      description: product.description
    }))
    : slides

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, currentSlide])

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-muted z-0"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Slides */}
      <div className="relative w-full h-full">
        {activeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${index === currentSlide
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
              }`}
          >
            <div className="absolute inset-0 bg-black/5">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-contain object-center bg-gradient-to-r from-green-300 to-green-800"
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-r from-black/50 via-black/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="container mx-auto px-4 md:px-8 flex flex-col items-center text-center">
                <div className="max-w-3xl space-y-6 animate-fade-in">


                  {/* Main title */}
                  <h2 className="text-5xl md:text-7xl font-bold text-white drop-shadow-lg">{slide.title}</h2>

                  {/* Subtitle */}
                  {slide.subtitle && (
                    <p className="text-xl md:text-2xl text-white font-medium drop-shadow-md">{slide.subtitle}</p>
                  )}

                  {/* Website badge */}
                  <div className="inline-block bg-white px-6 py-3 rounded-full shadow-xl">
                    <p className="text-foreground font-bold text-lg">
                      todoenpackaging<span className="text-primary">.uy</span>
                    </p>
                  </div>

                  {/* Description */}
                  {slide.description && (
                    <p className="text-xl md:text-3xl font-serif italic text-white drop-shadow-lg mt-4">
                      {slide.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="outline"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border-2 shadow-lg transition-all hover:scale-110"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background border-2 shadow-lg transition-all hover:scale-110"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {activeSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${index === currentSlide
              ? "w-12 h-3 bg-primary rounded-full"
              : "w-3 h-3 bg-background/60 hover:bg-background/80 rounded-full"
              }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      {/* WhatsApp button (like in the original) */}
      <a
        href="https://wa.me/your-number"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-2xl transition-all hover:scale-110"
        aria-label="Contactar por WhatsApp"
      >
        <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </div>
  )
}
