"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { Button } from "@/components/ui/button"

interface Product {
    _id: string
    name: string
    description: string
    image: any
    price?: number
    subcategory: {
        name: string
        category: {
            name: string
        }
    }
}

interface ProductModalProps {
    product: Product | null
    isOpen: boolean
    onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
            document.body.style.overflow = "hidden"
        } else {
            const timer = setTimeout(() => setIsVisible(false), 300)
            document.body.style.overflow = "unset"
            return () => clearTimeout(timer)
        }
    }, [isOpen])

    if (!isVisible && !isOpen) return null

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div
                className={`relative w-full max-w-4xl min-h-[500px] md:min-h-[600px] bg-background rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-all duration-300 transform ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
                    }`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 text-foreground/80 transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[600px] bg-muted">
                    {product?.image ? (
                        <Image
                            src={urlFor(product.image).url()}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Sin imagen
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col min-h-[300px] md:min-h-[600px]">
                    <div className="flex-grow flex flex-col">
                        <div className="text-sm text-primary font-medium mb-2">
                            {product?.subcategory?.category?.name} • {product?.subcategory?.name}
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                            {product?.name}
                        </h2>

                        {/* Scrollable Description Container */}
                        <div className="flex-grow overflow-y-auto max-h-[300px] md:max-h-[350px] pr-2 mb-6 custom-scrollbar">
                            <div className="prose prose-sm text-muted-foreground">
                                <p className="whitespace-pre-wrap">{product?.description || "Sin descripción"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border flex items-center justify-between flex-shrink-0">
                        <div>
                            {product?.price && (
                                <div className="flex flex-col">
                                    <span className="text-sm text-muted-foreground">Precio</span>
                                    <span className="text-2xl font-bold text-primary">
                                        ${product.price.toLocaleString()}
                                    </span>
                                </div>
                            )}
                        </div>
                        <Button onClick={onClose} className="px-8">
                            Cerrar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
