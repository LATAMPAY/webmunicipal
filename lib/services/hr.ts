import { prisma } from '../db'

export interface Employee {
  id: string
  departmentId: string
  role: 'admin' | 'supervisor' | 'operator'
  personalInfo: {
    firstName: string
    lastName: string
    dni: string
    email: string
    phone: string
    address: string
  }
  employmentInfo: {
    position: string
    startDate: Date
    contractType: 'permanent' | 'temporary' | 'contract'
    schedule: string
  }
  status: 'active' | 'inactive' | 'on_leave'
  createdAt: Date
  updatedAt: Date
}

export interface Permission {
  id: string
  employeeId: string
  type: 'vacation' | 'sick_leave' | 'personal' | 'other'
  startDate: Date
  endDate: Date
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  reason: string
  approvedById?: string
  approvedAt?: Date
  comments?: string
  createdAt: Date
  updatedAt: Date
}

export interface Schedule {
  id: string
  employeeId: string
  weekDay: 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = Domingo
  startTime: string
  endTime: string
  isOvertime: boolean
}

export interface Performance {
  id: string
  employeeId: string
  period: string // 'YYYY-MM'
  metrics: {
    tasksCompleted: number
    tasksPending: number
    averageCompletionTime: number
    onTimePercentage: number
    qualityScore: number
    attendanceScore: number
  }
  feedback: string
  evaluatorId: string
  createdAt: Date
}

