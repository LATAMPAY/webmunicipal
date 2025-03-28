import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Calendar,
  MessageSquare,
  Wallet,
  Building2,
} from "lucide-react"

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Usuarios",
    href: "/admin/usuarios",
    icon: Users,
  },
  {
    title: "Trámites",
    href: "/admin/tramites",
    icon: FileText,
  },
  {
    title: "Normativas",
    href: "/admin/normativas",
    icon: Building2,
  },
  {
    title: "Pagos",
    href: "/admin/pagos",
    icon: Wallet,
  },
  {
    title: "Mensajes",
    href: "/admin/mensajes",
    icon: MessageSquare,
  },
  {
    title: "Calendario",
    href: "/admin/calendario",
    icon: Calendar,
  },
  {
    title: "Configuración",
    href: "/admin/configuracion",
    icon: Settings,
  },
]

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="bg-white border-b">
      <div className="container flex h-16 items-center px-4">
        <Link href="/admin" className="font-bold text-lg mr-8">
          Panel Administrativo
        </Link>
        <div className="flex items-center space-x-4 lg:space-x-6">
          {adminNavItems.map((item) => {
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
      </div>
    </nav>
  )
} 