import { NextResponse } from 'next/server'
import { eq, and, desc, gte } from 'drizzle-orm'
import { z } from 'zod'
import db, { appointments } from '@/lib/db/schema'
import { verifyAuth } from '@/lib/auth/auth'

const appointmentSchema = z.object({
  type: z.string(),
  date: z.string(),
  area: z.string(),
  description: z.string().optional()
})

const updateAppointmentSchema = z.object({
  status: z.string(),
  date: z.string().optional(),
  description: z.string().optional()
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
    const upcoming = searchParams.get('upcoming') === 'true'

    if (id) {
      const appointment = await db
        .select()
        .from(appointments)
        .where(
          and(
            eq(appointments.id, Number(id)),
            auth.role === 'admin' ? undefined : eq(appointments.userId, Number(auth.id))
          )
        )
        .limit(1)

      if (!appointment.length) {
        return NextResponse.json(
          { error: 'Turno no encontrado' },
          { status: 404 }
        )
      }

      return NextResponse.json(appointment[0])
    }

    let query = db
      .select()
      .from(appointments)
      .where(
        auth.role === 'admin' ? undefined : eq(appointments.userId, Number(auth.id))
      )

    if (upcoming) {
      query = query.where(gte(appointments.date, new Date()))
    }

    const userAppointments = await query.orderBy(desc(appointments.date))

    return NextResponse.json(userAppointments)
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
    const validatedData = appointmentSchema.parse(body)

    // Verificar disponibilidad del turno
    const existingAppointment = await db
      .select()
      .from(appointments)
      .where(
        and(
          eq(appointments.date, new Date(validatedData.date)),
          eq(appointments.area, validatedData.area),
          eq(appointments.status, 'confirmed')
        )
      )
      .limit(1)

    if (existingAppointment.length) {
      return NextResponse.json(
        { error: 'El turno solicitado no está disponible' },
        { status: 400 }
      )
    }

    const [appointment] = await db
      .insert(appointments)
      .values({
        ...validatedData,
        userId: Number(auth.id),
        status: 'pending',
        date: new Date(validatedData.date),
        createdAt: new Date()
      })
      .returning()

    return NextResponse.json(appointment)
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

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID de turno requerido' },
        { status: 400 }
      )
    }

    const appointment = await db
      .select()
      .from(appointments)
      .where(eq(appointments.id, Number(id)))
      .limit(1)

    if (!appointment.length) {
      return NextResponse.json(
        { error: 'Turno no encontrado' },
        { status: 404 }
      )
    }

    // Solo admin o el usuario dueño del turno pueden actualizarlo
    if (appointment[0].userId !== Number(auth.id) && auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'No tiene permisos para actualizar este turno' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = updateAppointmentSchema.parse(body)

    // Si se está actualizando la fecha, verificar disponibilidad
    if (validatedData.date) {
      const existingAppointment = await db
        .select()
        .from(appointments)
        .where(
          and(
            eq(appointments.date, new Date(validatedData.date)),
            eq(appointments.area, appointment[0].area),
            eq(appointments.status, 'confirmed'),
            eq(appointments.id, Number(id))
          )
        )
        .limit(1)

      if (existingAppointment.length) {
        return NextResponse.json(
          { error: 'El turno solicitado no está disponible' },
          { status: 400 }
        )
      }
    }

    const [updatedAppointment] = await db
      .update(appointments)
      .set({
        ...validatedData,
        date: validatedData.date ? new Date(validatedData.date) : undefined,
        updatedAt: new Date(),
        cancelledAt: validatedData.status === 'cancelled' ? new Date() : null
      })
      .where(eq(appointments.id, Number(id)))
      .returning()

    return NextResponse.json(updatedAppointment)
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
        { error: 'ID de turno requerido' },
        { status: 400 }
      )
    }

    await db
      .delete(appointments)
      .where(eq(appointments.id, Number(id)))

    return NextResponse.json({ message: 'Turno eliminado exitosamente' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 