export const hrService = {
  // Gestión de Empleados
  async createEmployee(data: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>): Promise<Employee> {
    return await prisma.employee.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    return await prisma.employee.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
  },

  async getEmployeeDetails(id: string): Promise<Employee & {
    department: { name: string }
    currentSchedule: Schedule[]
    activePermissions: Permission[]
    recentPerformance: Performance[]
  }> {
    return await prisma.employee.findUnique({
      where: { id },
      include: {
        department: {
          select: { name: true }
        },
        schedule: {
          where: { isActive: true }
        },
        permissions: {
          where: {
            endDate: {
              gte: new Date()
            },
            status: 'approved'
          }
        },
        performance: {
          orderBy: { period: 'desc' },
          take: 3
        }
      }
    })
  },

  // Gestión de Permisos
  async requestPermission(data: Omit<Permission, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Permission> {
    return await prisma.permission.create({
      data: {
        ...data,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async updatePermissionStatus(
    id: string,
    status: Permission['status'],
    approvedById: string,
    comments?: string
  ): Promise<Permission> {
    const updates: any = {
      status,
      updatedAt: new Date()
    }

    if (status === 'approved') {
      updates.approvedById = approvedById
      updates.approvedAt = new Date()
    }

    if (comments) {
      updates.comments = comments
    }

    return await prisma.permission.update({
      where: { id },
      data: updates
    })
  },

  async getEmployeePermissions(
    employeeId: string,
    options?: {
      status?: Permission['status']
      type?: Permission['type']
      startDate?: Date
      endDate?: Date
    }
  ): Promise<Permission[]> {
    const where: any = { employeeId }

    if (options?.status) {
      where.status = options.status
    }

    if (options?.type) {
      where.type = options.type
    }

    if (options?.startDate || options?.endDate) {
      where.startDate = {}
      if (options.startDate) {
        where.startDate.gte = options.startDate
      }
      if (options.endDate) {
        where.startDate.lte = options.endDate
      }
    }

    return await prisma.permission.findMany({
      where,
      orderBy: { startDate: 'desc' }
    })
  },

  // Gestión de Horarios
  async updateEmployeeSchedule(employeeId: string, schedules: Omit<Schedule, 'id'>[]): Promise<Schedule[]> {
    // Desactivar horarios anteriores
    await prisma.schedule.updateMany({
      where: { employeeId },
      data: { isActive: false }
    })

    // Crear nuevos horarios
    const newSchedules = await Promise.all(
      schedules.map(schedule =>
        prisma.schedule.create({
          data: {
            ...schedule,
            employeeId,
            isActive: true
          }
        })
      )
    )

    return newSchedules
  },

  async getEmployeeSchedule(employeeId: string): Promise<Schedule[]> {
    return await prisma.schedule.findMany({
      where: {
        employeeId,
        isActive: true
      },
      orderBy: { weekDay: 'asc' }
    })
  },

  // Evaluación de Desempeño
  async createPerformanceEvaluation(data: Omit<Performance, 'id' | 'createdAt'>): Promise<Performance> {
    return await prisma.performance.create({
      data: {
        ...data,
        createdAt: new Date()
      }
    })
  },

  async getEmployeePerformance(
    employeeId: string,
    period?: string
  ): Promise<Performance[]> {
    const where: any = { employeeId }

    if (period) {
      where.period = period
    }

    return await prisma.performance.findMany({
      where,
      orderBy: { period: 'desc' }
    })
  },

  // Reportes y Análisis
  async generateHRReport(
    departmentId?: string,
    startDate?: Date,
    endDate?: Date
  ): Promise<{
    staffing: {
      totalEmployees: number
      byDepartment: Record<string, number>
      byRole: Record<string, number>
      turnoverRate: number
    }
    permissions: {
      totalRequests: number
      byType: Record<string, number>
      approvalRate: number
      averageProcessingTime: number
    }
    performance: {
      departmentAverages: Record<string, {
        tasksCompleted: number
        onTimePercentage: number
        qualityScore: number
      }>
      topPerformers: Array<{
        employeeId: string
        metrics: Performance['metrics']
      }>
    }
  }> {
    const where: any = {}
    if (departmentId) {
      where.departmentId = departmentId
    }

    const [
      employees,
      permissions,
      performances
    ] = await Promise.all([
      prisma.employee.findMany({
        where,
        include: {
          department: true
        }
      }),
      prisma.permission.findMany({
        where: {
          createdAt: {
            ...(startDate && { gte: startDate }),
            ...(endDate && { lte: endDate })
          }
        }
      }),
      prisma.performance.findMany({
        where: {
          period: {
            gte: startDate?.toISOString().substring(0, 7),
            lte: endDate?.toISOString().substring(0, 7)
          }
        }
      })
    ])

    // Análisis de personal
    const byDepartment: Record<string, number> = {}
    const byRole: Record<string, number> = {}
    employees.forEach(emp => {
      byDepartment[emp.department.name] = (byDepartment[emp.department.name] || 0) + 1
      byRole[emp.role] = (byRole[emp.role] || 0) + 1
    })

    // Análisis de permisos
    const byType: Record<string, number> = {}
    let approvedCount = 0
    const processingTimes: number[] = []

    permissions.forEach(perm => {
      byType[perm.type] = (byType[perm.type] || 0) + 1
      if (perm.status === 'approved') {
        approvedCount++
        if (perm.approvedAt) {
          processingTimes.push(perm.approvedAt.getTime() - perm.createdAt.getTime())
        }
      }
    })

    // Análisis de desempeño
    const departmentPerformance: Record<string, {
      total: number
      tasksCompleted: number
      onTimePercentage: number
      qualityScore: number
    }> = {}

    performances.forEach(perf => {
      const emp = employees.find(e => e.id === perf.employeeId)
      if (!emp) return

      const deptName = emp.department.name
      if (!departmentPerformance[deptName]) {
        departmentPerformance[deptName] = {
          total: 0,
          tasksCompleted: 0,
          onTimePercentage: 0,
          qualityScore: 0
        }
      }

      const dept = departmentPerformance[deptName]
      dept.total++
      dept.tasksCompleted += perf.metrics.tasksCompleted
      dept.onTimePercentage += perf.metrics.onTimePercentage
      dept.qualityScore += perf.metrics.qualityScore
    })

    const departmentAverages = Object.entries(departmentPerformance).reduce(
      (acc, [dept, stats]) => ({
        ...acc,
        [dept]: {
          tasksCompleted: stats.tasksCompleted / stats.total,
          onTimePercentage: stats.onTimePercentage / stats.total,
          qualityScore: stats.qualityScore / stats.total
        }
      }),
      {}
    )

    // Top performers
    const topPerformers = performances
      .sort((a, b) => 
        (b.metrics.qualityScore + b.metrics.onTimePercentage) / 2 -
        (a.metrics.qualityScore + a.metrics.onTimePercentage) / 2
      )
      .slice(0, 5)
      .map(p => ({
        employeeId: p.employeeId,
        metrics: p.metrics
      }))

    return {
      staffing: {
        totalEmployees: employees.length,
        byDepartment,
        byRole,
        turnoverRate: 0 // Requiere implementación adicional
      },
      permissions: {
        totalRequests: permissions.length,
        byType,
        approvalRate: (approvedCount / permissions.length) * 100,
        averageProcessingTime: processingTimes.length > 0
          ? processingTimes.reduce((a, b) => a + b, 0) / processingTimes.length
          : 0
      },
      performance: {
        departmentAverages,
        topPerformers
      }
    }
  }
} 