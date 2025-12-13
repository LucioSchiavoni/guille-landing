import Link from "next/link"
import { Phone, Mail, Clock, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"
import Logo from "@/components/header/logo"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg inline-block">
              <Logo className="h-14 w-40" />
            </div>
            <p className="text-green-100 text-sm leading-relaxed">
              Soluciones de packaging eco-friendly para la industria alimenticia. Productos amigables con el medio ambiente.
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-700 hover:bg-green-600 p-2 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
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
                  <p className="text-sm text-green-200">08:00 - 19:00 hs</p>
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
                href="/preguntas-frecuentes"
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
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white border-b-2 border-green-500 pb-2 inline-block">
              Condiciones
            </h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/metodos-envio"
                className="text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all"
              >
                Métodos de Envío
              </Link>
              <Link
                href="/formas-pago"
                className="text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all"
              >
                Formas de Pago
              </Link>
              <Link
                href="/politicas"
                className="text-sm text-green-100 hover:text-white hover:translate-x-1 transition-all"
              >
                Políticas
              </Link>
            </nav>
            <div className="pt-4 border-t border-green-600">
              <p className="text-xs text-green-200 leading-relaxed">
                Pedidos express (menos de $10.000) en el día. Pedidos programados (más de $20.000) al día siguiente.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-green-600 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-green-200">
              &copy; {new Date().getFullYear()} TodoEnPackaging. Todos los derechos reservados.
            </p>
            <p className="text-sm text-green-200">
              Soluciones eco-friendly para un futuro sostenible
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
