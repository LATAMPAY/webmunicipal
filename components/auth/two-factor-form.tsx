import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Alert } from '@/components/ui/alert'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'

interface TwoFactorFormProps {
  userId: string
}

export function TwoFactorForm({ userId }: TwoFactorFormProps) {
  const [code, setCode] = useState('')
  const { verifyTwoFactor, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await verifyTwoFactor(userId, code)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Verificación de Dos Factores</h2>
        <p className="text-center text-gray-600">
          Ingresa el código que enviamos a tu email
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              {error}
            </Alert>
          )}

          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium">
              Código de Verificación
            </label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={isLoading}
              placeholder="000000"
              className="text-center text-2xl tracking-widest"
              maxLength={6}
              pattern="[0-9]*"
              inputMode="numeric"
            />
            <p className="text-sm text-gray-500">
              El código expirará en 5 minutos
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || code.length !== 6}
          >
            {isLoading ? 'Verificando...' : 'Verificar'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="link"
          disabled={isLoading}
          onClick={() => window.location.href = '/login'}
        >
          Cancelar y volver al inicio de sesión
        </Button>
      </CardFooter>
    </Card>
  )
} 