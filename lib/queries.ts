import { groq } from 'next-sanity'

// Get all active categories ordered by 'order' field
export const categoriesQuery = groq`
  *[_type == "category" && active == true] | order(order asc) {
    _id,
    name,
    slug,
    order
  }
`

// Get all active subcategories for a specific category
export const subcategoriesByCategoryQuery = groq`
  *[_type == "subcategory" && active == true && category._ref == $categoryId] | order(order asc) {
    _id,
    name,
    slug,
    order
  }
`

// Get all active products with their subcategory and category references
export const productsQuery = groq`
  *[_type == "product" && active == true] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image,
    gallery,
    price,
    subcategory->{
      _id,
      name,
      slug,
      category->{
        _id,
        name,
        slug
      }
    }
  }
`

// Get products by subcategory
export const productsBySubcategoryQuery = groq`
  *[_type == "product" && active == true && subcategory._ref == $subcategoryId] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image,
    price
  }
`

// Get full menu structure: Rubros -> Categories -> Subcategories -> Products (as items)
export const menuQuery = groq`
  {
    "rubros": *[_type == "rubro" && active == true] | order(order asc) {
      "id": _id,
      "nombre": name,
      "categorias": *[_type == "category" && references(^._id) && active == true] | order(order asc) {
        "id": _id,
        "nombre": name,
        "subcategorias": *[_type == "subcategory" && category._ref == ^._id && active == true] | order(order asc) {
          "id": _id,
          "nombre": name,
          "items": *[_type == "product" && subcategory._ref == ^._id && active == true] | order(order asc) {
            "name": name,
            "slug": slug.current,
            "image": image
          }
        }
      }
    },
    "miscellaneousCategories": *[_type == "category" && active == true] | order(order asc) {
      "id": _id,
      "nombre": name,
      "subcategorias": *[_type == "subcategory" && category._ref == ^._id && active == true] | order(order asc) {
        "id": _id,
        "nombre": name,
        "items": *[_type == "product" && subcategory._ref == ^._id && active == true] | order(order asc) {
          "name": name,
          "slug": slug.current,
          "image": image
        }
      }
    }
  }
`

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    image,
    gallery,
    price,
    subcategory->{
      name,
      slug,
      category->{
        name,
        slug
      }
    }
  }
`

export const advancedSearchQuery = groq`
  *[_type == "product" && active == true &&
    ($searchTerm == "" || name match $searchTerm + "*" || subcategory->name match $searchTerm + "*" || subcategory->category->name match $searchTerm + "*") &&
    ($filterType != "category" || subcategory->category._ref == $filterId) &&
    ($filterType != "subcategory" || subcategory._ref == $filterId)
  ] | order(name asc) {
    _id,
    name,
    slug,
    description,
    image,
    price,
    subcategory->{
      _id,
      name,
      category->{
        _id,
        name
      }
    }
  }
`

// Get featured products (products marked as "destacado")
export const featuredProductsQuery = groq`
  *[_type == "product" && active == true && destacado == true] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image {
      asset->{
        _id,
        url
      }
    },
    gallery,
    price,
    subcategory->{
      name,
      category->{
        name
      }
    }
  }
`

// Get products in offer
export const offerProductsQuery = groq`
  *[_type == "product" && active == true && oferta == true] | order(order asc) {
    _id,
    name,
    slug,
    description,
    image,
    gallery,
    price,
    oferta,
    descuento
  }
`
