import { NextResponse } from 'next/server'
import { authService } from '@/lib/services/auth'
import { sendEmail } from '@/lib/utils/email'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password, nombre, apellido } = body

    // Validar campos requeridos
    if (!email || !password || !nombre || !apellido) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
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

  } catch (error: any) {
    console.error('Error en registro:', error)
    
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'El email ya está registrado' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error al registrar usuario' },
      { status: 500 }
    )
  }
}

