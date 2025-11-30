export interface MenuItem {
  id: string;
  nombre: string;
  items?: { name: string; slug: string }[];
}

export interface Variante {
  tipo: string;
  items: { name: string; slug: string }[];
}

export interface Subcategoria {
  id: string;
  nombre: string;
  items?: { name: string; slug: string }[];
  variantes?: Variante[];
}

export interface Categoria {
  id: string;
  nombre: string;
  subcategorias: Subcategoria[];
}

export interface MenuData {
  categorias: Categoria[];
}