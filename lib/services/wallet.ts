import { prisma } from '../db'

export interface Wallet {
  id: string
  userId: string
  balance: number
  currency: string
  status: 'active' | 'suspended' | 'closed'
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  id: string
  walletId: string
  type: 'deposit' | 'withdrawal' | 'payment' | 'refund'
  amount: number
  description: string
  status: 'pending' | 'completed' | 'failed' | 'reversed'
  metadata?: Record<string, any>
  createdAt: Date
}

export const walletService = {
  async createWallet(userId: string, currency: string = 'ARS'): Promise<Wallet> {
    return await prisma.wallet.create({
      data: {
        userId,
        balance: 0,
        currency,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async getWallet(id: string): Promise<Wallet | null> {
    return await prisma.wallet.findUnique({
      where: { id }
    })
  },

  async getUserWallet(userId: string): Promise<Wallet | null> {
    return await prisma.wallet.findFirst({
      where: { userId }
    })
  },

  async updateWalletStatus(id: string, status: Wallet['status']): Promise<Wallet> {
    return await prisma.wallet.update({
      where: { id },
      data: {
        status,
        updatedAt: new Date()
      }
    })
  },

  async deposit(
    walletId: string,
    amount: number,
    description: string,
    metadata?: Record<string, any>
  ): Promise<Transaction> {
    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId }
    })

    if (!wallet) {
      throw new Error('Billetera no encontrada')
    }

    if (wallet.status !== 'active') {
      throw new Error('La billetera no está activa')
    }

    const transaction = await prisma.transaction.create({
      data: {
        walletId,
        type: 'deposit',
        amount,
        description,
        status: 'completed',
        metadata,
        createdAt: new Date()
      }
    })

    await prisma.wallet.update({
      where: { id: walletId },
      data: {
        balance: wallet.balance + amount,
        updatedAt: new Date()
      }
    })

    return transaction
  },

  async withdraw(
    walletId: string,
    amount: number,
    description: string,
    metadata?: Record<string, any>
  ): Promise<Transaction> {
    const wallet = await prisma.wallet.findUnique({
      where: { id: walletId }
    })

    if (!wallet) {
      throw new Error('Billetera no encontrada')
    }

    if (wallet.status !== 'active') {
      throw new Error('La billetera no está activa')
    }

    if (wallet.balance < amount) {
      throw new Error('Saldo insuficiente')
    }

    const transaction = await prisma.transaction.create({
      data: {
        walletId,
        type: 'withdrawal',
        amount,
        description,
        status: 'completed',
        metadata,
        createdAt: new Date()
      }
    })

    await prisma.wallet.update({
      where: { id: walletId },
      data: {
        balance: wallet.balance - amount,
        updatedAt: new Date()
      }
    })

    return transaction
  },

  async getTransactions(
    walletId: string,
    options?: {
      type?: Transaction['type']
      status?: Transaction['status']
      startDate?: Date
      endDate?: Date
      limit?: number
      offset?: number
    }
  ): Promise<Transaction[]> {
    const where: any = { walletId }

    if (options?.type) {
      where.type = options.type
    }

    if (options?.status) {
      where.status = options.status
    }

    if (options?.startDate || options?.endDate) {
      where.createdAt = {}
      if (options.startDate) {
        where.createdAt.gte = options.startDate
      }
      if (options.endDate) {
        where.createdAt.lte = options.endDate
      }
    }

    return await prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: options?.limit,
      skip: options?.offset
    })
  },

  async getTransaction(id: string): Promise<Transaction | null> {
    return await prisma.transaction.findUnique({
      where: { id }
    })
  },

  async reverseTransaction(transactionId: string): Promise<Transaction> {
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId }
    })

    if (!transaction) {
      throw new Error('Transacción no encontrada')
    }

    if (transaction.status !== 'completed') {
      throw new Error('Solo se pueden revertir transacciones completadas')
    }

    const wallet = await prisma.wallet.findUnique({
      where: { id: transaction.walletId }
    })

    if (!wallet) {
      throw new Error('Billetera no encontrada')
    }

    // Crear transacción de reversión
    const reversalTransaction = await prisma.transaction.create({
      data: {
        walletId: transaction.walletId,
        type: transaction.type === 'deposit' ? 'withdrawal' : 'deposit',
        amount: transaction.amount,
        description: `Reversión de transacción ${transactionId}`,
        status: 'completed',
        metadata: {
          originalTransactionId: transactionId
        },
        createdAt: new Date()
      }
    })

    // Actualizar saldo de la billetera
    await prisma.wallet.update({
      where: { id: wallet.id },
      data: {
        balance: transaction.type === 'deposit' 
          ? wallet.balance - transaction.amount 
          : wallet.balance + transaction.amount,
        updatedAt: new Date()
      }
    })

    // Marcar transacción original como revertida
    await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        status: 'reversed'
      }
    })

    return reversalTransaction
  }
} 