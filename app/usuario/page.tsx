import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { generateMetadata } from "@/components/metadata"
import { LoadingState } from "@/components/loading-state"
import { FileText, Wallet, Calendar, Bell } from "lucide-react"

export const metadata = generateMetadata({
  title: "Portal del Vecino",
  description: "Acceda a todos los servicios municipales desde un solo lugar",
  keywords: ["portal", "vecino", "servicios", "trámites", "pagos"],
})

// Datos de ejemplo - En producción vendrían de una API
const tramitesRecientes = [
  {
    id: "T-2024-001",
    tipo: "Habilitación Comercial",
    estado: "En Proceso",
    fecha: "2024-03-15",
  },
  {
    id: "T-2024-002",
    tipo: "Licencia de Conducir",
    estado: "Pendiente",
    fecha: "2024-03-14",
  },
]

const pagosPendientes = [
  {
    id: "P-2024-001",
    concepto: "Tasa Municipal",
    monto: 5000,
    vencimiento: "2024-03-31",
  },
  {
    id: "P-2024-002",
    concepto: "Impuesto Inmobiliario",
    monto: 3500,
    vencimiento: "2024-03-25",
  },
]

const turnosProximos = [
  {
    id: "C-2024-001",
    area: "Licencias",
    fecha: "2024-03-20",
    hora: "10:00",
  },
]

const notificaciones = [
  {
    id: 1,
    titulo: "Trámite Actualizado",
    mensaje: "Su trámite de habilitación comercial ha sido actualizado",
    fecha: "2024-03-15",
    leida: false,
  },
  {
    id: 2,
    titulo: "Pago Próximo a Vencer",
    mensaje: "Tiene un pago que vence en los próximos días",
    fecha: "2024-03-14",
    leida: true,
  },
]

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Bienvenido, Juan</h1>
        <p className="text-muted-foreground">
          Acceda a todos los servicios municipales desde un solo lugar
        </p>
      </div>

      {/* Accesos Rápidos */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:border-primary transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <FileText className="h-4 w-4 mr-2" />
              Iniciar Trámite
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Inicie un nuevo trámite municipal
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <Wallet className="h-4 w-4 mr-2" />
              Realizar Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Pague sus tasas e impuestos
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <Calendar className="h-4 w-4 mr-2" />
              Solicitar Turno
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Reserve un turno para atención
            </p>
          </CardContent>
        </Card>

        <Card className="hover:border-primary transition-colors cursor-pointer">
          <CardHeader>
            <CardTitle className="flex items-center text-sm font-medium">
              <Bell className="h-4 w-4 mr-2" />
              Ver Notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {notificaciones.filter(n => !n.leida).length} notificaciones sin leer
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Trámites Recientes */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Trámites Recientes</CardTitle>
              <Button variant="ghost" size="sm">Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tramitesRecientes.map((tramite) => (
                <div
                  key={tramite.id}
                  className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{tramite.tipo}</p>
                    <p className="text-sm text-muted-foreground">
                      {tramite.id} - {tramite.fecha}
                    </p>
                  </div>
                  <span className={`text-sm px-2.5 py-0.5 rounded-full font-medium ${
                    tramite.estado === "En Proceso"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {tramite.estado}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pagos Pendientes */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Pagos Pendientes</CardTitle>
              <Button variant="ghost" size="sm">Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pagosPendientes.map((pago) => (
                <div
                  key={pago.id}
                  className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{pago.concepto}</p>
                    <p className="text-sm text-muted-foreground">
                      Vence: {pago.vencimiento}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${pago.monto}</p>
                    <Button size="sm" variant="outline">Pagar</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Turnos Próximos */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Turnos Próximos</CardTitle>
              <Button variant="ghost" size="sm">Ver todos</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {turnosProximos.map((turno) => (
                <div
                  key={turno.id}
                  className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{turno.area}</p>
                    <p className="text-sm text-muted-foreground">
                      {turno.fecha} - {turno.hora}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">Cancelar</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notificaciones */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Notificaciones</CardTitle>
              <Button variant="ghost" size="sm">Ver todas</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notificaciones.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start justify-between border-b last:border-0 pb-4 last:pb-0 ${
                    !notif.leida ? "bg-primary/5" : ""
                  }`}
                >
                  <div>
                    <p className="font-medium">{notif.titulo}</p>
                    <p className="text-sm text-muted-foreground">
                      {notif.mensaje}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {notif.fecha}
                    </p>
                  </div>
                  {!notif.leida && (
                    <span className="h-2 w-2 bg-primary rounded-full mt-2" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 