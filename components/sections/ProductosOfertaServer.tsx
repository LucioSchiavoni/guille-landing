import { client } from "@/lib/sanity"
import { offerProductsQuery } from "@/lib/queries"
import ProductosOferta from "./ProductosOferta"

// 🚀 Server Component que hace el fetch de productos en oferta
// Esto permite cargar este contenido de forma diferida con Suspense
export default async function ProductosOfertaServer() {
  const offerProducts = await client.fetch(offerProductsQuery, {}, {
    next: { revalidate: 60 }
  })

  return <ProductosOferta products={offerProducts} />
}
