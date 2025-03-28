import { prisma } from '../db'

export interface Announcement {
  id: string
  title: string
  content: string
  type: 'general' | 'department' | 'emergency' | 'maintenance' | 'event'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  departmentId?: string
  authorId: string
  status: 'draft' | 'published' | 'archived'
  publishAt?: Date
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface InternalMessage {
  id: string
  senderId: string
  recipientId: string
  subject: string
  content: string
  attachments?: string[]
  isRead: boolean
  isArchived: boolean
  createdAt: Date
  readAt?: Date
}

export interface Notification {
  id: string
  userId: string
  type: 'announcement' | 'task' | 'document' | 'message' | 'approval' | 'system'
  title: string
  content: string
  priority: 'low' | 'medium' | 'high'
  relatedEntityType?: string
  relatedEntityId?: string
  isRead: boolean
  createdAt: Date
  readAt?: Date
  expiresAt?: Date
}

export interface Channel {
  id: string
  name: string
  description: string
  type: 'department' | 'project' | 'team' | 'general'
  departmentId?: string
  members: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ChannelMessage {
  id: string
  channelId: string
  senderId: string
  content: string
  attachments?: string[]
  mentions?: string[]
  createdAt: Date
  updatedAt?: Date
}

export const communicationService = {
  // Gestión de Anuncios
  async createAnnouncement(data: Omit<Announcement, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Announcement> {
    const announcement = await prisma.announcement.create({
      data: {
        ...data,
        status: 'draft',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Si el anuncio es urgente, crear notificaciones inmediatas
    if (data.priority === 'urgent') {
      let recipients: { id: string }[] = []

      if (data.departmentId) {
        // Notificar solo al departamento específico
        recipients = await prisma.employee.findMany({
          where: { departmentId: data.departmentId },
          select: { id: true }
        })
      } else {
        // Notificar a todos los empleados
        recipients = await prisma.employee.findMany({
          select: { id: true }
        })
      }

      await Promise.all(
        recipients.map(recipient =>
          this.createNotification({
            userId: recipient.id,
            type: 'announcement',
            title: data.title,
            content: data.content,
            priority: 'high',
            relatedEntityType: 'announcement',
            relatedEntityId: announcement.id
          })
        )
      )
    }

    return announcement
  },

  async publishAnnouncement(id: string): Promise<Announcement> {
    return await prisma.announcement.update({
      where: { id },
      data: {
        status: 'published',
        updatedAt: new Date()
      }
    })
  },

  async getAnnouncements(
    options?: {
      type?: Announcement['type']
      departmentId?: string
      status?: Announcement['status']
      priority?: Announcement['priority']
    }
  ): Promise<Announcement[]> {
    const where: any = {}

    if (options?.type) {
      where.type = options.type
    }

    if (options?.departmentId) {
      where.departmentId = options.departmentId
    }

    if (options?.status) {
      where.status = options.status
    }

    if (options?.priority) {
      where.priority = options.priority
    }

    return await prisma.announcement.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })
  },

  // Gestión de Mensajes Internos
  async sendMessage(data: Omit<InternalMessage, 'id' | 'isRead' | 'isArchived' | 'createdAt' | 'readAt'>): Promise<InternalMessage> {
    const message = await prisma.internalMessage.create({
      data: {
        ...data,
        isRead: false,
        isArchived: false,
        createdAt: new Date()
      }
    })

    // Crear notificación para el destinatario
    await this.createNotification({
      userId: data.recipientId,
      type: 'message',
      title: `Nuevo mensaje: ${data.subject}`,
      content: data.content.substring(0, 100) + '...',
      priority: 'medium',
      relatedEntityType: 'message',
      relatedEntityId: message.id
    })

    return message
  },

  async markMessageAsRead(id: string): Promise<InternalMessage> {
    return await prisma.internalMessage.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date()
      }
    })
  },

  async archiveMessage(id: string): Promise<InternalMessage> {
    return await prisma.internalMessage.update({
      where: { id },
      data: { isArchived: true }
    })
  },

