"use client"

import { motion } from "framer-motion"
import { Leaf, Recycle, HeartHandshake, Globe } from "lucide-react"

const paragraphs = [
    {
        text: "Somos una empresa que mantiene el compromiso de ofrecer soluciones de packaging eco-friendly para la industria alimenticia.",
        color: "text-black"
    },
    {
        text: "Nos enfocamos en promover productos amigables con el medio ambiente, que contribuyen a minimizar la huella ambiental, cuidando los recursos naturales y reduciendo desperdicios.",
        color: "text-black"
    },
    {
        text: "Ofrecemos un catálogo amplio con diseños que permiten adaptarse a cada necesidad. Son productos a base de pulpa de papel, bagazo de caña, fibra de bamboo o cartón; resistentes a la grasa y la humedad además de los ya tradicionales.",
        color: "text-black"
    },
    {
        text: "Este compromiso refleja la visión de un futuro más verde y consciente, destacando la importancia de crear un impacto positivo sostenible en la cadena de valor del packaging.",
        color: "text-black"
    }
]

export default function AboutSection() {
    return (
        <div className="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="space-y-20">
                {paragraphs.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        className="flex flex-col items-center text-center"
                    >
                        <p className={`text-xl md:text-3xl font-serif leading-relaxed tracking-wide ${item.color} font-medium`}>
                            {item.text}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Background decoration elements */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-700/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-900/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
    )
}
