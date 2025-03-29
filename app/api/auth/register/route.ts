import { NextResponse } from 'next/server'
import { AuthService } from '@/lib/services/auth'
import { sendEmail } from '@/lib/utils/email'
import { AppError, createErrorResponse } from '@/lib/utils/error'

const authService = new AuthService()

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, nombre, apellido } = body

    // Validar campos requeridos
    if (!email || !password || !nombre || !apellido) {
      throw new AppError('Todos los campos son requeridos', 'MISSING_FIELDS', 400)
    }

    // Registrar usuario
    const { user, verificationToken } = await authService.register({
      email,
      password,
      nombre,
      apellido
    })

    // Enviar email de verificación
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/verificar-email?token=${verificationToken}`
    
    await sendEmail({
      to: email,
      subject: 'Verifica tu cuenta - Portal Municipal',
      template: 'email-verification',
      data: {
        nombre: user.nombre,
        verificationLink
      }
    })

    return NextResponse.json({
      message: 'Usuario registrado exitosamente. Por favor verifica tu email.',
      userId: user.id
    })

  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      throw new AppError('El email ya está registrado', 'EMAIL_EXISTS', 400)
    }
    return createErrorResponse(error)
  }
}

