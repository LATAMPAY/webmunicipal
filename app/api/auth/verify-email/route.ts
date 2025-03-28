import { NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token } = body

    // Validar token
    if (!token) {
      return NextResponse.json(
        { error: 'Token de verificación requerido' },
        { status: 400 }
      )
    }

    // Verificar email
    const user = await authService.verifyEmail(token)

    return NextResponse.json({
      message: 'Email verificado exitosamente',
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre
      }
    })

  } catch (error: any) {
    console.error('Error en verificación de email:', error)

    if (error.message === 'INVALID_TOKEN') {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      )
    }

    if (error.message === 'EMAIL_ALREADY_VERIFIED') {
      return NextResponse.json(
        { error: 'El email ya ha sido verificado' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al verificar email' },
      { status: 500 }
    )
  }
} 