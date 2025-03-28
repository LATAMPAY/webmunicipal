import { NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth'
import { rateLimit } from '@/lib/utils/rate-limit'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { userId, code } = body

    // Validar campos requeridos
    if (!userId || !code) {
      return NextResponse.json(
        { error: 'Usuario y código son requeridos' },
        { status: 400 }
      )
    }

    // Verificar rate limit
    const isBlocked = await rateLimit.checkLimit(
      userId,
      'verify-2fa',
      { points: 3, duration: 300 } // 3 intentos en 5 minutos
    )

    if (isBlocked) {
      return NextResponse.json(
        { error: 'Demasiados intentos. Por favor espera 5 minutos.' },
        { status: 429 }
      )
    }

    // Verificar código 2FA
    const result = await authService.verifyTwoFactor({
      userId,
      code
    })

    // Verificación exitosa
    return NextResponse.json({
      message: 'Verificación exitosa',
      user: {
        id: result.user.id,
        email: result.user.email,
        nombre: result.user.nombre
      },
      token: result.token
    })

  } catch (error: any) {
    console.error('Error en verificación 2FA:', error)

    if (error.message === 'INVALID_CODE') {
      return NextResponse.json(
        { error: 'Código inválido' },
        { status: 401 }
      )
    }

    if (error.message === 'CODE_EXPIRED') {
      return NextResponse.json(
        { error: 'El código ha expirado' },
        { status: 401 }
      )
    }

    return NextResponse.json(
      { error: 'Error en la verificación' },
      { status: 500 }
    )
  }
} 