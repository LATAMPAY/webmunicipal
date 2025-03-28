"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Car, Home, Store } from "lucide-react"
import Link from "next/link"

export function QuickAccess() {
  const items = [
    {
      title: "DNI y Documentación",
      description: "Gestiona tus documentos personales",
      icon: FileText,
      href: "/tramites/documentacion"
    },
    {
      title: "Licencia de Conducir",
      description: "Obtén o renueva tu licencia",
      icon: Car,
      href: "/tramites/licencias"
    },
    {
      title: "Tasas Municipales",
      description: "Paga tus impuestos en línea",
      icon: Home,
      href: "/servicios/pagos"
    },
    {
      title: "Comercios",
      description: "Habilitaciones y permisos",
      icon: Store,
      href: "/tramites/habilitaciones"
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <item.icon className="h-5 w-5" />
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {item.description}
            </p>
            <Button asChild className="w-full">
              <Link href={item.href}>Acceder</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 