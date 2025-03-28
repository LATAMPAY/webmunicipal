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

interface EmailVerificationProps {
  nombre: string
  verificationLink: string
}

export const EmailVerification = ({
  nombre,
  verificationLink,
}: EmailVerificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verifica tu cuenta en el Portal Municipal</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Bienvenido al Portal Municipal</Heading>
          
          <Text style={text}>Hola {nombre},</Text>
          
          <Text style={text}>
            Gracias por registrarte en el Portal Municipal. Para completar tu registro,
            necesitamos verificar tu dirección de email.
          </Text>

          <Link href={verificationLink} style={button}>
            Verificar Email
          </Link>

          <Text style={text}>
            Si no puedes hacer click en el botón, copia y pega este enlace en tu navegador:
          </Text>
          
          <Text style={link}>{verificationLink}</Text>

          <Text style={footer}>
            Este enlace expirará en 24 horas. Si no realizaste esta solicitud,
            puedes ignorar este email.
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