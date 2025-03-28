import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, MapPinIcon, ArrowRightIcon, PhoneIcon, MailIcon, FileTextIcon } from "lucide-react"
import { NewsCarousel } from "@/components/features/news-carousel"
import { QuickAccess } from "@/components/features/quick-access"
import { EventsList } from "@/components/features/events-list"
import { SearchBar } from "@/components/features/search-bar"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.svg"
            alt="General Mosconi"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Bienvenido a General Mosconi
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Una ciudad moderna, inclusiva y sustentable
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                <Link href="/servicios">Servicios Municipales</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/municipalidad/contacto">Contacto</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Barra de Búsqueda */}
      <section className="py-8 bg-muted">
        <div className="container">
          <SearchBar />
        </div>
      </section>

      {/* Accesos Rápidos */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Accesos Rápidos</h2>
          <QuickAccess />
        </div>
      </section>

      {/* Noticias y Eventos */}
      <section className="py-16 bg-muted">
        <div className="container">
          <Tabs defaultValue="noticias" className="space-y-8">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="noticias">Últimas Noticias</TabsTrigger>
                <TabsTrigger value="eventos">Próximos Eventos</TabsTrigger>
              </TabsList>
              <div className="flex gap-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/noticias">
                    Ver todas las noticias
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/eventos">
                    Ver todos los eventos
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <TabsContent value="noticias" className="mt-6">
              <NewsCarousel />
            </TabsContent>

            <TabsContent value="eventos" className="mt-6">
              <EventsList />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Servicios Destacados */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Servicios Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Reclamos Online</CardTitle>
                <CardDescription>Realiza tus reclamos de forma rápida y sencilla</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sistema de gestión de reclamos para una respuesta más eficiente
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/servicios/reclamos">Hacer un Reclamo</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Turnos Online</CardTitle>
                <CardDescription>Reserva tu turno para trámites municipales</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sistema de turnos online para una mejor atención
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/servicios/turnos">Solicitar Turno</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wallet Municipal</CardTitle>
                <CardDescription>Tu billetera digital para pagos municipales</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Realiza pagos de forma segura y accede a beneficios exclusivos
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href="/wallet">Acceder al Wallet</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contacto</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPinIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Dirección</h3>
                    <p className="text-muted-foreground">
                      Av. Principal 123, General Mosconi<br />
                      Salta, Argentina
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <PhoneIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Teléfonos</h3>
                    <p className="text-muted-foreground">
                      Central: (123) 456-7890<br />
                      Emergencias: 911
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MailIcon className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold">Correo Electrónico</h3>
                    <p className="text-muted-foreground">
                      contacto@municipalidadmosconi.gob.ar
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild className="mt-6">
                <Link href="/municipalidad/contacto">
                  Más Información de Contacto
                </Link>
              </Button>
            </div>
            <div className="relative h-[300px] md:h-full min-h-[300px] rounded-lg overflow-hidden">
              <Image
                src="/images/mapa.svg"
                alt="Ubicación de la Municipalidad"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

