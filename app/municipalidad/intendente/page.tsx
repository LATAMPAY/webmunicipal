import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarRange, Target, Award, FileText } from "lucide-react"

export default function IntendentePage() {
  return (
    <div className="container py-8">
      {/* Perfil del Intendente */}
      <section className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="md:col-span-1">
          <div className="sticky top-24">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
              <Image
                src="/intendente.jpg"
                alt="Intendente de General Mosconi"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold">Dr. Juan Pérez</h2>
              <p className="text-muted-foreground">Intendente Municipal</p>
              <p className="text-sm text-muted-foreground mt-1">Período 2023-2027</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-6">Mensaje del Intendente</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg leading-relaxed mb-6">
              Estimados vecinos y vecinas de General Mosconi:
            </p>
            <p className="mb-4">
              Es un honor dirigirme a ustedes como Intendente de nuestra querida ciudad. Desde el inicio de nuestra gestión, 
              hemos trabajado incansablemente para construir una ciudad más moderna, inclusiva y sustentable, donde cada 
              vecino pueda desarrollar su proyecto de vida.
            </p>
            <p className="mb-4">
              Este portal web municipal es una muestra más de nuestro compromiso con la modernización y la transparencia 
              en la gestión pública. Aquí encontrarán información actualizada sobre todos los servicios municipales, 
              podrán realizar trámites en línea y mantenerse informados sobre las novedades de nuestra ciudad.
            </p>
            <p className="mb-6">
              Los invito a ser parte activa de esta transformación, participando en las diferentes instancias de 
              diálogo y construcción colectiva que hemos puesto a disposición de la comunidad.
            </p>
            <p className="font-medium">
              Juntos estamos construyendo el General Mosconi que soñamos.
            </p>
          </div>
        </div>
      </section>

      {/* Gestión */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Gestión Municipal</h2>
        <Tabs defaultValue="objetivos" className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="objetivos">Objetivos de Gestión</TabsTrigger>
            <TabsTrigger value="logros">Logros Alcanzados</TabsTrigger>
            <TabsTrigger value="proyectos">Proyectos en Curso</TabsTrigger>
          </TabsList>

          <TabsContent value="objetivos">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Target className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Desarrollo Urbano Sostenible</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Mejora de la infraestructura vial</li>
                    <li>Ampliación de espacios verdes</li>
                    <li>Modernización del alumbrado público</li>
                    <li>Plan de gestión integral de residuos</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Inclusión Social</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Fortalecimiento de programas sociales</li>
                    <li>Mejora en el acceso a la salud</li>
                    <li>Promoción de la educación</li>
                    <li>Apoyo a sectores vulnerables</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logros">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Award className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>2023</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>Inauguración de nueva plaza central</li>
                    <li>Implementación de sistema de turnos online</li>
                    <li>Renovación de la flota municipal</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Award className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>2024 (En curso)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>Lanzamiento del portal municipal</li>
                    <li>Inicio del plan de viviendas</li>
                    <li>Modernización del centro de salud</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="proyectos">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CalendarRange className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Corto Plazo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Repavimentación de avenidas principales</li>
                    <li>Ampliación del sistema de cámaras</li>
                    <li>Nuevo centro deportivo municipal</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CalendarRange className="h-6 w-6 text-primary mb-2" />
                  <CardTitle>Largo Plazo</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Plan maestro de desarrollo urbano</li>
                    <li>Parque industrial tecnológico</li>
                    <li>Red de ciclovías</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Agenda */}
      <section>
        <h2 className="text-3xl font-bold mb-8">Agenda Pública</h2>
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Inauguración Centro Cultural</CardTitle>
                <span className="text-sm text-muted-foreground">28 de marzo, 2024</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Ceremonia de inauguración del nuevo Centro Cultural Municipal.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Sesión del Concejo Deliberante</CardTitle>
                <span className="text-sm text-muted-foreground">30 de marzo, 2024</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Participación en la sesión ordinaria del Concejo Deliberante.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Reunión con Vecinos</CardTitle>
                <span className="text-sm text-muted-foreground">2 de abril, 2024</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Encuentro con vecinos del Barrio San Martín para discutir mejoras en la zona.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 