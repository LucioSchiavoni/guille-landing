import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = '2023-05-03'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false, // Set to false for fresh data
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
    return builder.image(source)
}

/**
 * 🖼️ Helper para obtener URL de imagen optimizada de Sanity
 * Usa formato automático (WebP/AVIF según soporte del navegador)
 * y tamaños específicos para responsive
 */
export const getOptimizedImageUrl = (
    source: any,
    options?: {
        width?: number
        height?: number
        quality?: number
    }
) => {
    if (!source) return null

    let imageBuilder = builder.image(source).auto('format') // 🔥 WebP/AVIF automático

    if (options?.width) {
        imageBuilder = imageBuilder.width(options.width)
    }
    if (options?.height) {
        imageBuilder = imageBuilder.height(options.height)
    }
    if (options?.quality) {
        imageBuilder = imageBuilder.quality(options.quality)
    } else {
        imageBuilder = imageBuilder.quality(80) // Calidad por defecto
    }

    return imageBuilder.url()
}

/**
 * 🎯 Tamaños responsivos para imágenes de productos
 * Móvil: 400px, Tablet: 800px, Desktop: 875px
 */
export const PRODUCT_IMAGE_SIZES = {
    mobile: 400,
    tablet: 800,
    desktop: 875,
    card: 500,
    thumbnail: 200,
} as const

/**
 * 📐 Atributo sizes para imágenes responsivas de productos
 */
export const PRODUCT_SIZES_ATTR = "(max-width: 640px) 400px, (max-width: 1024px) 800px, 875px"

/**
 * 🖼️ Genera srcSet para imágenes responsivas de Sanity
 */
export const getSanitySrcSet = (source: any, sizes: number[] = [400, 800, 875]) => {
    if (!source) return undefined

    return sizes
        .map(size => {
            const url = builder.image(source).auto('format').width(size).quality(80).url()
            return `${url} ${size}w`
        })
        .join(', ')
}
