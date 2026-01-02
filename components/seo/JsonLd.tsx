interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
  description?: string
  telephone?: string
  email?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    addressRegion?: string
    postalCode?: string
    addressCountry?: string
  }
  socialMedia?: {
    instagram?: string
    facebook?: string
    linkedin?: string
  }
}

export function OrganizationSchema({
  name = "TODO EN PACKAGING",
  url = "https://todoenpackaging.com.uy",
  logo = "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png",
  description = "Venta de envases descartables, bandejas, vasos, cubiertos, packaging y embalajes para comercios en Uruguay. Productos genéricos y personalizados con la mejor atención.",
  telephone,
  email,
  address,
  socialMedia = {
    instagram: "https://www.instagram.com/todoenpackaging.uy",
    facebook: "https://www.facebook.com/share/1EiUDf5JHj/",
    linkedin: "https://www.linkedin.com/in/todo-en-packaging-tep-9346a832b",
  },
}: OrganizationSchemaProps = {}) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo: {
      "@type": "ImageObject",
      url: logo,
    },
    description,
    ...(telephone && { telephone }),
    ...(email && { email }),
    ...(address && {
      address: {
        "@type": "PostalAddress",
        ...address,
      },
    }),
    sameAs: Object.values(socialMedia).filter(Boolean),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  )
}

interface WebsiteSchemaProps {
  name?: string
  url?: string
  description?: string
}

export function WebsiteSchema({
  name = "TODO EN PACKAGING",
  url = "https://todoenpackaging.com.uy",
  description = "Venta de envases descartables, bandejas, vasos, cubiertos, packaging y embalajes para comercios en Uruguay.",
}: WebsiteSchemaProps = {}) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${url}/busqueda?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(websiteSchema),
      }}
    />
  )
}

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbSchema),
      }}
    />
  )
}

interface ProductSchemaProps {
  name: string
  description?: string
  image?: string
  sku?: string
  brand?: string
  offers?: {
    price?: number
    priceCurrency?: string
    availability?: string
  }
}

export function ProductSchema({
  name,
  description,
  image,
  sku,
  brand = "TODO EN PACKAGING",
  offers,
}: ProductSchemaProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    ...(description && { description }),
    ...(image && { image }),
    ...(sku && { sku }),
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(offers && {
      offers: {
        "@type": "Offer",
        priceCurrency: offers.priceCurrency || "UYU",
        price: offers.price,
        availability: offers.availability || "https://schema.org/InStock",
      },
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(productSchema),
      }}
    />
  )
}
