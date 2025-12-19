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
  const [currentPair, setCurrentPair] = useState(0)
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

  // Ensure we have pairs for desktop. If odd, duplicate the first one to the end.
  const pairedSlides = [...activeSlides]
  if (pairedSlides.length % 2 !== 0) {
    pairedSlides.push(pairedSlides[0])
  }

  const pairs = []
  for (let i = 0; i < pairedSlides.length; i += 2) {
    pairs.push({
      left: pairedSlides[i],
      right: pairedSlides[i + 1]
    })
  }

  const nextSlide = () => {
    setCurrentPair((prev) => (prev + 1) % pairs.length)
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length)
  }

  const prevSlide = () => {
    setCurrentPair((prev) => (prev - 1 + pairs.length) % pairs.length)
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, pairs.length, activeSlides.length])

  if (activeSlides.length === 0) return null

  return (
    <div
      className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-muted z-0"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* --- DESKTOP VIEW (Split Vertical Scroll) --- */}
      <div className="hidden md:flex w-full h-full">
        {/* Left Column - Scrolls Top to Bottom */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <div
            className="absolute w-full h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateY(${currentPair * 100}%)` }}
          >
            {pairs.map((pair, index) => (
              <div
                key={`left-${pair.left.id}-${index}`}
                className="absolute w-full h-full"
                style={{ top: `-${index * 100}%` }}
              >
                <div className="relative w-full h-full group">
                  <img
                    src={pair.left.image}
                    alt={pair.left.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">{pair.left.title}</h2>
                    {pair.left.subtitle && (
                      <p className="text-lg md:text-xl font-medium drop-shadow-md">{pair.left.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Scrolls Bottom to Top */}
        <div className="relative w-1/2 h-full overflow-hidden">
          <div
            className="absolute w-full h-full transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateY(-${currentPair * 100}%)` }}
          >
            {pairs.map((pair, index) => (
              <div
                key={`right-${pair.right.id}-${index}`}
                className="absolute w-full h-full"
                style={{ top: `${index * 100}%` }}
              >
                <div className="relative w-full h-full group">
                  <img
                    src={pair.right.image}
                    alt={pair.right.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-white">
                    <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-2">{pair.right.title}</h2>
                    {pair.right.subtitle && (
                      <p className="text-lg md:text-xl font-medium drop-shadow-md">{pair.right.subtitle}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW (Single Slide) --- */}
      <div className="md:hidden w-full h-full relative">
        {activeSlides.map((slide, index) => (
          <div
            key={`mobile-${slide.id}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
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
                <h2 className="text-4xl font-bold drop-shadow-lg mb-3">{slide.title}</h2>
                {slide.subtitle && (
                  <p className="text-xl font-medium drop-shadow-md mb-2">{slide.subtitle}</p>
                )}
                {slide.description && (
                  <p className="text-lg font-serif italic drop-shadow-md opacity-90">{slide.description}</p>
                )}
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

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {/* Desktop Indicators */}
        <div className="hidden md:flex gap-2">
          {pairs.map((_, index) => (
            <button
              key={`desktop-dot-${index}`}
              onClick={() => {
                setCurrentPair(index)
                // Approximate sync for mobile slide
                setCurrentSlide(index * 2)
              }}
              className={`transition-all ${index === currentPair
                ? "w-12 h-3 bg-primary rounded-full"
                : "w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full"
                }`}
              aria-label={`Ir a grupo ${index + 1}`}
            />
          ))}
        </div>
        {/* Mobile Indicators */}
        <div className="flex md:hidden gap-2">
          {activeSlides.map((_, index) => (
            <button
              key={`mobile-dot-${index}`}
              onClick={() => {
                setCurrentSlide(index)
                // Approximate sync for desktop pair
                setCurrentPair(Math.floor(index / 2))
              }}
              className={`transition-all ${index === currentSlide
                ? "w-12 h-3 bg-primary rounded-full"
                : "w-3 h-3 bg-white/60 hover:bg-white/80 rounded-full"
                }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

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
