import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Clock, Download, Search, AlertCircle, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function CertificadosPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Certificados y Documentación</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Solicite certificados, constancias y documentación oficial del municipio de manera rápida y segura.
        </p>
      </div>

      {/* Tipos de Certificados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Certificado de Residencia
            </CardTitle>
            <CardDescription>Acredite su domicilio actual</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Solicitar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Libre Deuda
            </CardTitle>
            <CardDescription>Estado de deuda municipal</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Solicitar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Certificado de Habilitación
            </CardTitle>
            <CardDescription>Para comercios e industrias</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Solicitar</Button>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Documentos */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Documentos Disponibles</CardTitle>
          <CardDescription>
            Certificados y constancias que puede solicitar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Certificados Personales</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Certificado de residencia</li>
                <li>Certificado de convivencia</li>
                <li>Certificado de supervivencia</li>
                <li>Certificado de pobreza</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Certificados Comerciales</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Libre deuda municipal</li>
                <li>Habilitación comercial</li>
                <li>Certificado de zonificación</li>
                <li>Permiso de obra</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proceso de Solicitud */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Proceso y Plazos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="list-decimal list-inside space-y-4">
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold inline">Solicitud Online</p>
                  <p className="text-sm text-gray-600">Complete el formulario correspondiente</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold inline">Pago de Tasas</p>
                  <p className="text-sm text-gray-600">Abone los aranceles correspondientes</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold inline">Verificación</p>
                  <p className="text-sm text-gray-600">Revisión de documentación y datos</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <div>
                  <p className="font-semibold inline">Emisión</p>
                  <p className="text-sm text-gray-600">Generación del certificado solicitado</p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Descarga Digital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Algunos certificados están disponibles para descarga inmediata:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Libre deuda municipal</li>
                <li>Estado de cuenta</li>
                <li>Comprobantes de pago</li>
              </ul>
              <Button className="w-full">Acceder a Descargas</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Consultas y Ayuda */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Consulta de Estado
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Verifique el estado de su trámite con el número de solicitud</p>
              <div className="flex gap-2">
                <Button className="w-full">Consultar Estado</Button>
                <Button variant="outline" className="w-full">Ver Historial</Button>
              </div>
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
                <p className="font-semibold">¿Cuánto demora el trámite?</p>
                <p className="text-sm text-gray-600">El tiempo varía según el tipo de certificado (24-72hs)</p>
              </div>
              <div>
                <p className="font-semibold">¿Qué documentación necesito?</p>
                <p className="text-sm text-gray-600">DNI y documentación específica según el certificado</p>
              </div>
              <Button variant="outline" className="w-full">Ver más preguntas</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 