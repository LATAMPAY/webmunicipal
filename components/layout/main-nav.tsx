import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { 
  ChevronDown, 
  Menu, 
  Building2, 
  Wrench, 
  FileText, 
  MapPin, 
  Newspaper,
  Users,
  FileBarChart,
  BookOpen,
  PhoneCall,
  Car,
  Store,
  HelpCircle,
  Wallet,
  Mountain,
  Home,
  Construction,
  FileCheck,
  UserCheck,
  Building,
  Trees,
  Dog,
  Truck,
  Scale,
  BadgeCheck
} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

export function MainNav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image 
              src="/logo.png" 
              alt="Logo Municipal" 
              width={40} 
              height={40}
              className="rounded-full"
            />
            <span className="hidden font-bold sm:inline-block">
              M.G.E.M
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="gap-1 items-center flex">
                  <Building2 className="h-4 w-4 mr-1 text-blue-500" />
                  Municipalidad <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/municipalidad/autoridades" className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-blue-500" />
                    Autoridades
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/municipalidad/organigrama" className="flex items-center">
                    <FileBarChart className="h-4 w-4 mr-2 text-green-500" />
                    Organigrama
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/municipalidad/historia" className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-amber-500" />
                    Historia
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/municipalidad/contacto" className="flex items-center">
                    <PhoneCall className="h-4 w-4 mr-2 text-red-500" />
                    Contacto
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="gap-1 items-center flex">
                  <Wrench className="h-4 w-4 mr-1 text-green-500" />
                  Servicios <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/servicios/reclamos" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-orange-500" />
                    Reclamos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servicios/pagos-municipales" className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-purple-500" />
                    Pagos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servicios/turnos" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-blue-500" />
                    Turnos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wallet" className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-green-500" />
                    Wallet Municipal
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="gap-1 items-center flex">
                  <FileText className="h-4 w-4 mr-1 text-amber-500" />
                  Trámites <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <DropdownMenuItem asChild>
                  <Link href="/tramites/licencia" className="flex items-center">
                    <Car className="h-4 w-4 mr-2 text-blue-500" />
                    Licencia de Conducir
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/habilitaciones" className="flex items-center">
                    <Store className="h-4 w-4 mr-2 text-green-500" />
                    Habilitaciones Comerciales
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/obras" className="flex items-center">
                    <Construction className="h-4 w-4 mr-2 text-orange-500" />
                    Permisos de Obra
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/catastro" className="flex items-center">
                    <Home className="h-4 w-4 mr-2 text-purple-500" />
                    Catastro y Tierras
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/certificados" className="flex items-center">
                    <FileCheck className="h-4 w-4 mr-2 text-red-500" />
                    Certificados y Documentos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/registro-civil" className="flex items-center">
                    <UserCheck className="h-4 w-4 mr-2 text-cyan-500" />
                    Registro Civil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/cementerio" className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-gray-500" />
                    Servicios de Cementerio
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/medio-ambiente" className="flex items-center">
                    <Trees className="h-4 w-4 mr-2 text-emerald-500" />
                    Medio Ambiente
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/mascotas" className="flex items-center">
                    <Dog className="h-4 w-4 mr-2 text-amber-600" />
                    Registro de Mascotas
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/transporte" className="flex items-center">
                    <Truck className="h-4 w-4 mr-2 text-indigo-500" />
                    Transporte Público
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/bromatologia" className="flex items-center">
                    <Scale className="h-4 w-4 mr-2 text-teal-500" />
                    Bromatología
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/guia" className="flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2 text-blue-400" />
                    Guía de Trámites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/tramites/verificacion" className="flex items-center">
                    <BadgeCheck className="h-4 w-4 mr-2 text-green-600" />
                    Verificación de Documentos
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/turismo" className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1">
              <Mountain className="h-4 w-4 text-teal-500" />
              Turismo
            </Link>
            
            <Link href="/noticias" className="text-foreground/60 hover:text-foreground transition-colors flex items-center gap-1">
              <Newspaper className="h-4 w-4 text-red-500" />
              Noticias
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button asChild variant="default" size="sm" className="hidden md:inline-flex">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Mi Cuenta
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-4">
                <Link href="/municipalidad/autoridades" className="flex items-center gap-2 py-2">
                  <Building2 className="h-4 w-4 text-blue-500" />
                  Autoridades
                </Link>
                <Link href="/servicios" className="flex items-center gap-2 py-2">
                  <Wrench className="h-4 w-4 text-green-500" />
                  Servicios
                </Link>
                <Link href="/tramites" className="flex items-center gap-2 py-2">
                  <FileText className="h-4 w-4 text-amber-500" />
                  Trámites
                </Link>
                <Link href="/turismo" className="flex items-center gap-2 py-2">
                  <Mountain className="h-4 w-4 text-teal-500" />
                  Turismo
                </Link>
                <Link href="/noticias" className="flex items-center gap-2 py-2">
                  <Newspaper className="h-4 w-4 text-red-500" />
                  Noticias
                </Link>
                <Link href="/dashboard" className="flex items-center gap-2 py-2">
                  <Users className="h-4 w-4" />
                  Mi Cuenta
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
} 