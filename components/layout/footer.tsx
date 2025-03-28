import Link from "next/link"
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Municipalidad</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/municipalidad/autoridades" className="text-muted-foreground hover:text-foreground transition-colors">
                  Autoridades
                </Link>
              </li>
              <li>
                <Link href="/municipalidad/organigrama" className="text-muted-foreground hover:text-foreground transition-colors">
                  Organigrama
                </Link>
              </li>
              <li>
                <Link href="/municipalidad/historia" className="text-muted-foreground hover:text-foreground transition-colors">
                  Historia
                </Link>
              </li>
              <li>
                <Link href="/municipalidad/contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios/reclamos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Reclamos
                </Link>
              </li>
              <li>
                <Link href="/servicios/pagos-municipales" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pagos Municipales
                </Link>
              </li>
              <li>
                <Link href="/servicios/turnos" className="text-muted-foreground hover:text-foreground transition-colors">
                  Turnos Online
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="text-muted-foreground hover:text-foreground transition-colors">
                  Wallet Municipal
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/turismo" className="text-muted-foreground hover:text-foreground transition-colors">
                  Turismo
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="text-muted-foreground hover:text-foreground transition-colors">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="text-muted-foreground hover:text-foreground transition-colors">
                  Transparencia
                </Link>
              </li>
              <li>
                <Link href="/cultura-deporte" className="text-muted-foreground hover:text-foreground transition-colors">
                  Cultura y Deporte
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-muted-foreground">
                  Av. Principal 123, General Mosconi, Salta, Argentina
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">contacto@municipalidadmosconi.gob.ar</span>
              </li>
              <li className="pt-2">
                <div className="flex gap-4">
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Municipalidad de General Mosconi. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/privacidad" className="hover:text-foreground transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="hover:text-foreground transition-colors">
                Términos de Uso
              </Link>
              <Link href="/accesibilidad" className="hover:text-foreground transition-colors">
                Accesibilidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 