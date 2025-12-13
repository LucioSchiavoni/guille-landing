"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
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

  return (
    <div
      ref={cardRef}
      className={cn(
        "group bg-white rounded-xl overflow-hidden border-2 border-gray-100 hover:border-green-500 transition-all duration-500 flex flex-col h-full",
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
        <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <Star className="h-3 w-3 fill-white" />
          Destacado
        </div>

        {images.length > 1 && (
          <div className="absolute top-3 right-3 z-10 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
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
                    "absolute inset-0 transition-opacity duration-500",
                    idx === currentImageIndex ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Image
                    src={urlFor(img).url()}
                    alt={`${product.name} - Imagen ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
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
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft className="h-4 w-4 text-gray-800" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      nextImage()
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 z-10"
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
                          "rounded-full transition-all",
                          idx === currentImageIndex
                            ? "w-6 h-2 bg-green-500"
                            : "w-2 h-2 bg-white/70 hover:bg-white"
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
        <h3 className="font-bold text-lg mb-2 line-clamp-2 text-gray-900 group-hover:text-green-600 transition-colors">
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
              <span className="text-xs text-gray-500">Precio</span>
              <span className="font-bold text-xl text-green-600">
                ${product.price.toLocaleString()}
              </span>
            </div>
          ) : (
            <span className="text-sm text-gray-500">Consultar precio</span>
          )}

          <Button
            asChild
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-md"
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

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-green-50/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Star className="h-4 w-4 fill-green-600" />
            Productos del Mes
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra selección especial de productos eco-friendly con las mejores ofertas del mes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product._id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
