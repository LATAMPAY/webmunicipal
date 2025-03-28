import { redirect } from "next/navigation"
import Link from "next/link"
import { getUser, getUserAppointments, getUserComplaints } from "@/lib/actions"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, FileText, Bell, User, CreditCard, Clock } from "lucide-react"

export default async function UserDashboardPage() {
  const user = await getUser()

  if (!user) {
    redirect("/area-usuario/login")
  }

  const appointments = await getUserAppointments()
  const complaints = await getUserComplaints()

  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <div className="flex-1 bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Mi Panel</h1>
              <p className="text-muted-foreground">
                Bienvenido, {user.name}. Gestione sus trámites y servicios municipales.
              </p>
            </div>
            <Link href="/area-usuario/perfil">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Mi Perfil
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Turnos Pendientes</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments?.length || 0}</div>
              </CardContent>
              <CardFooter>
                <Link href="/servicios/turnos" className="text-sm text-muted-foreground hover:text-primary">
                  Solicitar nuevo turno
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Reclamos Activos</CardTitle>
                <Bell className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{complaints?.length || 0}</div>
              </CardContent>
              <CardFooter>
                <Link href="/servicios/reclamos" className="text-sm text-muted-foreground hover:text-primary">
                  Realizar nuevo reclamo
                </Link>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Pagos Pendientes</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
              </CardContent>
              <CardFooter>
                <Link href="/servicios/pagos-municipales" className="text-sm text-muted-foreground hover:text-primary">
                  Ver pagos
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="appointments">Mis Turnos</TabsTrigger>
              <TabsTrigger value="complaints">Mis Reclamos</TabsTrigger>
              <TabsTrigger value="payments">Mis Pagos</TabsTrigger>
            </TabsList>
            <TabsContent value="appointments">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Turnos</CardTitle>
                  <CardDescription>Gestione sus turnos para trámites municipales</CardDescription>
                </CardHeader>
                <CardContent>
                  {appointments && appointments.length > 0 ? (
                    <div className="space-y-4">
                      {appointments.map((appointment: any) => (
                        <div key={appointment.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">{appointment.service}</h3>
                              <p className="text-sm text-muted-foreground">Departamento: {appointment.department}</p>
                              <div className="flex items-center mt-2 text-sm">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                                  {new Date(appointment.appointment_date).toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  appointment.status === "scheduled"
                                    ? "bg-blue-100 text-blue-800"
                                    : appointment.status === "completed"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                {appointment.status === "scheduled"
                                  ? "Programado"
                                  : appointment.status === "completed"
                                    ? "Completado"
                                    : "Cancelado"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No tiene turnos programados</h3>
                      <p className="text-muted-foreground mb-4">Solicite un turno para realizar trámites municipales</p>
                      <Link href="/servicios/turnos">
                        <Button>Solicitar Turno</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="complaints">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Reclamos</CardTitle>
                  <CardDescription>Consulte el estado de sus reclamos y denuncias</CardDescription>
                </CardHeader>
                <CardContent>
                  {complaints && complaints.length > 0 ? (
                    <div className="space-y-4">
                      {complaints.map((complaint: any) => (
                        <div key={complaint.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-semibold">{complaint.subject}</h3>
                              <p className="text-sm text-muted-foreground">Categoría: {complaint.category}</p>
                              <div className="flex items-center mt-2 text-sm">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>
                                  {new Date(complaint.created_at).toLocaleDateString("es-ES", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                            <div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  complaint.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : complaint.status === "in_progress"
                                      ? "bg-blue-100 text-blue-800"
                                      : complaint.status === "resolved"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                }`}
                              >
                                {complaint.status === "pending"
                                  ? "Pendiente"
                                  : complaint.status === "in_progress"
                                    ? "En Proceso"
                                    : complaint.status === "resolved"
                                      ? "Resuelto"
                                      : "Rechazado"}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No tiene reclamos activos</h3>
                      <p className="text-muted-foreground mb-4">Realice un reclamo o consulta a la municipalidad</p>
                      <Link href="/servicios/reclamos">
                        <Button>Realizar Reclamo</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Mis Pagos</CardTitle>
                  <CardDescription>Consulte sus pagos y facturas pendientes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tiene pagos pendientes</h3>
                    <p className="text-muted-foreground mb-4">Consulte sus impuestos y servicios municipales</p>
                    <Link href="/servicios/pagos-municipales">
                      <Button>Ver Pagos Municipales</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Accesos Rápidos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Link href="/servicios/tramites">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" /> Trámites Online
                    </Button>
                  </Link>
                  <Link href="/servicios/pagos-municipales">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" /> Pagos Municipales
                    </Button>
                  </Link>
                  <Link href="/servicios/turnos">
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" /> Turnos Online
                    </Button>
                  </Link>
                  <Link href="/servicios/reclamos">
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" /> Reclamos y Consultas
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notificaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No tiene notificaciones</h3>
                  <p className="text-muted-foreground">Las notificaciones importantes aparecerán aquí</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

