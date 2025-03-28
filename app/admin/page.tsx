import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateMetadata } from "@/components/metadata"
import { LoadingState, CardSkeleton } from "@/components/loading-state"
import { Users, FileText, MessageSquare, Wallet } from "lucide-react"

export const metadata = generateMetadata({
  title: "Panel Administrativo",
  description: "Panel de administración de la Municipalidad de General Mosconi",
  keywords: ["admin", "panel", "gestión", "municipalidad"],
})

// Datos de ejemplo - En producción vendrían de una API
const stats = [
  {
    title: "Usuarios Registrados",
    value: "1,234",
    description: "Total de usuarios en la plataforma",
    icon: Users,
  },
  {
    title: "Trámites Activos",
    value: "156",
    description: "Trámites en proceso",
    icon: FileText,
  },
  {
    title: "Mensajes Nuevos",
    value: "23",
    description: "Mensajes sin responder",
    icon: MessageSquare,
  },
  {
    title: "Pagos del Día",
    value: "$45,678",
    description: "Total recaudado hoy",
    icon: Wallet,
  },
]

const recentActivity = [
  {
    type: "TRAMITE",
    description: "Nuevo trámite de habilitación comercial",
    user: "Juan Pérez",
    time: "Hace 5 minutos",
  },
  {
    type: "PAGO",
    description: "Pago de tasa municipal",
    user: "María González",
    time: "Hace 15 minutos",
  },
  {
    type: "MENSAJE",
    description: "Consulta sobre servicios",
    user: "Carlos Rodríguez",
    time: "Hace 30 minutos",
  },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Panel Administrativo</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de administración. Aquí encontrará un resumen de la actividad reciente.
        </p>
      </div>

      {/* Estadísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Actividad Reciente */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
          <CardDescription>
            Últimas acciones realizadas en la plataforma
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0"
              >
                <div>
                  <p className="font-medium">{activity.description}</p>
                  <p className="text-sm text-muted-foreground">
                    Por {activity.user}
                  </p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Accesos Rápidos */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Gestión de Usuarios</CardTitle>
            <CardDescription>
              Administre usuarios y permisos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Ver listado de usuarios</li>
              <li>Crear nuevo usuario</li>
              <li>Modificar permisos</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trámites</CardTitle>
            <CardDescription>
              Gestione los trámites municipales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Trámites pendientes</li>
              <li>Aprobar solicitudes</li>
              <li>Ver historial</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reportes</CardTitle>
            <CardDescription>
              Acceda a los reportes del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li>Estadísticas generales</li>
              <li>Reportes financieros</li>
              <li>Actividad del sistema</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 