import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginForm } from '@/components/auth/login-form'
import { useAuth } from '@/hooks/use-auth'

// Mock del hook useAuth
jest.mock('@/hooks/use-auth', () => ({
  useAuth: jest.fn()
}))

describe('LoginForm', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      login: jest.fn(),
      isLoading: false,
      error: null
    })
  })

  it('renderiza correctamente', () => {
    render(<LoginForm />)
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('muestra error cuando las credenciales son inválidas', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('Email o contraseña incorrectos'))
    ;(useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Email o contraseña incorrectos'
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpass' }
    })
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    await waitFor(() => {
      expect(screen.getByText(/email o contraseña incorrectos/i)).toBeInTheDocument()
    })
  })

  it('deshabilita el formulario durante el envío', async () => {
    const mockLogin = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    ;(useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null
    })

    render(<LoginForm />)

    fireEvent.click(screen.getByRole('button', { name: /iniciando sesión/i }))

    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    expect(screen.getByLabelText(/contraseña/i)).toBeDisabled()
    expect(screen.getByRole('button', { name: /iniciando sesión/i })).toBeDisabled()
  })

  it('llama a login con las credenciales correctas', async () => {
    const mockLogin = jest.fn()
    ;(useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null
    })

    render(<LoginForm />)

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'password123' }
    })
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }))

    expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
  })
}) 