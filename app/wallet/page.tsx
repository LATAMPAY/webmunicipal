import type React from "react"
import Link from "next/link"
import { Wallet, CreditCard, QrCode, Building, FileText, Receipt, ChevronRight, ArrowRight, ArrowUpRight, ArrowDownLeft, Plus, History } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WalletPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Wallet Municipal</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Saldo y Acciones Rápidas */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mi Saldo</CardTitle>
              <CardDescription>Saldo disponible en su wallet municipal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-4">$ 1,500.00</div>
              <div className="grid grid-cols-2 gap-4">
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Cargar Saldo
                </Button>
                <Button variant="outline" className="w-full">
                  <History className="mr-2 h-4 w-4" /> Ver Historial
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Métodos de Pago Vinculados</CardTitle>
              <CardDescription>Administre sus métodos de pago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 1234</p>
                      <p className="text-sm text-muted-foreground">Vence: 12/25</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Eliminar</Button>
                </div>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Agregar Método de Pago
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historial de Transacciones */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Últimas Transacciones</CardTitle>
            <CardDescription>Historial de movimientos recientes</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="todos">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="todos" className="flex-1">Todos</TabsTrigger>
                <TabsTrigger value="ingresos" className="flex-1">Ingresos</TabsTrigger>
                <TabsTrigger value="egresos" className="flex-1">Egresos</TabsTrigger>
              </TabsList>

              <TabsContent value="todos" className="space-y-4">
                <TransactionItem
                  type="ingreso"
                  description="Recarga de saldo"
                  amount={500.00}
                  date="2024-03-26"
                />
                <TransactionItem
                  type="egreso"
                  description="Pago de impuesto inmobiliario"
                  amount={-350.00}
                  date="2024-03-25"
                />
                <TransactionItem
                  type="egreso"
                  description="Tasa municipal"
                  amount={-150.00}
                  date="2024-03-24"
                />
                <TransactionItem
                  type="ingreso"
                  description="Recarga de saldo"
                  amount={1000.00}
                  date="2024-03-23"
                />
              </TabsContent>

              <TabsContent value="ingresos" className="space-y-4">
                <TransactionItem
                  type="ingreso"
                  description="Recarga de saldo"
                  amount={500.00}
                  date="2024-03-26"
                />
                <TransactionItem
                  type="ingreso"
                  description="Recarga de saldo"
                  amount={1000.00}
                  date="2024-03-23"
                />
              </TabsContent>

              <TabsContent value="egresos" className="space-y-4">
                <TransactionItem
                  type="egreso"
                  description="Pago de impuesto inmobiliario"
                  amount={-350.00}
                  date="2024-03-25"
                />
                <TransactionItem
                  type="egreso"
                  description="Tasa municipal"
                  amount={-150.00}
                  date="2024-03-24"
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function TransactionItem({ type, description, amount, date }: {
  type: "ingreso" | "egreso"
  description: string
  amount: number
  date: string
}) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        {type === "ingreso" ? (
          <div className="p-2 bg-green-100 rounded-full">
            <ArrowDownLeft className="h-4 w-4 text-green-600" />
          </div>
        ) : (
          <div className="p-2 bg-red-100 rounded-full">
            <ArrowUpRight className="h-4 w-4 text-red-600" />
          </div>
        )}
        <div>
          <p className="font-medium">{description}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(date).toLocaleDateString("es-AR")}
          </p>
        </div>
      </div>
      <p className={type === "ingreso" ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
        {amount.toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS"
        })}
      </p>
    </div>
  )
}

function WalletFeatureCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode
  title: string
  description: string
  link: string
}) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="text-primary">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link href={link} className="w-full">
          <Button variant="outline" className="w-full">
            Acceder <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

