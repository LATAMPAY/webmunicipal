import nodemailer from 'nodemailer'
import { render } from '@react-email/render'
import {
  EmailVerification,
  TwoFactorCode,
  PasswordReset
} from '@/emails'

interface EmailOptions {
  to: string
  subject: string
  template: 'email-verification' | 'two-factor-code' | 'password-reset'
  data: Record<string, any>
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

const templates = {
  'email-verification': EmailVerification,
  'two-factor-code': TwoFactorCode,
  'password-reset': PasswordReset
}

export async function sendEmail(options: EmailOptions) {
  try {
    const Template = templates[options.template]
    const html = render(Template(options.data))

    await transporter.sendMail({
      from: `"Municipalidad de General Mosconi" <${process.env.SMTP_FROM}>`,
      to: options.to,
      subject: options.subject,
      html
    })

    return true
  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Error al enviar el email')
  }
} 