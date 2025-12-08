import { urlFor } from "@/lib/sanity"
import Image from "next/image"

interface ProductDetailsProps {
    product: any
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    return (
        <div className="bg-card rounded-xl overflow-hidden h-full">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
                {/* Image Section */}
                <div className="relative aspect-square md:aspect-[4/3] bg-muted rounded-lg overflow-hidden">
                    {product.image ? (
                        <Image
                            src={urlFor(product.image).url()}
                            alt={product.name}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            priority
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-muted-foreground">
                            Sin imagen disponible
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span className="bg-primary/10 text-primary px-2 py-1 rounded-md font-medium">
                                {product.subcategory?.category?.name}
                            </span>
                            <span>•</span>
                            <span>{product.subcategory?.name}</span>
                        </div>
                        <h1 className="text-3xl md:text-3xl font-bold text-foreground mb-4">
                            {product.name}
                        </h1>
                        {product.price && (
                            <div className="text-2xl font-bold text-primary">
                                ${product.price.toLocaleString()}
                            </div>
                        )}
                    </div>

                    <div className="prose prose-neutral dark:prose-invert max-w-none flex-1 overflow-y-auto max-h-[200px] custom-scrollbar pr-2">
                        <h3 className="text-lg font-semibold mb-2">Descripción</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description || "No hay descripción disponible para este producto."}
                        </p>
                    </div>

                    <div className="pt-6 border-t border-border mt-auto">
                        <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-primary/25">
                            Consultar por este producto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
