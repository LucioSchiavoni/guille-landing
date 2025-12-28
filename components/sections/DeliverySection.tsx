"use client"

import { useEffect, useRef, useState } from "react"
import { Clock, MapPin, CheckCircle2, Package } from "lucide-react"
import { LazyImage } from "@/components/ui/lazy-image"
import { cn } from "@/lib/utils"

const deliveryOptions = [
  {
    image: "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=600&fit=crop",
    type: "Express",
    title: "Entrega el mismo día",
    description: "Para pedidos menores a $10.000",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    accentColor: "text-orange-600",
    features: [
      "Confirmación inmediata",
      "Entrega en el día",
      "Seguimiento en tiempo real"
    ]
  },
  {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",
    type: "Programado",
    title: "Entrega al día siguiente",
    description: "Para pedidos mayores a $20.000",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    accentColor: "text-green-600",
    features: [
      "Programación flexible",
      "Coordinación de horarios",
      "Entrega garantizada"
    ]
  }
]

export default function DeliverySection() {
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
      ref={sectionRef}
      className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Package className="h-4 w-4" />
            Servicio de Entregas
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Recibe tu pedido cuando lo necesites
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dos modalidades de entrega pensadas para adaptarse a tus necesidades
          </p>
        </div>

        {/* Delivery Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {deliveryOptions.map((option, index) => {
            return (
              <div
                key={option.type}
                className={cn(
                  "bg-white rounded-2xl overflow-hidden border-2 transition-all duration-700 hover:shadow-2xl hover:-translate-y-2",
                  option.borderColor,
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                )}
                style={{
                  transitionDelay: `${200 + index * 150}ms`,
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <LazyImage
                    src={option.image}
                    alt={option.type}
                    fill
                    className="object-cover"
                    containerClassName="w-full h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-6">
                    <span className="text-3xl font-black text-white drop-shadow-lg">
                      {option.type}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className={cn("rounded-xl p-4 mb-6", option.bgColor)}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 font-medium">
                      {option.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle2 className={cn("h-5 w-5 flex-shrink-0", option.accentColor)} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div
          className={cn(
            "bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white shadow-xl transition-all duration-700 delay-500",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Cobertura</h4>
                <p className="text-green-100 text-sm">
                  Montevideo y envíos al interior del país
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Horarios</h4>
                <p className="text-green-100 text-sm">
                  Lunes a Viernes de 08:00 a 18:00 hs
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Coordinación</h4>
                <p className="text-green-100 text-sm">
                  Consulta por montos mínimos y plazos de entrega al interior
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
