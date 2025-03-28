import { prisma } from '../db'

export interface Appointment {
  id: string
  userId: string
  serviceId: string
  date: Date
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  createdAt: Date
}

export interface TimeSlot {
  date: Date
  available: boolean
}

export const appointmentService = {
  async createAppointment(data: Omit<Appointment, 'id' | 'status' | 'createdAt'>): Promise<Appointment> {
    return await prisma.appointment.create({
      data: {
        ...data,
        status: 'pending',
        createdAt: new Date()
      }
    })
  },

  async getAppointment(id: string): Promise<Appointment | null> {
    return await prisma.appointment.findUnique({
      where: { id }
    })
  },

  async getUserAppointments(userId: string): Promise<Appointment[]> {
    return await prisma.appointment.findMany({
      where: { userId },
      orderBy: { date: 'desc' }
    })
  },

  async updateAppointmentStatus(id: string, status: Appointment['status']): Promise<Appointment> {
    return await prisma.appointment.update({
      where: { id },
      data: { status }
    })
  },

  async cancelAppointment(id: string): Promise<Appointment> {
    return await prisma.appointment.update({
      where: { id },
      data: { status: 'cancelled' }
    })
  },

  async getAvailableTimeSlots(serviceId: string, date: Date): Promise<TimeSlot[]> {
    // Obtener horarios ocupados para el servicio en la fecha dada
    const bookedSlots = await prisma.appointment.findMany({
      where: {
        serviceId,
        date: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999))
        },
        status: {
          in: ['pending', 'confirmed']
        }
      },
      select: { date: true }
    })

    // Generar todos los horarios posibles del día (ejemplo: cada 30 minutos)
    const allSlots: TimeSlot[] = []
    const startHour = 8 // 8:00 AM
    const endHour = 16 // 4:00 PM
    const intervalMinutes = 30

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += intervalMinutes) {
        const slotDate = new Date(date)
        slotDate.setHours(hour, minute, 0, 0)
        
        allSlots.push({
          date: slotDate,
          available: !bookedSlots.some(
            booked => booked.date.getTime() === slotDate.getTime()
          )
        })
      }
    }

    return allSlots
  },

  async rescheduleAppointment(id: string, newDate: Date): Promise<Appointment> {
    // Verificar disponibilidad de la nueva fecha
    const appointment = await prisma.appointment.findUnique({
      where: { id }
    })

    if (!appointment) {
      throw new Error('Turno no encontrado')
    }

    const slots = await this.getAvailableTimeSlots(appointment.serviceId, newDate)
    const isAvailable = slots.some(
      slot => slot.date.getTime() === newDate.getTime() && slot.available
    )

    if (!isAvailable) {
      throw new Error('El horario seleccionado no está disponible')
    }

    return await prisma.appointment.update({
      where: { id },
      data: { date: newDate }
    })
  }
} 