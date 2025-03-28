import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { iniciarTramite } from "@/lib/utils/tramites"
import type { TramiteRequest } from "@/lib/utils/tramites"

interface TramiteFormProps {
  tipo: string
  titulo: string
  descripcion?: string
  camposAdicionales?: {
    nombre: string
    label: string
    tipo: "text" | "email" | "tel" | "file" | "textarea"
    requerido?: boolean
  }[]
  onSuccess?: (response: any) => void
}

export function TramiteForm({ tipo, titulo, descripcion, camposAdicionales, onSuccess }: TramiteFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Record<string, any>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const tramiteData: TramiteRequest = {
        tipo,
        numeroDocumento: formData.numeroDocumento,
        email: formData.email,
        telefono: formData.telefono,
        detalles: formData.detalles,
        documentosAdjuntos: formData.documentos,
      }

      const response = await iniciarTramite(tramiteData)
      if (onSuccess) {
        onSuccess(response)
      }
    } catch (error) {
      console.error('Error al iniciar trámite:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({ ...prev, documentos: Array.from(e.target.files!) }))
    }
  }

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{titulo}</h2>
          {descripcion && <p className="text-gray-600 mb-4">{descripcion}</p>}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="numeroDocumento">DNI</Label>
            <Input
              id="numeroDocumento"
              name="numeroDocumento"
              type="text"
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              onChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              required
              onChange={handleInputChange}
            />
          </div>

          {camposAdicionales?.map((campo) => (
            <div key={campo.nombre}>
              <Label htmlFor={campo.nombre}>{campo.label}</Label>
              {campo.tipo === 'textarea' ? (
                <Textarea
                  id={campo.nombre}
                  name={campo.nombre}
                  required={campo.requerido}
                  onChange={handleInputChange}
                />
              ) : campo.tipo === 'file' ? (
                <Input
                  id={campo.nombre}
                  name={campo.nombre}
                  type="file"
                  required={campo.requerido}
                  onChange={handleFileChange}
                  multiple
                />
              ) : (
                <Input
                  id={campo.nombre}
                  name={campo.nombre}
                  type={campo.tipo}
                  required={campo.requerido}
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))}

          <div>
            <Label htmlFor="detalles">Detalles Adicionales</Label>
            <Textarea
              id="detalles"
              name="detalles"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Procesando..." : "Iniciar Trámite"}
        </Button>
      </form>
    </Card>
  )
} 