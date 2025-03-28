import '@testing-library/jest-dom'

// Mock de fetch global
global.fetch = jest.fn()

// Configuración de variables de entorno
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000'
process.env.JWT_SECRET = 'test-secret'

// Limpiar mocks después de cada prueba
afterEach(() => {
  jest.clearAllMocks()
}) 