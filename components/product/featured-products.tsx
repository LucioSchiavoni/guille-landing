"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star, MessageCircle, Sparkles } from "lucide-react"
import { urlFor } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface FeaturedProduct {
  _id: string
  name: string
  slug: { current: string }
  description?: string
  image?: any
  gallery?: any[]
  price?: number
}

interface FeaturedProductsProps {
  products: FeaturedProduct[]
}

function ProductCard({ product, index }: { product: FeaturedProduct; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : product.image ? [product.image] : []

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, index * 50)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }, // threshold más bajo para aparecer antes
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

  const getWhatsAppLink = () => {
    const phoneNumber = "5491112345678" // Reemplazar con tu número
    const message = encodeURIComponent(
      `¡Hola! Me interesa cotizar el producto: ${product.name}. ¿Podrían darme más información?`,
    )
    return `https://wa.me/${phoneNumber}?text=${message}`
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative bg-white rounded-2xl overflow-hidden flex flex-col h-full",
        "border border-gray-200 shadow-md",
        "hover:shadow-lg hover:border-gray-300",
        "transition-all duration-300 ease-out",
        "hover:-translate-y-2",
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95",
      )}
      style={{
        transitionDelay: isVisible ? "0ms" : `${index * 30}ms`,
      }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-tr from-green-500/5 via-transparent to-emerald-500/5 opacity-0 transition-opacity duration-300 pointer-events-none z-20 rounded-2xl",
          isHovered && "opacity-100",
        )}
      />

      <div className="relative">
        <div className="absolute top-3 left-3 z-10">
          <div className="bg-green-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-md">
            <Sparkles className="h-3 w-3" />
            Destacado
          </div>
        </div>

        {images.length > 1 && (
          <div className="absolute top-3 right-3 z-10 bg-black/50 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
          {images.length > 0 ? (
            <>
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "absolute inset-0 transition-all duration-300",
                    idx === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-105",
                  )}
                >
                  <Image
                    src={urlFor(img).url() || "/placeholder.svg"}
                    alt={`${product.name} - Imagen ${idx + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      nextImage()
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight className="h-4 w-4 text-gray-700" />
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
                          "rounded-full transition-all duration-200",
                          idx === currentImageIndex ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/60 hover:bg-white/80",
                        )}
                        aria-label={`Ir a imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">Sin imagen</div>
          )}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800 group-hover:text-green-600 transition-colors duration-200">
          {product.name}
        </h3>

        {product.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">{product.description}</p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-col gap-2">
          <Button
            asChild
            className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors duration-200 font-medium h-10 rounded-lg"
          >
            <Link href={`/producto/${product.slug.current}`}>Ver detalles</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full border border-green-600 text-green-600 hover:bg-green-50 transition-colors duration-200 font-medium h-10 rounded-lg bg-transparent"
          >
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <MessageCircle className="h-4 w-4" />
              Consulta cotización
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 bg-gray-50/50 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="h-4 w-4 fill-green-500 text-green-500" />
            Productos del Mes
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Productos <span className="text-green-600">Destacados</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Descubre nuestra selección especial de productos eco-friendly
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
