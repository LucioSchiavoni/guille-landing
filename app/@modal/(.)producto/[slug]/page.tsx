import { client } from "@/lib/sanity"
import { productBySlugQuery } from "@/lib/queries"
import { notFound } from "next/navigation"
import InterceptModal from "@/components/InterceptModal"
import ProductDetails from "@/components/products/ProductDetails"

export const revalidate = 60

interface ProductModalPageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function ProductModalPage({ params }: ProductModalPageProps) {
    const { slug } = await params
    const product = await client.fetch(productBySlugQuery, { slug })

    if (!product) {
        notFound()
    }

    return (
        <InterceptModal title={product.name}>
            <ProductDetails product={product} />
        </InterceptModal>
    )
}
