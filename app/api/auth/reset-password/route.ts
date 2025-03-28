import { NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth'
import { sendEmail } from '@/lib/utils/email'
import { rateLimit } from '@/lib/utils/rate-limit'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email } = body

    // Validar email
    if (!email) {
      return NextResponse.json(
        { error: 'Email requerido' },
        { status: 400 }
      )
    }

    // Verificar rate limit
    const isBlocked = await rateLimit.checkLimit(
      email,
      'reset-password',
      { points: 3, duration: 3600 } // 3 intentos por hora
    )

    if (isBlocked) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor espera 1 hora.' },
        { status: 429 }
      )
    }

    // Generar token de restablecimiento
    const { user, resetToken } = await authService.createPasswordReset(email)

    // Enviar email con enlace
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/restablecer-password?token=${resetToken}`
    
    await sendEmail({
      to: email,
      subject: 'Restablece tu contraseña - Portal Municipal',
      template: 'password-reset',
      data: {
        nombre: user.nombre,
        resetLink
      }
    })

    return NextResponse.json({
      message: 'Se ha enviado un enlace a tu email para restablecer la contraseña'
    })

  } catch (error: any) {
    console.error('Error en solicitud de restablecimiento:', error)

    if (error.message === 'USER_NOT_FOUND') {
      // Por seguridad, no revelamos si el usuario existe o no
      return NextResponse.json({
        message: 'Se ha enviado un enlace a tu email para restablecer la contraseña'
      })
    }

    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { token, newPassword } = body

    // Validar campos
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: 'Token y nueva contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Cambiar contraseña
    const user = await authService.resetPassword({
      token,
      newPassword
    })

    return NextResponse.json({
      message: 'Contraseña actualizada exitosamente',
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre
      }
    })

  } catch (error: any) {
    console.error('Error al restablecer contraseña:', error)

    if (error.message === 'INVALID_TOKEN') {
      return NextResponse.json(
        { error: 'Token inválido o expirado' },
        { status: 401 }
      )
    }

    if (error.message === 'PASSWORD_TOO_WEAK') {
      return NextResponse.json(
        { error: 'La contraseña no cumple con los requisitos mínimos de seguridad' },
        { status: 400 }
      )
    }

    if (error.message === 'PASSWORD_RECENTLY_USED') {
      return NextResponse.json(
        { error: 'No puedes usar una contraseña que hayas usado recientemente' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al restablecer la contraseña' },
      { status: 500 }
    )
  }
} 