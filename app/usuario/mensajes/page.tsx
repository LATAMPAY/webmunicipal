import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateMetadata } from "@/components/metadata"
import { Bell, Filter, Mail, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = generateMetadata({
  title: "Mis Mensajes - Portal del Vecino",
  description: "Gestione sus mensajes y notificaciones municipales",
  keywords: ["mensajes", "notificaciones", "comunicaciones", "municipalidad"],
})

// Datos de ejemplo - En producción vendrían de una API
const mensajes = [
  {
    id: "M-2024-001",
    tipo: "Notificación",
    asunto: "Actualización de Trámite",
    contenido: "Su trámite de habilitación comercial ha sido actualizado. Por favor, revise los detalles en la sección de trámites.",
    fecha: "2024-03-15",
    hora: "14:30",
    leido: false,
    area: "Comercio",
  },
  {
    id: "M-2024-002",
    tipo: "Mensaje",
    asunto: "Respuesta a Consulta",
    contenido: "En respuesta a su consulta sobre los requisitos para la renovación de licencia de conducir, le informamos que...",
    fecha: "2024-03-14",
    hora: "10:15",
    leido: true,
    area: "Tránsito",
    remitente: "Oficina de Licencias",
  },
  {
    id: "M-2024-003",
    tipo: "Notificación",
    asunto: "Pago Próximo a Vencer",
    contenido: "Le recordamos que tiene un pago que vence en los próximos días. Por favor, regularice su situación para evitar recargos.",
    fecha: "2024-03-13",
    hora: "09:00",
    leido: true,
    area: "Rentas",
  },
]

const tipos = ["Todos", "Notificación", "Mensaje"]
const areas = ["Todas", "Comercio", "Tránsito", "Rentas", "Obras Particulares"]
const estados = ["Todos", "Leídos", "No Leídos"]

export default function MensajesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Mensajes</h1>
          <p className="text-muted-foreground">
            Gestione sus mensajes y notificaciones
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Bell className="mr-2 h-4 w-4" />
            Marcar Todo como Leído
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Nuevo Mensaje
          </Button>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Mensajes No Leídos</h3>
              <p className="text-3xl font-bold text-primary">
                {mensajes.filter(m => !m.leido).length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">
                Total de mensajes
              </p>
              <p className="font-medium">
                {mensajes.length}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="todos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          <TabsTrigger value="mensajes">Mensajes</TabsTrigger>
        </TabsList>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                <Search className="h-4 w-4 inline mr-2" />
                Buscar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="Buscar por asunto o contenido" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                <Filter className="h-4 w-4 inline mr-2" />
                Tipo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tipos.map((tipo) => (
                    <SelectItem key={tipo} value={tipo.toLowerCase()}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                <Filter className="h-4 w-4 inline mr-2" />
                Área
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar área" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area.toLowerCase()}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                <Filter className="h-4 w-4 inline mr-2" />
                Estado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado.toLowerCase()}>
                      {estado}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <TabsContent value="todos">
          <div className="grid gap-4">
            {mensajes.map((mensaje) => (
              <Card
                key={mensaje.id}
                className={mensaje.leido ? "" : "bg-primary/5 border-primary/10"}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-muted-foreground">
                          {mensaje.area}
                        </span>
                        {mensaje.remitente && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm font-medium text-muted-foreground">
                              {mensaje.remitente}
                            </span>
                          </>
                        )}
                      </div>
                      <h3 className="font-semibold">{mensaje.asunto}</h3>
                      <p className="text-sm text-muted-foreground mt-2">
                        {mensaje.contenido}
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-4">
                        <span>ID: {mensaje.id}</span>
                        <span>{mensaje.fecha}</span>
                        <span>{mensaje.hora}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span
                        className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${
                          mensaje.tipo === "Notificación"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {mensaje.tipo}
                      </span>
                      <Button variant="outline" size="sm">
                        Ver Detalles
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notificaciones">
          <div className="grid gap-4">
            {mensajes
              .filter((m) => m.tipo === "Notificación")
              .map((mensaje) => (
                <Card
                  key={mensaje.id}
                  className={mensaje.leido ? "" : "bg-primary/5 border-primary/10"}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            {mensaje.area}
                          </span>
                        </div>
                        <h3 className="font-semibold">{mensaje.asunto}</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {mensaje.contenido}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-4">
                          <span>ID: {mensaje.id}</span>
                          <span>{mensaje.fecha}</span>
                          <span>{mensaje.hora}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-sm px-2.5 py-0.5 rounded-full font-medium bg-blue-100 text-blue-800">
                          {mensaje.tipo}
                        </span>
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="mensajes">
          <div className="grid gap-4">
            {mensajes
              .filter((m) => m.tipo === "Mensaje")
              .map((mensaje) => (
                <Card
                  key={mensaje.id}
                  className={mensaje.leido ? "" : "bg-primary/5 border-primary/10"}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-muted-foreground">
                            {mensaje.area}
                          </span>
                          {mensaje.remitente && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <span className="text-sm font-medium text-muted-foreground">
                                {mensaje.remitente}
                              </span>
                            </>
                          )}
                        </div>
                        <h3 className="font-semibold">{mensaje.asunto}</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                          {mensaje.contenido}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground mt-4">
                          <span>ID: {mensaje.id}</span>
                          <span>{mensaje.fecha}</span>
                          <span>{mensaje.hora}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-sm px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800">
                          {mensaje.tipo}
                        </span>
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 