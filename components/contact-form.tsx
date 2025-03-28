"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const motivos = [
  "Consulta General",
  "Reclamo",
  "Sugerencia",
  "Trámites",
  "Turnos",
  "Otros",
]

interface ContactFormProps {
  onSubmit: (formData: FormData) => Promise<void>
  isLoading: boolean
}

export function ContactForm({ onSubmit, isLoading }: ContactFormProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await onSubmit(formData)
  }

  return (
    <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="Ingrese su nombre completo"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          placeholder="Ingrese su correo electrónico"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Teléfono (opcional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Ingrese su número de teléfono"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Motivo</Label>
        <Select name="subject" required>
          <SelectTrigger>
            <SelectValue placeholder="Seleccione un motivo" />
          </SelectTrigger>
          <SelectContent>
            {motivos.map((motivo) => (
              <SelectItem key={motivo} value={motivo}>
                {motivo}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Escriba su mensaje aquí"
          className="min-h-[150px]"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Enviando..." : "Enviar mensaje"}
      </Button>
    </form>
  )
}