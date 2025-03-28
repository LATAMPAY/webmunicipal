import { prisma } from '../db'

export interface PaymentIntent {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  paymentMethod: string
  metadata: Record<string, any>
  createdAt: Date
}

export interface PaymentMethod {
  id: string
  type: 'credit_card' | 'debit_card' | 'bank_transfer' | 'wallet'
  details: Record<string, any>
  isDefault: boolean
}

export const paymentService = {
  async createPaymentIntent(data: {
    amount: number
    currency: string
    paymentMethod: string
    metadata?: Record<string, any>
  }): Promise<PaymentIntent> {
    // Aquí iría la integración con el gateway de pagos
    return await prisma.paymentIntent.create({
      data: {
        ...data,
        status: 'pending',
        createdAt: new Date()
      }
    })
  },

  async getPaymentIntent(id: string): Promise<PaymentIntent | null> {
    return await prisma.paymentIntent.findUnique({
      where: { id }
    })
  },

  async updatePaymentStatus(id: string, status: PaymentIntent['status']): Promise<PaymentIntent> {
    return await prisma.paymentIntent.update({
      where: { id },
      data: { status }
    })
  },

  async savePaymentMethod(userId: string, data: Omit<PaymentMethod, 'id'>): Promise<PaymentMethod> {
    if (data.isDefault) {
      // Si el nuevo método es predeterminado, actualizar los otros
      await prisma.paymentMethod.updateMany({
        where: { userId },
        data: { isDefault: false }
      })
    }

    return await prisma.paymentMethod.create({
      data: {
        ...data,
        userId
      }
    })
  },

  async getPaymentMethods(userId: string): Promise<PaymentMethod[]> {
    return await prisma.paymentMethod.findMany({
      where: { userId }
    })
  },

  async deletePaymentMethod(id: string): Promise<void> {
    await prisma.paymentMethod.delete({
      where: { id }
    })
  },

  async processRefund(paymentIntentId: string): Promise<boolean> {
    const payment = await prisma.paymentIntent.findUnique({
      where: { id: paymentIntentId }
    })

    if (!payment || payment.status !== 'completed') {
      throw new Error('No se puede reembolsar un pago que no está completado')
    }

    // Aquí iría la lógica de reembolso con el gateway de pagos
    await prisma.paymentIntent.update({
      where: { id: paymentIntentId },
      data: { status: 'refunded' }
    })

    return true
  }
} 