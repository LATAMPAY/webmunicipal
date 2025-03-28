import { prisma } from '../db'

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

export const notificationService = {
  async getNotifications(userId: string): Promise<Notification[]> {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })
  },

  async createNotification(data: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    return await prisma.notification.create({
      data: {
        ...data,
        createdAt: new Date()
      }
    })
  },

  async markAsRead(id: string): Promise<Notification> {
    return await prisma.notification.update({
      where: { id },
      data: { read: true }
    })
  },

  async deleteNotification(id: string): Promise<void> {
    await prisma.notification.delete({
      where: { id }
    })
  },

  async getUnreadCount(userId: string): Promise<number> {
    return await prisma.notification.count({
      where: {
        userId,
        read: false
      }
    })
  }
} 