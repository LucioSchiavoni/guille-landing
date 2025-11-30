export interface MenuItem {
  id: string;
  nombre: string;
  items?: string[];
}

export interface Variante {
  tipo: string;
  items: string[];
}

export interface Subcategoria {
  id: string;
  nombre: string;
  items?: string[];
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