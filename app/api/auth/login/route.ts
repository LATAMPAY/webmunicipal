import { NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth'
import { rateLimit } from '@/lib/utils/rate-limit'
import { sendEmail } from '@/lib/utils/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    // Validar campos requeridos
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son requeridos' },
        { status: 400 }
      )
    }

    // Verificar rate limit
    const isBlocked = await rateLimit.checkLimit(
      email,
      'login',
      { points: 5, duration: 300 } // 5 intentos en 5 minutos
    )

    if (isBlocked) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor espera 5 minutos.' },
        { status: 429 }
      )
    }

    // Intentar login
    const result = await authService.login({ email, password })

    if (result.requiresTwoFactor) {
      // Enviar código 2FA por email
      await sendEmail({
        to: email,
        subject: 'Código de verificación - Portal Municipal',
        template: 'two-factor-code',
        data: {
          nombre: result.user.nombre,
          code: result.twoFactorCode
        }
      })

      return NextResponse.json({
        message: 'Se requiere verificación de dos factores',
        userId: result.user.id,
        twoFactorRequired: true
      })
    }

    // Login exitoso
    return NextResponse.json({
      message: 'Login exitoso',
      user: {
        id: result.user.id,
        email: result.user.email,
        nombre: result.user.nombre
      },
      token: result.token
    })

  } catch (error: any) {
    console.error('Error en login:', error)

    if (error.message === 'INVALID_CREDENTIALS') {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    if (error.message === 'EMAIL_NOT_VERIFIED') {
      return NextResponse.json(
        { error: 'Por favor verifica tu email antes de iniciar sesión' },
        { status: 403 }
      )
    }

    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    )
  }
}

