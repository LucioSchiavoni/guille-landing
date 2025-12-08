export interface Item {
  name: string
  slug: string
  image?: any
}

export interface Variante {
  nombre: string
  items: Item[]
}

export interface Subcategoria {
  id: string
  nombre: string
  items?: Item[]
  variantes?: Variante[]
}

export interface Categoria {
  id: string
  nombre: string
  subcategorias: Subcategoria[]
}
