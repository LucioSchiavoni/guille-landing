"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getOptimizedImageUrl, PRODUCT_SIZES_ATTR } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import { LazyImage } from "@/components/ui/lazy-image"
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

  const getWhatsAppLink = () => {
    const phoneNumber = "59899222608"
    const message = encodeURIComponent(
      `¡Hola! Me interesa la oferta por mayor del producto: ${product.name}. ¿Podrían darme más información?`,
    )
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const discountPrice = product.price && product.descuento
    ? product.price * (1 - product.descuento / 100)
    : null

  return (
    <div className="relative">
      {product.descuento && product.descuento > 0 && (
        <div className="absolute top-2 right-2 z-20">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded blur-sm opacity-75" />
            <div className="relative bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded shadow-md">
              <div className="flex items-center gap-0.5 font-bold text-[10px]">
                <span>{product.descuento}% OFF</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        ref={cardRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "group bg-white rounded-xl overflow-hidden border-2 border-green-100 hover:border-green-500 transition-all duration-500 flex flex-col",
          "hover:shadow-2xl hover:-translate-y-2",
          "h-[420px] sm:h-[560px] lg:h-[600px]",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        )}
        style={{
          transitionDelay: `${index * 50}ms`,
        }}
      >
        <div className="relative">

          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 z-10 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}

          <Link href={`/producto/${product.slug.current}`} className="relative block">
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
                      <LazyImage
                        src={getOptimizedImageUrl(img, { width: 500 }) || ""}
                        alt={`${product.name} - Imagen ${idx + 1}`}
                        fill
                        sizes={PRODUCT_SIZES_ATTR}
                        className={cn(
                          "object-cover transition-transform duration-700",
                          isHovered ? "scale-110" : "scale-100"
                        )}
                        containerClassName="w-full h-full"
                      />
                    </div>
                  ))}

                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation() // Stop Link click
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
                          e.stopPropagation() // Stop Link click
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
                              e.stopPropagation() // Stop Link click
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
          </Link>
        </div>

        <div className="p-2.5 sm:p-4 lg:p-5 flex flex-col flex-grow">
          <Link href={`/producto/${product.slug.current}`}>
            <h3 className="font-bold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 line-clamp-2 text-gray-900 group-hover:text-green-700 transition-colors duration-300 h-[2.25rem] sm:h-[3rem]">
              {product.name}
            </h3>
          </Link>

          <div className="h-[1.75rem] sm:h-[2.5rem] lg:h-[3rem] mb-1.5 sm:mb-3">
            {product.description && (
              <p className="text-[11px] sm:text-sm text-gray-500 line-clamp-2 leading-tight sm:leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <div className="mt-auto pt-1.5 sm:pt-3 lg:pt-4 border-t border-gray-100 w-full">
            <div className="flex flex-col mb-1.5 sm:mb-3 lg:mb-4">
              {product.price ? (
                <div className="flex flex-wrap items-baseline gap-2">
                  {discountPrice ? (
                    <>
                      <span className="font-bold text-base sm:text-xl lg:text-2xl text-gray-900">
                        ${Math.round(discountPrice).toLocaleString()}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                        ${product.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] sm:text-xs text-green-600 font-semibold w-full sm:w-auto">
                        Ahorrás ${Math.round(product.price - discountPrice).toLocaleString()}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-sm sm:text-lg lg:text-xl text-gray-900">
                      ${product.price.toLocaleString()}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-xs sm:text-sm text-gray-500 font-medium italic">Consultar precio</span>
              )}
            </div>

            <div className="flex flex-col gap-1 sm:gap-2 w-full pb-0.5 sm:pb-2">
              <Button
                asChild
                variant="outline"
                className="w-full h-7 sm:h-9 lg:h-10 text-[11px] sm:text-sm border-green-500 text-green-600 hover:bg-green-50 hover:text-green-700"
              >
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  <span className="truncate">Consultar</span>
                </a>
              </Button>
            </div>
          </div>
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
          <LazyImage
            src="https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163500/Generated_Image_October_15_2025_-_3_08PM_sskozd.png"
            alt="No hay ofertas disponibles"
            fill
            className="object-contain opacity-60 drop-shadow-2xl"
            containerClassName="w-full h-full"
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
      <section className="py-16 px-4 bg-gradient-to-b from-green-50/30 to-white">
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
    <section ref={sectionRef} className="py-16 px-4 bg-gradient-to-b from-green-50/30 to-white">
      <div className="container mx-auto">
        <div
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            OFERTAS <span className="text-green-600">POR MAYOR</span>
          </h2>

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
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 px-4 sm:px-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {products.map((product, index) => (
              <div
                key={product._id}
                className="flex-none w-[85vw] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)] xl:w-[calc(25%-1.5rem)] snap-center sm:snap-start"
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
