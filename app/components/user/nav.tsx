import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Home,
  FileText,
  Wallet,
  MessageSquare,
  Calendar,
  User,
  Bell,
} from "lucide-react"

const userNavItems = [
  {
    title: "Inicio",
    href: "/usuario",
    icon: Home,
  },
  {
    title: "Mis Trámites",
    href: "/usuario/tramites",
    icon: FileText,
  },
  {
    title: "Pagos",
    href: "/usuario/pagos",
    icon: Wallet,
  },
  {
    title: "Mensajes",
    href: "/usuario/mensajes",
    icon: MessageSquare,
  },
  {
    title: "Turnos",
    href: "/usuario/turnos",
    icon: Calendar,
  },
  {
    title: "Mi Perfil",
    href: "/usuario/perfil",
    icon: User,
  },
]

export function UserNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/usuario" className="font-bold text-lg mr-8">
          Portal del Vecino
        </Link>
        <div className="flex items-center space-x-4 lg:space-x-6">
          {userNavItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.title}
              </Link>
            )
          })}
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <button
            className="relative p-2 hover:bg-accent rounded-full"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </div>
    </nav>
  )
} 