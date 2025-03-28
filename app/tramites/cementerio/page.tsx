import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, MapPin, Search, AlertCircle, Calendar } from "lucide-react"
import Link from "next/link"

export default function CementerioPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Cementerio Municipal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestione trámites y servicios relacionados con el cementerio municipal.
        </p>
      </div>

      {/* Servicios Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Inhumaciones
            </CardTitle>
            <CardDescription>Gestión de sepulturas</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Iniciar Trámite</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Nichos y Bóvedas
            </CardTitle>
            <CardDescription>Arrendamiento y renovación</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Consultar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Búsqueda
            </CardTitle>
            <CardDescription>Localización de sepulturas</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Buscar</Button>
          </CardContent>
        </Card>
      </div>

      {/* Servicios Disponibles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Servicios del Cementerio</CardTitle>
          <CardDescription>
            Trámites y servicios disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Servicios Funerarios</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Inhumaciones</li>
                <li>Exhumaciones</li>
                <li>Traslados</li>
                <li>Cremaciones</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Servicios Administrativos</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Arrendamiento de nichos</li>
                <li>Renovación de arrendamientos</li>
                <li>Mantenimiento de sepulturas</li>
                <li>Certificados y constancias</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requisitos y Documentación */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Requisitos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Para Inhumaciones</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Certificado de defunción</li>
                  <li>DNI del fallecido</li>
                  <li>DNI del solicitante</li>
                  <li>Licencia de inhumación</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Para Arrendamientos</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>DNI del titular</li>
                  <li>Comprobante de pago</li>
                  <li>Documentación previa (en caso de renovación)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Plazos y Horarios
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Horarios de Atención</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Administración: Lunes a Viernes 8:00 a 14:00</li>
                  <li>Cementerio: Todos los días 8:00 a 18:00</li>
                  <li>Guardia: 24 horas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Plazos de Arrendamiento</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Nichos: 1 a 5 años</li>
                  <li>Bóvedas: hasta 99 años</li>
                  <li>Sepulturas: 5 años</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Ubicación y Contacto
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Cementerio Municipal</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dirección: Av. Principal 123</li>
                  <li>Teléfono: (123) 456-7890</li>
                  <li>Email: cementerio@municipio.gob.ar</li>
                  <li>Guardia: (123) 456-7899</li>
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
              <AlertCircle className="h-5 w-5" />
              Información Importante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Vencimientos</p>
                <p className="text-sm text-gray-600">Verifique las fechas de vencimiento de arrendamientos</p>
              </div>
              <div>
                <p className="font-semibold">Mantenimiento</p>
                <p className="text-sm text-gray-600">El mantenimiento de las sepulturas es responsabilidad de los familiares</p>
              </div>
              <div>
                <p className="font-semibold">Servicios de Emergencia</p>
                <p className="text-sm text-gray-600">Disponibles las 24 horas llamando a la guardia</p>
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