import type React from "react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Lato, Merriweather, Source_Code_Pro } from "next/font/google"
import "./critical.css" // 🚀 Estilos críticos - carga síncrona
import DeferredStyles from "@/components/ui/deferred-styles"

// 🎯 Dynamic imports para componentes no críticos para LCP
const WhatsAppButton = dynamic(() => import("@/components/ui/whatsapp-button"), {
  loading: () => null, // Sin placeholder - aparece después del LCP
})

// 🚀 Prefetch de rutas críticas (client component - se ejecuta después de hidratación)
import RoutePrefetch from "@/components/ui/route-prefetch"

// SEO: JSON-LD structured data
import { OrganizationSchema, WebsiteSchema } from "@/components/seo/JsonLd"

// 🎨 Configuración optimizada de fuentes Google
const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
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
  metadataBase: new URL("https://todoenpackaging.com.uy"),
  title: {
    default: "TODO EN PACKAGING - Envases y Descartables en Uruguay",
    template: "%s | TODO EN PACKAGING",
  },
  description: "Venta de envases descartables, bandejas, vasos, cubiertos, packaging y embalajes para comercios en Uruguay. Productos genéricos y personalizados con la mejor atención.",
  applicationName: "TodoEnPackaging",
  authors: [{ name: "TodoEnPackaging", url: "https://todoenpackaging.com" }],
  generator: "Next.js",
  keywords: [
    "envases descartables",
    "packaging uruguay",
    "bandejas descartables",
    "vasos descartables",
    "cubiertos descartables",
    "embalajes",
    "envases para comercios",
    "todo en packaging"
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
    canonical: "https://todoenpackaging.com.uy",
  },
  openGraph: {
    type: "website",
    locale: "es_UY",
    url: "https://todoenpackaging.com.uy",
    siteName: "TODO EN PACKAGING",
    title: "TODO EN PACKAGING - Envases y Descartables en Uruguay",
    description: "Venta de envases descartables, bandejas, vasos, cubiertos, packaging y embalajes para comercios en Uruguay. Productos genéricos y personalizados con la mejor atención.",
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
      { url: "/logo.png" },
      { url: "/logo.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
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
        className={`${lato.variable} ${merriweather.variable} ${sourceCodePro.variable} font-sans antialiased bg-stone-100`}
      >
        <OrganizationSchema />
        <WebsiteSchema />
        {children}
        {modal}
        <DeferredStyles />
        <WhatsAppButton />
        <RoutePrefetch />
      </body>
    </html>
  )
}
