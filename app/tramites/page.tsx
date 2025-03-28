import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Car,
  Store,
  Construction,
  Home,
  FileText,
  UserCheck,
  Building,
  Trees,
  Dog,
  Truck,
  Scale,
  BadgeCheck,
} from "lucide-react"

const tramites = [
  {
    title: "Licencia de Conducir",
    description: "Gestione su licencia de conducir, renovación o primera vez",
    icon: Car,
    href: "/tramites/licencia",
    color: "text-blue-500",
  },
  {
    title: "Habilitaciones Comerciales",
    description: "Trámites para habilitar su comercio o empresa",
    icon: Store,
    href: "/tramites/habilitaciones",
    color: "text-green-500",
  },
  {
    title: "Permisos de Obra",
    description: "Solicite permisos para construcción y reformas",
    icon: Construction,
    href: "/tramites/obras",
    color: "text-orange-500",
  },
  {
    title: "Catastro y Tierras",
    description: "Gestiones relacionadas con propiedades y terrenos",
    icon: Home,
    href: "/tramites/catastro",
    color: "text-purple-500",
  },
  {
    title: "Certificados y Documentos",
    description: "Solicite documentación oficial municipal",
    icon: FileText,
    href: "/tramites/certificados",
    color: "text-red-500",
  },
  {
    title: "Registro Civil",
    description: "Trámites de nacimiento, matrimonio y más",
    icon: UserCheck,
    href: "/tramites/registro-civil",
    color: "text-cyan-500",
  },
  {
    title: "Servicios de Cementerio",
    description: "Gestiones relacionadas con el cementerio municipal",
    icon: Building,
    href: "/tramites/cementerio",
    color: "text-gray-500",
  },
  {
    title: "Medio Ambiente",
    description: "Permisos y trámites ambientales",
    icon: Trees,
    href: "/tramites/medio-ambiente",
    color: "text-emerald-500",
  },
  {
    title: "Registro de Mascotas",
    description: "Registre y obtenga licencias para mascotas",
    icon: Dog,
    href: "/tramites/mascotas",
    color: "text-amber-600",
  },
  {
    title: "Transporte Público",
    description: "Permisos y habilitaciones de transporte",
    icon: Truck,
    href: "/tramites/transporte",
    color: "text-indigo-500",
  },
  {
    title: "Bromatología",
    description: "Habilitaciones sanitarias y control de alimentos",
    icon: Scale,
    href: "/tramites/bromatologia",
    color: "text-teal-500",
  },
  {
    title: "Verificación de Documentos",
    description: "Valide documentos municipales",
    icon: BadgeCheck,
    href: "/tramites/verificacion",
    color: "text-green-600",
  },
]

export default function TramitesPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Trámites Municipales</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Realice sus trámites municipales de manera fácil y rápida. Encuentre toda la información necesaria para cada gestión.
        </p>
      </section>

      {/* Grid de Trámites */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tramites.map((tramite) => {
            const Icon = tramite.icon
            return (
              <Card key={tramite.href} className="group hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`${tramite.color} mb-4`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <CardTitle>{tramite.title}</CardTitle>
                  <CardDescription>{tramite.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={tramite.href}>Iniciar Trámite</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Sección de Ayuda */}
      <section className="mt-12 bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">¿Necesita ayuda?</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Guía de Trámites</h3>
            <p className="text-muted-foreground mb-4">
              Consulte nuestra guía completa de trámites para conocer los requisitos y documentación necesaria.
            </p>
            <Button asChild variant="outline">
              <Link href="/tramites/guia">Ver Guía de Trámites</Link>
            </Button>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Atención al Ciudadano</h3>
            <p className="text-muted-foreground mb-4">
              ¿Tiene dudas? Nuestro equipo de atención al ciudadano está para ayudarle.
            </p>
            <Button asChild>
              <Link href="/municipalidad/contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
} 