  async getUserMessages(
    userId: string,
    options?: {
      isRead?: boolean
      isArchived?: boolean
    }
  ): Promise<InternalMessage[]> {
    return await prisma.internalMessage.findMany({
      where: {
        recipientId: userId,
        ...options
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  // Gestión de Notificaciones
  async createNotification(data: Omit<Notification, 'id' | 'isRead' | 'createdAt' | 'readAt'>): Promise<Notification> {
    return await prisma.notification.create({
      data: {
        ...data,
        isRead: false,
        createdAt: new Date()
      }
    })
  },

  async markNotificationAsRead(id: string): Promise<Notification> {
    return await prisma.notification.update({
      where: { id },
      data: {
        isRead: true,
        readAt: new Date()
      }
    })
  },

  async getUserNotifications(
    userId: string,
    options?: {
      isRead?: boolean
      type?: Notification['type']
      priority?: Notification['priority']
    }
  ): Promise<Notification[]> {
    const where: any = { userId }

    if (options?.isRead !== undefined) {
      where.isRead = options.isRead
    }

    if (options?.type) {
      where.type = options.type
    }

    if (options?.priority) {
      where.priority = options.priority
    }

    return await prisma.notification.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' }
      ]
    })
  },

  // Gestión de Canales de Comunicación
  async createChannel(data: Omit<Channel, 'id' | 'createdAt' | 'updatedAt'>): Promise<Channel> {
    return await prisma.channel.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async addChannelMembers(channelId: string, memberIds: string[]): Promise<Channel> {
    const channel = await prisma.channel.findUnique({
      where: { id: channelId }
    })

    if (!channel) {
      throw new Error('Canal no encontrado')
    }

    const updatedMembers = [...new Set([...channel.members, ...memberIds])]

    return await prisma.channel.update({
      where: { id: channelId },
      data: {
        members: updatedMembers,
        updatedAt: new Date()
      }
    })
  },

  async removeChannelMembers(channelId: string, memberIds: string[]): Promise<Channel> {
    const channel = await prisma.channel.findUnique({
      where: { id: channelId }
    })

    if (!channel) {
      throw new Error('Canal no encontrado')
    }

    const updatedMembers = channel.members.filter(id => !memberIds.includes(id))

    return await prisma.channel.update({
      where: { id: channelId },
      data: {
        members: updatedMembers,
        updatedAt: new Date()
      }
    })
  },

  async sendChannelMessage(data: Omit<ChannelMessage, 'id' | 'createdAt' | 'updatedAt'>): Promise<ChannelMessage> {
    const channel = await prisma.channel.findUnique({
      where: { id: data.channelId }
    })

    if (!channel) {
      throw new Error('Canal no encontrado')
    }

    const message = await prisma.channelMessage.create({
      data: {
        ...data,
        createdAt: new Date()
      }
    })

    // Notificar a los miembros mencionados
    if (data.mentions?.length) {
      await Promise.all(
        data.mentions.map(userId =>
          this.createNotification({
            userId,
            type: 'message',
            title: `Te han mencionado en ${channel.name}`,
            content: data.content.substring(0, 100) + '...',
            priority: 'medium',
            relatedEntityType: 'channel_message',
            relatedEntityId: message.id
          })
        )
      )
    }

    return message
  },

  async getChannelMessages(
    channelId: string,
    options?: {
      limit?: number
      before?: Date
      after?: Date
    }
  ): Promise<ChannelMessage[]> {
    const where: any = { channelId }

    if (options?.before || options?.after) {
      where.createdAt = {}
      if (options.before) {
        where.createdAt.lt = options.before
      }
      if (options.after) {
        where.createdAt.gt = options.after
      }
    }

    return await prisma.channelMessage.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: options?.limit
    })
  },

  // Análisis y Reportes
  async generateCommunicationStats(
    startDate: Date,
    endDate: Date
  ): Promise<{
    announcements: {
      total: number
      byType: Record<string, number>
      byPriority: Record<string, number>
    }
    messages: {
      total: number
      readRate: number
      averageResponseTime: number
    }
    notifications: {
      total: number
      readRate: number
      byType: Record<string, number>
    }
    channels: {
      totalMessages: number
      activeChannels: Array<{
        channelId: string
        messageCount: number
        uniqueParticipants: number
      }>
    }
  }> {
    const [
      announcements,
      messages,
      notifications,
      channelMessages
    ] = await Promise.all([
      prisma.announcement.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      prisma.internalMessage.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      prisma.notification.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      prisma.channelMessage.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      })
    ])

    // Análisis de anuncios
    const announcementsByType: Record<string, number> = {}
    const announcementsByPriority: Record<string, number> = {}
    announcements.forEach(a => {
      announcementsByType[a.type] = (announcementsByType[a.type] || 0) + 1
      announcementsByPriority[a.priority] = (announcementsByPriority[a.priority] || 0) + 1
    })

    // Análisis de mensajes
    const readMessages = messages.filter(m => m.isRead).length
    const responseTimes = messages
      .filter(m => m.readAt)
      .map(m => m.readAt!.getTime() - m.createdAt.getTime())

    // Análisis de notificaciones
    const notificationsByType: Record<string, number> = {}
    const readNotifications = notifications.filter(n => n.isRead).length
    notifications.forEach(n => {
      notificationsByType[n.type] = (notificationsByType[n.type] || 0) + 1
    })

    // Análisis de canales
    const channelStats = channelMessages.reduce((acc, msg) => {
      if (!acc[msg.channelId]) {
        acc[msg.channelId] = {
          messageCount: 0,
          participants: new Set()
        }
      }
      acc[msg.channelId].messageCount++
      acc[msg.channelId].participants.add(msg.senderId)
      return acc
    }, {} as Record<string, { messageCount: number; participants: Set<string> }>)

    const activeChannels = Object.entries(channelStats)
      .map(([channelId, stats]) => ({
        channelId,
        messageCount: stats.messageCount,
        uniqueParticipants: stats.participants.size
      }))
      .sort((a, b) => b.messageCount - a.messageCount)
      .slice(0, 10)

    return {
      announcements: {
        total: announcements.length,
        byType: announcementsByType,
        byPriority: announcementsByPriority
      },
      messages: {
        total: messages.length,
        readRate: (readMessages / messages.length) * 100,
        averageResponseTime: responseTimes.length > 0
          ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
          : 0
      },
      notifications: {
        total: notifications.length,
        readRate: (readNotifications / notifications.length) * 100,
        byType: notificationsByType
      },
      channels: {
        totalMessages: channelMessages.length,
        activeChannels
      }
    }
  }
} 