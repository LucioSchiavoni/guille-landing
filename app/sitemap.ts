import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'

const BASE_URL = 'https://todoenpackaging.com'

async function getAllProducts() {
  const query = `*[_type == "product" && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }`

  return await client.fetch(query)
}

async function getAllCategories() {
  const query = `*[_type == "category" && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }`

  return await client.fetch(query)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts()
  const categories = await getAllCategories()

  const staticPages = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/productos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sostenibilidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ]

  const productPages = products.map((product: any) => ({
    url: `${BASE_URL}/producto/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...productPages]
}
