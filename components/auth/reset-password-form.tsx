import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/alert'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import Link from 'next/link'

interface ResetPasswordFormProps {
  token?: string
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { requestPasswordReset, resetPassword, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (token) {
      // Restablecer contraseña
      if (newPassword !== confirmPassword) {
        alert('Las contraseñas no coinciden')
        return
      }
      await resetPassword(token, newPassword)
    } else {
      // Solicitar restablecimiento
      await requestPasswordReset(email)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">
          {token ? 'Restablecer Contraseña' : 'Recuperar Cuenta'}
        </h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              {error}
            </Alert>
          )}

          {!token ? (
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="tu@email.com"
              />
              <p className="text-sm text-gray-500">
                Te enviaremos un enlace para restablecer tu contraseña.
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-2">
                <label htmlFor="newPassword" className="text-sm font-medium">
                  Nueva Contraseña
                </label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                />
                <p className="text-xs text-gray-500">
                  Mínimo 8 caracteres
                </p>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirmar Contraseña
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading 
              ? (token ? 'Restableciendo...' : 'Enviando...') 
              : (token ? 'Restablecer Contraseña' : 'Enviar Enlace')
            }
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-gray-600">
          <Link 
            href="/login" 
            className="text-blue-600 hover:underline"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
} 