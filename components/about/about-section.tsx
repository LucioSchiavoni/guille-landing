"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutSection() {
    return (
        <div className="relative bg-gradient-to-b from-white via-green-50/30 to-white py-12 md:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 md:mb-20"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-gray-900 mb-4 md:mb-6">
                        Nuestra Historia
                    </h1>
                    <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full" />
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-start mb-12 md:mb-20">
                    {/* Left Column - Large Statement */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6 md:space-y-8"
                    >
                        <div className="relative">
                            <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-1.5 md:w-2 bg-gradient-to-b from-green-600 to-emerald-600 rounded-full" />
                            <p className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight pl-4 md:pl-6">
                                Somos una empresa que mantiene el compromiso de ofrecer soluciones de packaging eco-friendly para la industria alimenticia.
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg border border-green-100">
                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                Nos enfocamos en promover productos amigables con el medio ambiente, que contribuyen a minimizar la huella ambiental, cuidando los recursos naturales y reduciendo desperdicios.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Column - Image and Details */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-6 md:space-y-8"
                    >
                        <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20 z-10" />
                            <img
                                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2070"
                                alt="Packaging sustentable"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 md:p-8 rounded-2xl shadow-xl text-white">
                            <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4">Nuestros Productos</h3>
                            <p className="text-sm md:text-lg leading-relaxed opacity-95">
                                Ofrecemos un catálogo amplio con diseños que permiten adaptarse a cada necesidad. Son productos a base de pulpa de papel, bagazo de caña, fibra de bambú o cartón; resistentes a la grasa y la humedad además de los ya tradicionales.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative"
                >
                    <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-12 lg:p-16 border border-green-100">
                        <div className="max-w-4xl mx-auto text-center space-y-6">
                            <div className="inline-block">
                                <div className="flex items-center gap-3 mb-2 md:mb-4">
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-600 to-transparent" />
                                    <span className="text-xs md:text-sm font-bold text-green-600 uppercase tracking-widest">Nuestra Visión</span>
                                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-green-600 to-transparent" />
                                </div>
                            </div>

                            <p className="text-lg md:text-2xl lg:text-3xl font-semibold text-gray-900 leading-relaxed">
                                Este compromiso refleja la visión de un futuro más verde y consciente, destacando la importancia de crear un impacto positivo sostenible en la cadena de valor del packaging.
                            </p>

                            {/* Stats or highlights */}
                            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 pt-8 md:pt-12 border-t border-gray-200">
                                <div>
                                    <div className="text-2xl md:text-4xl font-bold text-green-600 mb-1 md:mb-2">100%</div>
                                    <div className="text-xs md:text-sm text-gray-600 font-medium">Eco-Friendly</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-4xl font-bold text-green-600 mb-1 md:mb-2">+500</div>
                                    <div className="text-xs md:text-sm text-gray-600 font-medium">Productos</div>
                                </div>
                                <div>
                                    <div className="text-2xl md:text-4xl font-bold text-green-600 mb-1 md:mb-2">24/7</div>
                                    <div className="text-xs md:text-sm text-gray-600 font-medium">Compromiso</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-200/50 rounded-full blur-3xl -z-10" />
                    <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-200/50 rounded-full blur-3xl -z-10" />
                </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-green-100/30 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />
            </div>
        </div>
    )
}
