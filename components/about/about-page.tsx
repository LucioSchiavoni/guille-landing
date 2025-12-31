"use client"

import type React from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ChefHat, PartyPopper, ShoppingCart, Store, Building2, SprayCan, Check, Leaf, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const industries = [
  {
    icon: ChefHat,
    title: "GASTRONOMÍA",
    subtitle: "Panaderías · Rotiserías · Restaurantes · Bares · Pizzerías",
    description:
      "Bandejas, bolsas, estuches térmicos, papel, cajas y todo tipo de envoltorios y productos de higiene descartables para el trabajo diario.",
  },
  {
    icon: PartyPopper,
    title: "CATERING Y EVENTOS",
    subtitle: "",
    description:
      "Vasos, copas, cubiertos, platos, degustadores y soluciones prácticas para todo tipo de celebraciones y servicios gastronómicos.",
  },
  {
    icon: ShoppingCart,
    title: "SUPERMERCADOS",
    subtitle: "",
    description:
      "Envoltorios para punto de venta, rollos de aluminio y film, bolsas descartables y reutilizables, bolsas de residuos y otros productos de uso doméstico.",
  },
  {
    icon: Store,
    title: "PAPELERÍAS & COMERCIOS",
    subtitle: "",
    description: "Cintas adhesivas, bolsas de papel kraft con asa e insumos de embalaje.",
  },
  {
    icon: Building2,
    title: "ADMINISTRACIÓN DE EDIFICIOS & EMPRESAS",
    subtitle: "",
    description: "Bolsas de residuos profesionales de alta resistencia para uso intensivo. Desarrollo de productos a medida.",
  },
  {
    icon: SprayCan,
    title: "HIGIENE & LIMPIEZA PROFESIONAL",
    subtitle: "",
    description: "Bolsas de residuos, servilletas, rollos en formato industrial de papel higiénico, toallas descartables y otros.",
  },
]

const benefits = [
  {
    title: "Atención personalizada",
    description: "Nos involucramos en tu negocio para brindarte soluciones eficaces.",
  },
  {
    title: "Catálogo amplio y versátil",
    description: "Productos descartables para cada necesidad de tu comercio.",
  },
  {
    title: "Sustentabilidad real",
    description: "Minimizamos la huella ambiental ofreciendo productos eco-friendly.",
  },
  {
    title: "Stock permanente",
    description: "Disponibilidad constante para que nunca te falten productos clave.",
  },
  {
    title: "Envíos sin costo",
    description: "Recibe tu pedido de forma rápida y sin gastos adicionales.",
  },
  {
    title: "Mejores precios por mayor",
    description: "Optimizamos costos para que tu negocio sea más rentable",
  },
  {
    title: "Compromiso en cada entrega",
    description: "Cumplimos plazos y condiciones. Tu pedido llega a tiempo.",
  },
]

export default function AboutPage() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true })

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/nosotros.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-emerald-900/90" />
        <div ref={heroRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 md:mb-8">
              NOSOTROS
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto"
          >
            En Todo en Packaging somos especialistas en envases y soluciones descartables para el comercio y la industria alimenticia, con distribución a todo el país.
            <br />Acompañamos a cada comercio con un catálogo completo de productos convencionales, la gama más amplia de productos eco friendly y una línea de productos de higiene, brindando una solución integral en un solo proveedor.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={heroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-white to-transparent"
        />
      </section>

      {/* Industries Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="mb-12 md:mb-16">
            <h2 className="text-xs md:text-sm font-semibold tracking-widest text-gray-500 uppercase mb-3 md:mb-4">
              Nuestros sectores
            </h2>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 max-w-2xl">
              Soluciones para cada industria
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {industries.map((industry, index) => (
              <AnimatedSection key={industry.title} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: "0 12px 40px -12px rgba(0,0,0,0.15)" }}
                  transition={{ duration: 0.2 }}
                  className="group h-full p-6 md:p-8 bg-white rounded-xl border border-gray-200 hover:border-green-300 transition-colors shadow-sm"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-green-200 transition-colors">
                    <industry.icon className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-gray-900 mb-2">{industry.title}</h3>
                  {industry.subtitle && (
                    <p className="text-xs md:text-sm text-green-600 font-medium mb-2 md:mb-3">{industry.subtitle}</p>
                  )}
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{industry.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Value Proposition Banner */}
      <section className="relative py-16 md:py-24 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/proveedor.png')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/95 via-green-700/90 to-emerald-800/95" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <div className="flex items-center justify-center gap-3 mb-4 md:mb-6">
              <Leaf className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 md:mb-6">
              TODO EN UN SOLO PROVEEDOR
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Somos tu aliado en packaging, garantizando la mejor relación calidad-precio del mercado, para que puedas brindar la mejor experiencia a tus clientes.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-12 md:mb-16 text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              ¿Por qué elegir Todo en Packaging?
            </h2>
            <p className="text-gray-600 text-base md:text-lg">Descubrí las ventajas de trabajar con nosotros</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-6 md:gap-y-8">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.08}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="flex gap-3 md:gap-4 group"
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">{benefit.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{benefit.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      {/* Service Vocation Section */}
      <section className="py-20 md:py-28 px-4 sm:px-6 overflow-hidden relative" style={{ backgroundColor: 'rgb(63, 121, 72)' }}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-64 h-64 rounded-full bg-green-300 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatedSection className="text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 text-white mb-8 shadow-sm border border-white/20 backdrop-blur-sm"
            >
              <Heart className="w-10 h-10 fill-white/10" />
            </motion.div>

            <h2 className="text-sm md:text-base font-bold tracking-[0.2em] text-green-100 uppercase mb-4">
              Nuestro Compromiso
            </h2>

            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-10 leading-tight">
              VOCACIÓN DE SERVICIO
            </h3>

            <div className="relative px-4 md:px-0">
              <p className="text-xl md:text-2xl lg:text-3xl text-white/90 leading-relaxed font-medium">
                "Nos comprometemos a encontrar la <span className="text-white font-bold underline decoration-green-300 underline-offset-4">mejor solución</span> y estamos siempre abiertos a escuchar tus requerimientos en packaging y descartables para que tus productos <span className="text-white font-bold">luzcan mejor</span> y lleguen a tus clientes con la <span className="text-green-50 font-bold">misma calidad</span> siempre."
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
              ¿Listo para comenzar?
            </h2>
            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
              Contactanos y descubrí cómo podemos ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button
                size="lg"
                className="group bg-green-600 hover:bg-green-700 text-white"
                asChild
              >
                <Link href="/productos">
                  Ver Catálogo
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                asChild
              >
                <Link href="/contacto">
                  Contactar
                </Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}
