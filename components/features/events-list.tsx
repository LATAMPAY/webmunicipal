"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"

const events = [
  {
    title: "Feria de Emprendedores",
    date: "20 de Marzo, 2024",
    time: "10:00 - 18:00",
    location: "Plaza Central",
    description: "Gran feria de emprendedores locales con productos artesanales..."
  },
  {
    title: "Taller de Reciclaje",
    date: "22 de Marzo, 2024",
    time: "15:00 - 17:00",
    location: "Centro Cultural",
    description: "Aprende técnicas de reciclaje y cuidado del medio ambiente..."
  },
  {
    title: "Concierto al Aire Libre",
    date: "25 de Marzo, 2024",
    time: "19:00 - 22:00",
    location: "Anfiteatro Municipal",
    description: "Gran concierto con artistas locales y regionales..."
  }
]

export function EventsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <Card key={event.title}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {event.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              <p className="text-sm">
                <span className="font-semibold">Fecha:</span> {event.date}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Hora:</span> {event.time}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Lugar:</span> {event.location}
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {event.description}
            </p>
            <Button asChild className="w-full">
              <Link href="#">Más información</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 