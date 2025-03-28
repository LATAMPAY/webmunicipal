import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Store, FileCheck, Clock, CalendarDays, Building2, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function HabilitacionesPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Habilitaciones Comerciales</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestione la habilitación de su comercio, industria o actividad económica en el municipio.
        </p>
      </div>

      {/* Tipos de Habilitaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Nueva Habilitación
            </CardTitle>
            <CardDescription>Para comercios que inician actividades</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Iniciar Trámite</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Renovación
            </CardTitle>
            <CardDescription>Renueve su habilitación comercial</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Renovar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Cambio de Domicilio
            </CardTitle>
            <CardDescription>Modifique la ubicación de su comercio</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Modificar</Button>
          </CardContent>
        </Card>
      </div>

      {/* Requisitos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Requisitos Generales</CardTitle>
          <CardDescription>
            Documentación necesaria para iniciar el trámite
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Documentación Personal</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>DNI del titular o responsable</li>
                <li>CUIT/CUIL</li>
                <li>Constancia de inscripción en AFIP</li>
                <li>Constancia de inscripción en Ingresos Brutos</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Documentación del Local</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Título de propiedad o contrato de alquiler</li>
                <li>Plano del local aprobado</li>
                <li>Certificado de seguridad contra incendios</li>
                <li>Libreta sanitaria (para rubros gastronómicos)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proceso y Plazos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Plazos de Gestión
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <CalendarDays className="h-5 w-5 mt-1" />
                <div>
                  <p className="font-semibold">Habilitación Provisoria</p>
                  <p className="text-sm text-gray-600">5-10 días hábiles</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CalendarDays className="h-5 w-5 mt-1" />
                <div>
                  <p className="font-semibold">Habilitación Definitiva</p>
                  <p className="text-sm text-gray-600">20-30 días hábiles</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Información Importante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>La habilitación es personal e intransferible</li>
              <li>Debe renovarse cada 5 años</li>
              <li>El trámite debe iniciarse antes de comenzar la actividad</li>
              <li>Se realizarán inspecciones periódicas</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Costos y Consultas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Costos del Trámite</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Los costos varían según:</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Rubro del comercio</li>
              <li>Superficie del local</li>
              <li>Zona de ubicación</li>
              <li>Tipo de habilitación solicitada</li>
            </ul>
            <Button className="w-full mt-4">Consultar Costos</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultas y Soporte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Para consultas sobre su trámite:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Email: habilitaciones@municipio.gob.ar</li>
                <li>Teléfono: (123) 456-7890</li>
                <li>Horario: Lunes a Viernes de 8:00 a 14:00</li>
              </ul>
              <Link href="/servicios/turnos">
                <Button className="w-full mt-2">Solicitar Turno</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 