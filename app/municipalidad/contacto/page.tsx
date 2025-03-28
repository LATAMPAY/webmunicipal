"use client"

import { useState } from "react"
import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Send, Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { submitContactForm } from "@/lib/actions"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateMetadata } from "@/components/metadata"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FAQ } from "@/components/faq"

export const metadata = generateMetadata({
  title: "Contacto",
  description: "Comuníquese con la Municipalidad de General Mosconi. Encuentre información de contacto de todas las áreas y envíe sus consultas.",
  keywords: ["contacto", "atención al vecino", "reclamos", "consultas", "áreas municipales"],
})

// Datos de ejemplo - En producción vendrían de una API
const areas = [
  {
    id: 1,
    nombre: "Mesa de Entradas",
    telefono: "(123) 456-7890",
    email: "mesadeentradas@municipalidadmosconi.gob.ar",
    horario: "Lunes a Viernes 8:00 - 14:00",
    ubicacion: "Palacio Municipal - Planta Baja",
  },
  {
    id: 2,
    nombre: "Secretaría de Gobierno",
    telefono: "(123) 456-7891",
    email: "gobierno@municipalidadmosconi.gob.ar",
    horario: "Lunes a Viernes 8:00 - 14:00",
    ubicacion: "Palacio Municipal - 1° Piso",
  },
  {
    id: 3,
    nombre: "Secretaría de Hacienda",
    telefono: "(123) 456-7892",
    email: "hacienda@municipalidadmosconi.gob.ar",
    horario: "Lunes a Viernes 8:00 - 14:00",
    ubicacion: "Palacio Municipal - 1° Piso",
  },
  {
    id: 4,
    nombre: "Obras Públicas",
    telefono: "(123) 456-7893",
    email: "obras@municipalidadmosconi.gob.ar",
    horario: "Lunes a Viernes 8:00 - 14:00",
    ubicacion: "Palacio Municipal - 2° Piso",
  },
]

const motivos = [
  "Consulta General",
  "Reclamo",
  "Sugerencia",
  "Trámites",
  "Turnos",
  "Otros",
]

const faqs = [
  {
    question: "¿Cómo inicio un trámite municipal?",
    answer: "Para iniciar un trámite municipal, puede acercarse a la Mesa de Entradas en el horario de 8:00 a 14:00 hs. También puede iniciar algunos trámites en línea a través de nuestro portal de servicios digitales.",
  },
  {
    question: "¿Dónde puedo pagar mis tasas municipales?",
    answer: "Las tasas municipales pueden abonarse en la Tesorería Municipal, a través de la Wallet Municipal, o en los bancos autorizados. También puede realizar el pago en línea desde nuestro sitio web.",
  },
  {
    question: "¿Cómo solicito una audiencia con el Intendente?",
    answer: "Para solicitar una audiencia con el Intendente, debe completar el formulario correspondiente en la Secretaría Privada o enviar su solicitud a través de nuestro formulario de contacto seleccionando el motivo 'Audiencia'.",
  },
  {
    question: "¿Cuál es el horario de atención de las oficinas municipales?",
    answer: "Las oficinas municipales atienden de lunes a viernes de 8:00 a 14:00 hs. Algunos servicios específicos pueden tener horarios extendidos.",
  },
  {
    question: "¿Cómo presento una queja o reclamo?",
    answer: "Puede presentar su queja o reclamo a través de múltiples canales: personalmente en la Oficina de Atención al Vecino, mediante nuestro formulario web, o llamando al número de atención ciudadana.",
  },
]

export default function ContactPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        toast({
          title: "Mensaje enviado",
          description: "Su mensaje ha sido enviado correctamente. Nos pondremos en contacto con usted a la brevedad.",
          variant: "default",
        })

        // Reset form
        const form = document.getElementById("contactForm") as HTMLFormElement
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar la solicitud",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1">
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container">
            <h1 className="text-4xl font-bold mb-4">Contacto</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Estamos para ayudarlo. Póngase en contacto con nosotros a través de los siguientes medios o complete el
              formulario.
            </p>
          </div>
        </div>

        <div className="container py-12">
          <Breadcrumbs
            items={[
              { label: "Municipalidad", href: "/municipalidad" },
              { label: "Contacto", href: "/municipalidad/contacto" },
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Formulario de Contacto */}
            <section>
              <Card>
                <CardHeader>
                  <CardTitle>Formulario de Contacto</CardTitle>
                  <CardDescription>
                    Complete el formulario y nos pondremos en contacto a la brevedad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form id="contactForm" action={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nombre">Nombre</Label>
                        <Input id="nombre" name="name" placeholder="Su nombre" required disabled={isLoading} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apellido">Apellido</Label>
                        <Input id="apellido" name="lastname" placeholder="Su apellido" required disabled={isLoading} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefono">Teléfono</Label>
                      <Input id="telefono" name="phone" type="tel" placeholder="(123) 456-7890" required disabled={isLoading} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motivo">Motivo</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un motivo" />
                        </SelectTrigger>
                        <SelectContent>
                          {motivos.map((motivo) => (
                            <SelectItem key={motivo} value={motivo.toLowerCase()}>
                              {motivo}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mensaje">Mensaje</Label>
                      <Textarea
                        id="mensaje"
                        name="message"
                        placeholder="Escriba su mensaje aquí"
                        rows={5}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Enviar Mensaje
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </section>

            {/* Información de Contacto */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Áreas Municipales</h2>
              
              {areas.map((area) => (
                <Card key={area.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{area.nombre}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{area.telefono}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{area.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{area.horario}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{area.ubicacion}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Redes Sociales */}
              <Card>
                <CardHeader>
                  <CardTitle>Redes Sociales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://facebook.com/municipalidadmosconi" target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://twitter.com/municmosconi" target="_blank" rel="noopener noreferrer">
                      Twitter
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <a href="https://instagram.com/municmosconi" target="_blank" rel="noopener noreferrer">
                      Instagram
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Ubicación</h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.7379225825!2d-63.81999492374376!3d-22.618301079655736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM3JzA1LjkiUyA2M8KwNDknMDcuMiJX!5e0!3m2!1ses!2sar!4v1617304026548!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

