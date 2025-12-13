export default function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://todoenpackaging.com",
    name: "TodoEnPackaging",
    description: "Empresa dedicada a la distribución de envoltorios descartables eco-friendly y productos de higiene para la industria alimenticia en Uruguay",
    url: "https://todoenpackaging.com",
    logo: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png",
    image: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163500/Generated_Image_October_15_2025_-_3_08PM_sskozd.png",
    telephone: "+598-99-222-608",
    email: "todoenpackaging@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "UY",
      addressLocality: "Uruguay",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "19:00",
      },
    ],
    priceRange: "$$",
    areaServed: {
      "@type": "Country",
      name: "Uruguay",
    },
    sameAs: [
      "https://www.facebook.com/todoenpackaging",
      "https://www.instagram.com/todoenpackaging",
      "https://www.linkedin.com/company/todoenpackaging",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Productos de Packaging Eco-Friendly",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Envoltorios Descartables",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Packaging de Bambú",
                description: "Productos biodegradables a base de fibra de bambú",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Packaging de Caña de Azúcar",
                description: "Productos eco-friendly a base de bagazo de caña",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Packaging de Pulpa de Papel",
                description: "Envoltorios biodegradables a base de pulpa de papel",
              },
            },
          ],
        },
      ],
    },
  }

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TodoEnPackaging",
    url: "https://todoenpackaging.com",
    logo: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+598-99-222-608",
      contactType: "customer service",
      email: "todoenpackaging@gmail.com",
      areaServed: "UY",
      availableLanguage: ["Spanish"],
    },
    sameAs: [
      "https://www.facebook.com/todoenpackaging",
      "https://www.instagram.com/todoenpackaging",
      "https://www.linkedin.com/company/todoenpackaging",
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  )
}
