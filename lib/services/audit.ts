import { prisma } from '../db'

export interface AuditLog {
  id: string
  adminId: string
  action: string
  entityType: 'procedure' | 'appointment' | 'payment' | 'wallet' | 'user' | 'admin'
  entityId: string
  changes: Record<string, any>
  metadata?: Record<string, any>
  createdAt: Date
}

export const auditService = {
  async logAction(data: Omit<AuditLog, 'id' | 'createdAt'>): Promise<AuditLog> {
    return await prisma.auditLog.create({
      data: {
        ...data,
        createdAt: new Date()
      }
    })
  },

  async getAuditLogs(
    options?: {
      adminId?: string
      entityType?: AuditLog['entityType']
      entityId?: string
      startDate?: Date
      endDate?: Date
      limit?: number
      offset?: number
    }
  ): Promise<AuditLog[]> {
    const where: any = {}

    if (options?.adminId) {
      where.adminId = options.adminId
    }

    if (options?.entityType) {
      where.entityType = options.entityType
    }

    if (options?.entityId) {
      where.entityId = options.entityId
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

    return await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: options?.limit,
      skip: options?.offset
    })
  },

  async getEntityHistory(
    entityType: AuditLog['entityType'],
    entityId: string
  ): Promise<AuditLog[]> {
    return await prisma.auditLog.findMany({
      where: {
        entityType,
        entityId
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  async getAdminActivity(
    adminId: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<AuditLog[]> {
    const where: any = { adminId }

    if (startDate || endDate) {
      where.createdAt = {}
      if (startDate) {
        where.createdAt.gte = startDate
      }
      if (endDate) {
        where.createdAt.lte = endDate
      }
    }

    return await prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
  },

  async getRecentActivity(limit: number = 50): Promise<AuditLog[]> {
    return await prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        admin: {
          select: {
            username: true,
            role: true
          }
        }
      }
    })
  },

  async generateActivityReport(
    startDate: Date,
    endDate: Date
  ): Promise<{
    totalActions: number
    actionsByType: Record<string, number>
    actionsByAdmin: Record<string, number>
    mostAffectedEntities: Array<{
      entityType: string
      entityId: string
      actionCount: number
    }>
  }> {
    const logs = await prisma.auditLog.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        admin: {
          select: {
            username: true
          }
        }
      }
    })

    const actionsByType: Record<string, number> = {}
    const actionsByAdmin: Record<string, number> = {}
    const entityActions: Record<string, number> = {}

    logs.forEach(log => {
      // Conteo por tipo de acción
      actionsByType[log.action] = (actionsByType[log.action] || 0) + 1

      // Conteo por administrador
      const adminKey = log.admin?.username || log.adminId
      actionsByAdmin[adminKey] = (actionsByAdmin[adminKey] || 0) + 1

      // Conteo por entidad
      const entityKey = `${log.entityType}:${log.entityId}`
      entityActions[entityKey] = (entityActions[entityKey] || 0) + 1
    })

    // Obtener las entidades más afectadas
    const mostAffectedEntities = Object.entries(entityActions)
      .map(([key, count]) => {
        const [entityType, entityId] = key.split(':')
        return { entityType, entityId, actionCount: count }
      })
      .sort((a, b) => b.actionCount - a.actionCount)
      .slice(0, 10)

    return {
      totalActions: logs.length,
      actionsByType,
      actionsByAdmin,
      mostAffectedEntities
    }
  }
} 