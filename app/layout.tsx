import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Merriweather, Source_Code_Pro } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/ui/whatsapp-button"

// <CHANGE> Updated fonts to match the design system
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" })
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
})
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL('https://todoenpackaging.com'),
  title: {
    default: "TodoEnPackaging - Soluciones Eco-Friendly para Packaging Alimenticio",
    template: "%s | TodoEnPackaging",
  },
  description: "Empresa dedicada a la distribución de envoltorios descartables eco-friendly y productos de higiene para la industria alimenticia. Productos a base de pulpa de papel, bagazo de caña y fibra de bambú. Envíos a todo Uruguay.",
  keywords: [
    "packaging eco-friendly",
    "envoltorios descartables",
    "packaging alimenticio Uruguay",
    "productos biodegradables",
    "packaging sostenible",
    "envoltorios ecológicos",
    "packaging caña de azúcar",
    "packaging bambú",
    "productos descartables",
    "packaging restaurantes",
    "packaging delivery",
  ],
  authors: [{ name: "TodoEnPackaging" }],
  creator: "TodoEnPackaging",
  publisher: "TodoEnPackaging",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "https://todoenpackaging.com",
    siteName: "TodoEnPackaging",
    title: "TodoEnPackaging - Soluciones Eco-Friendly para Packaging Alimenticio",
    description: "Distribución de envoltorios descartables eco-friendly y productos de higiene para la industria alimenticia en Uruguay.",
    images: [
      {
        url: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png",
        width: 1200,
        height: 630,
        alt: "TodoEnPackaging Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TodoEnPackaging - Soluciones Eco-Friendly para Packaging Alimenticio",
    description: "Distribución de envoltorios descartables eco-friendly y productos de higiene para la industria alimenticia en Uruguay.",
    images: ["https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  modal: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body
        className={`${montserrat.variable} ${merriweather.variable} ${sourceCodePro.variable} font-sans antialiased`}
      >
        {children}
        {modal}
        <WhatsAppButton />
      </body>
    </html>
  )
}
