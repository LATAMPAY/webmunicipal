import Link from "next/link"
import { FileText, CreditCard, Calendar, HelpCircle, Wrench, Building, Map, Users, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Trámites Online",
    description: "Realice sus trámites municipales sin salir de casa",
    link: "/servicios/tramites",
  },
  {
    icon: <CreditCard className="h-10 w-10" />,
    title: "Pagos Municipales",
    description: "Pague sus impuestos y servicios de forma segura",
    link: "/servicios/pagos-municipales",
  },
  {
    icon: <Calendar className="h-10 w-10" />,
    title: "Turnos Online",
    description: "Reserve su turno para atención presencial",
    link: "/servicios/turnos",
  },
  {
    icon: <HelpCircle className="h-10 w-10" />,
    title: "Reclamos y Consultas",
    description: "Envíe sus reclamos y consultas a la municipalidad",
    link: "/servicios/reclamos",
  },
  {
    icon: <Wrench className="h-10 w-10" />,
    title: "Solicitud de Servicios",
    description: "Solicite servicios municipales para su barrio",
    link: "/servicios/solicitudes",
  },
  {
    icon: <Building className="h-10 w-10" />,
    title: "Desarrollo Económico",
    description: "Información para comercios y empresas locales",
    link: "/desarrollo-economico",
  },
  {
    icon: <Map className="h-10 w-10" />,
    title: "Turismo",
    description: "Descubra los atractivos turísticos de nuestra ciudad",
    link: "/turismo",
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Participación Ciudadana",
    description: "Participe en las decisiones de su ciudad",
    link: "/participacion",
  },
]

export default function ServicesSection() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Servicios Municipales</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center"
            >
              <div className="text-primary mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <Button variant="ghost" size="sm" className="mt-auto">
                Acceder <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

