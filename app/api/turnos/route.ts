import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Aquí iría la lógica de persistencia real
    const turno = {
      numeroTurno: `TURNO-${Date.now()}`,
      estado: 'confirmado',
      fecha: data.fecha,
      horario: data.horario,
      tipo: data.tipo,
      datos: {
        nombre: data.nombre,
        documento: data.documento,
        email: data.email,
        telefono: data.telefono
      }
    }

    return NextResponse.json(turno)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al procesar la solicitud de turno' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const fecha = searchParams.get('fecha')
  const tipo = searchParams.get('tipo')

  if (!fecha || !tipo) {
    return NextResponse.json(
      { error: 'Fecha y tipo son requeridos' },
      { status: 400 }
    )
  }

  try {
    // Aquí iría la lógica de consulta real
    const horariosDisponibles = [
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00'
    ]

    return NextResponse.json({ horariosDisponibles })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al consultar horarios disponibles' },
      { status: 500 }
    )
  }
} 