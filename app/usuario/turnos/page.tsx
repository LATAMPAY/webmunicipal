import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateMetadata } from "@/components/metadata"
import { Calendar as CalendarIcon, Clock, Filter, MapPin, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"

export const metadata = generateMetadata({
  title: "Mis Turnos - Portal del Vecino",
  description: "Gestione sus turnos municipales",
  keywords: ["turnos", "citas", "atención", "municipalidad"],
})

// Datos de ejemplo - En producción vendrían de una API
const turnos = [
  {
    id: "T-2024-001",
    area: "Licencias de Conducir",
    tipo: "Renovación",
    fecha: "2024-03-20",
    hora: "10:00",
    lugar: "Palacio Municipal",
    estado: "Confirmado",
  },
  {
    id: "T-2024-002",
    area: "Obras Particulares",
    tipo: "Consulta",
    fecha: "2024-03-25",
    hora: "14:30",
    lugar: "Oficina de Obras",
    estado: "Pendiente",
  },
  {
    id: "T-2024-003",
    area: "Atención al Vecino",
    tipo: "Reclamo",
    fecha: "2024-02-28",
    hora: "09:15",
    lugar: "Centro de Atención",
    estado: "Completado",
  },
]

const areas = [
  "Licencias de Conducir",
  "Obras Particulares",
  "Atención al Vecino",
  "Comercio",
  "Tránsito",
]

const estados = ["Todos", "Confirmado", "Pendiente", "Completado", "Cancelado"]
const tipos = ["Todos", "Renovación", "Consulta", "Reclamo", "Trámite"]

export default function TurnosPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Turnos</h1>
          <p className="text-muted-foreground">
            Gestione sus turnos municipales
          </p>
        </div>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" />
          Solicitar Turno
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendario */}
        <Card>
          <CardHeader>
            <CardTitle>Calendario de Turnos</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>

        {/* Próximos Turnos */}
        <Card>
          <CardHeader>
            <CardTitle>Próximos Turnos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {turnos
                .filter(t => t.estado !== "Completado")
                .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
                .slice(0, 3)
                .map(turno => (
                  <div
                    key={turno.id}
                    className="flex items-start justify-between border-b last:border-0 pb-4 last:pb-0"
                  >
                    <div>
                      <h3 className="font-semibold">{turno.area}</h3>
                      <p className="text-sm text-muted-foreground">
                        {turno.tipo}
                      </p>
                      <div className="flex gap-2 items-center text-sm text-muted-foreground mt-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{turno.fecha}</span>
                        <Clock className="h-4 w-4 ml-2" />
                        <span>{turno.hora}</span>
                      </div>
                    </div>
                    <span
                      className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${
                        turno.estado === "Confirmado"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {turno.estado}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="proximos" className="space-y-6">
        <TabsList>
          <TabsTrigger value="proximos">Turnos Próximos</TabsTrigger>
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
              <Input placeholder="Buscar por área o tipo" />
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

        <TabsContent value="proximos">
          <div className="grid gap-4">
            {turnos
              .filter((t) => t.estado !== "Completado")
              .map((turno) => (
                <Card key={turno.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{turno.area}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {turno.tipo}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>ID: {turno.id}</span>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {turno.fecha}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {turno.hora}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {turno.lugar}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${
                            turno.estado === "Confirmado"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {turno.estado}
                        </span>
                        <Button variant="outline" size="sm">
                          Cancelar
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
            {turnos
              .filter((t) => t.estado === "Completado")
              .map((turno) => (
                <Card key={turno.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{turno.area}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {turno.tipo}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>ID: {turno.id}</span>
                          <div className="flex items-center">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            {turno.fecha}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {turno.hora}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {turno.lugar}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm px-2.5 py-0.5 rounded-full font-medium bg-gray-100 text-gray-800">
                        {turno.estado}
                      </span>
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