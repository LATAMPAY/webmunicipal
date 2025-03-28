import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { realizarPago } from "@/lib/utils/tramites"

interface PagoFormProps {
  concepto: string
  monto: number
  titulo: string
  descripcion?: string
  numeroTramite?: string
  onSuccess?: (response: any) => void
}

export function PagoForm({ concepto, monto, titulo, descripcion, numeroTramite, onSuccess }: PagoFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    numeroDocumento: "",
    email: "",
    numeroTarjeta: "",
    fechaVencimiento: "",
    codigoSeguridad: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await realizarPago(
        concepto,
        monto,
        {
          numeroTramite,
          numeroDocumento: formData.numeroDocumento,
          email: formData.email
        }
      )

      if (onSuccess) {
        onSuccess(response)
      }
    } catch (error) {
      console.error('Error al procesar el pago:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{titulo}</CardTitle>
        {descripcion && <CardDescription>{descripcion}</CardDescription>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-600">Monto a pagar:</p>
            <p className="text-2xl font-bold">${monto.toFixed(2)}</p>
          </div>

          <div>
            <Label htmlFor="numeroDocumento">DNI</Label>
            <Input
              id="numeroDocumento"
              name="numeroDocumento"
              value={formData.numeroDocumento}
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
            <Label htmlFor="numeroTarjeta">Número de Tarjeta</Label>
            <Input
              id="numeroTarjeta"
              name="numeroTarjeta"
              value={formData.numeroTarjeta}
              onChange={handleInputChange}
              required
              maxLength={16}
              pattern="\d{16}"
              placeholder="1234 5678 9012 3456"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
              <Input
                id="fechaVencimiento"
                name="fechaVencimiento"
                value={formData.fechaVencimiento}
                onChange={handleInputChange}
                required
                placeholder="MM/AA"
                maxLength={5}
                pattern="\d{2}/\d{2}"
              />
            </div>

            <div>
              <Label htmlFor="codigoSeguridad">Código de Seguridad</Label>
              <Input
                id="codigoSeguridad"
                name="codigoSeguridad"
                type="password"
                value={formData.codigoSeguridad}
                onChange={handleInputChange}
                required
                maxLength={4}
                pattern="\d{3,4}"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Procesando..." : "Realizar Pago"}
            </Button>
          </div>

          <p className="text-sm text-gray-500 text-center mt-4">
            Pago seguro procesado por la plataforma de pagos del municipio
          </p>
        </form>
      </CardContent>
    </Card>
  )
} 