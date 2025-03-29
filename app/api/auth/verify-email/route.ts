import { NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth'
import { AppError, createErrorResponse } from '@/lib/utils/error'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { token } = body

    // Validar token
    if (!token) {
      throw new AppError('Token de verificación requerido', 'MISSING_TOKEN', 400)
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

  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'INVALID_TOKEN') {
        throw new AppError('Token inválido o expirado', 'INVALID_TOKEN', 401)
      }
      if (error.message === 'EMAIL_ALREADY_VERIFIED') {
        throw new AppError('El email ya ha sido verificado', 'EMAIL_ALREADY_VERIFIED', 400)
      }
    }
    return createErrorResponse(error)
  }
}