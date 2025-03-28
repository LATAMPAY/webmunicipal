import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { solicitarTurno } from "@/lib/utils/tramites"

interface TurnoFormProps {
  tipo: string
  titulo: string
  horariosDisponibles?: string[]
  onSuccess?: (response: any) => void
}

export function TurnoForm({ tipo, titulo, horariosDisponibles = [], onSuccess }: TurnoFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    email: "",
    telefono: "",
    fecha: "",
    horario: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await solicitarTurno(
        tipo,
        new Date(formData.fecha),
        formData.horario,
        {
          nombre: formData.nombre,
          documento: formData.documento,
          email: formData.email,
          telefono: formData.telefono
        }
      )

      if (onSuccess) {
        onSuccess(response)
      }
    } catch (error) {
      console.error('Error al solicitar turno:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleHorarioChange = (value: string) => {
    setFormData(prev => ({ ...prev, horario: value }))
  }

  // Obtener la fecha mínima (hoy)
  const today = new Date().toISOString().split('T')[0]

  // Obtener la fecha máxima (30 días después)
  const maxDate = new Date()
  maxDate.setDate(maxDate.getDate() + 30)
  const maxDateStr = maxDate.toISOString().split('T')[0]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="documento">DNI</Label>
            <Input
              id="documento"
              name="documento"
              value={formData.documento}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              name="fecha"
              type="date"
              min={today}
              max={maxDateStr}
              value={formData.fecha}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="horario">Horario</Label>
            <Select onValueChange={handleHorarioChange} value={formData.horario}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione un horario" />
              </SelectTrigger>
              <SelectContent>
                {horariosDisponibles.map((horario) => (
                  <SelectItem key={horario} value={horario}>
                    {horario}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Procesando..." : "Solicitar Turno"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
} 