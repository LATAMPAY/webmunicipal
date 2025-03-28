import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import { PrismaClient } from '@prisma/client'
import * as schema from './schema'
import { Pool } from 'pg'
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma

// Crear una conexión SQL con Neon
const sql = neon(process.env.DATABASE_URL!)

// Crear una instancia de Drizzle para operaciones más estructuradas
export const db = drizzle(sql, { schema })

// Crear una configuración alternativa para la base de datos usando pg
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

export const dbPg = drizzlePg(pool, { schema })

// Función de utilidad para ejecutar consultas SQL directas
export async function executeQuery(query: string, params: any[] = []) {
  try {
    return await sql`${query}`
  } catch (error) {
    console.error("Error executing query:", error)
    throw error
  }
}

// Funciones de utilidad para operaciones comunes

// Noticias
export async function getNews(limit = 3) {
  return await db.query.news.findMany({
    orderBy: (news, { desc }) => [desc(news.publishedAt)],
    limit
  })
}

export async function getNewsById(id: string) {
  return await db.query.news.findFirst({
    where: (news, { eq }) => eq(news.id, id)
  })
}

// Eventos
export async function getEvents(limit = 3) {
  return await db.query.events.findMany({
    where: (events, { gte }) => gte(events.startDate, new Date()),
    orderBy: (events, { asc }) => [asc(events.startDate)],
    limit
  })
}

export async function getEventById(id: string) {
  return await db.query.events.findFirst({
    where: (events, { eq }) => eq(events.id, id)
  })
}

// Documentos
export async function getDocuments(type?: string, limit = 10) {
  if (type) {
    return await db.query.documents.findMany({
      where: (documents, { eq }) => eq(documents.type, type),
      orderBy: (documents, { desc }) => [desc(documents.publishedAt)],
      limit
    })
  }

  return await db.query.documents.findMany({
    orderBy: (documents, { desc }) => [desc(documents.publishedAt)],
    limit
  })
}

// Contacto
export async function saveContactMessage(message: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  return await db.insert(schema.contactMessages).values({
    name: message.name,
    email: message.email,
    phone: message.phone,
    subject: message.subject,
    message: message.message
  }).returning()
}

// Reclamos
export async function saveComplaint(complaint: {
  userId?: string
  category: string
  subject: string
  description: string
  location?: string
  latitude?: number
  longitude?: number
}) {
  return await db.insert(schema.complaints).values({
    userId: complaint.userId,
    category: complaint.category,
    subject: complaint.subject,
    description: complaint.description,
    location: complaint.location,
    latitude: complaint.latitude,
    longitude: complaint.longitude
  }).returning()
}

// Definir los tipos de las tablas
export interface User {
  id: string
  email: string
  password: string
  name: string
  role: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginAttempt {
  id: string
  ip: string
  email?: string
  success: boolean
  userId?: string
  userAgent?: string
  timestamp: Date
}

