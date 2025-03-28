import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, FileText, AlertTriangle, Tree, Recycle, Factory, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function MedioAmbientePage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Medio Ambiente</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Gestione trámites relacionados con el cuidado del medio ambiente y la sustentabilidad.
        </p>
      </div>

      {/* Trámites Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Factory className="h-5 w-5" />
              Impacto Ambiental
            </CardTitle>
            <CardDescription>Evaluación y certificados</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Iniciar Trámite</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tree className="h-5 w-5" />
              Arbolado Urbano
            </CardTitle>
            <CardDescription>Permisos de poda y extracción</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Solicitar Permiso</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Denuncias Ambientales
            </CardTitle>
            <CardDescription>Reportar problemas ambientales</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Realizar Denuncia</Button>
          </CardContent>
        </Card>
      </div>

      {/* Servicios Disponibles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Servicios Ambientales</CardTitle>
          <CardDescription>
            Trámites y servicios disponibles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Certificaciones</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Certificado de aptitud ambiental</li>
                <li>Evaluación de impacto ambiental</li>
                <li>Certificado de gestión de residuos</li>
                <li>Habilitación ambiental</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Permisos y Autorizaciones</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Poda y extracción de árboles</li>
                <li>Transporte de residuos</li>
                <li>Uso de espacios verdes</li>
                <li>Actividades al aire libre</li>
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
              <Recycle className="h-5 w-5" />
              Programas Ambientales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Reciclaje y Residuos</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Separación de residuos</li>
                  <li>Puntos verdes</li>
                  <li>Compostaje domiciliario</li>
                  <li>Recolección diferenciada</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Educación Ambiental</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  <li>Talleres y charlas</li>
                  <li>Visitas guiadas</li>
                  <li>Material educativo</li>
                </ul>
              </div>
              <Button className="w-full">Participar en Programas</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Campañas Actuales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold mb-2">Plantación de Árboles</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Campaña de forestación urbana. Solicite un árbol para su vereda.
                </p>
                <Button variant="outline" className="w-full">Participar</Button>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Ahorro de Agua</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Tips y consejos para el uso responsable del agua.
                </p>
                <Button variant="outline" className="w-full">Más Información</Button>
              </div>
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
              Normativa Ambiental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Marco Legal</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Ordenanza de protección ambiental</li>
                  <li>Regulación de residuos</li>
                  <li>Normas de arbolado urbano</li>
                  <li>Evaluación de impacto ambiental</li>
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
              <AlertCircle className="h-5 w-5" />
              Contacto y Emergencias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Dirección de Medio Ambiente</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Dirección: Av. Principal 123</li>
                  <li>Teléfono: (123) 456-7890</li>
                  <li>Email: ambiente@municipio.gob.ar</li>
                  <li>Horario: Lunes a Viernes de 8:00 a 14:00</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Emergencias Ambientales</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Para denuncias urgentes las 24hs:
                </p>
                <Button className="w-full">Línea de Emergencias</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 