import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Municipalidad</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/municipalidad/intendente" className="text-muted-foreground hover:text-primary">
                  El Intendente
                </Link>
              </li>
              <li>
                <Link href="/municipalidad/concejo" className="text-muted-foreground hover:text-primary">
                  Concejo Deliberante
                </Link>
              </li>
              <li>
                <Link href="/municipalidad/organigrama" className="text-muted-foreground hover:text-primary">
                  Organigrama
                </Link>
              </li>
              <li>
                <Link href="/municipalidad/contacto" className="text-muted-foreground hover:text-primary">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/servicios/reclamos" className="text-muted-foreground hover:text-primary">
                  Reclamos y Consultas
                </Link>
              </li>
              <li>
                <Link href="/servicios/pagos-municipales" className="text-muted-foreground hover:text-primary">
                  Pagos Municipales
                </Link>
              </li>
              <li>
                <Link href="/servicios/turnos" className="text-muted-foreground hover:text-primary">
                  Turnos Online
                </Link>
              </li>
              <li>
                <Link href="/servicios/solicitudes" className="text-muted-foreground hover:text-primary">
                  Solicitud de Servicios
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/wallet" className="text-muted-foreground hover:text-primary">
                  Wallet Municipal
                </Link>
              </li>
              <li>
                <Link href="/turismo" className="text-muted-foreground hover:text-primary">
                  Turismo
                </Link>
              </li>
              <li>
                <Link href="/transparencia" className="text-muted-foreground hover:text-primary">
                  Transparencia
                </Link>
              </li>
              <li>
                <Link href="/area-usuario" className="text-muted-foreground hover:text-primary">
                  Área de Usuario
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-muted-foreground">
              <p>Av. Principal 123</p>
              <p>General Mosconi, Salta</p>
              <p className="mt-2">Tel: (123) 456-7890</p>
              <p>Email: contacto@municipalidadgeneralmosconi.gob.ar</p>
            </address>

            <div className="mt-4 flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Cambiar tema:</span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Municipalidad de General Mosconi. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

