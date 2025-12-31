"use client"

import { useEffect, useRef, useState } from "react"
import { HelpCircle, Check } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "¿Hacen envíos al interior?",
    answer: "Sí, realizamos envíos al interior del país previa coordinación de montos mínimos y plazos de entrega.",
  },
  {
    question: "¿Venden por Mercado Libre?",
    answer: "No, nuestro catálogo está disponible por web y realizamos ventas directas por WhatsApp para brindarte una atención más personalizada.",
  },
  {
    question: "¿Venden artículos fraccionados?",
    answer: "Sí, en su mayoría vendemos productos fraccionados. Puedes consultar por las cantidades específicas que necesitas.",
  },
  {
    question: "¿Hacen precio por cantidad?",
    answer: "Sí, ofrecemos precios especiales por compras en cantidad, especialmente en fundas o cajas cerradas. Te recomendamos consultar para obtener la mejor cotización.",
  },
  {
    question: "¿Hacen boleta con RUT?",
    answer: "Sí, emitimos facturas con RUT sin ningún problema.",
  },
  {
    question: "¿Cuáles son los métodos de envío?",
    answer: "Ofrecemos dos modalidades: Pedidos EXPRESS (menos de $10.000) en el día, y Pedidos PROGRAMADOS (más de $20.000) al día siguiente.",
  },
  {
    question: "¿Cómo son las formas de pago?",
    answer: "Preferentemente aceptamos transferencia bancaria, también efectivo en mano. Enviamos la factura por WhatsApp una vez confirmado el pago.",
  },
  {
    question: "¿Aceptan devoluciones?",
    answer: "Sí, aceptamos devoluciones siempre que los productos mantengan la misma calidad de entrega.",
  },
]

export default function FAQSection() {
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
      id="preguntas-frecuentes"
      className="py-16 px-4 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto max-w-4xl">
        <div
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="h-4 w-4" />
            Preguntas Frecuentes
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            ¿Tienes dudas?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos y servicios
          </p>
        </div>

        <div
          className={cn(
            "bg-white rounded-2xl shadow-lg p-6 md:p-8 transition-all duration-700 delay-200",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className={cn(
                  "transition-all duration-500",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                )}
                style={{
                  transitionDelay: `${300 + index * 100}ms`,
                }}
              >
                <AccordionTrigger className="text-left hover:text-green-600 transition-colors">
                  <span className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="font-semibold">{faq.question}</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pl-8 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div
          className={cn(
            "mt-8 text-center transition-all duration-700 delay-500",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          )}
        >
          <p className="text-gray-600 mb-4">
            ¿No encontraste lo que buscabas?
          </p>
          <a
            href="/contacto"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Contáctanos
          </a>
        </div>
      </div>
    </section>
  )
}
