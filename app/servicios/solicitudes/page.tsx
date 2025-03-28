import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wrench, MapPin, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

const serviciosDisponibles = [
  {
    categoria: "Mantenimiento Urbano",
    servicios: [
      "Reparación de baches",
      "Mantenimiento de espacios verdes",
      "Limpieza de calles",
      "Reparación de alumbrado público",
      "Poda de árboles",
    ]
  },
  {
    categoria: "Servicios Públicos",
    servicios: [
      "Recolección de residuos",
      "Limpieza de desagües",
      "Fumigación y control de plagas",
      "Mantenimiento de plazas",
    ]
  },
  {
    categoria: "Infraestructura",
    servicios: [
      "Reparación de veredas",
      "Señalización vial",
      "Mantenimiento de edificios públicos",
      "Reparación de semáforos",
    ]
  }
]

export default function SolicitudesPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-green-100 dark:bg-green-900 mb-4">
          <Wrench className="h-12 w-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Solicitud de Servicios</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Solicite servicios municipales para su barrio o domicilio y realice un seguimiento de su solicitud.
        </p>
      </section>

      {/* Servicios Disponibles */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Servicios Disponibles</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {serviciosDisponibles.map((categoria) => (
            <Card key={categoria.categoria}>
              <CardHeader>
                <CardTitle>{categoria.categoria}</CardTitle>
                <CardDescription>
                  Seleccione el servicio que necesita solicitar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {categoria.servicios.map((servicio) => (
                    <li key={servicio} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <Link 
                        href={`/servicios/solicitudes/nueva?tipo=${encodeURIComponent(servicio)}`}
                        className="hover:text-green-500 transition-colors"
                      >
                        {servicio}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Mapa de Servicios */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-500" />
              Mapa de Servicios
            </CardTitle>
            <CardDescription>
              Visualice las solicitudes activas en su zona
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Mapa interactivo de servicios</p>
            </div>
            <div className="mt-4 flex justify-end">
              <Button variant="outline">Ver mapa completo</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Estado de Solicitudes */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              Mis Solicitudes
            </CardTitle>
            <CardDescription>
              Consulte el estado de sus solicitudes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/servicios/solicitudes/historial">
                Ver mis solicitudes
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Información Importante */}
      <section className="bg-muted rounded-lg p-8">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Información Importante</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>Las solicitudes son procesadas en orden de prioridad</li>
              <li>El tiempo de respuesta varía según el tipo de servicio</li>
              <li>Recibirá notificaciones sobre el estado de su solicitud</li>
              <li>Para emergencias, contacte directamente al número de emergencias</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
} 