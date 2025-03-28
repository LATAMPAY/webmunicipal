"use server"

import { cookies } from "next/headers"
import { sql } from "@/lib/db"
import bcryptjs from "bcryptjs"
import { SignJWT, jwtVerify } from "jose"
import { redirect } from "next/navigation"

// Función para generar un JWT_SECRET aleatorio si no existe
let jwtSecret: string

export function getJwtSecret() {
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
export async function getCurrentUser() {
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
export async function loginUser(email: string, password: string) {
  // Validar los datos
  if (!email || !password) {
    throw new Error("El correo electrónico y la contraseña son obligatorios")
  }

  try {
    // Buscar el usuario
    const users = await sql`
      SELECT id, email, password_hash, first_name, last_name
      FROM users
      WHERE email = ${email}
    `

    if (users.length === 0) {
      throw new Error("Credenciales inválidas")
    }

    const user = users[0]

    // Verificar la contraseña
    const isPasswordValid = await verifyPassword(password, user.password_hash)

    if (!isPasswordValid) {
      throw new Error("Credenciales inválidas")
    }

    // Crear el token
    const token = await createToken({
      id: user.id,
      email: user.email,
    })

    return { user, token }
  } catch (error: any) {
    console.error("Error logging in:", error)
    throw new Error(error.message || "Error al iniciar sesión")
  }
}

// Función para cerrar sesión
export async function logoutUser() {
  cookies().delete("auth_token")
  redirect("/")
}

