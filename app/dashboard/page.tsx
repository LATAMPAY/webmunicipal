import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { CalendarDateRangePicker } from '@/components/date-range-picker'
import { Button } from '@/components/ui/button'
import { 
  Activity,
  BarChart3,
  Calendar,
  Clock,
  FileText,
  Users,
  Wallet,
  Filter,
  Download
} from 'lucide-react'
import { NotificationsPanel } from '@/components/notifications-panel'
import { QuickTasks } from '@/components/quick-tasks'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

// Datos de ejemplo
const performanceData = [
  { name: 'Lun', completed: 4, pending: 2 },
  { name: 'Mar', completed: 3, pending: 1 },
  { name: 'Mie', completed: 5, pending: 3 },
  { name: 'Jue', completed: 6, pending: 2 },
  { name: 'Vie', completed: 4, pending: 1 }
]

const resourceData = [
  { name: 'Salas', usage: 75 },
  { name: 'Equipos', usage: 63 },
  { name: 'Vehículos', usage: 82 },
  { name: 'Otros', usage: 45 }
]

const workloadData = [
  { name: 'Sobrecargados', value: 5 },
  { name: 'Balanceados', value: 25 },
  { name: 'Subutilizados', value: 3 }
]

const COLORS = ['#FF8042', '#00C49F', '#FFBB28']

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Gestión y análisis de operaciones municipales
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <NotificationsPanel />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Departamento</DropdownMenuItem>
              <DropdownMenuItem>Estado</DropdownMenuItem>
              <DropdownMenuItem>Prioridad</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CalendarDateRangePicker />
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <QuickTasks />
        </div>
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Actividad Reciente</CardTitle>
              <CardDescription>
                Últimas actualizaciones y eventos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {[
                  {
                    icon: <FileText className="h-4 w-4" />,
                    title: "Nuevo documento agregado",
                    description: "Informe de presupuesto Q1 2024",
                    timestamp: "Hace 10 minutos"
                  },
                  {
                    icon: <Users className="h-4 w-4" />,
                    title: "Reunión programada",
                    description: "Planificación estratégica",
                    timestamp: "Hoy, 15:00"
                  },
                  {
                    icon: <Activity className="h-4 w-4" />,
                    title: "Proyecto actualizado",
                    description: "Parque Central - 75% completado",
                    timestamp: "Ayer"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border bg-muted">
                      {item.icon}
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="rendimiento">Rendimiento</TabsTrigger>
          <TabsTrigger value="recursos">Recursos</TabsTrigger>
          <TabsTrigger value="personal">Personal</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Tareas Completadas
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">120</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% vs. mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Uso de Recursos
                </CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75%</div>
                <p className="text-xs text-muted-foreground">
                  +5% vs. mes anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Personal Activo
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">33</div>
                <p className="text-xs text-muted-foreground">
                  +2 nuevas incorporaciones
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Presupuesto Utilizado
                </CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68%</div>
                <p className="text-xs text-muted-foreground">
                  Dentro del presupuesto
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Rendimiento Semanal</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completed" fill="#0ea5e9" name="Completadas" />
                    <Bar dataKey="pending" fill="#64748b" name="Pendientes" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Distribución de Carga</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={workloadData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {workloadData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="rendimiento" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Eficiencia por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'RR.HH.', value: 85 },
                    { name: 'IT', value: 92 },
                    { name: 'Admin', value: 78 },
                    { name: 'Legal', value: 88 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Tiempo Promedio de Resolución</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={[
                    { name: 'Lun', value: 2.5 },
                    { name: 'Mar', value: 2.1 },
                    { name: 'Mie', value: 2.8 },
                    { name: 'Jue', value: 2.3 },
                    { name: 'Vie', value: 2.0 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#0ea5e9" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximos Vencimientos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: 'Informe Mensual', date: '2024-02-28', priority: 'Alta' },
                    { title: 'Revisión de Presupuesto', date: '2024-03-01', priority: 'Media' },
                    { title: 'Evaluación de Personal', date: '2024-03-05', priority: 'Alta' },
                    { title: 'Actualización de Sistemas', date: '2024-03-07', priority: 'Baja' }
                  ].map((task, i) => (
                    <div key={i} className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        task.priority === 'Alta' ? 'bg-red-500' :
                        task.priority === 'Media' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.title}</p>
                        <p className="text-xs text-muted-foreground">{task.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recursos" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Uso de Recursos</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={resourceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="usage" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reservas Activas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { resource: 'Sala de Reuniones A', time: '10:00 - 11:30', user: 'Juan Pérez' },
                    { resource: 'Proyector 2', time: '14:00 - 16:00', user: 'María García' },
                    { resource: 'Vehículo 1', time: '09:00 - 13:00', user: 'Carlos López' },
                    { resource: 'Sala de Conferencias', time: '15:00 - 17:00', user: 'Ana Martínez' }
                  ].map((booking, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{booking.resource}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {booking.time}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{booking.user}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Estado de Recursos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Salas de Reuniones', available: 3, total: 5 },
                    { name: 'Proyectores', available: 2, total: 4 },
                    { name: 'Vehículos', available: 1, total: 3 },
                    { name: 'Equipos Portátiles', available: 5, total: 8 }
                  ].map((resource, i) => (
                    <div key={i} className="space-y-1">
                      <p className="text-sm font-medium">{resource.name}</p>
                      <div className="flex items-center">
                        <div className="h-2 flex-1 rounded-full bg-secondary">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{
                              width: `${((resource.total - resource.available) / resource.total) * 100}%`
                            }}
                          />
                        </div>
                        <span className="ml-2 text-sm text-muted-foreground">
                          {resource.available}/{resource.total} disponibles
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="personal" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Distribución por Departamento</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'RR.HH.', value: 8 },
                        { name: 'IT', value: 12 },
                        { name: 'Admin', value: 15 },
                        { name: 'Legal', value: 10 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Solicitudes Pendientes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'Vacaciones', employee: 'Juan Pérez', status: 'Pendiente', days: 5 },
                    { type: 'Permiso', employee: 'María García', status: 'En Revisión', days: 1 },
                    { type: 'Capacitación', employee: 'Carlos López', status: 'Pendiente', days: 3 },
                    { type: 'Vacaciones', employee: 'Ana Martínez', status: 'En Revisión', days: 7 }
                  ].map((request, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{request.type}</p>
                        <p className="text-xs text-muted-foreground">{request.employee}</p>
                      </div>
                      <div className="text-sm">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          request.status === 'Pendiente' 
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {request.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Próximas Evaluaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { employee: 'Juan Pérez', date: '2024-03-15', type: 'Desempeño' },
                    { employee: 'María García', date: '2024-03-18', type: 'Objetivos' },
                    { employee: 'Carlos López', date: '2024-03-20', type: 'Desempeño' },
                    { employee: 'Ana Martínez', date: '2024-03-22', type: 'Objetivos' }
                  ].map((eval, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium">{eval.employee}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          {eval.date}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{eval.type}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 