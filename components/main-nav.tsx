"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"

const mainNavItems = [
  {
    title: "Inicio",
    href: "/",
  },
  {
    title: "Municipalidad",
    href: "/municipalidad",
    children: [
      { title: "El Intendente", href: "/municipalidad/intendente" },
      { title: "Concejo Deliberante", href: "/municipalidad/concejo" },
      { title: "Organigrama", href: "/municipalidad/organigrama" },
      { title: "Contacto", href: "/municipalidad/contacto" },
      { title: "Normativas", href: "/municipalidad/normativas" },
      { title: "Historia y Patrimonio", href: "/municipalidad/historia" },
    ],
  },
  {
    title: "Servicios",
    href: "/servicios",
    children: [
      { title: "Reclamos y Consultas", href: "/servicios/reclamos" },
      { title: "Pagos Municipales", href: "/servicios/pagos-municipales" },
      { title: "Turnos Online", href: "/servicios/turnos" },
      { title: "Solicitud de Servicios", href: "/servicios/solicitudes" },
    ],
  },
  {
    title: "Wallet Municipal",
    href: "/wallet",
  },
  {
    title: "Turismo",
    href: "/turismo",
  },
  {
    title: "Transparencia",
    href: "/transparencia",
  },
]

export default function MainNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = (title: string) => {
    setActiveDropdown(activeDropdown === title ? null : title)
  }

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-primary">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Logo"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">Municipalidad de General Mosconi</span>
          <span className="font-bold text-xl sm:hidden">G. Mosconi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {mainNavItems.map((item) => (
            <div key={item.title} className="relative group">
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary" : "text-muted-foreground",
                )}
              >
                {item.title}
              </Link>

              {item.children && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-border hidden group-hover:block z-50">
                  <div className="py-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-background md:hidden">
          <nav className="h-full overflow-y-auto pb-24 pt-5">
            <div className="container flex flex-col space-y-4">
              {mainNavItems.map((item) => (
                <div key={item.title}>
                  <div
                    className="flex items-center justify-between py-2"
                    onClick={() => item.children && toggleDropdown(item.title)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-base font-medium transition-colors hover:text-primary",
                        pathname === item.href ? "text-primary" : "text-foreground",
                      )}
                      onClick={(e) => item.children && e.preventDefault()}
                    >
                      {item.title}
                    </Link>
                    {item.children && (
                      <Button variant="ghost" size="sm">
                        {activeDropdown === item.title ? "-" : "+"}
                      </Button>
                    )}
                  </div>

                  {item.children && activeDropdown === item.title && (
                    <div className="ml-4 mt-2 flex flex-col space-y-2 border-l pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.title}
                          href={child.href}
                          className={cn(
                            "text-sm transition-colors hover:text-primary",
                            pathname === child.href ? "text-primary" : "text-muted-foreground",
                          )}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">Cambiar tema:</span>
                  <ThemeToggle />
                </div>
                <Link href="/area-usuario">
                  <Button className="w-full">
                    <User className="mr-2 h-4 w-4" />
                    Área de Usuario
                  </Button>
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* User Area Button (Desktop) */}
      <div className="hidden md:flex items-center space-x-2">
        <ThemeToggle />
        <Link href="/area-usuario">
          <Button>
            <User className="mr-2 h-4 w-4" />
            Área de Usuario
          </Button>
        </Link>
      </div>
    </div>
  )
}

