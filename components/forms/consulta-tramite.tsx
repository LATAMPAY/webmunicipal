import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { consultarTramite } from "@/lib/utils/tramites"
import type { TramiteResponse } from "@/lib/utils/tramites"

export function ConsultaTramite() {
  const [numeroTramite, setNumeroTramite] = useState("")
  const [loading, setLoading] = useState(false)
  const [resultado, setResultado] = useState<TramiteResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResultado(null)

    try {
      const response = await consultarTramite(numeroTramite)
      setResultado(response)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al consultar el trámite')
    } finally {
      setLoading(false)
    }
  }

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'completado':
        return 'text-green-600'
      case 'en_proceso':
        return 'text-blue-600'
      case 'rechazado':
        return 'text-red-600'
      default:
        return 'text-yellow-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Consulta de Trámite</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="numeroTramite">Número de Trámite</Label>
              <Input
                id="numeroTramite"
                value={numeroTramite}
                onChange={(e) => setNumeroTramite(e.target.value)}
                placeholder="Ingrese el número de trámite"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Consultando..." : "Consultar Estado"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {resultado && (
        <Card>
          <CardHeader>
            <CardTitle>Resultado de la Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold">Número de Trámite</dt>
                <dd>{resultado.numeroTramite}</dd>
              </div>
              <div>
                <dt className="font-semibold">Estado</dt>
                <dd className={getEstadoColor(resultado.estado)}>
                  {resultado.estado.toUpperCase()}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Fecha de Inicio</dt>
                <dd>{new Date(resultado.fechaInicio).toLocaleDateString()}</dd>
              </div>
              <div>
                <dt className="font-semibold">Última Actualización</dt>
                <dd>{new Date(resultado.fechaActualizacion).toLocaleDateString()}</dd>
              </div>
              {resultado.detalles && (
                <div>
                  <dt className="font-semibold">Detalles</dt>
                  <dd>{resultado.detalles}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 