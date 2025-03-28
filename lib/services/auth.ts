import { db } from '@/lib/db'
import { compare, hash } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'
import { generateTOTP, verifyTOTP } from '@/lib/utils/totp'
import { sendEmail } from '@/lib/utils/email'
import { rateLimit } from '@/lib/utils/rate-limit'

export interface LoginAttempt {
  ip: string
  timestamp: Date
  success: boolean
  userId?: string
  email?: string
  userAgent?: string
}

interface RegisterParams {
  email: string
  password: string
  nombre: string
  apellido: string
}

interface LoginParams {
  email: string
  password: string
}

interface TwoFactorParams {
  userId: string
  code: string
}

interface ResetPasswordParams {
  token: string
  newPassword: string
}

export const authService = {
  // Registro de usuario
  async register(params: RegisterParams) {
    const { email, password, nombre, apellido } = params

    // Verificar si el email ya existe
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new Error('EMAIL_EXISTS')
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 12)

    // Crear usuario
    const user = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        nombre,
        apellido,
        emailVerified: false,
        role: 'USER'
      }
    })

    // Generar token de verificación
    const verificationToken = sign(
      { userId: user.id, type: 'EMAIL_VERIFICATION' },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    // Enviar email de verificación
    await sendEmail({
      to: user.email,
      subject: 'Verifica tu cuenta',
      template: 'email-verification',
      data: {
        nombre: user.nombre,
        verificationLink: `${process.env.NEXT_PUBLIC_APP_URL}/verificar-email?token=${verificationToken}`
      }
    })

    return { user, verificationToken }
  },

  // Login
  async login(params: LoginParams) {
    const { email, password } = params

    // Verificar rate limiting
    const isBlocked = await rateLimit.checkLimit(email, 'login', {
      points: 5,
      duration: 60 * 15 // 15 minutos
    })

    if (isBlocked) {
      throw new Error('Demasiados intentos. Intente nuevamente en 15 minutos')
    }

    // Buscar usuario
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      await this.recordLoginAttempt({ ip: email, success: false })
      throw new Error('INVALID_CREDENTIALS')
    }

    // Verificar contraseña
    const isValid = await compare(password, user.password)
    if (!isValid) {
      await this.recordLoginAttempt({ ip: email, success: false, userId: user.id })
      throw new Error('INVALID_CREDENTIALS')
    }

    // Verificar estado de la cuenta
    if (user.status === 'BLOQUEADO') {
      throw new Error('Esta cuenta está bloqueada. Contacte al soporte')
    }

    if (user.status === 'PENDIENTE') {
      throw new Error('Debe verificar su email antes de continuar')
    }

    // Registrar login exitoso
    await this.recordLoginAttempt({ ip: email, success: true, userId: user.id })

    // Verificar si el email está verificado
    if (!user.emailVerified) {
      throw new Error('EMAIL_NOT_VERIFIED')
    }

    // Generar código 2FA si está habilitado
    if (user.twoFactorEnabled) {
      const twoFactorCode = generateTOTP(user.twoFactorSecret!)
      return {
        user,
        requiresTwoFactor: true,
        twoFactorCode
      }
    }

    // Generar token de acceso
    const token = sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    return { user, token }
  },

  // Verificación de dos factores
  async verifyTwoFactor(params: TwoFactorParams) {
    const { userId, code } = params

    const user = await db.user.findUnique({
      where: { id: userId }
    })

    if (!user || !user.twoFactorSecret) {
      throw new Error('INVALID_USER')
    }

    const isValid = verifyTOTP(code, user.twoFactorSecret)
    if (!isValid) {
      throw new Error('INVALID_CODE')
    }

    // Generar token de acceso
    const token = sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )

    return { user, token }
  },

  // Verificación de email
  async verifyEmail(token: string) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as {
        userId: string
        type: string
      }

      if (decoded.type !== 'EMAIL_VERIFICATION') {
        throw new Error('INVALID_TOKEN')
      }

      const user = await db.user.update({
        where: { id: decoded.userId },
        data: { emailVerified: true }
      })

      return user
    } catch {
      throw new Error('INVALID_TOKEN')
    }
  },

  // Recuperación de contraseña
  async createPasswordReset(email: string) {
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new Error('USER_NOT_FOUND')
    }

    // Generar token de restablecimiento
    const resetToken = sign(
      { userId: user.id, type: 'PASSWORD_RESET' },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    )

    return { user, resetToken }
  },

  async resetPassword(params: ResetPasswordParams) {
    const { token, newPassword } = params

    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as {
        userId: string
        type: string
      }

      if (decoded.type !== 'PASSWORD_RESET') {
        throw new Error('INVALID_TOKEN')
      }

      // Verificar requisitos de contraseña
      if (newPassword.length < 8) {
        throw new Error('PASSWORD_TOO_WEAK')
      }

      // Hash de la nueva contraseña
      const hashedPassword = await hash(newPassword, 12)

      // Actualizar contraseña
      const user = await db.user.update({
        where: { id: decoded.userId },
        data: { password: hashedPassword }
      })

      return user
    } catch {
      throw new Error('INVALID_TOKEN')
    }
  },

  // Validación de token
  async validateToken(token: string) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as {
        userId: string
        role: string
      }

      const user = await db.user.findUnique({
        where: { id: decoded.userId }
      })

      if (!user) {
        throw new Error('INVALID_TOKEN')
      }

      return user
    } catch {
      throw new Error('INVALID_TOKEN')
    }
  },

  // Obtener tiempo de expiración del token
  async getTokenExpiresIn(token: string) {
    try {
      const decoded = verify(token, process.env.JWT_SECRET!) as {
        exp: number
      }

      const now = Math.floor(Date.now() / 1000)
      return decoded.exp - now
    } catch {
      return 0
    }
  },

  // Refresco de token
  async refreshToken(oldToken: string) {
    const user = await this.validateToken(oldToken)

    return sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    )
  },

  // Logout
  async logout(token: string) {
    // En una implementación más compleja, aquí se podría:
    // 1. Agregar el token a una lista negra
    // 2. Invalidar sesiones del usuario
    // 3. Limpiar caché relacionada
    return true
  },

  // Registro de intentos de login
  async recordLoginAttempt(attempt: LoginAttempt) {
    await db.loginAttempt.create({
      data: {
        ip: attempt.ip,
        email: attempt.email,
        success: attempt.success,
        timestamp: new Date(),
        userAgent: attempt.userAgent
      }
    })

    // Si hay demasiados intentos fallidos, bloquear la cuenta
    if (!attempt.success && attempt.userId) {
      const recentAttempts = await db.loginAttempt.count({
        where: {
          userId: attempt.userId,
          success: false,
          timestamp: {
            gte: new Date(Date.now() - 15 * 60 * 1000) // últimos 15 minutos
          }
        }
      })

      if (recentAttempts >= 5) {
        await db.user.update({
          where: { id: attempt.userId },
          data: { status: 'BLOQUEADO' }
        })
      }
    }
  }
} 