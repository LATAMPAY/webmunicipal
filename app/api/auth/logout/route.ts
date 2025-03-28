import { NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const token = cookies().get('auth_token')?.value

    if (token) {
      // Invalidar token
      await authService.logout(token)

      // Eliminar cookie
      cookies().delete('auth_token')
    }

    return NextResponse.json({
      message: 'Sesión cerrada exitosamente'
    })

  } catch (error: any) {
    console.error('Error al cerrar sesión:', error)
    
    return NextResponse.json(
      { error: 'Error al cerrar sesión' },
      { status: 500 }
    )
  }
}

