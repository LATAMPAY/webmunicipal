"use server"

import { cookies } from "next/headers"
import { sql } from "@/lib/db"
import bcryptjs from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Función para generar un JWT_SECRET aleatorio si no existe
let jwtSecret: string

export async function getJwtSecret() {
  if (jwtSecret) return jwtSecret

  // Si existe en las variables de entorno, usarlo
  if (process.env.JWT_SECRET) {
    jwtSecret = process.env.JWT_SECRET
    return jwtSecret
  }

  // Si no existe, generar uno aleatorio usando Math.random en lugar de crypto
  // Esto es menos seguro pero funciona para desarrollo
  jwtSecret = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

  console.log("JWT_SECRET generado automáticamente. Para producción, establezca esta variable en su entorno.")
  return jwtSecret
}

// Función para hashear contraseñas
export async function hashPassword(password: string) {
  return await bcryptjs.hash(password, 10)
}

// Función para verificar contraseñas
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcryptjs.compare(password, hashedPassword)
}

// Función para crear un token JWT
export async function createToken(payload: any) {
  const secret = new TextEncoder().encode(getJwtSecret())

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)

  return token
}

// Función para verificar un token JWT
export async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(getJwtSecret())
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    return null
  }
}

// Función para obtener el usuario actual
export async function getUser() {
  const cookieStore = cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    return null
  }

  const payload = await verifyToken(token)

  if (!payload || !payload.id) {
    return null
  }

  const users = await sql`
    SELECT id, email, first_name, last_name, document_type, document_number, phone
    FROM users
    WHERE id = ${payload.id}
  `

  if (users.length === 0) {
    return null
  }

  return users[0]
}

// Función para registrar un usuario
export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const first_name = formData.get("first_name") as string
  const last_name = formData.get("last_name") as string
  const document_type = formData.get("document_type") as string
  const document_number = formData.get("document_number") as string
  const phone = (formData.get("phone") as string) || null

  // Validar los datos
  if (!email || !password || !first_name || !last_name || !document_type || !document_number) {
    return { success: false, message: "Todos los campos son obligatorios" }
  }

  try {
    // Verificar si el usuario ya existe
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      return { success: false, message: "El correo electrónico ya está registrado" }
    }

    // Hashear la contraseña
    const hashedPassword = await hashPassword(password)

    // Insertar el usuario
    const result = await sql`
      INSERT INTO users (
        email, password_hash, first_name, last_name, document_type, document_number, phone
      )
      VALUES (
        ${email},
        ${hashedPassword},
        ${first_name},
        ${last_name},
        ${document_type},
        ${document_number},
        ${phone}
      )
      RETURNING id, email, first_name, last_name
    `

    // Crear el token
    const token = await createToken({
      id: result[0].id,
      email: result[0].email,
    })

    // Establecer la cookie
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
    })

    redirect("/area-usuario")
  } catch (error: any) {
    console.error("Error registering user:", error)
    return { success: false, message: error.message || "Error al registrar el usuario" }
  }
}

// Función para iniciar sesión
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  // Validar los datos
  if (!email || !password) {
    return { success: false, message: "El correo electrónico y la contraseña son obligatorios" }
  }

  try {
    // Buscar el usuario
    const users = await sql`
      SELECT id, email, password_hash, first_name, last_name
      FROM users
      WHERE email = ${email}
    `

    if (users.length === 0) {
      return { success: false, message: "Credenciales inválidas" }
    }

    const user = users[0]

    // Verificar la contraseña
    const isPasswordValid = await verifyPassword(password, user.password_hash)

    if (!isPasswordValid) {
      return { success: false, message: "Credenciales inválidas" }
    }

    // Crear el token
    const token = await createToken({
      id: user.id,
      email: user.email,
    })

    // Establecer la cookie
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 24 horas
    })

    redirect("/area-usuario")
  } catch (error: any) {
    console.error("Error logging in:", error)
    return { success: false, message: error.message || "Error al iniciar sesión" }
  }
}

// Función para cerrar sesión
export async function logoutUser() {
  cookies().delete("auth_token")
  redirect("/")
}

// Noticias
export async function getNews(limit = 3) {
  return await sql`
    SELECT id, title, excerpt, image_url, published_at 
    FROM news 
    ORDER BY published_at DESC 
    LIMIT ${limit}
  `
}

