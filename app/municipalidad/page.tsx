import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users2, Building2, FileText, History, Phone, BookOpen } from "lucide-react"

const sections = [
  {
    title: "El Intendente",
    description: "Conozca a nuestro intendente y su gestión",
    icon: Building2,
    href: "/municipalidad/intendente",
    color: "text-blue-500",
  },
  {
    title: "Concejo Deliberante",
    description: "Información sobre el cuerpo legislativo municipal",
    icon: Users2,
    href: "/municipalidad/concejo-deliberante",
    color: "text-green-500",
  },
  {
    title: "Organigrama",
    description: "Estructura organizativa del municipio",
    icon: Users2,
    href: "/municipalidad/organigrama",
    color: "text-purple-500",
  },
  {
    title: "Normativas",
    description: "Ordenanzas, resoluciones y decretos",
    icon: FileText,
    href: "/municipalidad/normativas",
    color: "text-orange-500",
  },
  {
    title: "Historia y Patrimonio",
    description: "Conoce la historia de General Mosconi",
    icon: History,
    href: "/municipalidad/historia",
    color: "text-red-500",
  },
  {
    title: "Contacto",
    description: "Información de contacto y ubicación",
    icon: Phone,
    href: "/municipalidad/contacto",
    color: "text-teal-500",
  },
]

export default function MunicipalidadPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden mb-12">
        <div className="relative h-[300px] w-full">
          <Image
            src="/municipalidad-hero.jpg"
            alt="Municipalidad de General Mosconi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl font-bold mb-4">Municipalidad de General Mosconi</h1>
                <p className="text-lg text-white/90">
                  Trabajamos por una ciudad más moderna, inclusiva y sustentable para todos los ciudadanos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Secciones */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <Card key={section.href} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`${section.color} mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={section.href}>Ver más</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Información Adicional */}
      <section className="mt-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Últimas Normativas</h2>
            <div className="space-y-4">
              {/* Aquí irían las últimas normativas - Ejemplo estático */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ordenanza N° 123/2024</CardTitle>
                  <CardDescription>Publicada el 26 de marzo de 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Regulación del uso de espacios públicos para eventos culturales.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/municipalidad/normativas/123-2024">Ver detalle</Link>
                  </Button>
                </CardFooter>
              </Card>
              {/* Más normativas... */}
            </div>
            <div className="mt-4">
              <Button variant="outline" asChild>
                <Link href="/municipalidad/normativas">Ver todas las normativas</Link>
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Información Útil</h2>
            <Card>
              <CardHeader>
                <CardTitle>Horarios de Atención</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lunes a Viernes</span>
                  <span>8:00 - 16:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sábados</span>
                  <span>9:00 - 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Domingos y Feriados</span>
                  <span>Cerrado</span>
                </div>
                <div className="pt-4">
                  <h4 className="font-semibold mb-2">Teléfonos Importantes</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Central</span>
                      <span>(123) 456-7890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emergencias</span>
                      <span>911</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Defensa Civil</span>
                      <span>(123) 456-7891</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

