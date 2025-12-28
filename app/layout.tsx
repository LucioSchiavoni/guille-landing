import type React from "react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Montserrat, Merriweather, Source_Code_Pro } from "next/font/google"
import "./critical.css" // 🚀 Estilos críticos - carga síncrona
import BackgroundImage from "@/components/ui/background-image"
import DeferredStyles from "@/components/ui/deferred-styles"

// 🎯 Dynamic imports para componentes no críticos para LCP
const WhatsAppButton = dynamic(() => import("@/components/ui/whatsapp-button"), {
  loading: () => null, // Sin placeholder - aparece después del LCP
})

// 🚀 Prefetch de rutas críticas (client component - se ejecuta después de hidratación)
import RoutePrefetch from "@/components/ui/route-prefetch"

// 🎨 Configuración optimizada de fuentes Google
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "Arial", "sans-serif"],
  adjustFontFallback: true,
})

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: true,
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  fallback: ["Consolas", "Monaco", "monospace"],
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://todoenpackaging.com'),
  title: {
    default: "TodoEnPackaging | Soluciones en Packaging Ecológico y Descartable",
    template: "%s | TodoEnPackaging",
  },
  description: "Líderes en packaging ecológico y descartable en Uruguay. Soluciones sostenibles para la industria alimenticia: delivery, take away y gastronomía. Envíos a todo el país.",
  applicationName: "TodoEnPackaging",
  authors: [{ name: "TodoEnPackaging", url: "https://todoenpackaging.com" }],
  generator: "Next.js",
  keywords: [
    "packaging uruguay",
    "envases descartables",
    "packaging ecologico",
    "cajas para delivery",
    "insumos gastronomicos",
    "bolsas de papel",
    "vasos biodegradables",
    "bandejas comida",
    "todo en packaging",
    "proveedores gastronomia uruguay"
  ],
  referrer: "origin-when-cross-origin",
  creator: "TodoEnPackaging",
  publisher: "TodoEnPackaging",
  category: "Industrial",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "https://todoenpackaging.com",
    siteName: "TodoEnPackaging",
    title: "TodoEnPackaging | Soluciones en Packaging Ecológico y Descartable",
    description: "Distribución de envoltorios descartables eco-friendly y productos de higiene para la industria alimenticia en Uruguay. Catálogo completo online.",
    images: [
      {
        url: "https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png",
        width: 1200,
        height: 630,
        alt: "TodoEnPackaging - Soluciones Sostenibles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TodoEnPackaging | Soluciones en Packaging Ecológico",
    description: "Encuentra el mejor packaging para tu negocio. Soluciones sostenibles y económicas con envíos a todo Uruguay.",
    images: ["https://res.cloudinary.com/dbk2t0jy3/image/upload/v1764163493/LOGO_-_fondo_transparente_ioekip.png"],
    creator: "@todoenpackaging",
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
    google: 'verification_token',
    // yandex: 'yandex_verification_token',
    // other: {
    //   me: ['my-email', 'my-link'],
    // },
  },
  icons: {
    icon: [
      { url: "/logo_icon_green.png" },
      { url: "/logo_icon_green.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logo_icon_green.png",
    apple: "/logo_icon_green.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo_icon_green.png",
    },
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
        <BackgroundImage />
        <DeferredStyles />
        <WhatsAppButton />
        <RoutePrefetch />
      </body>
    </html>
  )
}
