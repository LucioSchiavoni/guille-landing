"use client"

import { useState } from "react"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"
import { Button } from "@/components/ui/button"
import ProductModal from "./product-modal"

interface Product {
    _id: string
    name: string
    slug: { current: string }
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

interface ProductListProps {
    products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (product: Product) => {
        setSelectedProduct(product)
        setIsModalOpen(true)
    }

    return (
        <section className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                        <div className="relative aspect-square overflow-hidden bg-muted">
                            {product.image ? (
                                <Image
                                    src={urlFor(product.image).url()}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                    Sin imagen
                                </div>
                            )}
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
                                    onClick={() => openModal(product)}
                                >
                                    Ver más
                                </Button>
                            </div>
                        </div>
                    </div>
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
