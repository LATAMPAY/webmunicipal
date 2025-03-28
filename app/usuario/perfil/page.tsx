import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { generateMetadata } from "@/components/metadata"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Camera, Key, Lock, User } from "lucide-react"

export const metadata = generateMetadata({
  title: "Mi Perfil - Portal del Vecino",
  description: "Gestione su información personal y preferencias",
  keywords: ["perfil", "cuenta", "configuración", "datos personales"],
})

// Datos de ejemplo - En producción vendrían de una API
const usuario = {
  id: "U-2024-001",
  nombre: "Juan",
  apellido: "Pérez",
  dni: "12345678",
  email: "juan.perez@email.com",
  telefono: "+54 9 11 1234-5678",
  direccion: "Av. Principal 123",
  localidad: "General Mosconi",
  provincia: "Salta",
  codigoPostal: "4562",
  fechaRegistro: "2024-01-15",
  ultimoAcceso: "2024-03-15 14:30",
  notificaciones: {
    email: true,
    sms: false,
    whatsapp: true,
  },
}

export default function PerfilPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">
          Gestione su información personal y preferencias
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-[250px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Foto de Perfil</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <User className="h-12 w-12 text-primary" />
            </div>
            <Button variant="outline" size="sm">
              <Camera className="mr-2 h-4 w-4" />
              Cambiar Foto
            </Button>
          </CardContent>
        </Card>

        <Tabs defaultValue="datos" className="space-y-6">
          <TabsList>
            <TabsTrigger value="datos">Datos Personales</TabsTrigger>
            <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
            <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
          </TabsList>

          <TabsContent value="datos">
            <Card>
              <CardHeader>
                <CardTitle>Datos Personales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">Nombre</Label>
                    <Input id="nombre" defaultValue={usuario.nombre} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apellido">Apellido</Label>
                    <Input id="apellido" defaultValue={usuario.apellido} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dni">DNI</Label>
                    <Input id="dni" defaultValue={usuario.dni} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={usuario.email} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input id="telefono" defaultValue={usuario.telefono} />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Dirección</h4>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Calle y Número</Label>
                      <Input id="direccion" defaultValue={usuario.direccion} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="localidad">Localidad</Label>
                      <Input id="localidad" defaultValue={usuario.localidad} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="provincia">Provincia</Label>
                      <Input id="provincia" defaultValue={usuario.provincia} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="codigoPostal">Código Postal</Label>
                      <Input id="codigoPostal" defaultValue={usuario.codigoPostal} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Guardar Cambios</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguridad">
            <Card>
              <CardHeader>
                <CardTitle>Seguridad</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Cambiar Contraseña</h4>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Contraseña Actual</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">Nueva Contraseña</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Autenticación de Dos Factores</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p>Proteja su cuenta con autenticación de dos factores</p>
                      <p className="text-sm text-muted-foreground">
                        Reciba un código por SMS cada vez que inicie sesión
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="outline">
                    <Key className="mr-2 h-4 w-4" />
                    Generar Nueva Clave
                  </Button>
                  <Button>
                    <Lock className="mr-2 h-4 w-4" />
                    Actualizar Seguridad
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificaciones">
            <Card>
              <CardHeader>
                <CardTitle>Preferencias de Notificaciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Notificaciones por Email</p>
                      <p className="text-sm text-muted-foreground">
                        Reciba actualizaciones en su correo electrónico
                      </p>
                    </div>
                    <Switch defaultChecked={usuario.notificaciones.email} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Notificaciones por SMS</p>
                      <p className="text-sm text-muted-foreground">
                        Reciba mensajes de texto con actualizaciones importantes
                      </p>
                    </div>
                    <Switch defaultChecked={usuario.notificaciones.sms} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium">Notificaciones por WhatsApp</p>
                      <p className="text-sm text-muted-foreground">
                        Reciba mensajes por WhatsApp con actualizaciones
                      </p>
                    </div>
                    <Switch defaultChecked={usuario.notificaciones.whatsapp} />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Guardar Preferencias</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de la Cuenta</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                ID de Usuario
              </p>
              <p>{usuario.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Fecha de Registro
              </p>
              <p>{usuario.fechaRegistro}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Último Acceso
              </p>
              <p>{usuario.ultimoAcceso}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 