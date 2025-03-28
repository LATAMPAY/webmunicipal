import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, FileText, Ruler, HardHat, Clock, MapPin, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function ObrasPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Obras Particulares</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestione permisos de construcción, planos y documentación para su obra.
        </p>
      </div>

      {/* Tipos de Trámites */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Permiso de Obra
            </CardTitle>
            <CardDescription>Nueva construcción o ampliación</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Solicitar Permiso</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Visado de Planos
            </CardTitle>
            <CardDescription>Aprobación de documentación técnica</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Visar Planos</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5" />
              Relevamiento
            </CardTitle>
            <CardDescription>Regularización de obras existentes</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Iniciar Relevamiento</Button>
          </CardContent>
        </Card>
      </div>

      {/* Requisitos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Documentación Requerida</CardTitle>
          <CardDescription>
            Documentos necesarios para iniciar el trámite
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Documentación Legal</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Título de propiedad o boleto de compraventa</li>
                <li>DNI del propietario</li>
                <li>Certificado de dominio vigente</li>
                <li>Libre deuda municipal</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Documentación Técnica</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Planos de obra (4 copias)</li>
                <li>Planilla de estadística</li>
                <li>Certificado de amojonamiento</li>
                <li>Estudio de suelos (según corresponda)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proceso y Normativa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardHat className="h-5 w-5" />
              Proceso de Aprobación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4">
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold inline">Presentación inicial</p>
                  <p className="text-sm text-gray-600">Ingreso de documentación completa</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold inline">Visado previo</p>
                  <p className="text-sm text-gray-600">Revisión técnica de la documentación</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold inline">Liquidación de derechos</p>
                  <p className="text-sm text-gray-600">Cálculo y pago de tasas</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold inline">Aprobación final</p>
                  <p className="text-sm text-gray-600">Entrega de planos aprobados</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Normativa Vigente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Código de Edificación Municipal</li>
              <li>Ordenanza de Uso del Suelo</li>
              <li>Reglamento de Construcciones</li>
              <li>Normas de Seguridad e Higiene</li>
            </ul>
            <Button className="w-full mt-4" variant="outline">
              Ver Normativa Completa
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Plazos y Costos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Plazos Estimados</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Visado previo: 10 días hábiles</li>
                  <li>Aprobación final: 20 días hábiles</li>
                  <li>Inspecciones: 5 días hábiles</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Costos</h3>
                <p className="text-sm text-gray-600">
                  Los derechos de construcción se calculan según la superficie y el tipo de obra
                </p>
                <Button className="w-full mt-2">Calcular Costos</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Contacto y Ubicación
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Oficina de Obras Particulares</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dirección: Av. Principal 123, 1° Piso</li>
                  <li>Teléfono: (123) 456-7890</li>
                  <li>Email: obras@municipio.gob.ar</li>
                  <li>Horario: Lunes a Viernes de 8:00 a 14:00</li>
                </ul>
              </div>
              <Link href="/servicios/turnos">
                <Button className="w-full">Solicitar Turno</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 