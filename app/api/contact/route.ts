import { type NextRequest, NextResponse } from "next/server"
import { saveContactMessage } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validar los datos
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    // Guardar el mensaje
    const result = await saveContactMessage({
      name: body.name,
      email: body.email,
      phone: body.phone,
      subject: body.subject,
      message: body.message,
    })

    return NextResponse.json({ id: result[0].id }, { status: 201 })
  } catch (error: any) {
    console.error("Error saving contact message:", error)

    return NextResponse.json({ error: error.message || "Error al enviar el mensaje" }, { status: 500 })
  }
}

