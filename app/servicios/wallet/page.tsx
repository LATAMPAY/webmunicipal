import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, CreditCard, Gift, Ticket, PiggyBank, BarChart, Shield, Settings } from "lucide-react";

export default function WalletPage() {
  return (
    <div className="container mx-auto py-8">
      {/* Hero Section */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Wallet Municipal</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tu billetera digital para gestionar pagos, beneficios y descuentos municipales.
        </p>
      </div>

      {/* Balance y Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Mi Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <p className="text-2xl font-bold">$0.00</p>
                <p className="text-gray-600">Saldo Disponible</p>
              </div>
              <div className="flex gap-2">
                <Button>Cargar Saldo</Button>
                <Button variant="outline">Transferir</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funciones Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Medios de Pago
            </CardTitle>
            <CardDescription>Gestione sus tarjetas y métodos de pago</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Administrar</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Beneficios
            </CardTitle>
            <CardDescription>Descuentos y promociones especiales</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Ver Beneficios</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5" />
              Cupones
            </CardTitle>
            <CardDescription>Sus cupones y códigos de descuento</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" variant="outline">Ver Cupones</Button>
          </CardContent>
        </Card>
      </div>

      {/* Estadísticas y Ahorro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Estadísticas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Total Ahorrado</p>
                <p className="text-2xl font-bold">$0.00</p>
              </div>
              <div>
                <p className="font-semibold">Beneficios Utilizados</p>
                <p className="text-2xl font-bold">0</p>
              </div>
              <Button className="w-full" variant="outline">Ver Detalles</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PiggyBank className="h-5 w-5" />
              Plan de Ahorro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Configure metas de ahorro y reciba beneficios adicionales</p>
              <Button className="w-full">Crear Plan</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configuración y Seguridad */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuración
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Notificaciones
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Preferencias
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Idioma
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Seguridad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Cambiar PIN
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Dispositivos Autorizados
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  Historial de Actividad
                </Button>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 