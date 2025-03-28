import type React from "react"
import Link from "next/link"
import { ChevronRight, MapPin, Utensils, Hotel, Calendar, Map } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock tourism data
const touristAttractions = [
  {
    id: 1,
    title: "Parque Nacional",
    description: "Disfrute de la naturaleza en nuestro hermoso parque nacional con senderos, lagos y áreas de picnic.",
    image: "/placeholder.svg?height=300&width=500",
    link: "/turismo/parque-nacional",
  },
  {
    id: 2,
    title: "Museo Histórico",
    description:
      "Conozca la historia de General Mosconi a través de exhibiciones interactivas y artefactos históricos.",
    image: "/placeholder.svg?height=300&width=500",
    link: "/turismo/museo-historico",
  },
  {
    id: 3,
    title: "Plaza Central",
    description: "Visite nuestra renovada plaza central, punto de encuentro y corazón de la ciudad.",
    image: "/placeholder.svg?height=300&width=500",
    link: "/turismo/plaza-central",
  },
]

const upcomingEvents = [
  {
    id: 1,
    title: "Festival de la Primavera",
    date: "21 de Septiembre, 2025",
    location: "Plaza Central",
    description: "Música en vivo, gastronomía local y actividades para toda la familia.",
  },
  {
    id: 2,
    title: "Feria de Artesanos",
    date: "15-17 de Octubre, 2025",
    location: "Paseo de los Artesanos",
    description: "Exhibición y venta de artesanías locales, talleres y demostraciones.",
  },
]

export default function TurismoPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Turismo en General Mosconi</h1>
        <p className="text-xl text-muted-foreground">
          Descubra los atractivos turísticos, eventos y servicios que nuestra ciudad tiene para ofrecer
        </p>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-lg overflow-hidden mb-12">
        <div className="absolute inset-0">
          <img
            src="/placeholder.svg?height=600&width=1200"
            alt="Paisaje de General Mosconi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bienvenidos a General Mosconi</h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Una ciudad con encanto natural, rica historia y la calidez de su gente. Descubra todo lo que tenemos para
            ofrecer.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-white/90">
            Explorar <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Tourist Attractions */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Lugares de Interés</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {touristAttractions.map((attraction) => (
            <Card key={attraction.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={attraction.image || "/placeholder.svg"}
                  alt={attraction.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{attraction.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{attraction.description}</p>
              </CardContent>
              <CardFooter>
                <Link href={attraction.link} className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver más <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/turismo/lugares">
            <Button variant="outline">
              Ver todos los lugares <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Events */}
      <section className="mb-12 bg-muted rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Próximos Eventos</h2>
        <div className="space-y-6">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-background rounded-lg p-6 flex flex-col md:flex-row">
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="bg-primary/10 text-primary rounded-lg p-4 text-center inline-block">
                  <Calendar className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-semibold">{event.date}</p>
                </div>
              </div>
              <div className="md:w-3/4">
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p className="text-muted-foreground mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2" /> {event.location}
                </p>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/turismo/eventos">
            <Button>
              Ver calendario completo <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Servicios Turísticos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard
            icon={<Hotel className="h-8 w-8" />}
            title="Alojamientos"
            description="Hoteles, hostales y cabañas para todos los gustos y presupuestos."
            link="/turismo/alojamientos"
          />
          <ServiceCard
            icon={<Utensils className="h-8 w-8" />}
            title="Gastronomía"
            description="Restaurantes, cafeterías y bares con lo mejor de nuestra cocina local."
            link="/turismo/gastronomia"
          />
          <ServiceCard
            icon={<Map className="h-8 w-8" />}
            title="Mapas y Rutas"
            description="Mapas interactivos y rutas sugeridas para explorar nuestra ciudad."
            link="/turismo/mapas"
          />
        </div>
      </section>

      {/* Tourist Information */}
      <section className="bg-primary text-primary-foreground rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-4">Oficina de Información Turística</h2>
            <p className="mb-4">
              Visite nuestra oficina de información turística para obtener mapas, folletos, recomendaciones
              personalizadas y toda la información que necesita para disfrutar de su estadía en General Mosconi.
            </p>
            <div className="space-y-2">
              <p className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" /> Av. Principal 123, Centro
              </p>
              <p>Horario: Lunes a Sábados de 9:00 a 18:00</p>
              <p>Teléfono: (123) 456-7890</p>
              <p>Email: turismo@generalmosconi.gob.ar</p>
            </div>
          </div>
          <div className="md:w-1/3">
            <img src="/placeholder.svg?height=200&width=200" alt="Oficina de Turismo" className="rounded-lg" />
          </div>
        </div>
      </section>
    </div>
  )
}

function ServiceCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={link} className="w-full">
          <Button variant="outline" className="w-full">
            Ver más <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

