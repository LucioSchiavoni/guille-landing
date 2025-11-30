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

// Get full menu structure: Categories -> Subcategories -> Products (as items)
export const menuQuery = groq`
  *[_type == "category" && active == true] | order(order asc) {
    "id": _id,
    "nombre": name,
    "subcategorias": *[_type == "subcategory" && category._ref == ^._id && active == true] | order(order asc) {
      "id": _id,
      "nombre": name,
      "items": *[_type == "product" && subcategory._ref == ^._id && active == true] | order(order asc).name
    }
  }
`

// Get products from "Destacados" category
export const featuredProductsQuery = groq`
  *[_type == "product" && active == true && subcategory->category->name == "Destacados"] | order(order asc) {
    _id,
    name,
    description,
    image {
      asset
    },
    price
  }
`
