"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Percent } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface OfferProduct {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  image?: any
  gallery?: any[]
  price?: number
  oferta?: boolean
  descuento?: number
}

interface ProductosOfertaProps {
  products: OfferProduct[]
}

function ProductCard({ product, index }: { product: OfferProduct; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const images = product.gallery && product.gallery.length > 0
    ? product.gallery
    : product.image
      ? [product.image]
      : []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [index])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const discountPrice = product.price && product.descuento
    ? product.price * (1 - product.descuento / 100)
    : null

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group bg-white rounded-xl overflow-hidden border-2 border-red-100 hover:border-red-500 transition-all duration-500 flex flex-col h-full",
        "hover:shadow-2xl hover:-translate-y-2",
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      )}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      <div className="relative">
        {product.descuento && product.descuento > 0 && (
          <div className="absolute top-3 right-3 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg blur opacity-75" />
              <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-1 font-black text-sm">
                  <Percent className="h-4 w-4" />
                  <span>{product.descuento} OFF</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {images.length > 0 ? (
            <>
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "absolute inset-0 transition-all duration-700",
                    idx === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  )}
                >
                  <Image
                    src={urlFor(img).url()}
                    alt={`${product.name} - Imagen ${idx + 1}`}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      isHovered ? "scale-110" : "scale-100"
                    )}
                    priority={index < 4}
                  />
                </div>
              ))}

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      prevImage()
                    }}
                    className={cn(
                      "absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10",
                      "transform hover:scale-110 active:scale-95",
                      isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                    )}
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      nextImage()
                    }}
                    className={cn(
                      "absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all z-10",
                      "transform hover:scale-110 active:scale-95",
                      isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                    )}
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-800" />
                  </button>

                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentImageIndex(idx)
                        }}
                        className={cn(
                          "rounded-full transition-all duration-300",
                          idx === currentImageIndex
                            ? "w-6 h-2 bg-green-500"
                            : "w-2 h-2 bg-white/70 hover:bg-white hover:w-3"
                        )}
                        aria-label={`Ir a imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Sin imagen
            </div>
          )}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          {product.price ? (
            <div className="flex flex-col">
              {discountPrice ? (
                <>
                  <span className="text-xs text-gray-400 line-through mb-1">
                    ${product.price.toLocaleString()}
                  </span>
                  <span className="font-bold text-2xl text-gray-900">
                    ${Math.round(discountPrice).toLocaleString()}
                  </span>
                  <span className="text-xs text-green-600 font-semibold mt-1">
                    Ahorrás ${Math.round(product.price - discountPrice).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="font-bold text-xl text-gray-900">
                  ${product.price.toLocaleString()}
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-gray-500">Consultar precio</span>
          )}

          <Button
            asChild
            className={cn(
              "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md",
              "transform hover:scale-105 active:scale-95 transition-all duration-300"
            )}
          >
            <Link href={`/producto/${product.slug.current}`}>
              Ver detalles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function EmptyPlaceholder() {
  const [isVisible, setIsVisible] = useState(false)
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, 200)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current)
    }

    return () => {
      if (placeholderRef.current) {
        observer.unobserve(placeholderRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={placeholderRef}
      className={cn(
        "flex flex-col items-center justify-center py-20 px-4 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="relative w-full max-w-md aspect-square mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl blur-2xl opacity-50" />
        <div className="relative w-full h-full">
          <Image
            src="https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163500/Generated_Image_October_15_2025_-_3_08PM_sskozd.png"
            alt="No hay ofertas disponibles"
            fill
            className="object-contain opacity-60 drop-shadow-2xl"
          />
        </div>
      </div>
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold text-gray-800">
          No hay ofertas disponibles
        </h3>
        <p className="text-gray-600 max-w-md leading-relaxed">
          Estamos preparando increíbles ofertas para ti. Vuelve pronto para descubrir nuestras promociones especiales en productos eco-friendly.
        </p>
        <Button
          asChild
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-6"
        >
          <Link href="/productos">
            Ver todos los productos
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default function ProductosOferta({ products }: ProductosOfertaProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.offsetWidth * 0.8
      const newScrollPosition = carouselRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount)
      carouselRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      })
    }
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-red-50/30 to-white">
        <div className="container mx-auto">
          <div
            ref={sectionRef}
            className={cn(
              "text-center mb-8 transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}
          >
            <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Aprovecha nuestras ofertas especiales en productos eco-friendly
            </p>
          </div>
          <EmptyPlaceholder />
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-gradient-to-b from-red-50/30 to-white">
      <div className="container mx-auto">
        <div
          className={cn(
            "text-center mb-8 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Aprovecha nuestros descuentos especiales en productos eco-friendly de alta calidad
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {products.length > 1 && (
            <>
              <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-50 p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 border-2 border-green-200"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-green-50 p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 border-2 border-green-200"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </button>
            </>
          )}

          {/* Carousel Scroll Container */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product, index) => (
              <div
                key={product._id}
                className="flex-none w-[calc(100%-2rem)] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] snap-start"
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
