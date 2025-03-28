import { NextResponse } from 'next/server'
import { eq, and, desc } from 'drizzle-orm'
import { z } from 'zod'
import db, { procedures } from '@/lib/db/schema'
import { verifyAuth } from '@/lib/auth/auth'

const procedureSchema = z.object({
  type: z.string(),
  title: z.string(),
  description: z.string().optional(),
  documents: z.array(z.string()).optional()
})

const updateProcedureSchema = z.object({
  status: z.string().optional(),
  description: z.string().optional(),
  documents: z.array(z.string()).optional(),
  assignedTo: z.number().optional(),
  comments: z.array(z.object({
    userId: z.number(),
    comment: z.string(),
    timestamp: z.string()
  })).optional()
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
      const procedure = await db
        .select()
        .from(procedures)
        .where(
          and(
            eq(procedures.id, Number(id)),
            auth.role === 'admin' ? undefined : eq(procedures.userId, Number(auth.id))
          )
        )
        .limit(1)

      if (!procedure.length) {
        return NextResponse.json(
          { error: 'Trámite no encontrado' },
          { status: 404 }
        )
      }

      return NextResponse.json(procedure[0])
    }

    const userProcedures = await db
      .select()
      .from(procedures)
      .where(
        auth.role === 'admin' ? undefined : eq(procedures.userId, Number(auth.id))
      )
      .orderBy(desc(procedures.createdAt))

    return NextResponse.json(userProcedures)
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
    const validatedData = procedureSchema.parse(body)

    const [procedure] = await db
      .insert(procedures)
      .values({
        ...validatedData,
        userId: Number(auth.id),
        status: 'pending',
        createdAt: new Date()
      })
      .returning()

    return NextResponse.json(procedure)
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
        { error: 'ID de trámite requerido' },
        { status: 400 }
      )
    }

    const procedure = await db
      .select()
      .from(procedures)
      .where(eq(procedures.id, Number(id)))
      .limit(1)

    if (!procedure.length) {
      return NextResponse.json(
        { error: 'Trámite no encontrado' },
        { status: 404 }
      )
    }

    // Solo admin puede actualizar trámites de otros usuarios
    if (procedure[0].userId !== Number(auth.id) && auth.role !== 'admin') {
      return NextResponse.json(
        { error: 'No tiene permisos para actualizar este trámite' },
        { status: 403 }
      )
    }

    const body = await req.json()
    const validatedData = updateProcedureSchema.parse(body)

    const [updatedProcedure] = await db
      .update(procedures)
      .set({
        ...validatedData,
        updatedAt: new Date(),
        completedAt: validatedData.status === 'completed' ? new Date() : null
      })
      .where(eq(procedures.id, Number(id)))
      .returning()

    return NextResponse.json(updatedProcedure)
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
        { error: 'ID de trámite requerido' },
        { status: 400 }
      )
    }

    await db
      .delete(procedures)
      .where(eq(procedures.id, Number(id)))

    return NextResponse.json({ message: 'Trámite eliminado exitosamente' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
} 