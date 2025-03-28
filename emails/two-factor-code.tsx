import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import * as React from 'react'

interface TwoFactorCodeProps {
  nombre: string
  code: string
}

export const TwoFactorCode = ({
  nombre,
  code,
}: TwoFactorCodeProps) => {
  return (
    <Html>
      <Head />
      <Preview>Tu código de verificación para el Portal Municipal</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Código de Verificación</Heading>
          
          <Text style={text}>Hola {nombre},</Text>
          
          <Text style={text}>
            Has solicitado iniciar sesión en el Portal Municipal. 
            Utiliza el siguiente código para completar la verificación:
          </Text>

          <Section style={codeContainer}>
            <Text style={codeText}>{code}</Text>
          </Section>

          <Text style={text}>
            Este código expirará en 5 minutos.
          </Text>

          <Text style={footer}>
            Si no intentaste iniciar sesión, te recomendamos cambiar tu contraseña
            inmediatamente y contactar con soporte técnico.
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

const codeContainer = {
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
  margin: '30px 0',
  padding: '20px',
  textAlign: 'center' as const,
}

const codeText = {
  color: '#000',
  fontFamily: 'monospace',
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '5px',
  margin: '0',
}

const footer = {
  color: '#898989',
  fontSize: '13px',
  lineHeight: '1.5',
  margin: '25px 0 0',
} 