"use client"

import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { MessageCircle } from "lucide-react"

interface ProductDetailsProps {
    product: any
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const router = useRouter()
    const whatsappMessage = `Hola, estoy interesado en el producto: ${product.name}`
    const whatsappLink = `https://wa.me/59899222608?text=${encodeURIComponent(whatsappMessage)}`

    const handleContactClick = () => {
        // Close the modal by going back
        router.back()
        // Navigate to contact page after a small delay to ensure modal closes
        setTimeout(() => {
            router.push('/contacto')
        }, 100)
    }

    return (
        <div className="container mx-auto px-4 py-6 md:py-10 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
                {/* Image Section - Minimalist & contained */}
                <div className="relative rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 aspect-square md:aspect-[4/3]">
                    {product.image ? (
                        <Image
                            src={urlFor(product.image).url()}
                            alt={product.name}
                            fill
                            className="object-contain p-4 md:p-8 hover:scale-105 transition-transform duration-500"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
                            <span className="text-sm">Sin imagen</span>
                        </div>
                    )}
                </div>

                {/* Details Section - Clean & Direct */}
                <div className="flex flex-col space-y-6">
                    <div>
                        {/* Breadcrumbs - Subtle */}
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            {product.subcategory?.category?.name && (
                                <span className="font-medium text-green-700">
                                    {product.subcategory.category.name}
                                </span>
                            )}
                            {product.subcategory?.name && (
                                <>
                                    <span>/</span>
                                    <span>{product.subcategory.name}</span>
                                </>
                            )}
                        </div>

                        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 leading-tight">
                            {product.name}
                        </h1>

                        {product.price ? (
                            <div className="text-2xl md:text-3xl font-bold text-green-700 mt-2">
                                ${product.price.toLocaleString()} <span className="text-sm text-gray-400 font-normal">UYU</span>
                            </div>
                        ) : (
                            <div className="text-xl font-medium text-green-700 mt-2">
                                Consultar Precio
                            </div>
                        )}
                    </div>

                    <div className="h-px bg-gray-100 w-full" />

                    <div className="prose prose-sm md:prose-base text-gray-600 leading-relaxed">
                        <p>{product.description || "Sin descripción detallada."}</p>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={handleContactClick}
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-green-700 hover:bg-green-800 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors shadow-lg shadow-green-700/10"
                        >
                            <MessageCircle className="w-5 h-5" />
                            Consultar Disponibilidad
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
