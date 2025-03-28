import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { RegisterForm } from '@/components/auth/register-form'
import { useAuth } from '../../../hooks/use-auth'

jest.mock('@/hooks/use-auth', () => ({
  useAuth: jest.fn()
}))

beforeAll(() => {
  Object.defineProperty(window, 'alert', {
    value: jest.fn(),
    writable: true
  });
});

describe('RegisterForm', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      register: jest.fn(),
      isLoading: false,
      error: null
    })
  })

  it('renderiza correctamente', () => {
    render(<RegisterForm />)
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getAllByLabelText(/contraseña/i)).toHaveLength(2)
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument()
  })

  it('muestra error cuando las contraseñas no coinciden', async () => {
    const mockRegister = jest.fn()
    ;(useAuth as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      error: null
    })

    render(<RegisterForm />)

    // Llenar el formulario
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: 'Test' }
    })
    fireEvent.change(screen.getByLabelText(/apellido/i), {
      target: { value: 'User' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    
    // Contraseñas diferentes
    const [password, confirmPassword] = screen.getAllByLabelText(/contraseña/i)
    fireEvent.change(password, { target: { value: 'password123' } })
    fireEvent.change(confirmPassword, { target: { value: 'password456' } })

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

    await waitFor(() => {
      expect(screen.getByText(/las contraseñas no coinciden/i)).toBeInTheDocument()
    })
    expect(mockRegister).not.toHaveBeenCalled()
  })

  it('maneja errores del servidor', async () => {
    const mockRegister = jest.fn().mockRejectedValue(new Error('El email ya está registrado'))
    ;(useAuth as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      error: 'El email ya está registrado'
    })

    render(<RegisterForm />)

    // Llenar el formulario
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: 'Test' }
    })
    fireEvent.change(screen.getByLabelText(/apellido/i), {
      target: { value: 'User' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'exists@example.com' }
    })
    
    const [password, confirmPassword] = screen.getAllByLabelText(/contraseña/i)
    fireEvent.change(password, { target: { value: 'password123' } })
    fireEvent.change(confirmPassword, { target: { value: 'password123' } })

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

    await waitFor(() => {
      expect(screen.getByText(/el email ya está registrado/i)).toBeInTheDocument()
    })
  })

  it('registra exitosamente un nuevo usuario', async () => {
    const mockRegister = jest.fn().mockResolvedValue({})
    ;(useAuth as jest.Mock).mockReturnValue({
      register: mockRegister,
      isLoading: false,
      error: null
    })

    render(<RegisterForm />)

    // Llenar el formulario
    fireEvent.change(screen.getByLabelText(/nombre/i), {
      target: { value: 'Test' }
    })
    fireEvent.change(screen.getByLabelText(/apellido/i), {
      target: { value: 'User' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    
    const [password, confirmPassword] = screen.getAllByLabelText(/contraseña/i)
    fireEvent.change(password, { target: { value: 'password123' } })
    fireEvent.change(confirmPassword, { target: { value: 'password123' } })

    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        nombre: 'Test',
        apellido: 'User'
      })
    })
  })

  it('deshabilita el formulario durante el envío', () => {
    ;(useAuth as jest.Mock).mockReturnValue({
      register: jest.fn(),
      isLoading: true,
      error: null
    })

    render(<RegisterForm />)

    expect(screen.getByLabelText(/nombre/i)).toBeDisabled()
    expect(screen.getByLabelText(/apellido/i)).toBeDisabled()
    expect(screen.getByLabelText(/email/i)).toBeDisabled()
    screen.getAllByLabelText(/contraseña/i).forEach(input => {
      expect(input).toBeDisabled()
    })
    expect(screen.getByRole('button', { name: /registrando/i })).toBeDisabled()
  })
})