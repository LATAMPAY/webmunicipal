import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateMetadata } from "@/components/metadata"
import { Filter, Search, Wallet, Download } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const metadata = generateMetadata({
  title: "Mis Pagos - Portal del Vecino",
  description: "Gestione sus pagos municipales",
  keywords: ["pagos", "tasas", "impuestos", "municipalidad"],
})

// Datos de ejemplo - En producción vendrían de una API
const pagos = [
  {
    id: "P-2024-001",
    concepto: "Tasa Municipal",
    monto: 5000,
    vencimiento: "2024-03-31",
    estado: "Pendiente",
    periodo: "Marzo 2024",
    mediosPago: ["tarjeta", "transferencia", "efectivo"],
  },
  {
    id: "P-2024-002",
    concepto: "Impuesto Inmobiliario",
    monto: 3500,
    vencimiento: "2024-03-25",
    estado: "Pendiente",
    periodo: "1er Trimestre 2024",
    mediosPago: ["tarjeta", "transferencia"],
  },
  {
    id: "P-2024-003",
    concepto: "Tasa Municipal",
    monto: 4800,
    fechaPago: "2024-02-28",
    estado: "Pagado",
    periodo: "Febrero 2024",
    comprobante: "REC-2024-003.pdf",
  },
]

const conceptos = ["Todos", "Tasa Municipal", "Impuesto Inmobiliario", "Servicios", "Multas"]
const estados = ["Todos", "Pendiente", "Pagado", "Vencido"]
const periodos = ["2024", "2023", "2022", "2021"]

export default function PagosPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Mis Pagos</h1>
          <p className="text-muted-foreground">
            Gestione sus pagos municipales
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Descargar Estado de Cuenta
          </Button>
          <Button>
            <Wallet className="mr-2 h-4 w-4" />
            Realizar Pago
          </Button>
        </div>
      </div>

      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">Saldo Total Pendiente</h3>
              <p className="text-3xl font-bold text-primary">
                ${pagos.filter(p => p.estado === "Pendiente").reduce((acc, p) => acc + p.monto, 0)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">
                Próximo vencimiento
              </p>
              <p className="font-medium">
                {pagos
                  .filter(p => p.estado === "Pendiente")
                  .sort((a, b) => new Date(a.vencimiento).getTime() - new Date(b.vencimiento).getTime())[0]?.vencimiento}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pendientes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pendientes">Pagos Pendientes</TabsTrigger>
          <TabsTrigger value="historial">Historial de Pagos</TabsTrigger>
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
              <Input placeholder="Buscar por concepto o ID" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                <Filter className="h-4 w-4 inline mr-2" />
                Concepto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar concepto" />
                </SelectTrigger>
                <SelectContent>
                  {conceptos.map((concepto) => (
                    <SelectItem key={concepto} value={concepto.toLowerCase()}>
                      {concepto}
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
                Período
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar período" />
                </SelectTrigger>
                <SelectContent>
                  {periodos.map((periodo) => (
                    <SelectItem key={periodo} value={periodo}>
                      {periodo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        <TabsContent value="pendientes">
          <div className="grid gap-4">
            {pagos
              .filter((p) => p.estado === "Pendiente")
              .map((pago) => (
                <Card key={pago.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{pago.concepto}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Período: {pago.periodo}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>ID: {pago.id}</span>
                          <span>Vencimiento: {pago.vencimiento}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Monto</p>
                          <p className="font-semibold">${pago.monto}</p>
                        </div>
                        <Button>Pagar</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="historial">
          <div className="grid gap-4">
            {pagos
              .filter((p) => p.estado === "Pagado")
              .map((pago) => (
                <Card key={pago.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{pago.concepto}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Período: {pago.periodo}
                        </p>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>ID: {pago.id}</span>
                          <span>Fecha de pago: {pago.fechaPago}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground mb-1">Monto</p>
                          <p className="font-semibold">${pago.monto}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Comprobante
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