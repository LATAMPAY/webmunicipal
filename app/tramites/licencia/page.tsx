import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, FileCheck, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

const requisitos = [
  "DNI vigente",
  "Constancia de grupo sanguíneo",
  "Certificado de antecedentes penales",
  "Comprobante de pago de tasas",
  "Certificado médico psicofísico",
  "Curso teórico aprobado (para primera licencia)",
]

const pasos = [
  {
    titulo: "Solicitar Turno",
    descripcion: "Reserve un turno para realizar el trámite presencial",
    link: "/servicios/turnos",
  },
  {
    titulo: "Pagar Tasas",
    descripcion: "Realice el pago de las tasas correspondientes",
    link: "/servicios/pagos-municipales",
  },
  {
    titulo: "Presentar Documentación",
    descripcion: "Asista a su turno con toda la documentación requerida",
    link: "/tramites/licencia/requisitos",
  },
]

export default function LicenciaPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
          <Car className="h-12 w-12 text-blue-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Licencia de Conducir</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Gestione su licencia de conducir de manera simple y rápida. Siga los pasos y requisitos necesarios.
        </p>
      </section>

      {/* Requisitos */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-blue-500" />
              Requisitos
            </CardTitle>
            <CardDescription>
              Documentación necesaria para realizar el trámite
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {requisitos.map((requisito, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                  {requisito}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Pasos a seguir */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Pasos a seguir</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {pasos.map((paso, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-blue-500">
                    {index + 1}
                  </span>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle>{paso.titulo}</CardTitle>
                <CardDescription>{paso.descripcion}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full">
                  <Link href={paso.link}>Continuar</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Información Importante */}
      <section className="bg-muted rounded-lg p-8">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">Información Importante</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>El trámite es personal y presencial</li>
              <li>La licencia tiene una validez de 5 años para menores de 65 años</li>
              <li>Debe presentar toda la documentación original</li>
              <li>El curso teórico es obligatorio para primera licencia</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
} 