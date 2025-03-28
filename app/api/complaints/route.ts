import { type NextRequest, NextResponse } from "next/server"
import { saveComplaint } from "@/lib/db"
import { getCurrentUser } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar los datos
    if (!body.category || !body.subject || !body.description) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    // Obtener el usuario actual (si está autenticado)
    const currentUser = await getCurrentUser()

    // Guardar el reclamo
    const result = await saveComplaint({
      user_id: currentUser?.id,
      category: body.category,
      subject: body.subject,
      description: body.description,
      location: body.location,
      latitude: body.latitude,
      longitude: body.longitude,
    })

    return NextResponse.json({ id: result[0].id }, { status: 201 })
  } catch (error: any) {
    console.error("Error saving complaint:", error)

    return NextResponse.json({ error: error.message || "Error al enviar el reclamo" }, { status: 500 })
  }
}

