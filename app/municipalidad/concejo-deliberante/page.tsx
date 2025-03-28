import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Calendar, Users2 } from "lucide-react"

// Datos de ejemplo - En producción vendrían de una API
const concejales = [
  {
    id: 1,
    nombre: "María González",
    partido: "Frente Renovador",
    cargo: "Presidente del Concejo",
    imagen: "/concejales/maria-gonzalez.jpg",
    periodo: "2023-2027",
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    partido: "Unión Cívica",
    cargo: "Vicepresidente",
    imagen: "/concejales/carlos-rodriguez.jpg",
    periodo: "2023-2027",
  },
  {
    id: 3,
    nombre: "Ana Martínez",
    partido: "Frente Renovador",
    cargo: "Secretaria",
    imagen: "/concejales/ana-martinez.jpg",
    periodo: "2023-2027",
  },
  // Más concejales...
]

const proximasSesiones = [
  {
    fecha: "2024-03-28",
    tipo: "Ordinaria",
    temas: ["Presupuesto 2024", "Obras Públicas", "Ordenanzas Fiscales"],
  },
  {
    fecha: "2024-04-04",
    tipo: "Extraordinaria",
    temas: ["Plan de Desarrollo Urbano", "Emergencia Sanitaria"],
  },
  {
    fecha: "2024-04-11",
    tipo: "Ordinaria",
    temas: ["Rendición de Cuentas", "Proyectos Comunitarios"],
  },
]

export default function ConcejoDeliberantePage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="relative rounded-lg overflow-hidden mb-12">
        <div className="relative h-[300px] w-full">
          <Image
            src="/concejo-deliberante.jpg"
            alt="Concejo Deliberante"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl font-bold mb-4">Concejo Deliberante</h1>
                <p className="text-lg text-white/90">
                  El órgano legislativo de la Municipalidad de General Mosconi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido Principal */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Columna Principal */}
        <div className="lg:col-span-2">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Funciones y Competencias</h2>
            <div className="prose dark:prose-invert max-w-none">
              <p>
                El Concejo Deliberante es el órgano legislativo del gobierno municipal, encargado de 
                sancionar ordenanzas y disposiciones para el funcionamiento de la ciudad. Entre sus 
                principales funciones se encuentran:
              </p>
              <ul>
                <li>Sancionar ordenanzas municipales</li>
                <li>Aprobar el presupuesto municipal</li>
                <li>Establecer impuestos y tasas</li>
                <li>Autorizar convenios y concesiones</li>
                <li>Controlar la gestión del Ejecutivo Municipal</li>
                <li>Regular el desarrollo urbano y el uso del suelo</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Concejales</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {concejales.map((concejal) => (
                <Card key={concejal.id} className="group">
                  <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={concejal.imagen}
                      alt={concejal.nombre}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{concejal.nombre}</CardTitle>
                    <CardDescription>{concejal.cargo}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Partido:</span>
                        <span>{concejal.partido}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Período:</span>
                        <span>{concejal.periodo}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Próximas Sesiones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximas Sesiones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {proximasSesiones.map((sesion, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-medium">
                      {new Date(sesion.fecha).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "long",
                      })}
                    </div>
                    <span className="text-sm text-muted-foreground">{sesion.tipo}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Temas principales:
                    <ul className="list-disc list-inside mt-1">
                      {sesion.temas.map((tema, i) => (
                        <li key={i}>{tema}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Ver calendario completo
              </Button>
            </CardFooter>
          </Card>

          {/* Enlaces Rápidos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Documentos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/municipalidad/normativas">Ordenanzas</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/municipalidad/normativas/resoluciones">Resoluciones</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/transparencia/presupuesto">Presupuesto</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/municipalidad/concejo-deliberante/reglamento">Reglamento Interno</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Contacto */}
          <Card>
            <CardHeader>
              <CardTitle>Información de Contacto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Dirección:</span>
                Av. Principal 123, 1° Piso
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Teléfono:</span>
                (123) 456-7890
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Email:</span>
                concejo@municipalidadmosconi.gob.ar
              </p>
              <p className="flex items-center gap-2">
                <span className="text-muted-foreground">Horario:</span>
                Lunes a Viernes 8:00 - 14:00
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 