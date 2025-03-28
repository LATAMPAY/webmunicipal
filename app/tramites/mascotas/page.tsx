import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dog, FileText, Heart, AlertTriangle, MapPin, Calendar, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function MascotasPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Mascotas</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestione trámites relacionados con sus mascotas: registro, vacunación y más.
        </p>
      </div>

      {/* Trámites Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Dog className="h-5 w-5" />
              Registro de Mascotas
            </CardTitle>
            <CardDescription>Identifique y registre su mascota</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Registrar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Vacunación
            </CardTitle>
            <CardDescription>Calendario y turnos de vacunación</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Solicitar Turno</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Denuncias
            </CardTitle>
            <CardDescription>Reportar maltrato o abandono</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Realizar Denuncia</Button>
          </CardContent>
        </Card>
      </div>

      {/* Servicios Disponibles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Servicios para Mascotas</CardTitle>
          <CardDescription>
            Trámites y servicios disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Servicios Veterinarios</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Vacunación antirrábica</li>
                <li>Castración gratuita</li>
                <li>Desparasitación</li>
                <li>Atención de emergencias</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Trámites Administrativos</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Registro de mascotas</li>
                <li>Licencia de perros potencialmente peligrosos</li>
                <li>Cambio de titular</li>
                <li>Denuncias y reclamos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Programas y Campañas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              Programas Activos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Adopción Responsable</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Conozca las mascotas disponibles para adopción en nuestros refugios.
                </p>
                <Button variant="outline" className="w-full">Ver Mascotas</Button>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Castraciones Gratuitas</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Programa de esterilización gratuita para perros y gatos.
                </p>
                <Button variant="outline" className="w-full">Solicitar Turno</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Calendario de Vacunación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Próximas Jornadas</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Vacunación Antirrábica</li>
                  <li>Desparasitación</li>
                  <li>Identificación con microchip</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Requisitos</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>DNI del propietario</li>
                  <li>Libreta sanitaria (si tiene)</li>
                  <li>Mascota con correa</li>
                </ul>
              </div>
              <Button className="w-full">Ver Calendario Completo</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información y Contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Normativa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Tenencia Responsable</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Ordenanza de tenencia responsable</li>
                  <li>Regulación de razas peligrosas</li>
                  <li>Obligaciones del propietario</li>
                  <li>Sanciones por maltrato</li>
                </ul>
              </div>
              <Button className="w-full" variant="outline">
                Ver Normativa Completa
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Información y Ayuda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Centro Municipal de Zoonosis</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dirección: Av. Principal 123</li>
                  <li>Teléfono: (123) 456-7890</li>
                  <li>Email: mascotas@municipio.gob.ar</li>
                  <li>Horario: Lunes a Viernes de 8:00 a 14:00</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Emergencias Veterinarias</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Servicio de guardia veterinaria 24hs:
                </p>
                <Button className="w-full">Llamar a Emergencias</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 