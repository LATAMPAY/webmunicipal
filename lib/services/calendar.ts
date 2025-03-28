import { prisma } from '../db'

export interface CalendarEvent {
  id: string
  title: string
  description: string
  type: 'meeting' | 'deadline' | 'task' | 'holiday' | 'reminder' | 'other'
  priority: 'low' | 'medium' | 'high'
  location?: string
  startDate: Date
  endDate: Date
  isAllDay: boolean
  recurrence?: {
    pattern: 'daily' | 'weekly' | 'monthly' | 'yearly'
    interval: number
    endDate?: Date
    daysOfWeek?: number[]
  }
  organizer: {
    id: string
    name: string
    department: string
  }
  attendees: Array<{
    id: string
    name: string
    response: 'pending' | 'accepted' | 'declined' | 'tentative'
  }>
  departmentId?: string
  resources?: Array<{
    type: 'room' | 'equipment' | 'vehicle' | 'other'
    id: string
    name: string
  }>
  attachments?: string[]
  color?: string
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
  reminders: Array<{
    type: 'email' | 'notification' | 'both'
    minutesBefore: number
  }>
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
}

export interface Resource {
  id: string
  type: 'room' | 'equipment' | 'vehicle' | 'other'
  name: string
  description: string
  capacity?: number
  location?: string
  status: 'available' | 'in_use' | 'maintenance' | 'reserved'
  departmentId?: string
  metadata?: Record<string, any>
}

export interface Calendar {
  id: string
  name: string
  type: 'personal' | 'department' | 'resource' | 'holiday'
  ownerId: string
  color: string
  isVisible: boolean
  permissions: Array<{
    userId: string
    access: 'read' | 'write' | 'admin'
  }>
  metadata?: Record<string, any>
}

