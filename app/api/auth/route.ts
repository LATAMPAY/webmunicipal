import { NextResponse } from 'next/server'
import { z } from 'zod'
import { login, register, logout, resetPassword } from '@/lib/auth/auth'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
})

const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  dni: z.string().min(7, 'DNI inválido'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional()
})

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const action = searchParams.get('action')
    const body = await req.json()

    switch (action) {
      case 'login': {
        const validatedData = loginSchema.parse(body)
        const result = await login(validatedData.email, validatedData.password)
        const { password, ...userData } = result.user
        return NextResponse.json({ user: userData })
      }

      case 'register': {
        const validatedData = registerSchema.parse(body)
        const result = await register(validatedData)
        const { password, ...userData } = result.user
        return NextResponse.json({ user: userData })
      }

      case 'logout': {
        await logout()
        return NextResponse.json({ message: 'Sesión cerrada exitosamente' })
      }

      case 'reset-password': {
        const { email } = body
        if (!email) {
          return NextResponse.json(
            { error: 'Email requerido' },
            { status: 400 }
          )
        }
        await resetPassword(email)
        return NextResponse.json({
          message: 'Si el email existe, recibirás instrucciones para restablecer tu contraseña'
        })
      }

      default:
        return NextResponse.json(
          { error: 'Acción no válida' },
          { status: 400 }
        )
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 