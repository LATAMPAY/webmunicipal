import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CreditCard, Receipt, FileText, BadgeDollarSign, Building2, Car, History } from "lucide-react"

export default function PagosMunicipalesPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Pagos Municipales</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Realice todos sus pagos municipales de manera rápida y segura. Consulte el estado de su cuenta y acceda a planes de pago.
        </p>
      </div>

      {/* Tipos de Pagos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Impuesto Inmobiliario
            </CardTitle>
            <CardDescription>Pague sus tasas de propiedad</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Pagar Impuesto</Button>
          </CardContent>
        </Card>

          <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
              Patente Vehicular
            </CardTitle>
            <CardDescription>Pague su patente automotor</CardDescription>
            </CardHeader>
            <CardContent>
            <Button className="w-full" variant="outline">Pagar Patente</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Tasas y Servicios
            </CardTitle>
            <CardDescription>Pague tasas municipales y servicios</CardDescription>
            </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Pagar Tasas</Button>
          </CardContent>
        </Card>
              </div>

      {/* Consultas y Planes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Consulta de Deuda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Consulte el estado de su cuenta y deudas pendientes</p>
            <Button className="w-full">Consultar Deuda</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BadgeDollarSign className="h-5 w-5" />
              Planes de Pago
            </CardTitle>
            </CardHeader>
            <CardContent>
            <p className="mb-4">Acceda a planes de pago y facilidades</p>
            <Button className="w-full" variant="outline">Ver Planes Disponibles</Button>
          </CardContent>
        </Card>
                  </div>

      {/* Medios de Pago y Historial */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Medios de Pago
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>Tarjetas de crédito y débito</li>
              <li>Transferencia bancaria</li>
              <li>Pago Fácil y Rapipago</li>
              <li>Débito automático</li>
              <li>Billetera virtual</li>
            </ul>
            </CardContent>
          </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Historial de Pagos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Acceda a su historial de pagos y comprobantes</p>
            <Button className="w-full" variant="outline">Ver Historial</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 