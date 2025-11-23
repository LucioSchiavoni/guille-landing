import Header from "@/components/header/header"
import HeroCarousel from "@/components/carousel/hero-carousel"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroCarousel />
    </div>
  )
}
