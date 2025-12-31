"use client"

import Link from "next/link"
import { Phone, Mail, Clock, Check, Instagram, Facebook, Linkedin } from "lucide-react"
import Logo from "@/components/header/logo"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Footer() {
  const [emailCopied, setEmailCopied] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText("luciosc1798@gmail.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <footer className="text-white mt-16" style={{ backgroundColor: 'rgb(63, 121, 72)' }}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div
              className="flex items-center gap-3 relative h-18 px-6 rounded-lg overflow-hidden group cursor-pointer"
              style={{
                backgroundImage: `url('/header-mobile.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Link
                href="/"
                onClick={handleLogoClick}
                className="absolute inset-0 z-10"
                aria-label="Ir al inicio"
              />
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Soluciones de packaging para la industria alimenticia y servicios en general.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b-2 border-green-500 pb-2 inline-block">
              Contacto
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-green-300 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-100">Horario de atención</p>
                  <p className="text-sm text-green-200">Lunes a Viernes</p>
                  <p className="text-sm text-green-200">08:00 - 18:00 hs</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-green-300 flex-shrink-0" />
                <a
                  href="tel:099222608"
                  className="text-sm text-green-100 hover:text-white transition-colors"
                >
                  099 222 608
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-green-300 flex-shrink-0" />
                <a
                  href="mailto:todoenpackaging@gmail.com"
                  className="text-sm text-green-100 hover:text-white transition-colors break-all"
                >
                  todoenpackaging@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b-2 border-green-500 pb-2 inline-block">
              Enlaces
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/nosotros"
                className="text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all"
              >
                Nosotros
              </Link>
              <Link
                href="/contacto"
                className="text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all"
              >
                Contacto
              </Link>
              <Link
                href="/#preguntas-frecuentes"
                className="text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all"
              >
                Preguntas Frecuentes
              </Link>
              <Link
                href="/productos"
                className="text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all"
              >
                Productos
              </Link>
              <Link
                href="/sostenibilidad"
                className="text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all"
              >
                Sostenibilidad
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b-2 border-green-500 pb-2 inline-block">
              Síguenos
            </h3>
            <div className="flex flex-col space-y-3">
              <a
                href="https://www.instagram.com/todoenpackaging.uy?utm_source=qr&igsh=dGpmeGc4MXl2ZnB6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all group"
              >
                <Instagram className="h-5 w-5 text-green-300" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.facebook.com/share/1EiUDf5JHj/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all group"
              >
                <Facebook className="h-5 w-5 text-green-300" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.linkedin.com/in/todo-en-packaging-tep-9346a832b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all group"
              >
                <Linkedin className="h-5 w-5 text-green-300" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-green-600 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-green-200">
              &copy; {new Date().getFullYear()} TodoEnPackaging. Todos los derechos reservados.
            </p>
            <div className="flex flex-col items-center md:items-end gap-1">
              <p className="text-xs text-green-300">
                Desarrollado por Lucio Schiavoni
              </p>
              <div className="flex items-center gap-3 text-xs text-green-200">
                <div className="relative">
                  <button
                    onClick={handleCopyEmail}
                    className="hover:text-white transition-colors flex items-center gap-1 group relative"
                  >
                    {emailCopied ? (
                      <Check className="h-3 w-3 text-green-300" />
                    ) : (
                      <Mail className="h-3 w-3" />
                    )}
                    <span className={cn("transition-colors", emailCopied && "text-green-300")}>
                      luciosc1798@gmail.com
                    </span>

                    <span className={cn(
                      "absolute -top-8 left-1/2 -translate-x-1/2 bg-green-900 text-white text-[10px] px-2 py-1 rounded shadow-lg transition-all duration-300 whitespace-nowrap border border-green-700",
                      emailCopied ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
                    )}>
                      ¡Email copiado!
                    </span>
                  </button>
                </div>
                <span className="text-green-400">•</span>
                <a
                  href="https://wa.me/59899140770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  099 140 770
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
