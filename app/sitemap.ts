import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity'
import { groq } from 'next-sanity'

const BASE_URL = 'https://todoenpackaging.com.uy'

async function getAllProducts() {
  const query = groq`*[_type == "product" && active == true && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }`

  return await client.fetch(query)
}

async function getAllCategories() {
  const query = groq`*[_type == "category" && active == true && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }`

  return await client.fetch(query)
}

async function getAllSubcategories() {
  const query = groq`*[_type == "subcategory" && active == true && !(_id in path("drafts.**"))] {
    "slug": slug.current,
    _updatedAt
  }`

  return await client.fetch(query)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, subcategories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getAllSubcategories(),
  ])

  // Paginas estaticas con prioridades definidas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/productos`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/sostenibilidad`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  // Paginas de categorias
  const categoryPages: MetadataRoute.Sitemap = categories.map((category: any) => ({
    url: `${BASE_URL}/categoria/${category.slug}`,
    lastModified: new Date(category._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Paginas de subcategorias
  const subcategoryPages: MetadataRoute.Sitemap = subcategories.map((subcategory: any) => ({
    url: `${BASE_URL}/subcategoria/${subcategory.slug}`,
    lastModified: new Date(subcategory._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // Paginas de productos individuales
  const productPages: MetadataRoute.Sitemap = products.map((product: any) => ({
    url: `${BASE_URL}/producto/${product.slug}`,
    lastModified: new Date(product._updatedAt),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...categoryPages, ...subcategoryPages, ...productPages]
}
