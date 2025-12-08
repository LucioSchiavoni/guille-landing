import Header from "@/components/header/header"
import { client } from "@/lib/sanity"
import { menuQuery } from "@/lib/queries"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Phone, Send } from "lucide-react"

export const revalidate = 60

export default async function ContactPage() {
    const categorias = await client.fetch(menuQuery)

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header categorias={categorias} />

            <main className="flex-1 flex flex-col lg:flex-row items-start lg:items-center justify-center py-6 lg:py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Side: Contact Info - Hidden on Mobile */}
                    <div className="hidden lg:flex flex-col justify-center space-y-8 pr-12 border-r border-border/30">
                        <div>
                            <h1 className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/50 mb-4">
                                Ponte en Contacto
                            </h1>
                            <p className="text-xl text-muted-foreground font-light leading-relaxed max-w-md">
                                Estamos aquí para ayudarte a crear experiencias memorables. Cuéntanos tu proyecto o consulta.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Email</p>
                                    <p className="text-lg font-medium">todoenpackaging@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Teléfono</p>
                                    <p className="text-lg font-medium"> +598 99222608</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group">
                                <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Ubicación</p>
                                    <p className="text-lg font-medium">Montevideo, Uruguay</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Form (Centered on Mobile) */}
                    <div className="w-full max-w-md mx-auto lg:mx-0">
                        <div className="bg-background/80 backdrop-blur-3xl border border-white/20 dark:border-white/10 shadow-2xl rounded-3xl p-8 lg:p-10 relative overflow-hidden">
                            {/* Decorative Gradient Blob */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10 space-y-8">
                                <div className="text-center lg:text-left">
                                    <h2 className="text-2xl font-semibold mb-2 lg:hidden">Contáctanos</h2>
                                    <p className="text-muted-foreground text-sm lg:hidden">Envíanos un mensaje y te responderemos pronto.</p>
                                </div>

                                <form className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Nombre</label>
                                        <Input
                                            id="name"
                                            placeholder="Tu nombre completo"
                                            className="bg-muted/20 border-border/50 focus:border-emerald-500 focus:ring-0 rounded-xl h-12 transition-all hover:bg-muted/30"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="tu@email.com"
                                            className="bg-muted/20 border-border/50 focus:border-emerald-500 focus:ring-0 rounded-xl h-12 transition-all hover:bg-muted/30"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground ml-1">Mensaje</label>
                                        <Textarea
                                            id="message"
                                            placeholder="¿En qué podemos ayudarte?"
                                            className="bg-muted/20 border-border/50 focus:border-emerald-500 focus:ring-0 rounded-xl min-h-[140px] resize-none transition-all hover:bg-muted/30"
                                        />
                                    </div>

                                    <Button className="w-full h-12 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold tracking-wide shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                                        <span>Enviar Mensaje</span>
                                        <Send className="w-4 h-4 ml-2" />
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    )
}
