"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertTriangle, ChevronRight, MapPin, AlertCircle, FileCheck, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { submitComplaint } from "@/lib/actions"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"

const complaintCategories = [
  { value: "alumbrado", label: "Alumbrado Público" },
  { value: "calles", label: "Calles y Veredas" },
  { value: "residuos", label: "Recolección de Residuos" },
  { value: "agua", label: "Agua y Cloacas" },
  { value: "transito", label: "Tránsito y Señalización" },
  { value: "espacios_publicos", label: "Espacios Públicos" },
  { value: "ruidos", label: "Ruidos Molestos" },
  { value: "otros", label: "Otros" },
]

export default function ReclamosPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, loading } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState("")

  async function handleSubmit(formData: FormData) {
    if (!user) {
      toast({
        title: "Acceso denegado",
        description: "Debe iniciar sesión para enviar un reclamo",
        variant: "destructive",
      })
      router.push("/area-usuario/login")
      return
    }

    setIsLoading(true)

    try {
      const result = await submitComplaint(formData)

      if (result.success) {
        toast({
          title: "Reclamo enviado",
          description: "Su reclamo ha sido enviado correctamente. Puede seguir su estado en su panel de usuario.",
          variant: "default",
        })

        // Reset form
        const form = document.getElementById("complaintForm") as HTMLFormElement
        form.reset()
        setCategory("")

        // Redirect to user dashboard
        router.push("/area-usuario")
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
            <h1 className="text-4xl font-bold mb-4">Sistema de Reclamos</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl">
              Presente sus reclamos y sugerencias. Nos comprometemos a dar seguimiento y respuesta a todas las solicitudes en un plazo máximo de 48 horas hábiles.
            </p>
          </div>
        </div>

        <div className="container py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {!user && !loading ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Iniciar Sesión</CardTitle>
                    <CardDescription>Para realizar un reclamo, debe iniciar sesión o registrarse</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Acceso Restringido</h3>
                    <p className="text-muted-foreground mb-6">
                      Para enviar un reclamo o consulta, debe iniciar sesión con su cuenta municipal
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/area-usuario/login">
                        <Button>Iniciar Sesión</Button>
                      </Link>
                      <Link href="/area-usuario/registro">
                        <Button variant="outline">Registrarse</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="bg-card border rounded-lg p-8 shadow-sm">
                  <h2 className="text-2xl font-bold mb-6">Formulario de Reclamos</h2>
                  <form id="complaintForm" action={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría</Label>
                      <Select value={category} onValueChange={setCategory} name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {complaintCategories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="Describa brevemente su reclamo"
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Descripción</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describa detalladamente su reclamo..."
                        rows={6}
                        required
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Ubicación</Label>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-muted-foreground" />
                        <Input
                          id="location"
                          name="location"
                          placeholder="Dirección o ubicación del problema"
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <input type="hidden" name="latitude" value="" />
                    <input type="hidden" name="longitude" value="" />

                    <Button type="submit" className="w-full" disabled={isLoading || loading}>
                      {isLoading ? "Enviando..." : "Enviar Reclamo"}
                    </Button>
                  </form>
                </div>
              )}
            </div>

            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Estado de Reclamos</CardTitle>
                  <CardDescription>Consulte el estado de sus reclamos y denuncias</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Para consultar el estado de sus reclamos, acceda a su panel de usuario.</p>
                </CardContent>
                <CardFooter>
                  <Link href="/area-usuario" className="w-full">
                    <Button className="w-full">
                      Ir a Mi Panel <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Preguntas Frecuentes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-1">¿Cuánto tiempo tarda en resolverse un reclamo?</h3>
                    <p className="text-sm text-muted-foreground">
                      El tiempo de resolución depende del tipo de reclamo. En general, los reclamos se resuelven en un
                      plazo de 5 a 15 días hábiles.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">¿Cómo puedo hacer un seguimiento de mi reclamo?</h3>
                    <p className="text-sm text-muted-foreground">
                      Puede hacer seguimiento de su reclamo a través de su panel de usuario, donde verá el estado
                      actualizado.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">¿Qué hago si mi reclamo no fue resuelto?</h3>
                    <p className="text-sm text-muted-foreground">
                      Si su reclamo no fue resuelto en el plazo establecido, puede realizar un nuevo reclamo o
                      contactarse directamente con la oficina correspondiente.
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/servicios/reclamos/faq" className="w-full">
                    <Button variant="outline" className="w-full">
                      Ver todas las preguntas <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contacto Directo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">Si prefiere realizar su reclamo por teléfono o de forma presencial:</p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Teléfono:</span> (123) 456-7890
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> reclamos@generalmosconi.gob.ar
                    </p>
                    <p>
                      <span className="font-semibold">Dirección:</span> Av. Principal 123, Oficina de Atención al
                      Ciudadano
                    </p>
                    <p>
                      <span className="font-semibold">Horario:</span> Lunes a Viernes de 8:00 a 16:00
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

