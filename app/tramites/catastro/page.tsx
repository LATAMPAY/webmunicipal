import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Map, FileText, Home, Search, Clock, Calculator, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function CatastroPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Catastro Municipal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestione trámites relacionados con su propiedad: certificaciones, valuaciones y consultas catastrales.
        </p>
      </div>

      {/* Trámites Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Certificación Catastral
            </CardTitle>
            <CardDescription>Solicite certificados de su propiedad</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Solicitar Certificado</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Consulta de Partida
            </CardTitle>
            <CardDescription>Información sobre su inmueble</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Consultar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Map className="h-5 w-5" />
              Planos Catastrales
            </CardTitle>
            <CardDescription>Acceda a planos y cartografía</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Ver Planos</Button>
          </CardContent>
        </Card>
      </div>

      {/* Servicios Disponibles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Servicios Catastrales</CardTitle>
          <CardDescription>
            Trámites y servicios disponibles en la oficina de catastro
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Certificaciones</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Certificado catastral</li>
                <li>Certificado de numeración</li>
                <li>Certificado de zonificación</li>
                <li>Estado parcelario</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Otros Servicios</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Valuación fiscal</li>
                <li>Verificación de medidas</li>
                <li>Consulta de antecedentes</li>
                <li>Visado de planos</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información y Requisitos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Requisitos Generales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold">Para Certificaciones</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>DNI del titular</li>
                    <li>Escritura o boleto de compraventa</li>
                    <li>Plano de mensura (si corresponde)</li>
                    <li>Comprobante de pago de tasas</li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold">Para Consultas</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    <li>Número de partida</li>
                    <li>Identificación del titular</li>
                    <li>Documentación respaldatoria</li>
                  </ul>
                </div>
              </li>
            </ul>
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
                <h3 className="font-semibold mb-2">Plazos de Entrega</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Certificaciones simples: 48-72hs</li>
                  <li>Certificaciones complejas: 5-7 días</li>
                  <li>Consultas: En el momento</li>
                </ul>
              </div>
              <Link href="/servicios/turnos">
                <Button className="w-full">Solicitar Turno</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Costos y Contacto */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Tasas y Aranceles
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Las tasas varían según el tipo de trámite y la urgencia del mismo. Consulte los valores actualizados:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Certificado catastral: $XXXX</li>
                <li>Certificado de numeración: $XXXX</li>
                <li>Visado de planos: $XXXX</li>
                <li>Consultas: Sin cargo</li>
              </ul>
              <Button className="w-full mt-2">Ver Tabla Completa</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Información de Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Oficina de Catastro</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dirección: Av. Principal 123, PB</li>
                  <li>Teléfono: (123) 456-7890</li>
                  <li>Email: catastro@municipio.gob.ar</li>
                  <li>Horario: Lunes a Viernes de 8:00 a 14:00</li>
                </ul>
              </div>
              <Button className="w-full" variant="outline">
                Ver Ubicación
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 