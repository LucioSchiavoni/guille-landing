"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Leaf, Recycle, Trees, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Productos a base de pulpa de papel, bagazo de caña y fibra de bambú",
  },
  {
    icon: Recycle,
    title: "Reducción de Residuos",
    description: "Contribuimos a minimizar desperdicios y la huella ambiental",
  },
  {
    icon: Trees,
    title: "Recursos Naturales",
    description: "Cuidamos los recursos naturales para las futuras generaciones",
  },
  {
    icon: Heart,
    title: "Compromiso Verde",
    description: "Impacto positivo sostenible en la cadena de valor del packaging",
  },
]

export default function SustainabilitySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      id="sostenibilidad"
      ref={sectionRef}
      className="relative py-20 px-4 overflow-hidden bg-white"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gray-200 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto relative z-10">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            Compromiso con el
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 pb-2">
              Futuro Sostenible
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Somos una empresa que mantiene el compromiso de ofrecer soluciones de packaging eco-friendly para la industria alimenticia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className={cn(
              "space-y-6 transition-all duration-700 delay-200",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            )}
          >
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-green-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full" />
                Nuestro Enfoque
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Nos enfocamos en promover productos amigables con el medio ambiente, que contribuyen a minimizar la huella ambiental, cuidando los recursos naturales y reduciendo desperdicios.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Ofrecemos un catálogo amplio con diseños que permiten adaptarse a cada necesidad. Son productos a base de pulpa de papel, bagazo de caña, fibra de bambú o cartón; resistentes a la grasa y la humedad además de los ya tradicionales.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
              <p className="leading-relaxed opacity-95">
                Este compromiso refleja la visión de un futuro más verde y consciente, destacando la importancia de crear un impacto positivo sostenible en la cadena de valor del packaging.
              </p>
            </div>
          </div>

          <div
            className={cn(
              "grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 delay-300",
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            )}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div
                  key={index}
                  className={cn(
                    "bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-green-50",
                    "group cursor-default"
                  )}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="h-7 w-7 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2 text-lg">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={cn(
            "bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl transition-all duration-700 delay-500",
            isVisible
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95"
          )}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Certificaciones Eco-Friendly
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nuestros productos cumplen con los más altos estándares de calidad ambiental, respaldados por certificaciones internacionales que garantizan su compromiso con el planeta.
              </p>
            </div>
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-xl shadow-lg">
                <img
                  src="https://cdn.ajoverdarnel.com/storage/app/media/Sostenibilidad/naturals-logos.png"
                  alt="Certificaciones Eco-Friendly"
                  className="max-w-[300px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
