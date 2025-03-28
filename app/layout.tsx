"use client"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MainNav } from "@/components/main-nav"
import { UserNav } from "@/components/user-nav"
import { MobileNav } from "@/components/mobile-nav"
import { Providers } from "@/components/providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Municipalidad de General Mosconi",
  description: "Portal oficial de la Municipalidad de General Mosconi",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container flex h-16 items-center justify-between">
            <MainNav />
                <div className="flex items-center gap-4">
                  <UserNav />
                  <MobileNav />
                </div>
              </div>
            </header>
            <main className="flex-1">
              {children}
            </main>
            <footer className="border-t">
              <div className="container py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="font-semibold mb-4">Municipalidad</h3>
                    <ul className="space-y-2">
                      <li><a href="/municipalidad/intendente">El Intendente</a></li>
                      <li><a href="/municipalidad/concejo">Concejo Deliberante</a></li>
                      <li><a href="/municipalidad/organigrama">Organigrama</a></li>
                      <li><a href="/municipalidad/contacto">Contacto</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Servicios</h3>
                    <ul className="space-y-2">
                      <li><a href="/servicios/reclamos">Reclamos y Consultas</a></li>
                      <li><a href="/servicios/pagos">Pagos Municipales</a></li>
                      <li><a href="/servicios/turnos">Turnos Online</a></li>
                      <li><a href="/wallet">Wallet Municipal</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Trámites</h3>
                    <ul className="space-y-2">
                      <li><a href="/tramites/licencias">Licencias</a></li>
                      <li><a href="/tramites/habilitaciones">Habilitaciones</a></li>
                      <li><a href="/tramites/documentacion">Documentación</a></li>
                      <li><a href="/tramites/consultas">Estado de Trámites</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-4">Contacto</h3>
                    <ul className="space-y-2">
                      <li>Dirección: Av. Principal 123</li>
                      <li>Teléfono: (123) 456-7890</li>
                      <li>Email: contacto@municipio.gob.ar</li>
                      <li>Horario: Lun-Vie 8:00-16:00</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
                  © 2024 Municipalidad de General Mosconi. Todos los derechos reservados.
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}

import './globals.css'