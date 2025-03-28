"use client"

import { Bell } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

const notifications = [
  {
    id: 1,
    title: "Nueva solicitud de permiso",
    description: "Juan Pérez ha solicitado vacaciones",
    time: "Hace 5 minutos",
    read: false,
    type: "request"
  },
  {
    id: 2,
    title: "Alerta de presupuesto",
    description: "El proyecto 'Parque Central' está cerca del límite presupuestario",
    time: "Hace 1 hora",
    read: false,
    type: "alert"
  },
  {
    id: 3,
    title: "Tarea completada",
    description: "La actualización del sistema ha sido completada exitosamente",
    time: "Hace 2 horas",
    read: true,
    type: "success"
  },
  {
    id: 4,
    title: "Reunión programada",
    description: "Reunión de planificación mañana a las 10:00 AM",
    time: "Hace 3 horas",
    read: true,
    type: "info"
  }
]

export function NotificationsPanel() {
  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notificaciones</SheetTitle>
          <SheetDescription>
            Tienes {unreadCount} notificaciones sin leer
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? 'bg-background' : 'bg-muted'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">{notification.title}</h4>
                  {!notification.read && (
                    <Badge variant="secondary" className="text-xs">
                      Nueva
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {notification.description}
                </p>
                <p className="text-xs text-muted-foreground">
                  {notification.time}
                </p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
} 