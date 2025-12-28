"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { getOptimizedImageUrl, PRODUCT_SIZES_ATTR } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import ProductModal from "./product-modal"
import { cn } from "@/lib/utils"

interface Product {
    _id: string
    name: string
    slug: { current: string }
    description: string
    image: any
    gallery?: any[]
    price?: number
    subcategory: {
        name: string
        category: {
            name: string
        }
    }
}

interface ProductListProps {
    products: Product[]
}

function ProductCard({ product, onOpenModal, index }: { product: Product; onOpenModal: (product: Product) => void; index: number }) {
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
                        }, index * 50)
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
                "group bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-500 flex flex-col h-full",
                "hover:-translate-y-1",
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
            )}
            style={{
                transitionDelay: `${index * 30}ms`,
            }}
        >
            <div className="relative">
                {images.length > 1 && (
                    <div className="absolute top-2 right-2 z-10 bg-black/60 text-white px-2 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                        {currentImageIndex + 1} / {images.length}
                    </div>
                )}

                <div className="relative aspect-square overflow-hidden bg-muted">
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
                                        src={getOptimizedImageUrl(img, { width: 500 }) || ""}
                                        alt={`${product.name} - Imagen ${idx + 1}`}
                                        fill
                                        sizes={PRODUCT_SIZES_ATTR}
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
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
                                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 z-10"
                                        aria-label="Imagen anterior"
                                    >
                                        <ChevronLeft className="h-4 w-4 text-gray-800" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            nextImage()
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 z-10"
                                        aria-label="Imagen siguiente"
                                    >
                                        <ChevronRight className="h-4 w-4 text-gray-800" />
                                    </button>

                                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
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
                                                        ? "w-5 h-1.5 bg-primary"
                                                        : "w-1.5 h-1.5 bg-white/70 hover:bg-white"
                                                )}
                                                aria-label={`Ir a imagen ${idx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Sin imagen
                        </div>
                    )}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs text-muted-foreground mb-1">
                    {product.subcategory?.category?.name} / {product.subcategory?.name}
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.description || "Sin descripción"}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4">
                    {product.price && (
                        <span className="font-bold text-lg">
                            ${product.price.toLocaleString()}
                        </span>
                    )}
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto"
                        onClick={() => onOpenModal(product)}
                    >
                        Ver más
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default function ProductList({ products }: ProductListProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    if (!products || products.length === 0) {
        return (
            <section className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
                <p className="text-center text-muted-foreground">No hay productos disponibles en este momento.</p>
            </section>
        )
    }

    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onOpenModal={openModal}
                        index={index}
                    />
                ))}
            </div>

            <ProductModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    )
}
