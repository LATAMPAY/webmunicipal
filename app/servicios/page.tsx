import type React from "react"
import Link from "next/link"
import { FileText, CreditCard, Calendar, HelpCircle, Wrench, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServiciosPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Servicios Municipales</h1>
        <p className="text-xl text-muted-foreground">
          Acceda a todos los servicios que la Municipalidad de General Mosconi pone a su disposición
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <ServiceCard
          icon={<HelpCircle className="h-8 w-8" />}
          title="Reclamos y Consultas"
          description="Realice reclamos, denuncias y consultas a la municipalidad. Consulte el estado de sus trámites y acceda a preguntas frecuentes."
          features={[
            "Formulario de reclamos y denuncias",
            "Formulario de consultas",
            "Preguntas frecuentes",
            "Estado de reclamos y consultas",
            "Mapa interactivo de reclamos",
          ]}
          link="/servicios/reclamos"
        />

        <ServiceCard
          icon={<CreditCard className="h-8 w-8" />}
          title="Pagos Municipales"
          description="Realice el pago de impuestos, tasas y servicios municipales de forma segura y desde la comodidad de su hogar."
          features={[
            "Rentas municipales",
            "Servicios municipales",
            "Deudas tributarias",
            "Patentes",
            "Tránsito e infracciones",
          ]}
          link="/servicios/pagos-municipales"
        />

        <ServiceCard
          icon={<Calendar className="h-8 w-8" />}
          title="Turnos Online"
          description="Reserve turnos para realizar trámites presenciales en las distintas áreas de la municipalidad."
          features={[
            "Selección de área y trámite",
            "Calendario de disponibilidad",
            "Confirmación y recordatorios",
            "Cancelación y modificación de turnos",
          ]}
          link="/servicios/turnos"
        />

        <ServiceCard
          icon={<Wrench className="h-8 w-8" />}
          title="Solicitud de Servicios"
          description="Solicite servicios municipales para su barrio o domicilio y realice un seguimiento de su solicitud."
          features={[
            "Mantenimiento urbano",
            "Servicios públicos",
            "Seguimiento de solicitud",
            "Visualización del estado de servicios en mapa",
          ]}
          link="/servicios/solicitudes"
        />

        <ServiceCard
          icon={<FileText className="h-8 w-8" />}
          title="Trámites Online"
          description="Realice trámites municipales sin salir de casa. Descargue formularios, presente documentación y consulte el estado de sus trámites."
          features={[
            "Habilitaciones comerciales",
            "Licencias de conducir",
            "Certificados y constancias",
            "Permisos de obra",
            "Descarga de formularios",
          ]}
          link="/servicios/tramites"
        />

        <div className="bg-primary text-primary-foreground rounded-lg p-8 flex flex-col justify-between h-full">
          <div>
            <h2 className="text-2xl font-bold mb-4">Wallet Municipal</h2>
            <p className="mb-6">
              Acceda a nuestra billetera digital municipal para realizar pagos, transferencias y gestionar sus finanzas
              de forma segura y conveniente.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center">
                <ChevronRight className="h-5 w-5 mr-2" />
                <span>Saldo disponible y transacciones</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-5 w-5 mr-2" />
                <span>Transferencias y pagos con QR</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-5 w-5 mr-2" />
                <span>Comercios adheridos y promociones</span>
              </li>
              <li className="flex items-center">
                <ChevronRight className="h-5 w-5 mr-2" />
                <span>Pago de facturas y servicios</span>
              </li>
            </ul>
          </div>
          <Link href="/wallet">
            <Button variant="secondary" className="w-full">
              Acceder a Wallet Municipal
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">¿Necesita ayuda?</h2>
        <p className="mb-6">
          Si necesita asistencia para utilizar alguno de nuestros servicios online, puede contactarnos a través de los
          siguientes medios:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="font-semibold mb-2">Teléfono</p>
            <p>(123) 456-7890</p>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="font-semibold mb-2">Email</p>
            <p>ayuda@generalmosconi.gob.ar</p>
          </div>
          <div className="bg-background rounded-lg p-4 text-center">
            <p className="font-semibold mb-2">Horario de atención</p>
            <p>Lunes a Viernes de 8:00 a 16:00</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServiceCard({
  icon,
  title,
  description,
  features,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  link: string
}) {
  return (
    <Card className="transition-all hover:shadow-md h-full flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-4">{description}</p>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-muted-foreground">
              <ChevronRight className="h-4 w-4 mr-2 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={link} className="w-full">
          <Button className="w-full">
            Acceder <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

