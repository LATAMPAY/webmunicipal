import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users2, Building2, FileText } from "lucide-react"

// Datos de ejemplo - En producción vendrían de una API
const areas = [
  {
    id: 1,
    nombre: "Intendencia",
    responsable: "Dr. Juan Pérez",
    cargo: "Intendente Municipal",
    descripcion: "Máxima autoridad del ejecutivo municipal",
    dependencias: [
      {
        id: 11,
        nombre: "Secretaría de Gobierno",
        responsable: "Lic. Ana López",
        descripcion: "Coordinación de políticas gubernamentales",
      },
      {
        id: 12,
        nombre: "Secretaría de Hacienda",
        responsable: "Cdor. Roberto Sánchez",
        descripcion: "Administración de recursos financieros",
      },
      {
        id: 13,
        nombre: "Secretaría de Obras Públicas",
        responsable: "Ing. María Rodríguez",
        descripcion: "Planificación y ejecución de obras municipales",
      },
    ],
  },
  {
    id: 2,
    nombre: "Concejo Deliberante",
    responsable: "María González",
    cargo: "Presidente del Concejo",
    descripcion: "Órgano legislativo municipal",
    dependencias: [
      {
        id: 21,
        nombre: "Secretaría Legislativa",
        responsable: "Dr. Carlos Gómez",
        descripcion: "Gestión legislativa y administrativa",
      },
    ],
  },
]

export default function OrganigramaPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Organigrama Municipal</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Estructura organizativa de la Municipalidad de General Mosconi
        </p>
      </section>

      {/* Visualización del Organigrama */}
      <div className="grid gap-8">
        {areas.map((area) => (
          <div key={area.id} className="space-y-6">
            {/* Área Principal */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{area.nombre}</CardTitle>
                    <CardDescription className="text-lg">
                      {area.responsable} - {area.cargo}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{area.descripcion}</p>
                
                {/* Dependencias */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {area.dependencias.map((dep) => (
                    <Card key={dep.id} className="border border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-lg">{dep.nombre}</CardTitle>
                        <CardDescription>{dep.responsable}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {dep.descripcion}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Información Adicional */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users2 className="h-5 w-5" />
              Personal Municipal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              La Municipalidad cuenta con personal capacitado en diversas áreas para brindar
              servicios de calidad a la comunidad.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Personal administrativo</li>
              <li>Personal técnico</li>
              <li>Personal de servicios</li>
              <li>Personal profesional</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documentos Relacionados
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link 
              href="/municipalidad/normativas/estructura"
              className="block p-3 rounded-lg hover:bg-accent transition-colors"
            >
              Ordenanza de Estructura Orgánica
            </Link>
            <Link 
              href="/municipalidad/normativas/personal"
              className="block p-3 rounded-lg hover:bg-accent transition-colors"
            >
              Estatuto del Personal Municipal
            </Link>
            <Link 
              href="/transparencia/nomina"
              className="block p-3 rounded-lg hover:bg-accent transition-colors"
            >
              Nómina de Personal
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 