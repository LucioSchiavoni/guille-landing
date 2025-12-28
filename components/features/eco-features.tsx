"use client"

import { Leaf, Recycle, Shield, Package, Heart, Star } from "lucide-react"
import { LazyImg } from "@/components/ui/lazy-image"

const features = [
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Productos a base de pulpa de papel, bagazo de caña, fibra de bambú o cartón",
  },
  {
    icon: Recycle,
    title: "Sostenible",
    description: "Minimizamos la huella ambiental cuidando los recursos naturales",
  },
  {
    icon: Shield,
    title: "Alta Calidad",
    description: "Resistentes a la grasa y la humedad, ideales para alimentos",
  },
  {
    icon: Package,
    title: "Catálogo Amplio",
    description: "Diseños adaptables a cada necesidad de tu comercio",
  },
  {
    icon: Heart,
    title: "Atención Personalizada",
    description: "Nos involucramos para dar soluciones eficaces",
  },
  {
    icon: Star,
    title: "Compromiso Verde",
    description: "Visión de un futuro más verde y consciente",
  },
]

export default function EcoFeatures() {
  return (
    <section className="py-10 md:py-16 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-green-900 mb-3 md:mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-base md:text-lg text-green-700 max-w-3xl mx-auto px-2">
            Somos una empresa que mantiene el compromiso de ofrecer soluciones de packaging
            eco-friendly para la industria alimenticia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white p-5 md:p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500"
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 md:p-3 rounded-lg group-hover:scale-110 transition-transform duration-300 shrink-0">
                    <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-green-900 mb-1 md:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-10 md:mt-16 rounded-2xl p-6 md:p-12 text-black shadow-xl bg-white/50 backdrop-blur-sm">
          <div className="text-center space-y-4">
            <h3 className="text-xl md:text-3xl font-bold">
              Impacto Positivo Sostenible
            </h3>
            <p className="text-black text-sm md:text-base max-w-4xl mx-auto leading-relaxed">
              Este compromiso refleja la visión de un futuro más verde y consciente,
              destacando la importancia de crear un impacto positivo sostenible en la
              cadena de valor del packaging. Ofrecemos productos que son eco-eficientes:
              amigables con el planeta y el bolsillo.
            </p>
            <div className="pt-4">
              <img
                src="https://cdn.ajoverdarnel.com/storage/app/media/Sostenibilidad/naturals-logos.png"
                alt="Certificaciones Eco-Friendly"
                className="max-w-full md:max-w-md mx-auto h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
