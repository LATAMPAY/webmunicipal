import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import db, { users } from '@/lib/db/schema'
import { verifyAuth } from '@/lib/auth/auth'
import { z } from 'zod'

const updateUserSchema = z.object({
  name: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  province: z.string().optional(),
  postalCode: z.string().optional(),
  notificationPreferences: z.object({
    email: z.boolean(),
    sms: z.boolean(),
    whatsapp: z.boolean()
  }).optional()
})

export async function GET(req: Request) {
  try {
    const auth = await verifyAuth(req as any)
    if (!auth) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, Number(auth.id)))
      .limit(1)

    if (!user.length) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      )
    }

    const { password, ...userData } = user[0]
    return NextResponse.json(userData)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const auth = await verifyAuth(req as any)
    if (!auth) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = updateUserSchema.parse(body)

    const [updatedUser] = await db
      .update(users)
      .set({
        ...validatedData,
        updatedAt: new Date()
      })
      .where(eq(users.id, Number(auth.id)))
      .returning()

    const { password, ...userData } = updatedUser
    return NextResponse.json(userData)
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

export async function DELETE(req: Request) {
  try {
    const auth = await verifyAuth(req as any)
    if (!auth) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    if (auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'No tiene permisos para realizar esta acción' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('id')

    if (!userId) {
      return NextResponse.json(
        { error: 'ID de usuario requerido' },
        { status: 400 }
      )
    }

    await db
      .update(users)
      .set({ 
        isActive: false,
        updatedAt: new Date()
      })
      .where(eq(users.id, Number(userId)))

    return NextResponse.json({ message: 'Usuario desactivado exitosamente' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 