import { NextResponse } from 'next/server'
import { eq, and, desc } from 'drizzle-orm'
import { z } from 'zod'
import db, { payments } from '@/lib/db/schema'
import { verifyAuth } from '@/lib/auth/auth'

const paymentSchema = z.object({
  amount: z.number().positive('El monto debe ser positivo'),
  concept: z.string(),
  paymentMethod: z.string(),
  dueDate: z.string().optional()
})

const updatePaymentSchema = z.object({
  status: z.string(),
  transactionId: z.string().optional(),
  receipt: z.string().optional()
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

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (id) {
      const payment = await db
        .select()
        .from(payments)
        .where(
          and(
            eq(payments.id, Number(id)),
            auth.role === 'admin' ? undefined : eq(payments.userId, Number(auth.id))
          )
        )
        .limit(1)

      if (!payment.length) {
        return NextResponse.json(
          { error: 'Pago no encontrado' },
          { status: 404 }
        )
      }

      return NextResponse.json(payment[0])
    }

    const userPayments = await db
      .select()
      .from(payments)
      .where(
        auth.role === 'admin' ? undefined : eq(payments.userId, Number(auth.id))
      )
      .orderBy(desc(payments.createdAt))

    return NextResponse.json(userPayments)
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const auth = await verifyAuth(req as any)
    if (!auth) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const validatedData = paymentSchema.parse(body)

    const [payment] = await db
      .insert(payments)
      .values({
        ...validatedData,
        userId: Number(auth.id),
        status: 'pending',
        createdAt: new Date()
      })
      .returning()

    return NextResponse.json(payment)
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

export async function PUT(req: Request) {
  try {
    const auth = await verifyAuth(req as any)
    if (!auth) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    // Solo admin puede actualizar pagos
    if (auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'No tiene permisos para realizar esta acción' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID de pago requerido' },
        { status: 400 }
      )
    }

    const payment = await db
      .select()
      .from(payments)
      .where(eq(payments.id, Number(id)))
      .limit(1)

    if (!payment.length) {
      return NextResponse.json(
        { error: 'Pago no encontrado' },
        { status: 404 }
      )
    }

    const body = await req.json()
    const validatedData = updatePaymentSchema.parse(body)

    const [updatedPayment] = await db
      .update(payments)
      .set({
        ...validatedData,
        paidAt: validatedData.status === 'completed' ? new Date() : null
      })
      .where(eq(payments.id, Number(id)))
      .returning()

    return NextResponse.json(updatedPayment)
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
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID de pago requerido' },
        { status: 400 }
      )
    }

    await db
      .delete(payments)
      .where(eq(payments.id, Number(id)))

    return NextResponse.json({ message: 'Pago eliminado exitosamente' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 