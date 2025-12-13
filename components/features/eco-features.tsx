import { Leaf, Recycle, Shield, Package, Heart, Star } from "lucide-react"

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
    <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">
            ¿Por qué elegirnos?
          </h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Somos una empresa que mantiene el compromiso de ofrecer soluciones de packaging
            eco-friendly para la industria alimenticia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="group bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-500"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-900 mb-2">
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

        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-12 text-white shadow-xl">
          <div className="text-center space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              Impacto Positivo Sostenible
            </h3>
            <p className="text-green-100 max-w-4xl mx-auto leading-relaxed">
              Este compromiso refleja la visión de un futuro más verde y consciente,
              destacando la importancia de crear un impacto positivo sostenible en la
              cadena de valor del packaging. Ofrecemos productos que son eco-eficientes:
              amigables con el planeta y el bolsillo.
            </p>
            <div className="pt-4">
              <img
                src="https://cdn.ajoverdarnel.com/storage/app/media/Sostenibilidad/naturals-logos.png"
                alt="Certificaciones Eco-Friendly"
                className="max-w-md mx-auto h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
