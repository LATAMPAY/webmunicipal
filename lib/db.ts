import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

// Crear una conexión SQL con Neon
export const sql = neon(process.env.DATABASE_URL!)

// Crear una instancia de Drizzle para operaciones más estructuradas
export const db = drizzle(sql)

// Función de utilidad para ejecutar consultas SQL directas
export async function executeQuery(query: string, params: any[] = []) {
  try {
    return await sql(query, params)
  } catch (error) {
    console.error("Error executing query:", error)
    throw error
  }
}

// Funciones de utilidad para operaciones comunes

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

export async function getEventById(id: number) {
  const results = await sql`
    SELECT * FROM events WHERE id = ${id}
  `
  return results[0] || null
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
export async function saveContactMessage(message: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  return await sql`
    INSERT INTO contact_messages (name, email, phone, subject, message)
    VALUES (${message.name}, ${message.email}, ${message.phone || null}, ${message.subject}, ${message.message})
    RETURNING id
  `
}

// Reclamos
export async function saveComplaint(complaint: {
  user_id?: number
  category: string
  subject: string
  description: string
  location?: string
  latitude?: number
  longitude?: number
}) {
  return await sql`
    INSERT INTO complaints (
      user_id, category, subject, description, location, latitude, longitude
    )
    VALUES (
      ${complaint.user_id || null}, 
      ${complaint.category}, 
      ${complaint.subject}, 
      ${complaint.description}, 
      ${complaint.location || null}, 
      ${complaint.latitude || null}, 
      ${complaint.longitude || null}
    )
    RETURNING id
  `
}

