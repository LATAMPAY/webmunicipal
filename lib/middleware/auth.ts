import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authService } from '@/lib/services/auth'

// Rutas públicas que no requieren autenticación
const publicRoutes = [
  '/login',
  '/registro',
  '/verificar-email',
  '/restablecer-password',
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/verify-email',
  '/api/auth/verify-2fa',
  '/api/auth/reset-password'
]

// Rutas que requieren autenticación pero no verificación de email
const emailUnverifiedRoutes = [
  '/verificar-email'
]

export async function authMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Permitir rutas públicas
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Verificar token de autenticación
  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    // Redirigir a login si no hay token
    const url = new URL('/login', request.url)
    url.searchParams.set('from', pathname)
    return NextResponse.redirect(url)
  }

  try {
    // Validar token y obtener usuario
    const user = await authService.validateToken(token)

    // Verificar si el email está verificado (excepto para rutas específicas)
    if (!user.emailVerified && !emailUnverifiedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/verificar-email', request.url))
    }

    // Verificar permisos para rutas administrativas
    if (pathname.startsWith('/admin') && user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    // Añadir información del usuario al request para uso en la aplicación
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', user.id)
    requestHeaders.set('x-user-role', user.role)

    // Renovar token si está próximo a expirar
    const tokenExpiresIn = await authService.getTokenExpiresIn(token)
    if (tokenExpiresIn < 60 * 60) { // Renovar si expira en menos de 1 hora
      const newToken = await authService.refreshToken(token)
      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
      response.cookies.set('auth_token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 horas
      })
      return response
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })

  } catch (error) {
    // Si el token es inválido, eliminar cookie y redirigir a login
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth_token')
    return response
  }
}

// Configurar las rutas que deben ser manejadas por el middleware
export const config = {
  matcher: [
    /*
     * Coincidir con todas las rutas excepto:
     * 1. /api/auth/* (endpoints de autenticación)
     * 2. /_next/* (archivos estáticos de Next.js)
     * 3. /favicon.ico, /sitemap.xml, /robots.txt (archivos públicos)
     */
    '/((?!api/auth|_next|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
} 