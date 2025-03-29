import { NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth'
import { rateLimit } from '@/lib/utils/rate-limit'
import { sendEmail } from '@/lib/utils/email'
import { AppError, createErrorResponse } from '@/lib/utils/error'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // Validar campos requeridos
    if (!email || !password) {
      throw new AppError('Email y contraseña son requeridos', 'MISSING_CREDENTIALS', 400)
    }

    // Verificar rate limit
    const isBlocked = await rateLimit.checkLimit(
      email,
      'login',
      { points: 5, duration: 300 } // 5 intentos en 5 minutos
    )

    if (isBlocked) {
      throw new AppError('Demasiados intentos. Por favor espera 5 minutos.', 'RATE_LIMIT_EXCEEDED', 429)
    }

    // Intentar login
    const ip = req.headers.get('x-forwarded-for') || '0.0.0.0'
    const userAgent = req.headers.get('user-agent') || 'unknown'
    const result = await authService.login(email, password, ip, userAgent)

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
      success: true,
      user: {
        id: result.user.id,
        email: result.user.email,
        nombre: result.user.nombre
      }
    })

  } catch (error) {
    return createErrorResponse(error)
  }
}

