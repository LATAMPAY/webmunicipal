import type React from "react"
import Link from "next/link"
import { ChevronRight, BarChart, FileText, FileSearch, PieChart, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransparenciaPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Transparencia</h1>
        <p className="text-xl text-muted-foreground">
          Acceda a la información pública de la Municipalidad de General Mosconi
        </p>
      </div>

      {/* Transparency Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <TransparencyCard
          icon={<BarChart className="h-8 w-8" />}
          title="Presupuesto Municipal"
          description="Información detallada sobre el presupuesto municipal, ejecución presupuestaria e informes financieros."
          link="/transparencia/presupuesto"
        />
        <TransparencyCard
          icon={<FileText className="h-8 w-8" />}
          title="Licitaciones y Contrataciones"
          description="Información sobre licitaciones, contrataciones y compras públicas realizadas por la municipalidad."
          link="/transparencia/licitaciones"
        />
        <TransparencyCard
          icon={<FileSearch className="h-8 w-8" />}
          title="Normativas"
          description="Ordenanzas, decretos y resoluciones municipales. Marco legal y normativo de la municipalidad."
          link="/transparencia/normativas"
        />
        <TransparencyCard
          icon={<PieChart className="h-8 w-8" />}
          title="Indicadores de Gestión"
          description="Indicadores de desempeño y resultados de la gestión municipal en diferentes áreas."
          link="/transparencia/indicadores"
        />
        <TransparencyCard
          icon={<Search className="h-8 w-8" />}
          title="Acceso a la Información Pública"
          description="Solicite información pública y consulte las solicitudes realizadas por otros ciudadanos."
          link="/transparencia/acceso-informacion"
        />
      </div>

      {/* Budget Visualization */}
      <section className="mb-12 bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Presupuesto Municipal 2025</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Distribución por Áreas</h3>
            <div className="aspect-square bg-background rounded-lg p-4 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Gráfico de distribución presupuestaria"
                className="max-w-full max-h-full"
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Evolución Anual</h3>
            <div className="aspect-square bg-background rounded-lg p-4 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=400&width=400"
                alt="Gráfico de evolución presupuestaria"
                className="max-w-full max-h-full"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link href="/transparencia/presupuesto">
            <Button>
              Ver detalles completos <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent Tenders */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Licitaciones Recientes</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((id) => (
            <div key={id} className="border rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Licitación Pública N° {id}/2025</h3>
                  <p className="text-muted-foreground mb-2">Publicada: 15/03/2025 - Cierre: 15/04/2025</p>
                  <p className="mb-4">Adquisición de equipamiento para el Hospital Municipal</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link href={`/transparencia/licitaciones/${id}`}>
                    <Button variant="outline">
                      Ver detalles <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Link href="/transparencia/licitaciones">
            <Button variant="outline">
              Ver todas las licitaciones <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Public Information Request */}
      <section className="bg-primary text-primary-foreground rounded-lg p-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
            <h2 className="text-2xl font-bold mb-4">Solicitud de Información Pública</h2>
            <p className="mb-6">
              Como ciudadano, usted tiene derecho a solicitar información pública a la municipalidad. Complete el
              formulario de solicitud y recibirá una respuesta en los plazos establecidos por la ley.
            </p>
            <Link href="/transparencia/acceso-informacion/solicitud">
              <Button variant="secondary">Solicitar Información</Button>
            </Link>
          </div>
          <div className="md:w-1/3 flex justify-center">
            <FileSearch className="h-32 w-32 text-primary-foreground/80" />
          </div>
        </div>
      </section>

      {/* Transparency Commitment */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Nuestro Compromiso con la Transparencia</h2>
        <p className="text-lg mb-6">
          La Municipalidad de General Mosconi está comprometida con la transparencia y el acceso a la información
          pública. Creemos que la transparencia es fundamental para fortalecer la democracia y la participación
          ciudadana.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-muted rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Rendición de Cuentas</h3>
            <p>
              Publicamos regularmente informes sobre la gestión municipal, el uso de los recursos públicos y los
              resultados obtenidos.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Datos Abiertos</h3>
            <p>
              Ponemos a disposición de los ciudadanos datos en formatos abiertos para su análisis, reutilización y
              desarrollo de aplicaciones.
            </p>
          </div>
          <div className="bg-muted rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Participación Ciudadana</h3>
            <p>
              Promovemos la participación de los ciudadanos en la toma de decisiones y en el control de la gestión
              pública.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

function TransparencyCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={link} className="w-full">
          <Button variant="outline" className="w-full">
            Acceder <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

