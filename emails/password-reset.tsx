import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface PasswordResetProps {
  nombre: string
  resetLink: string
}

export const PasswordReset = ({
  nombre,
  resetLink,
}: PasswordResetProps) => {
  return (
    <Html>
      <Head />
      <Preview>Restablece tu contraseña del Portal Municipal</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Restablecer Contraseña</Heading>
          
          <Text style={text}>Hola {nombre},</Text>
          
          <Text style={text}>
            Hemos recibido una solicitud para restablecer la contraseña de tu cuenta
            en el Portal Municipal. Si no realizaste esta solicitud, puedes ignorar
            este email.
          </Text>

          <Link href={resetLink} style={button}>
            Restablecer Contraseña
          </Link>

          <Text style={text}>
            Si no puedes hacer click en el botón, copia y pega este enlace en tu navegador:
          </Text>
          
          <Text style={link}>{resetLink}</Text>

          <Text style={footer}>
            Este enlace expirará en 1 hora por razones de seguridad.
            Si necesitas un nuevo enlace, puedes solicitarlo desde la página de inicio de sesión.
          </Text>

          <Text style={securityNote}>
            Por tu seguridad, nunca compartas este enlace con nadie.
            El personal del municipio nunca te pedirá esta información.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '5px',
  margin: '0 auto',
  padding: '45px',
  maxWidth: '600px',
}

const h1 = {
  color: '#1a1a1a',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.4',
  margin: '0 0 15px',
}

const text = {
  color: '#444',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '15px 0',
}

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '5px',
  color: '#fff',
  display: 'inline-block',
  fontSize: '15px',
  fontWeight: '600',
  lineHeight: '50px',
  textAlign: 'center' as const,
  textDecoration: 'none',
  width: '100%',
  marginTop: '25px',
  marginBottom: '25px',
}

const link = {
  color: '#0070f3',
  fontSize: '14px',
  textDecoration: 'none',
  wordBreak: 'break-all' as const,
}

const footer = {
  color: '#898989',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '25px 0 0',
}

const securityNote = {
  backgroundColor: '#fff8e1',
  borderLeft: '4px solid #ffc107',
  color: '#666',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '25px 0 0',
  padding: '15px',
} 