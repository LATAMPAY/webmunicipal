import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Landmark, MapPin, Calendar, Camera } from "lucide-react"

// Datos de ejemplo - En producción vendrían de una API
const hitos = [
  {
    año: 1940,
    titulo: "Fundación",
    descripcion: "Fundación de la ciudad de General Mosconi",
    imagen: "/historia/fundacion.jpg",
  },
  {
    año: 1950,
    titulo: "Primer Gobierno Municipal",
    descripcion: "Establecimiento del primer gobierno municipal",
    imagen: "/historia/gobierno.jpg",
  },
  {
    año: 1960,
    titulo: "Desarrollo Industrial",
    descripcion: "Inicio del desarrollo industrial de la región",
    imagen: "/historia/industria.jpg",
  },
]

const sitiosPatrimoniales = [
  {
    id: 1,
    nombre: "Palacio Municipal",
    descripcion: "Edificio histórico construido en 1945, sede del gobierno municipal",
    direccion: "Av. Principal 123",
    categoria: "Arquitectónico",
    imagenes: ["/patrimonio/palacio1.jpg", "/patrimonio/palacio2.jpg"],
    coordenadas: {
      lat: "-23.123456",
      lng: "-64.123456",
    },
  },
  {
    id: 2,
    nombre: "Plaza Central",
    descripcion: "Plaza histórica inaugurada en 1942, centro de la vida social",
    direccion: "Av. San Martín y Belgrano",
    categoria: "Espacio Público",
    imagenes: ["/patrimonio/plaza1.jpg", "/patrimonio/plaza2.jpg"],
    coordenadas: {
      lat: "-23.123456",
      lng: "-64.123456",
    },
  },
  {
    id: 3,
    nombre: "Iglesia Nuestra Señora del Carmen",
    descripcion: "Templo histórico construido en 1948",
    direccion: "Calle San Martín 456",
    categoria: "Religioso",
    imagenes: ["/patrimonio/iglesia1.jpg", "/patrimonio/iglesia2.jpg"],
    coordenadas: {
      lat: "-23.123456",
      lng: "-64.123456",
    },
  },
]

export default function HistoriaPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden mb-12">
        <div className="relative h-[400px] w-full">
          <Image
            src="/historia/hero.jpg"
            alt="Historia de General Mosconi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl font-bold mb-4">Historia y Patrimonio</h1>
                <p className="text-lg text-white/90">
                  Descubra la rica historia y el valioso patrimonio cultural de General Mosconi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Línea de Tiempo */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Historia de la Ciudad</h2>
        <div className="relative">
          <div className="absolute left-1/2 h-full w-px bg-border -translate-x-1/2" />
          <div className="space-y-12">
            {hitos.map((hito, index) => (
              <div key={hito.año} className={`flex items-center gap-8 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}>
                <div className="flex-1">
                  <Card>
                    <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={hito.imagen}
                        alt={hito.titulo}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{hito.titulo}</CardTitle>
                      <CardDescription>{hito.año}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{hito.descripcion}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-primary-foreground" />
                  </div>
                </div>
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sitios Patrimoniales */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Sitios Patrimoniales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sitiosPatrimoniales.map((sitio) => (
            <Card key={sitio.id} className="group">
              <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={sitio.imagenes[0]}
                  alt={sitio.nombre}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{sitio.nombre}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {sitio.direccion}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{sitio.descripcion}</p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {sitio.categoria}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Información Adicional */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Galería Histórica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Explore nuestra colección de fotografías históricas que documentan el desarrollo
              de la ciudad a través de los años.
            </p>
            <Button variant="outline" className="w-full">
              Ver Galería
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Landmark className="h-5 w-5" />
              Patrimonio Cultural
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Conozca más sobre nuestro patrimonio cultural y las acciones para su preservación.
            </p>
            <Button variant="outline" className="w-full">
              Más Información
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 