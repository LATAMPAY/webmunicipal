import { prisma } from '../db'

export interface Department {
  id: string
  name: string
  code: string
  description: string
  managerId?: string
  parentDepartmentId?: string
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}

export interface DepartmentStats {
  totalEmployees: number
  activeProcesses: number
  completedProcesses: number
  pendingTasks: number
  monthlyPerformance: number
}

export interface DepartmentTask {
  id: string
  departmentId: string
  assignedToId?: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  dueDate: Date
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export const departmentService = {
  // Gestión de Departamentos
  async createDepartment(data: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Promise<Department> {
    return await prisma.department.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async updateDepartment(id: string, data: Partial<Department>): Promise<Department> {
    return await prisma.department.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date()
      }
    })
  },

  async getDepartmentHierarchy(): Promise<Department[]> {
    return await prisma.department.findMany({
      where: { parentDepartmentId: null },
      include: {
        childDepartments: {
          include: {
            childDepartments: true
          }
        }
      }
    })
  },

  // Estadísticas y Rendimiento
  async getDepartmentStats(departmentId: string): Promise<DepartmentStats> {
    const [
      employees,
      activeProcesses,
      completedProcesses,
      pendingTasks
    ] = await Promise.all([
      prisma.adminUser.count({
        where: { departmentId }
      }),
      prisma.procedure.count({
        where: {
          departmentId,
          status: { in: ['pending', 'in_review'] }
        }
      }),
      prisma.procedure.count({
        where: {
          departmentId,
          status: 'completed',
          updatedAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30))
          }
        }
      }),
      prisma.departmentTask.count({
        where: {
          departmentId,
          status: { in: ['pending', 'in_progress'] }
        }
      })
    ])

    // Cálculo de rendimiento mensual (ejemplo: completados / (completados + activos))
    const monthlyPerformance = completedProcesses / (completedProcesses + activeProcesses) * 100

    return {
      totalEmployees: employees,
      activeProcesses,
      completedProcesses,
      pendingTasks,
      monthlyPerformance
    }
  },

  // Gestión de Tareas Departamentales
  async createTask(data: Omit<DepartmentTask, 'id' | 'createdAt' | 'updatedAt' | 'completedAt'>): Promise<DepartmentTask> {
    return await prisma.departmentTask.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async updateTaskStatus(
    id: string,
    status: DepartmentTask['status'],
    assignedToId?: string
  ): Promise<DepartmentTask> {
    const updates: any = {
      status,
      updatedAt: new Date()
    }

    if (assignedToId) {
      updates.assignedToId = assignedToId
    }

    if (status === 'completed') {
      updates.completedAt = new Date()
    }

    return await prisma.departmentTask.update({
      where: { id },
      data: updates
    })
  },

  async getDepartmentTasks(
    departmentId: string,
    options?: {
      status?: DepartmentTask['status']
      priority?: DepartmentTask['priority']
      assignedToId?: string
      startDate?: Date
      endDate?: Date
    }
  ): Promise<DepartmentTask[]> {
    const where: any = { departmentId }

    if (options?.status) {
      where.status = options.status
    }

    if (options?.priority) {
      where.priority = options.priority
    }

    if (options?.assignedToId) {
      where.assignedToId = options.assignedToId
    }

    if (options?.startDate || options?.endDate) {
      where.dueDate = {}
      if (options.startDate) {
        where.dueDate.gte = options.startDate
      }
      if (options.endDate) {
        where.dueDate.lte = options.endDate
      }
    }

    return await prisma.departmentTask.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { dueDate: 'asc' }
      ]
    })
  },

  // Reportes y Análisis
  async generateDepartmentReport(
    departmentId: string,
    startDate: Date,
    endDate: Date
  ): Promise<{
    taskCompletion: {
      completed: number
      pending: number
      cancelled: number
      averageCompletionTime: number
    }
    employeePerformance: Array<{
      employeeId: string
      tasksCompleted: number
      averageCompletionTime: number
      onTimePercentage: number
    }>
    workloadDistribution: Record<string, number>
  }> {
    const tasks = await prisma.departmentTask.findMany({
      where: {
        departmentId,
        createdAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        assignedTo: true
      }
    })

    const completed = tasks.filter(t => t.status === 'completed').length
    const pending = tasks.filter(t => t.status === 'pending').length
    const cancelled = tasks.filter(t => t.status === 'cancelled').length

    // Cálculo de tiempo promedio de completación
    const completionTimes = tasks
      .filter(t => t.status === 'completed' && t.completedAt)
      .map(t => t.completedAt!.getTime() - t.createdAt.getTime())

    const averageCompletionTime = completionTimes.length > 0
      ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
      : 0

    // Análisis por empleado
    const employeeStats: Record<string, {
      tasksCompleted: number
      completionTimes: number[]
      onTimeCount: number
      totalTasks: number
    }> = {}

    tasks.forEach(task => {
      if (!task.assignedToId) return

      if (!employeeStats[task.assignedToId]) {
        employeeStats[task.assignedToId] = {
          tasksCompleted: 0,
          completionTimes: [],
          onTimeCount: 0,
          totalTasks: 0
        }
      }

      const stats = employeeStats[task.assignedToId]
      stats.totalTasks++

      if (task.status === 'completed' && task.completedAt) {
        stats.tasksCompleted++
        stats.completionTimes.push(task.completedAt.getTime() - task.createdAt.getTime())
        
        if (task.completedAt <= task.dueDate) {
          stats.onTimeCount++
        }
      }
    })

    const employeePerformance = Object.entries(employeeStats).map(([employeeId, stats]) => ({
      employeeId,
      tasksCompleted: stats.tasksCompleted,
      averageCompletionTime: stats.completionTimes.length > 0
        ? stats.completionTimes.reduce((a, b) => a + b, 0) / stats.completionTimes.length
        : 0,
      onTimePercentage: (stats.onTimeCount / stats.totalTasks) * 100
    }))

    // Distribución de carga de trabajo
    const workloadDistribution = tasks.reduce((acc, task) => {
      const priority = task.priority
      acc[priority] = (acc[priority] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    return {
      taskCompletion: {
        completed,
        pending,
        cancelled,
        averageCompletionTime
      },
      employeePerformance,
      workloadDistribution
    }
  }
} 