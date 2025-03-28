import { db } from '@/lib/db'
import { users, loginAttempts } from '@/lib/schema'
import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { eq, sql } from 'drizzle-orm'

interface TokenPayload {
  userId: string
  role: string
  iat: number
  exp: number
}

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
  private readonly JWT_EXPIRES_IN = '24h'

  constructor() {}

  async login(email: string, password: string, ip: string, userAgent: string) {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.email, email),
        columns: {
          id: true,
          email: true,
          password: true,
          role: true,
          status: true
        }
      })

      if (!user) {
        await this.recordLoginAttempt({
          ip,
          email,
          success: false,
          userAgent
        })
        throw new Error('Credenciales inválidas')
      }

      if (user.status !== 'active') {
        await this.recordLoginAttempt({
          ip,
          email,
          success: false,
          userId: user.id,
          userAgent
        })
        throw new Error('Cuenta inactiva')
      }

      const isValidPassword = await compare(password, user.password)
      if (!isValidPassword) {
        await this.recordLoginAttempt({
          ip,
          email,
          success: false,
          userId: user.id,
          userAgent
        })
        throw new Error('Credenciales inválidas')
      }

      const token = this.generateToken(user.id, user.role)
      await this.setAuthCookie(token)

      await this.recordLoginAttempt({
        ip,
        email,
        success: true,
        userId: user.id,
        userAgent
      })

      return {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      }
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    }
  }

  async logout() {
    try {
      const cookieStore = cookies()
      cookieStore.delete('auth_token')
      return { success: true }
    } catch (error) {
      console.error('Error en logout:', error)
      throw error
    }
  }

  async register(userData: {
    email: string
    password: string
    name: string
    role: string
  }) {
    try {
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, userData.email)
      })

      if (existingUser) {
        throw new Error('El email ya está registrado')
      }

      const hashedPassword = await hash(userData.password, 10)
      const user = await db.insert(users).values({
        ...userData,
        password: hashedPassword,
        status: 'active'
      }).returning()

      return {
        success: true,
        user: {
          id: user[0].id,
          email: user[0].email,
          name: user[0].name,
          role: user[0].role
        }
      }
    } catch (error) {
      console.error('Error en registro:', error)
      throw error
    }
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    try {
      return verify(token, this.JWT_SECRET) as TokenPayload
    } catch (error) {
      throw new Error('Token inválido')
    }
  }

  async getCurrentUser() {
    try {
      const token = await this.getAuthToken()
      if (!token) {
        throw new Error('No autenticado')
      }

      const payload = await this.verifyToken(token)
      const user = await db.query.users.findFirst({
        where: eq(users.id, payload.userId),
        columns: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true
        }
      })

      if (!user) {
        throw new Error('Usuario no encontrado')
      }

      return user
    } catch (error) {
      console.error('Error al obtener usuario actual:', error)
      throw error
    }
  }

  private generateToken(userId: string, role: string): string {
    return sign(
      { userId, role },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    )
  }

  private async setAuthCookie(token: string) {
    const cookieStore = cookies()
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 // 24 horas
    })
  }

  private async getAuthToken(): Promise<string | undefined> {
    const cookieStore = cookies()
    return cookieStore.get('auth_token')?.value
  }

  async recordLoginAttempt(attempt: {
    ip: string
    email?: string
    success: boolean
    userId?: string
    userAgent?: string
  }) {
    await db.insert(loginAttempts).values({
      ...attempt,
      success: attempt.success.toString()
    })

    // Si hay demasiados intentos fallidos, bloquear la cuenta
    if (!attempt.success && attempt.userId) {
      const recentAttempts = await db
        .select({ count: sql<number>`count(*)` })
        .from(loginAttempts)
        .where(eq(loginAttempts.userId, attempt.userId))

      if (recentAttempts[0].count >= 5) {
        await db.update(users)
          .set({ status: 'BLOQUEADO' })
          .where(eq(users.id, attempt.userId))
      }
    }
  }
}