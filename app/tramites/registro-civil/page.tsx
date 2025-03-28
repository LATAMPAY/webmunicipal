import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Heart, Baby, Clock, Calendar, HelpCircle, MapPin } from "lucide-react"
import Link from "next/link"

export default function RegistroCivilPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Registro Civil</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestione trámites relacionados con documentación personal, matrimonios, nacimientos y más.
        </p>
      </div>

      {/* Trámites Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              DNI y Pasaporte
            </CardTitle>
            <CardDescription>Gestione su documentación personal</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Iniciar Trámite</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Matrimonios
            </CardTitle>
            <CardDescription>Turnos y documentación para casamiento</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Solicitar Turno</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Baby className="h-5 w-5" />
              Nacimientos
            </CardTitle>
            <CardDescription>Inscripción y certificados</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Inscribir</Button>
          </CardContent>
        </Card>
      </div>

      {/* Servicios Disponibles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Servicios del Registro Civil</CardTitle>
          <CardDescription>
            Trámites y documentación disponible
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Documentación Personal</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>DNI (nuevo, renovación, actualización)</li>
                <li>Pasaporte</li>
                <li>Certificado de nacimiento</li>
                <li>Certificado de defunción</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Actos Civiles</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Matrimonio civil</li>
                <li>Unión convivencial</li>
                <li>Inscripción de nacimientos</li>
                <li>Reconocimiento de hijos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requisitos y Plazos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Requisitos Generales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Para DNI/Pasaporte</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Partida de nacimiento original</li>
                  <li>DNI anterior (en caso de renovación)</li>
                  <li>Foto 4x4 fondo blanco</li>
                  <li>Comprobante de domicilio</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Para Matrimonio</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>DNI de ambos contrayentes</li>
                  <li>Partidas de nacimiento</li>
                  <li>Certificado de residencia</li>
                  <li>Análisis prenupciales</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Plazos y Turnos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Tiempos de Entrega</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>DNI: 15 días hábiles</li>
                  <li>Pasaporte: 10 días hábiles</li>
                  <li>Certificados: 24-48hs</li>
                  <li>Partidas: Inmediato</li>
                </ul>
              </div>
              <Link href="/servicios/turnos">
                <Button className="w-full">Solicitar Turno</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Horarios y Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Oficina Central</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dirección: Av. Principal 123</li>
                  <li>Teléfono: (123) 456-7890</li>
                  <li>Email: registro@municipio.gob.ar</li>
                  <li>Horario: Lunes a Viernes de 8:00 a 14:00</li>
                </ul>
              </div>
              <Button className="w-full" variant="outline">
                Ver en el Mapa
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Preguntas Frecuentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">¿Necesito turno previo?</p>
                <p className="text-sm text-gray-600">Sí, para todos los trámites se requiere turno previo</p>
              </div>
              <div>
                <p className="font-semibold">¿Qué pasa si perdí mi DNI?</p>
                <p className="text-sm text-gray-600">Debe realizar la denuncia de extravío y solicitar un nuevo ejemplar</p>
              </div>
              <div>
                <p className="font-semibold">¿Puedo tramitar el DNI de un menor?</p>
                <p className="text-sm text-gray-600">Sí, con la presencia de padres o tutores y documentación respaldatoria</p>
              </div>
              <Button variant="outline" className="w-full">Ver más preguntas</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 