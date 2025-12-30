"use client"

import { getOptimizedImageUrl } from "@/lib/sanity"
import { LazyImage } from "@/components/ui/lazy-image"
import { motion } from "framer-motion"
import { Leaf, X } from "lucide-react"
import { useMemo, useCallback } from "react"

interface ProductDetailsProps {
    product: any
    onClose?: () => void
}

export default function ProductDetails({ product, onClose }: ProductDetailsProps) {
    const whatsappLink = useMemo(() => {
        const message = `Hola, estoy interesado en el producto: ${product.name}`
        return `https://wa.me/59899222608?text=${encodeURIComponent(message)}`
    }, [product.name])

    const handleContactClick = useCallback(() => {
        window.open(whatsappLink, '_blank')
    }, [whatsappLink])

    const imageUrl = useMemo(() =>
        product.image ? getOptimizedImageUrl(product.image, { width: 800 }) : null
        , [product.image])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden w-full max-w-5xl mx-auto max-h-[90vh] sm:max-h-none overflow-y-auto"
        >
            {/* Botón cerrar Friendly 🔴 */}
            {onClose && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onClick={onClose}
                    className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 sm:p-2.5 rounded-full bg-white/90 sm:bg-black/5 hover:bg-red-50 text-gray-600 hover:text-red-500 transition-all duration-300 backdrop-blur-sm shadow-md sm:shadow-none border border-gray-200 sm:border-transparent"
                    aria-label="Cerrar"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className="w-5 h-5 sm:w-5 sm:h-5" />
                </motion.button>
            )}

            <div className="grid md:grid-cols-2 min-h-0 sm:min-h-[450px]">
                {/* Columna Imagen 🖼️ */}
                <div className="relative bg-gray-50 flex items-center justify-center p-4 sm:p-8 md:p-10 order-first">
                    {/* Etiqueta OFF */}
                    {product.descuento && product.descuento > 0 && (
                        <div className="absolute top-4 right-4 z-20">
                            <div className="relative">
                                <div className="absolute inset-0 rounded blur-sm opacity-75" style={{ backgroundColor: 'rgb(255, 102, 0)' }} />
                                <div className="relative text-white px-3 py-1 rounded shadow-md" style={{ background: 'linear-gradient(to bottom right, rgb(255, 102, 0), rgb(230, 92, 0))' }}>
                                    <div className="flex items-center gap-1 font-bold text-sm">
                                        <span>{product.descuento}% OFF</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <motion.div
                        className="relative w-full h-full min-h-[200px] sm:min-h-[300px]"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {imageUrl ? (
                            <LazyImage
                                src={imageUrl}
                                alt={product.name}
                                fill
                                className="object-contain"
                                containerClassName="w-full h-full"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-300">
                                <Leaf className="w-16 h-16 mb-2" />
                                <span className="text-sm font-medium">Sin imagen</span>
                            </div>
                        )}
                    </motion.div>

                </div>

                {/* Columna Contenido 📝 */}
                <div className="flex flex-col justify-center p-4 sm:p-8 md:p-12 bg-white">
                    <div className="space-y-3 sm:space-y-6">
                        <div>
                            <h1 className="text-xl sm:text-2xl md:text-4xl text-gray-900 leading-tight mb-2 sm:mb-3" style={{ fontFamily: 'Lato Black, sans-serif', fontWeight: 900 }}>
                                {product.name}
                            </h1>
                            <div className="h-1 sm:h-1.5 w-16 sm:w-24 bg-emerald-500 rounded-full opacity-30" />
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md" style={{ fontFamily: 'Archivo Narrow, sans-serif' }}>
                            {product.description || "Producto eco-friendly de alta calidad, diseñado pensando en el medio ambiente y la eficiencia."}
                        </p>

                        {/* Precio */}
                        {product.price && (
                            <div className="flex flex-col gap-2">
                                {product.descuento && product.descuento > 0 ? (
                                    <>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Lato, sans-serif' }}>
                                                ${Math.round(product.price * (1 - product.descuento / 100)).toLocaleString()}
                                            </span>
                                            <span className="text-lg text-gray-400 line-through" style={{ fontFamily: 'Lato, sans-serif' }}>
                                                ${product.price.toLocaleString()}
                                            </span>
                                        </div>
                                        <span className="text-sm font-semibold" style={{ fontFamily: 'Archivo Narrow, sans-serif', color: 'rgb(255, 102, 0)' }}>
                                            Ahorrás ${Math.round(product.price * (product.descuento / 100)).toLocaleString()}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900" style={{ fontFamily: 'Lato, sans-serif' }}>
                                        ${product.price.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        )}

                        <div className="pt-4 sm:pt-6 border-t border-gray-100 mt-auto">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleContactClick}
                                className="w-full flex items-center justify-center gap-2 bg-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base hover:bg-emerald-800 transition-all shadow-xl shadow-emerald-700/20"
                                style={{ fontFamily: 'Lato, sans-serif', fontWeight: 700 }}
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span>Consultar Disponibilidad</span>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
