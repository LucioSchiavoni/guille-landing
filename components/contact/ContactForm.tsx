"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

interface ContactInfo {
    icon: string
    label: string
    value: string
    color: string
}

interface ContactFormProps {
    contactInfo: ContactInfo[]
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
} as const

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            stiffness: 100,
            damping: 15,
            duration: 0.6
        }
    }
}

const slideInLeft = {
    hidden: {
        opacity: 0,
        x: -60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 80,
            damping: 20,
            duration: 0.8
        }
    }
}

const slideInRight = {
    hidden: {
        opacity: 0,
        x: 60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring" as const,
            stiffness: 80,
            damping: 20,
            duration: 0.8
        }
    }
}

const formItemVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring" as const,
            stiffness: 120,
            damping: 17
        }
    }
}

const ContactIcon = ({ type }: { type: "mail" | "phone" | "mapPin" }) => {
    if (type === "mail") {
        return (
            <div className="p-3 rounded-full bg-emerald-500/10 group-hover:bg-emerald-500 transition-all duration-300">
                <Mail className="w-6 h-6 text-emerald-500 group-hover:text-white transition-colors duration-300" />
            </div>
        )
    }
    if (type === "phone") {
        return (
            <div className="p-3 rounded-full bg-blue-500/10 group-hover:bg-blue-500 transition-all duration-300">
                <Phone className="w-6 h-6 text-blue-500 group-hover:text-white transition-colors duration-300" />
            </div>
        )
    }
    if (type === "mapPin") {
        return (
            <div className="p-3 rounded-full bg-purple-500/10 group-hover:bg-purple-500 transition-all duration-300">
                <MapPin className="w-6 h-6 text-purple-500 group-hover:text-white transition-colors duration-300" />
            </div>
        )
    }
    return null
}

export default function ContactForm({ contactInfo }: ContactFormProps) {
    return (
        <main className="flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-center py-6 lg:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Decorative Elements - Left Side 🌿 */}
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                <svg width="200" height="400" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 50C80 80 100 150 80 200C60 250 30 280 50 350" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="50" cy="50" r="8" fill="#10b981"/>
                    <circle cx="80" cy="120" r="6" fill="#34d399"/>
                    <circle cx="70" cy="200" r="10" fill="#059669"/>
                    <circle cx="40" cy="280" r="7" fill="#10b981"/>
                    <circle cx="50" cy="350" r="9" fill="#34d399"/>
                    <path d="M20 100C40 110 60 140 50 180" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M30 250C50 240 70 260 60 300" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>

            {/* Decorative Elements - Right Side 🌿 */}
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none">
                <svg width="200" height="400" viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M150 50C120 80 100 150 120 200C140 250 170 280 150 350" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="150" cy="50" r="8" fill="#10b981"/>
                    <circle cx="120" cy="120" r="6" fill="#34d399"/>
                    <circle cx="130" cy="200" r="10" fill="#059669"/>
                    <circle cx="160" cy="280" r="7" fill="#10b981"/>
                    <circle cx="150" cy="350" r="9" fill="#34d399"/>
                    <path d="M180 100C160 110 140 140 150 180" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M170 250C150 240 130 260 140 300" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            </div>

            <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* Left Side: Contact Info - Hidden on Mobile ✨ */}
                <motion.div
                    className="hidden lg:flex flex-col justify-center items-center text-center space-y-8 pl-20 pr-8"
                    initial="hidden"
                    animate="visible"
                    variants={slideInLeft}
                >
                    <motion.div variants={itemVariants} className="flex flex-col items-center">
                        <motion.h1
                            className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 mb-4"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                        >
                            Ponte en Contacto
                        </motion.h1>
                        <motion.p
                            className="text-xl text-muted-foreground font-light leading-relaxed max-w-lg"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            Estamos aquí para ayudarte a crear experiencias memorables. Cuéntanos tu proyecto o consulta. 💬
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="space-y-6 flex flex-col items-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {contactInfo.map((info) => (
                            <motion.div
                                key={info.label}
                                className="flex items-center gap-4 group cursor-pointer w-full max-w-xs"
                                variants={itemVariants}
                                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <ContactIcon type={info.icon as "mail" | "phone" | "mapPin"} />
                                </motion.div>
                                <div className="text-left">
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{info.label}</p>
                                    <p className="text-lg font-medium">{info.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Side: Form (Centered on Mobile) 📝 */}
                <motion.div
                    className="w-full max-w-md mx-auto lg:mx-0"
                    initial="hidden"
                    animate="visible"
                    variants={slideInRight}
                >
                    <motion.div
                        className="bg-background/80 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-8 lg:p-10 relative overflow-hidden"
                        whileHover={{
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                            transition: { duration: 0.3 }
                        }}
                    >
                        {/* Decorative Gradient Blob ✨ */}
                        <motion.div
                            className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.2, 0.3]
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />

                        <div className="relative z-10 space-y-8">
                            <motion.div
                                className="text-center lg:text-left"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <h2 className="text-2xl font-semibold mb-2 lg:hidden">Contáctanos 📩</h2>
                                <p className="text-muted-foreground text-sm lg:hidden">Envíanos un mensaje y te responderemos pronto. ⚡</p>
                            </motion.div>

                            <motion.form
                                className="space-y-6"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                <motion.div className="space-y-2" variants={formItemVariants}>
                                    <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Nombre 👤</label>
                                    <Input
                                        id="name"
                                        placeholder="Tu nombre completo"
                                        className="bg-muted/20 border-border/50 focus:border-emerald-500 focus:ring-0 rounded-xl h-12 transition-all hover:bg-muted/30"
                                    />
                                </motion.div>

                                <motion.div className="space-y-2" variants={formItemVariants}>
                                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Email ✉️</label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="bg-muted/20 border-border/50 focus:border-emerald-500 focus:ring-0 rounded-xl h-12 transition-all hover:bg-muted/30"
                                    />
                                </motion.div>

                                <motion.div className="space-y-2" variants={formItemVariants}>
                                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Mensaje 💬</label>
                                    <Textarea
                                        id="message"
                                        placeholder="¿En qué podemos ayudarte?"
                                        className="bg-muted/20 border-border/50 focus:border-emerald-500 focus:ring-0 rounded-xl min-h-[140px] resize-none transition-all hover:bg-muted/30"
                                    />
                                </motion.div>

                                <motion.div variants={formItemVariants}>
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Button className="w-full h-12 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold tracking-wide shadow-lg transition-all">
                                            <span>Enviar Mensaje</span>
                                            <Send className="w-4 h-4 ml-2" />
                                        </Button>
                                    </motion.div>
                                </motion.div>
                            </motion.form>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </main>
    )
}
