import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="relative">
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/placeholder.svg?height=800&width=1600')",
            filter: "brightness(0.7)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Municipalidad de General Mosconi</h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl">
          Trabajando juntos por una ciudad mejor para todos
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/servicios">
            <Button size="lg" className="text-lg px-8">
              Servicios Municipales
            </Button>
          </Link>
          <Link href="/municipalidad/contacto">
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 bg-background/20 text-white hover:bg-background/30 hover:text-white"
            >
              Contacto
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