export async function getNewsById(id: number) {
  const results = await sql`
    SELECT * FROM news WHERE id = ${id}
  `
  return results[0] || null
}

// Eventos
export async function getEvents(limit = 3) {
  return await sql`
    SELECT id, title, description, location, start_date, end_date, image_url 
    FROM events 
    WHERE start_date >= NOW() 
    ORDER BY start_date ASC 
    LIMIT ${limit}
  `
}

// Documentos
export async function getDocuments(type?: string, limit = 10) {
  if (type) {
    return await sql`
      SELECT * FROM documents 
      WHERE document_type = ${type} 
      ORDER BY publication_date DESC 
      LIMIT ${limit}
    `
  }

  return await sql`
    SELECT * FROM documents 
    ORDER BY publication_date DESC 
    LIMIT ${limit}
  `
}

// Contacto
export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = (formData.get("phone") as string) || null
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validar los datos
  if (!name || !email || !subject || !message) {
    return { success: false, message: "Todos los campos son obligatorios" }
  }

  try {
    // Guardar el mensaje
    const result = await sql`
      INSERT INTO contact_messages (name, email, phone, subject, message)
      VALUES (${name}, ${email}, ${phone}, ${subject}, ${message})
      RETURNING id
    `

    return { success: true, message: "Mensaje enviado correctamente", id: result[0].id }
  } catch (error: any) {
    console.error("Error saving contact message:", error)
    return { success: false, message: error.message || "Error al enviar el mensaje" }
  }
}

// Reclamos
export async function submitComplaint(formData: FormData) {
  const user = await getUser()
  const category = formData.get("category") as string
  const subject = formData.get("subject") as string
  const description = formData.get("description") as string
  const location = (formData.get("location") as string) || null
  const latitude = formData.get("latitude") ? Number.parseFloat(formData.get("latitude") as string) : null
  const longitude = formData.get("longitude") ? Number.parseFloat(formData.get("longitude") as string) : null

  // Validar los datos
  if (!category || !subject || !description) {
    return { success: false, message: "Todos los campos son obligatorios" }
  }

  try {
    // Guardar el reclamo
    const result = await sql`
      INSERT INTO complaints (
        user_id, category, subject, description, location, latitude, longitude
      )
      VALUES (
        ${user?.id || null}, 
        ${category}, 
        ${subject}, 
        ${description}, 
        ${location}, 
        ${latitude}, 
        ${longitude}
      )
      RETURNING id
    `

    revalidatePath("/servicios/reclamos")
    return { success: true, message: "Reclamo enviado correctamente", id: result[0].id }
  } catch (error: any) {
    console.error("Error saving complaint:", error)
    return { success: false, message: error.message || "Error al enviar el reclamo" }
  }
}

// Turnos
export async function createAppointment(formData: FormData) {
  const user = await getUser()

  if (!user) {
    return { success: false, message: "Debe iniciar sesión para solicitar un turno" }
  }

  const service = formData.get("service") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const notes = (formData.get("notes") as string) || null

  // Validar los datos
  if (!service || !date || !time) {
    return { success: false, message: "Todos los campos son obligatorios" }
  }

  try {
    // Convertir fecha y hora a timestamp
    const appointmentDate = new Date(`${date}T${time}`)

    // Guardar el turno
    const result = await sql`
      INSERT INTO appointments (
        user_id, service, appointment_date, notes, status
      )
      VALUES (
        ${user.id}, 
        ${service}, 
        ${appointmentDate.toISOString()}, 
        ${notes}, 
        'pending'
      )
      RETURNING id
    `

    revalidatePath("/servicios/turnos")
    return { success: true, message: "Turno solicitado correctamente", id: result[0].id }
  } catch (error: any) {
    console.error("Error creating appointment:", error)
    return { success: false, message: error.message || "Error al solicitar el turno" }
  }
}

// Obtener turnos del usuario
export async function getUserAppointments() {
  const user = await getUser()

  if (!user) {
    return []
  }

  return await sql`
    SELECT id, service, appointment_date, notes, status
    FROM appointments
    WHERE user_id = ${user.id}
    ORDER BY appointment_date DESC
  `
}

// Obtener reclamos del usuario
export async function getUserComplaints() {
  const user = await getUser()

  if (!user) {
    return []
  }

  return await sql`
    SELECT id, category, subject, description, status, created_at, updated_at
    FROM complaints
    WHERE user_id = ${user.id}
    ORDER BY created_at DESC
  `
}

