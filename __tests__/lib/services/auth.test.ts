import { authService } from '@/lib/services/auth'
import { db } from '@/lib/db'
import { hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

// Mock de la base de datos
jest.mock('@/lib/db', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  },
  loginAttempt: {
    create: jest.fn(),
    count: jest.fn()
  }
}))

// Mock de bcryptjs
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn()
}))

// Mock de jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn()
}))

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('register', () => {
    const registerData = {
      email: 'test@example.com',
      password: 'password123',
      nombre: 'Test',
      apellido: 'User'
    }

    it('registra un nuevo usuario exitosamente', async () => {
      // Mock de hash
      ;(hash as jest.Mock).mockResolvedValue('hashed_password')

      // Mock de create
      ;(db.user.findUnique as jest.Mock).mockResolvedValue(null)
      ;(db.user.create as jest.Mock).mockResolvedValue({
        id: '1',
        ...registerData,
        password: 'hashed_password'
      })

      // Mock de sign
      ;(sign as jest.Mock).mockReturnValue('verification_token')

      const result = await authService.register(registerData)

      expect(result.user).toBeDefined()
      expect(result.verificationToken).toBe('verification_token')
      expect(db.user.create).toHaveBeenCalledWith({
        data: {
          ...registerData,
          password: 'hashed_password',
          emailVerified: false,
          role: 'USER'
        }
      })
    })

    it('lanza error si el email ya existe', async () => {
      ;(db.user.findUnique as jest.Mock).mockResolvedValue({ id: '1' })

      await expect(authService.register(registerData)).rejects.toThrow('EMAIL_EXISTS')
    })
  })

  describe('login', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123'
    }

    const mockUser = {
      id: '1',
      email: loginData.email,
      password: 'hashed_password',
      emailVerified: true,
      role: 'USER'
    }

    it('inicia sesión exitosamente', async () => {
      ;(db.user.findUnique as jest.Mock).mockResolvedValue(mockUser)
      ;(db.loginAttempt.create as jest.Mock).mockResolvedValue({})
      ;(hash as jest.Mock).mockImplementation((str) => `hashed_${str}`)
      ;(sign as jest.Mock).mockReturnValue('access_token')

      const result = await authService.login(loginData)

      expect(result.user).toBeDefined()
      expect(result.token).toBe('access_token')
    })

    it('lanza error con credenciales inválidas', async () => {
      ;(db.user.findUnique as jest.Mock).mockResolvedValue(null)

      await expect(authService.login(loginData)).rejects.toThrow('INVALID_CREDENTIALS')
    })

    it('lanza error si el email no está verificado', async () => {
      ;(db.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        emailVerified: false
      })

      await expect(authService.login(loginData)).rejects.toThrow('EMAIL_NOT_VERIFIED')
    })
  })

  describe('verifyEmail', () => {
    it('verifica el email exitosamente', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com'
      }

      ;(db.user.update as jest.Mock).mockResolvedValue(mockUser)

      const result = await authService.verifyEmail('valid_token')

      expect(result).toEqual(mockUser)
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: expect.any(String) },
        data: { emailVerified: true }
      })
    })

    it('lanza error con token inválido', async () => {
      await expect(authService.verifyEmail('invalid_token')).rejects.toThrow('INVALID_TOKEN')
    })
  })

  describe('resetPassword', () => {
    it('restablece la contraseña exitosamente', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com'
      }

      ;(hash as jest.Mock).mockResolvedValue('new_hashed_password')
      ;(db.user.update as jest.Mock).mockResolvedValue(mockUser)

      const result = await authService.resetPassword({
        token: 'valid_token',
        newPassword: 'newpassword123'
      })

      expect(result).toEqual(mockUser)
      expect(db.user.update).toHaveBeenCalledWith({
        where: { id: expect.any(String) },
        data: { password: 'new_hashed_password' }
      })
    })

    it('lanza error si la contraseña es débil', async () => {
      await expect(
        authService.resetPassword({
          token: 'valid_token',
          newPassword: '123'
        })
      ).rejects.toThrow('PASSWORD_TOO_WEAK')
    })
  })
}) 