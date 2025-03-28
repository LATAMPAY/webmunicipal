import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Filter, Download } from "lucide-react"

// Datos de ejemplo - En producción vendrían de una API
const ordenanzas = [
  {
    id: "2024-001",
    titulo: "Presupuesto General de Gastos y Recursos 2024",
    fecha: "2024-01-15",
    categoria: "Hacienda",
    descripcion: "Aprobación del presupuesto municipal para el ejercicio 2024",
    estado: "Vigente",
    archivo: "/documentos/ordenanzas/2024-001.pdf",
  },
  {
    id: "2024-002",
    titulo: "Código de Edificación",
    fecha: "2024-02-01",
    categoria: "Obras Públicas",
    descripcion: "Actualización del código de edificación municipal",
    estado: "Vigente",
    archivo: "/documentos/ordenanzas/2024-002.pdf",
  },
  {
    id: "2024-003",
    titulo: "Regulación de Comercios",
    fecha: "2024-02-15",
    categoria: "Comercio",
    descripcion: "Normativa para habilitaciones comerciales",
    estado: "Vigente",
    archivo: "/documentos/ordenanzas/2024-003.pdf",
  },
]

const resoluciones = [
  {
    id: "2024-R001",
    titulo: "Designación de Personal",
    fecha: "2024-01-10",
    categoria: "Personal",
    descripcion: "Designaciones en planta permanente",
    estado: "Vigente",
    archivo: "/documentos/resoluciones/2024-R001.pdf",
  },
  {
    id: "2024-R002",
    titulo: "Licitación Pública N° 01/2024",
    fecha: "2024-01-20",
    categoria: "Contrataciones",
    descripcion: "Llamado a licitación para obra pública",
    estado: "Vigente",
    archivo: "/documentos/resoluciones/2024-R002.pdf",
  },
]

const categorias = [
  "Todas",
  "Hacienda",
  "Obras Públicas",
  "Comercio",
  "Personal",
  "Contrataciones",
  "Tránsito",
  "Medio Ambiente",
]

export default function NormativasPage() {
  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Normativas Municipales</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Acceda a todas las ordenanzas y resoluciones vigentes de la Municipalidad
        </p>
      </section>

      {/* Buscador y Filtros */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar normativas..."
                className="pl-9"
              />
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Año" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabs de Normativas */}
      <Tabs defaultValue="ordenanzas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="ordenanzas">Ordenanzas</TabsTrigger>
          <TabsTrigger value="resoluciones">Resoluciones</TabsTrigger>
        </TabsList>

        <TabsContent value="ordenanzas" className="space-y-4">
          {ordenanzas.map((ord) => (
            <Card key={ord.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{ord.titulo}</CardTitle>
                    <CardDescription>
                      Ordenanza N° {ord.id} - {new Date(ord.fecha).toLocaleDateString("es-AR")}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="icon" asChild>
                    <a href={ord.archivo} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{ord.descripcion}</p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {ord.categoria}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                    {ord.estado}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resoluciones" className="space-y-4">
          {resoluciones.map((res) => (
            <Card key={res.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{res.titulo}</CardTitle>
                    <CardDescription>
                      Resolución N° {res.id} - {new Date(res.fecha).toLocaleDateString("es-AR")}
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="icon" asChild>
                    <a href={res.archivo} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{res.descripcion}</p>
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {res.categoria}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                    {res.estado}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Información Adicional */}
      <div className="mt-12 grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Boletín Oficial</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Acceda al Boletín Oficial Municipal donde se publican todas las normativas.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/boletin-oficial" target="_blank" rel="noopener noreferrer">
                Ver Boletín Oficial
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Digesto Municipal</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Consulte el Digesto Municipal para acceder a la compilación de todas las normas vigentes.
            </p>
            <Button variant="outline" className="w-full" asChild>
              <a href="/digesto" target="_blank" rel="noopener noreferrer">
                Acceder al Digesto
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 