"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CalendarIcon, Clock, AlertTriangle, ChevronRight, Calendar, FileCheck, Building, UserCheck, Search, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { createAppointment } from "@/lib/actions"
import MainNav from "@/components/main-nav"
import Footer from "@/components/footer"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { format } from "date-fns"
import { es } from "date-fns/locale"

const departments = [
  { value: "atencion_ciudadana", label: "Atención al Ciudadano" },
  { value: "rentas", label: "Rentas Municipales" },
  { value: "obras_publicas", label: "Obras Públicas" },
  { value: "transito", label: "Tránsito" },
  { value: "desarrollo_social", label: "Desarrollo Social" },
  { value: "habilitaciones", label: "Habilitaciones Comerciales" },
]

const services: Record<string, Array<{ value: string; label: string }>> = {
  atencion_ciudadana: [
    { value: "consultas_generales", label: "Consultas Generales" },
    { value: "reclamos", label: "Reclamos y Denuncias" },
    { value: "certificados", label: "Certificados y Constancias" },
  ],
  rentas: [
    { value: "consulta_deuda", label: "Consulta de Deuda" },
    { value: "plan_pago", label: "Plan de Pagos" },
    { value: "exenciones", label: "Exenciones" },
  ],
  obras_publicas: [
    { value: "permisos_obra", label: "Permisos de Obra" },
    { value: "planos", label: "Presentación de Planos" },
    { value: "consultas_tecnicas", label: "Consultas Técnicas" },
  ],
  transito: [
    { value: "licencia_conducir", label: "Licencia de Conducir" },
    { value: "infracciones", label: "Infracciones" },
    { value: "vehiculos", label: "Registro de Vehículos" },
  ],
  desarrollo_social: [
    { value: "asistencia_social", label: "Asistencia Social" },
    { value: "programas", label: "Programas Sociales" },
    { value: "subsidios", label: "Subsidios" },
  ],
  habilitaciones: [
    { value: "nueva_habilitacion", label: "Nueva Habilitación" },
    { value: "renovacion", label: "Renovación" },
    { value: "modificacion", label: "Modificación de Datos" },
  ],
}

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
]

export default function TurnosPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Turnos Online</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Reserve su turno para cualquier trámite o servicio municipal. Sistema disponible las 24 horas.
            </p>
        </div>

      {/* Solicitar Turno */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Nuevo Turno
            </CardTitle>
            <CardDescription>Solicite un nuevo turno para cualquier trámite</CardDescription>
                  </CardHeader>
          <CardContent>
            <Button className="w-full">Solicitar Turno</Button>
                  </CardContent>
                </Card>

        <Card>
                <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Consultar Turno
            </CardTitle>
            <CardDescription>Verifique o cancele sus turnos</CardDescription>
                </CardHeader>
                <CardContent>
            <Button className="w-full" variant="outline">Consultar</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Historial
            </CardTitle>
            <CardDescription>Vea su historial de turnos</CardDescription>
                </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Ver Historial</Button>
                </CardContent>
              </Card>
            </div>

      {/* Áreas Disponibles */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Áreas Disponibles
          </CardTitle>
          <CardDescription>
            Seleccione el área para la cual necesita el turno
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="justify-start">
              <FileCheck className="mr-2 h-4 w-4" /> Licencias de Conducir
            </Button>
            <Button variant="outline" className="justify-start">
              <FileCheck className="mr-2 h-4 w-4" /> Registro Civil
            </Button>
            <Button variant="outline" className="justify-start">
              <FileCheck className="mr-2 h-4 w-4" /> Obras Particulares
            </Button>
            <Button variant="outline" className="justify-start">
              <FileCheck className="mr-2 h-4 w-4" /> Habilitaciones
            </Button>
            <Button variant="outline" className="justify-start">
              <FileCheck className="mr-2 h-4 w-4" /> Defensa al Consumidor
            </Button>
            <Button variant="outline" className="justify-start">
              <FileCheck className="mr-2 h-4 w-4" /> Mediación Vecinal
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horarios de Atención
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Lunes a Viernes: 8:00 a 14:00</li>
              <li>Sábados: 9:00 a 12:00 (solo algunos servicios)</li>
              <li>Feriados: Cerrado</li>
              <li>Guardias de emergencia: 24hs</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Requisitos Generales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>DNI vigente</li>
              <li>Presentarse 10 minutos antes</li>
              <li>Documentación requerida según el trámite</li>
              <li>En caso de no poder asistir, cancelar con 24hs de anticipación</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

