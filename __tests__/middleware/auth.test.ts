import { NextResponse } from 'next/server'
import { verify } from 'jsonwebtoken'
import { authMiddleware } from '@/middleware/auth'

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn()
}))

describe('authMiddleware', () => {
  const mockRequest = (headers = {}) => {
    return {
      headers: new Headers(headers),
      nextUrl: new URL('http://localhost:3000/api/protected'),
      method: 'GET'
    }
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('permite acceso con token válido', async () => {
    const token = 'valid.jwt.token'
    const request = mockRequest({
      'Authorization': `Bearer ${token}`
    })

    ;(verify as jest.Mock).mockReturnValue({ 
      userId: '123',
      role: 'USER'
    })

    const response = await authMiddleware(request)
    expect(response).toBeUndefined()
  })

  it('rechaza acceso sin token', async () => {
    const request = mockRequest()
    const response = await authMiddleware(request)

    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(401)
  })

  it('rechaza token inválido', async () => {
    const request = mockRequest({
      'Authorization': 'Bearer invalid.token'
    })

    ;(verify as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token')
    })

    const response = await authMiddleware(request)
    expect(response).toBeInstanceOf(NextResponse)
    expect(response.status).toBe(401)
  })

  it('verifica rutas públicas', async () => {
    const publicUrls = [
      'http://localhost:3000/api/auth/login',
      'http://localhost:3000/api/auth/register',
      'http://localhost:3000/api/auth/verify-email',
      'http://localhost:3000/api/auth/reset-password'
    ]

    for (const url of publicUrls) {
      const request = {
        ...mockRequest(),
        nextUrl: new URL(url)
      }

      const response = await authMiddleware(request)
      expect(response).toBeUndefined()
    }
  })

  it('verifica permisos por rol', async () => {
    const adminRoute = new URL('http://localhost:3000/api/admin/users')
    const token = 'valid.jwt.token'

    // Usuario normal intentando acceder a ruta de admin
    const userRequest = {
      ...mockRequest({
        'Authorization': `Bearer ${token}`
      }),
      nextUrl: adminRoute
    }

    ;(verify as jest.Mock).mockReturnValue({ 
      userId: '123',
      role: 'USER'
    })

    let response = await authMiddleware(userRequest)
    expect(response.status).toBe(403)

    // Admin accediendo a ruta de admin
    const adminRequest = {
      ...mockRequest({
        'Authorization': `Bearer ${token}`
      }),
      nextUrl: adminRoute
    }

    ;(verify as jest.Mock).mockReturnValue({ 
      userId: '123',
      role: 'ADMIN'
    })

    response = await authMiddleware(adminRequest)
    expect(response).toBeUndefined()
  })

  it('maneja errores de verificación', async () => {
    const request = mockRequest({
      'Authorization': 'Bearer expired.token'
    })

    ;(verify as jest.Mock).mockImplementation(() => {
      throw new Error('Token expired')
    })

    const response = await authMiddleware(request)
    expect(response.status).toBe(401)
    expect(await response.json()).toEqual({
      error: 'Token expired'
    })
  })
}) 