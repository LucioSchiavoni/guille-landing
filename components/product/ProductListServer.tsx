import { client } from "@/lib/sanity"
import { productsQuery } from "@/lib/queries"
import ProductList from "./product-list"

// 🚀 Server Component que hace el fetch de todos los productos
// Esto permite cargar este contenido de forma diferida con Suspense
export default async function ProductListServer() {
  const products = await client.fetch(productsQuery, {}, {
    next: { revalidate: 60 }
  })

  return <ProductList products={products} />
}
