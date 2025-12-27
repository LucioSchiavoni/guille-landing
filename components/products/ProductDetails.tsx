"use client"

import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import { motion } from "framer-motion"
import { Leaf } from "lucide-react"

interface ProductDetailsProps {
    product: any
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const whatsappMessage = `Hola, estoy interesado en el producto: ${product.name}`
    const whatsappLink = `https://wa.me/59899222608?text=${encodeURIComponent(whatsappMessage)}`

    const handleContactClick = () => {
        window.open(whatsappLink, '_blank')
    }

    return (
        <div className="min-h-[50vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-4xl w-full border border-green-50/50"
            >
                <div className="grid md:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative bg-linear-to-br from-green-50 to-emerald-50/30 p-8 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                        <motion.div
                            className="relative w-full h-full aspect-square"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {product.image ? (
                                <Image
                                    src={urlFor(product.image).url()}
                                    alt={product.name}
                                    fill
                                    className="object-contain drop-shadow-xl"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-green-300">
                                    <Leaf className="w-16 h-16 mb-2 opacity-50" />
                                    <span className="text-sm font-medium">Sin imagen</span>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                        <div className="space-y-4">
                            {/* Breadcrumbs / Category */}
                            <div className="flex flex-wrap gap-2 text-xs font-medium tracking-wide">
                                {product.subcategory?.category?.name && (
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full uppercase">
                                        {product.subcategory.category.name}
                                    </span>
                                )}
                                {product.subcategory?.name && (
                                    <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full uppercase">
                                        {product.subcategory.name}
                                    </span>
                                )}
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                                {product.name}
                            </h1>

                            <div className="h-1 w-20 bg-green-500 rounded-full opacity-20" />

                            <div className="prose prose-sm text-gray-600 leading-relaxed max-w-none">
                                <p>{product.description || "Un producto excelente para tus necesidades, amigable con el medio ambiente."}</p>
                            </div>

                            <div className="pt-2 flex flex-col sm:flex-row items-baseline sm:items-center justify-between gap-4">
                                {product.price && (
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-3xl font-bold text-green-700">
                                            ${product.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm font-medium text-gray-400">UYU</span>
                                    </div>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleContactClick}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition-colors shadow-lg shadow-green-700/20"
                                >
                                    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                    <span>Consultar precio</span>
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