export const calendarService = {
  // Gestión de Eventos
  async createEvent(data: Omit<CalendarEvent, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<CalendarEvent> {
    // Verificar disponibilidad de recursos
    if (data.resources?.length) {
      const conflicts = await this.checkResourceAvailability(
        data.resources.map(r => r.id),
        data.startDate,
        data.endDate
      )

      if (conflicts.length > 0) {
        throw new Error('Algunos recursos no están disponibles en el horario seleccionado')
      }
    }

    const event = await prisma.calendarEvent.create({
      data: {
        ...data,
        status: 'scheduled',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    // Crear notificaciones para los asistentes
    await Promise.all(
      data.attendees.map(attendee =>
        prisma.notification.create({
          data: {
            userId: attendee.id,
            type: 'event',
            title: `Nuevo evento: ${data.title}`,
            content: `Has sido invitado al evento "${data.title}" programado para ${data.startDate.toLocaleDateString()}`,
            priority: data.priority,
            relatedEntityType: 'event',
            relatedEntityId: event.id,
            isRead: false,
            createdAt: new Date()
          }
        })
      )
    )

    // Programar recordatorios
    await this.scheduleEventReminders(event)

    return event
  },

  async updateEvent(id: string, data: Partial<CalendarEvent>): Promise<CalendarEvent> {
    const event = await prisma.calendarEvent.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })

    // Si cambió la fecha o los asistentes, actualizar recordatorios
    if (data.startDate || data.attendees || data.reminders) {
      await this.updateEventReminders(event)
    }

    return event
  },

  async getEvent(id: string): Promise<CalendarEvent | null> {
    return await prisma.calendarEvent.findUnique({
      where: { id },
      include: {
        resources: true,
        attendees: true
      }
    })
  },

  async getEvents(
    options: {
      startDate: Date
      endDate: Date
      userId?: string
      departmentId?: string
      type?: CalendarEvent['type']
      status?: CalendarEvent['status']
      includeRecurring?: boolean
    }
  ): Promise<CalendarEvent[]> {
    const where: any = {
      OR: [
        {
          startDate: {
            gte: options.startDate,
            lte: options.endDate
          }
        },
        {
          endDate: {
            gte: options.startDate,
            lte: options.endDate
          }
        }
      ]
    }

    if (options.userId) {
      where.OR = [
        { 'organizer.id': options.userId },
        { attendees: { some: { id: options.userId } } }
      ]
    }

    if (options.departmentId) {
      where.departmentId = options.departmentId
    }

    if (options.type) {
      where.type = options.type
    }

    if (options.status) {
      where.status = options.status
    }

    const events = await prisma.calendarEvent.findMany({
      where,
      include: {
        resources: true,
        attendees: true
      },
      orderBy: { startDate: 'asc' }
    })

    if (options.includeRecurring) {
      return this.expandRecurringEvents(events, options.startDate, options.endDate)
    }

    return events
  },

  async updateAttendeeResponse(
    eventId: string,
    userId: string,
    response: CalendarEvent['attendees'][0]['response']
  ): Promise<CalendarEvent> {
    const event = await prisma.calendarEvent.findUnique({
      where: { id: eventId }
    })

    if (!event) {
      throw new Error('Evento no encontrado')
    }

    const updatedAttendees = event.attendees.map(attendee =>
      attendee.id === userId
        ? { ...attendee, response }
        : attendee
    )

    return await prisma.calendarEvent.update({
      where: { id: eventId },
      data: {
        attendees: updatedAttendees,
        updatedAt: new Date()
      }
    })
  },

  // Gestión de Recursos
  async createResource(data: Omit<Resource, 'id'>): Promise<Resource> {
    return await prisma.resource.create({
      data
    })
  },

  async updateResource(id: string, data: Partial<Resource>): Promise<Resource> {
    return await prisma.resource.update({
      where: { id },
      data
    })
  },

  async getResourceAvailability(
    resourceId: string,
    startDate: Date,
    endDate: Date
  ): Promise<Array<{
    startDate: Date
    endDate: Date
    event: CalendarEvent
  }>> {
    const events = await prisma.calendarEvent.findMany({
      where: {
        resources: {
          some: { id: resourceId }
        },
        OR: [
          {
            startDate: {
              gte: startDate,
              lte: endDate
            }
          },
          {
            endDate: {
              gte: startDate,
              lte: endDate
            }
          }
        ]
      }
    })

    return events.map(event => ({
      startDate: event.startDate,
      endDate: event.endDate,
      event
    }))
  },

  // Gestión de Calendarios
  async createCalendar(data: Omit<Calendar, 'id'>): Promise<Calendar> {
    return await prisma.calendar.create({
      data
    })
  },

  async updateCalendarPermissions(
    calendarId: string,
    permissions: Calendar['permissions']
  ): Promise<Calendar> {
    return await prisma.calendar.update({
      where: { id: calendarId },
      data: { permissions }
    })
  },

  async getUserCalendars(userId: string): Promise<Calendar[]> {
    return await prisma.calendar.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { permissions: { some: { userId } } }
        ]
      }
    })
  },

  // Utilidades
  private async checkResourceAvailability(
    resourceIds: string[],
    startDate: Date,
    endDate: Date
  ): Promise<string[]> {
    const conflicts = await prisma.calendarEvent.findMany({
      where: {
        resources: {
          some: { id: { in: resourceIds } }
        },
        OR: [
          {
            startDate: {
              gte: startDate,
              lte: endDate
            }
          },
          {
            endDate: {
              gte: startDate,
              lte: endDate
            }
          }
        ]
      },
      select: {
        resources: {
          select: { id: true }
        }
      }
    })

    return conflicts
      .flatMap(event => event.resources)
      .map(resource => resource.id)
  },

  private async scheduleEventReminders(event: CalendarEvent): Promise<void> {
    const now = new Date()

    for (const reminder of event.reminders) {
      const reminderTime = new Date(event.startDate.getTime() - reminder.minutesBefore * 60000)

      if (reminderTime > now) {
        // Programar recordatorio
        await prisma.scheduledNotification.create({
          data: {
            type: reminder.type,
            scheduledFor: reminderTime,
            eventId: event.id,
            recipients: event.attendees.map(a => a.id)
          }
        })
      }
    }
  },

  private async updateEventReminders(event: CalendarEvent): Promise<void> {
    // Eliminar recordatorios existentes
    await prisma.scheduledNotification.deleteMany({
      where: { eventId: event.id }
    })

    // Programar nuevos recordatorios
    await this.scheduleEventReminders(event)
  },

  private expandRecurringEvents(
    events: CalendarEvent[],
    startDate: Date,
    endDate: Date
  ): CalendarEvent[] {
    const expandedEvents: CalendarEvent[] = []

    for (const event of events) {
      if (!event.recurrence) {
        expandedEvents.push(event)
        continue
      }

      const { pattern, interval, endDate: recurrenceEnd } = event.recurrence
      let currentDate = new Date(event.startDate)
      const duration = event.endDate.getTime() - event.startDate.getTime()

      while (currentDate <= endDate && (!recurrenceEnd || currentDate <= recurrenceEnd)) {
        if (currentDate >= startDate) {
          expandedEvents.push({
            ...event,
            startDate: new Date(currentDate),
            endDate: new Date(currentDate.getTime() + duration)
          })
        }

        switch (pattern) {
          case 'daily':
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + interval))
            break
          case 'weekly':
            currentDate = new Date(currentDate.setDate(currentDate.getDate() + (7 * interval)))
            break
          case 'monthly':
            currentDate = new Date(currentDate.setMonth(currentDate.getMonth() + interval))
            break
          case 'yearly':
            currentDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + interval))
            break
        }
      }
    }

    return expandedEvents.sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
  }
} 