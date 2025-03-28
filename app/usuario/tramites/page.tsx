import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateMetadata } from "@/components/metadata"
import { FileText, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = generateMetadata({
  title: "Mis Trámites - Portal del Vecino",
  description: "Gestione sus trámites municipales",
  keywords: ["trámites", "gestión", "municipalidad", "servicios"],
})

// Datos de ejemplo - En producción vendrían de una API
const tramites = [
  {
    id: "T-2024-001",
    tipo: "Habilitación Comercial",
    estado: "En Proceso",
    fecha: "2024-03-15",
    area: "Comercio",
    descripcion: "Habilitación para local comercial",
    ultimaActualizacion: "2024-03-16",
  },
  {
    id: "T-2024-002",
    tipo: "Licencia de Conducir",
    estado: "Pendiente",
    fecha: "2024-03-14",
    area: "Tránsito",
    descripcion: "Renovación de licencia",
    ultimaActualizacion: "2024-03-14",
  },
  {
    id: "T-2024-003",
    tipo: "Permiso de Construcción",
    estado: "Completado",
    fecha: "2024-02-28",
    area: "Obras Particulares",
    descripcion: "Permiso para ampliación",
    ultimaActualizacion: "2024-03-10",
  },
]

const tiposTramite = [
  "Habilitación Comercial",
  "Licencia de Conducir",
  "Permiso de Construcción",
  "Certificado de Residencia",
  "Reclamo",
]

const estados = ["Todos", "En Proceso", "Pendiente", "Completado", "Rechazado"]
const areas = ["Todas", "Comercio", "Tránsito", "Obras Particulares", "Atención al Vecino"]

export default function TramitesPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Trámites</h1>
          <p className="text-muted-foreground">
            Gestione sus trámites municipales
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Nuevo Trámite
        </Button>
      </div>

      <Tabs defaultValue="activos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="activos">Trámites Activos</TabsTrigger>
          <TabsTrigger value="historial">Historial</TabsTrigger>
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
              <Input placeholder="Buscar por ID o descripción" />
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
                  {tiposTramite.map((tipo) => (
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
        </div>

        <TabsContent value="activos">
          <div className="grid gap-4">
            {tramites
              .filter((t) => t.estado !== "Completado")
              .map((tramite) => (
                <Card key={tramite.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{tramite.tipo}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {tramite.descripcion}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>ID: {tramite.id}</span>
                          <span>Área: {tramite.area}</span>
                          <span>Iniciado: {tramite.fecha}</span>
                          <span>Última actualización: {tramite.ultimaActualizacion}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${
                            tramite.estado === "En Proceso"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {tramite.estado}
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

        <TabsContent value="historial">
          <div className="grid gap-4">
            {tramites
              .filter((t) => t.estado === "Completado")
              .map((tramite) => (
                <Card key={tramite.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{tramite.tipo}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {tramite.descripcion}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>ID: {tramite.id}</span>
                          <span>Área: {tramite.area}</span>
                          <span>Iniciado: {tramite.fecha}</span>
                          <span>Última actualización: {tramite.ultimaActualizacion}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm px-2.5 py-0.5 rounded-full font-medium bg-green-100 text-green-800">
                          {tramite.estado}
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