import { authenticator } from 'otplib'
import { randomBytes } from 'crypto'

// Generar secreto para TOTP
export function generateTOTPSecret(): string {
  return authenticator.generateSecret()
}

// Generar código TOTP
export function generateTOTP(secret: string): string {
  return authenticator.generate(secret)
}

// Verificar código TOTP
export function verifyTOTP(token: string, secret: string): boolean {
  try {
    return authenticator.verify({ token, secret })
  } catch {
    return false
  }
}

// Generar URI para QR
export function generateTOTPUri(secret: string, account: string, issuer: string): string {
  return authenticator.keyuri(account, issuer, secret)
} 