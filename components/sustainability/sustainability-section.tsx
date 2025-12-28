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
      className="relative py-20 px-4 overflow-hidden bg-transparent"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-green-400 via-emerald-500 to-green-600">
              Compromiso con el Futuro Sostenible
            </span>
          </h2>
          <p className="text-xl text-gray-950 max-w-4xl mx-auto leading-relaxed font-bold drop-shadow-sm">
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
            <div className="bg-white/40 border border-white/50 backdrop-blur-[80px] p-8 rounded-[2rem] shadow-[0_25px_50px_rgba(0,0,0,0.2)] hover:border-green-500/50 transition-all duration-500">
              <h3 className="text-2xl font-black text-green-700 mb-6 flex items-center gap-3">
                <div className="w-2.5 h-10 bg-linear-to-b from-green-600 to-emerald-800 rounded-full shadow-[0_0_15px_rgba(5,150,105,0.4)]" />
                Nuestro Enfoque
              </h3>
              <p className="text-gray-950 text-xl leading-relaxed mb-6 font-bold">
                Nos enfocamos en promover productos amigables con el medio ambiente, que contribuyen a minimizar la huella ambiental, cuidando los recursos naturales y reduciendo desperdicios.
              </p>
              <p className="text-gray-900 leading-relaxed italic font-semibold">
                Ofrecemos un catálogo amplio con diseños que permiten adaptarse a cada necesidad. Son productos a base de pulpa de papel, bagazo de caña, fibra de bambú o cartón; resistentes a la grasa y la humedad además de los ya tradicionales.
              </p>
            </div>

            <div className="bg-linear-to-br from-green-700/80 to-emerald-900/80 backdrop-blur-3xl p-8 rounded-[2rem] shadow-2xl text-white border border-white/20 transform hover:scale-[1.02] transition-transform duration-300">
              <h3 className="text-2xl font-black mb-4 drop-shadow-md">Nuestra Visión</h3>
              <p className="text-lg leading-relaxed font-bold">
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
                    "bg-white/40 backdrop-blur-[100px] p-6 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.15)] transition-all duration-500 hover:-translate-y-4 border border-white/60",
                    "group cursor-default hover:border-green-600 hover:bg-white/50"
                  )}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                  }}
                >
                  <div className="bg-linear-to-br from-green-600 to-emerald-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-5 group-hover:rotate-12 transition-all duration-300 shadow-[0_0_20px_rgba(5,150,105,0.3)]">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="font-extrabold text-gray-950 mb-3 text-xl group-hover:text-green-700 transition-colors">
                    {benefit.title}
                  </h4>
                  <p className="text-base text-gray-900 leading-relaxed font-bold">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={cn(
            "bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 delay-500",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-black text-green-700 mb-4">
                Certificaciones Eco-Friendly
              </h3>
              <p className="text-gray-950 text-xl leading-relaxed font-bold">
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
