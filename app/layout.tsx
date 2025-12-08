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
  title: "TODOENPACKAGING",
  description: "Empresa dedicada a brindar la mejor atencion en envoltorios plasticos y de papel para su comercio ofreciendo un amplio catalogo de productos genericos y personalizados.",
  generator: "Lucio Schiavoni",
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
