import { eq } from 'drizzle-orm'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import db, { users } from '../db/schema'

const secretKey = process.env.JWT_SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export async function encrypt(password: string): Promise<string> {
  return await bcrypt.hash(password, 10)
}

export async function compare(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

export async function createSession(user: any) {
  const token = await new SignJWT({
    id: user.id,
    role: user.role,
    email: user.email
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(key)

  cookies().set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400 // 24 hours
  })

  return token
}

export async function verifyAuth(req: NextRequest) {
  const token = req.cookies.get('session')?.value

  if (!token) throw new Error('No token found')

  try {
    const verified = await jwtVerify(token, key)
    return verified.payload
  } catch (err) {
    throw new Error('Invalid token')
  }
}

export async function login(email: string, password: string) {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1)
  
  if (!user.length) throw new Error('Usuario no encontrado')
  
  const isValid = await compare(password, user[0].password)
  if (!isValid) throw new Error('Contraseña incorrecta')

  if (!user[0].isActive) throw new Error('Usuario inactivo')

  await db
    .update(users)
    .set({ lastLogin: new Date() })
    .where(eq(users.id, user[0].id))

  const session = await createSession(user[0])
  return { user: user[0], session }
}

export async function register(userData: {
  name: string
  email: string
  password: string
  dni: string
  phone?: string
  address?: string
  city?: string
  province?: string
  postalCode?: string
}) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, userData.email))
    .limit(1)

  if (existingUser.length) throw new Error('El email ya está registrado')

  const existingDNI = await db
    .select()
    .from(users)
    .where(eq(users.dni, userData.dni))
    .limit(1)

  if (existingDNI.length) throw new Error('El DNI ya está registrado')

  const hashedPassword = await encrypt(userData.password)

  const [user] = await db
    .insert(users)
    .values({
      ...userData,
      password: hashedPassword,
      notificationPreferences: {
        email: true,
        sms: false,
        whatsapp: false
      }
    })
    .returning()

  const session = await createSession(user)
  return { user, session }
}

export async function logout() {
  cookies().delete('session')
}

export async function updatePassword(userId: number, currentPassword: string, newPassword: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  if (!user.length) throw new Error('Usuario no encontrado')

  const isValid = await compare(currentPassword, user[0].password)
  if (!isValid) throw new Error('Contraseña actual incorrecta')

  const hashedPassword = await encrypt(newPassword)

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, userId))
}

export async function resetPassword(email: string) {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (!user.length) throw new Error('Usuario no encontrado')

  // Aquí implementarías la lógica para enviar el email de recuperación
  // Por ahora solo retornamos true para indicar que el proceso inició
  return true
} 