"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Leaf, Recycle, TreeDeciduous, MessageCircle, ArrowRight, Share2 } from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Product {
    _id: string
    name: string
    description: string
    image: any
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

function getWhatsAppLink(productName: string) {
    const phone = "59899222608"
    const message = encodeURIComponent(`Hola! Me interesa consultar cotización y disponibilidad por mayor del producto: ${productName}`)
    return `https://wa.me/${phone}?text=${message}`
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const [imageLoaded, setImageLoaded] = useState(false)
    const [isCopied, setIsCopied] = useState(false)

    // reset image header state when product changes or modal opens
    useEffect(() => {
        if (isOpen) {
            setImageLoaded(false)
            setIsCopied(false)
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => { document.body.style.overflow = "unset" }
    }, [isOpen, product])

    const handleShare = () => {
        if (!product) return
        const url = `${window.location.origin}/producto/${product._id}` // Assuming _id or slug usage, simplistic
        navigator.clipboard.writeText(window.location.href).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        })
    }

    return (
        <AnimatePresence>
            {isOpen && product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md"
                        onClick={onClose}
                    />

                    {/* Modal Container */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 30 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white w-full max-w-3xl max-h-[85vh] rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row pointer-events-auto relative ring-1 ring-white/20"
                        >
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute right-3 top-3 z-30 p-2 rounded-full bg-black/10 hover:bg-black/20 text-stone-600 hover:text-stone-900 transition-all backdrop-blur-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Image Section - Compact & Impactful */}
                            <div className="w-full md:w-[45%] bg-stone-100 relative min-h-[250px] md:min-h-full overflow-hidden">
                                {!imageLoaded && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-stone-100 z-10">
                                        <Leaf className="w-10 h-10 text-green-300 animate-pulse" />
                                    </div>
                                )}
                                {product.image ? (
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={urlFor(product.image).url()}
                                            alt={product.name}
                                            fill
                                            className={cn(
                                                "object-cover transition-all duration-700",
                                                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110"
                                            )}
                                            onLoad={() => setImageLoaded(true)}
                                            priority
                                        />
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-stone-300">
                                        <div className="text-center">
                                            <Leaf className="w-16 h-16 mx-auto opacity-50 mb-2" />
                                            <span className="text-sm font-medium">Sin imagen</span>
                                        </div>
                                    </div>
                                )}
                                {/* Badge Overlay */}
                                <div className="absolute bottom-4 left-4 z-20">
                                    <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-[10px] font-bold text-green-700 flex items-center gap-1">
                                        <Recycle className="w-3 h-3" />
                                        <span>ECO-FRIENDLY</span>
                                    </div>
                                </div>
                            </div>

                            {/* Content Section - Compact & Scrollable */}
                            <div className="w-full md:w-[55%] flex flex-col bg-white">
                                <div className="p-6 md:p-8 flex flex-col h-full overflow-y-auto custom-scrollbar">
                                    {/* Breadcrumb */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="flex items-center gap-2 text-[10px] font-bold tracking-widest text-green-600 uppercase mb-3"
                                    >
                                        <span>{product.subcategory?.category?.name}</span>
                                        <ArrowRight className="w-3 h-3 text-stone-300" />
                                        <span className="text-stone-400">{product.subcategory?.name}</span>
                                    </motion.div>

                                    {/* Title */}
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-xl md:text-2xl font-bold text-stone-900 mb-3 leading-snug"
                                    >
                                        {product.name}
                                    </motion.h2>

                                    {/* Description */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="prose prose-stone prose-sm text-stone-600 mb-6 flex-grow"
                                    >
                                        <p className="text-sm leading-relaxed">
                                            {product.description || "Producto de alta calidad y diseño sostenible."}
                                        </p>
                                    </motion.div>

                                    {/* Actions */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="mt-auto space-y-3 pt-4 border-t border-stone-100"
                                    >
                                        <Button
                                            asChild
                                            className="w-full bg-[#0b5c1c] hover:bg-green-800 text-white font-semibold h-11 rounded-lg shadow-md transition-transform hover:scale-[1.01] active:scale-95"
                                        >
                                            <a
                                                href={getWhatsAppLink(product.name)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center justify-center gap-2"
                                            >
                                                <MessageCircle className="w-4 h-4" />
                                                <span className="font-bold">Consultar disponibilidad</span>
                                            </a>
                                        </Button>

                                        <Button
                                            variant="ghost"
                                            onClick={handleShare}
                                            className="w-full h-9 text-xs text-stone-500 hover:text-green-700 hover:bg-green-50"
                                        >
                                            {isCopied ? "¡Enlace copiado!" : "Compartir producto"}
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
