import { prisma } from '../db'

export interface AnalyticsReport {
  id: string
  name: string
  type: 'performance' | 'activity' | 'resource' | 'financial' | 'custom'
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly' | 'custom'
  parameters: {
    startDate: Date
    endDate: Date
    departments?: string[]
    metrics: string[]
    filters?: Record<string, any>
    groupBy?: string[]
  }
  schedule?: {
    nextRun: Date
    recipients: string[]
  }
  lastRun?: Date
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export interface AnalyticsMetric {
  id: string
  name: string
  description: string
  category: string
  calculation: string
  unit?: string
  threshold?: {
    warning: number
    critical: number
  }
}

export interface AnalyticsDashboard {
  id: string
  name: string
  layout: Array<{
    id: string
    type: 'chart' | 'metric' | 'table' | 'custom'
    position: { x: number; y: number; w: number; h: number }
    config: Record<string, any>
  }>
  filters: Record<string, any>
  refreshInterval?: number
  createdBy: string
  sharedWith: string[]
}

export const analyticsService = {
  // Gestión de Reportes
  async createReport(data: Omit<AnalyticsReport, 'id' | 'createdAt' | 'updatedAt'>): Promise<AnalyticsReport> {
    return await prisma.analyticsReport.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
  },

  async generateReport(reportId: string): Promise<Record<string, any>> {
    const report = await prisma.analyticsReport.findUnique({
      where: { id: reportId }
    })

    if (!report) {
      throw new Error('Reporte no encontrado')
    }

    const data = await this.collectMetrics(report.parameters)
    const analysis = await this.analyzeData(data, report.parameters)

    // Actualizar última ejecución
    await prisma.analyticsReport.update({
      where: { id: reportId },
      data: { lastRun: new Date() }
    })

    return analysis
  },

  // Análisis de Datos
  async analyzePerformance(
    startDate: Date,
    endDate: Date,
    departmentIds?: string[]
  ): Promise<{
    overview: {
      totalTasks: number
      completedTasks: number
      completionRate: number
      averageCompletionTime: number
    }
    byDepartment: Array<{
      departmentId: string
      metrics: {
        tasks: number
        completionRate: number
        averageTime: number
        efficiency: number
      }
    }>
    trends: Array<{
      date: Date
      completedTasks: number
      newTasks: number
    }>
  }> {
    const where: any = {
      createdAt: {
        gte: startDate,
        lte: endDate
      }
    }

    if (departmentIds?.length) {
      where.departmentId = { in: departmentIds }
    }

    const [tasks, departments] = await Promise.all([
      prisma.task.findMany({
        where,
        include: {
          department: true
        }
      }),
      prisma.department.findMany({
        where: departmentIds?.length
          ? { id: { in: departmentIds } }
          : undefined
      })
    ])

    // Análisis general
    const completedTasks = tasks.filter(t => t.status === 'completed')
    const completionTimes = completedTasks
      .map(t => t.completedAt!.getTime() - t.createdAt.getTime())

    // Análisis por departamento
    const departmentMetrics = departments.map(dept => {
      const deptTasks = tasks.filter(t => t.departmentId === dept.id)
      const deptCompleted = deptTasks.filter(t => t.status === 'completed')
      const deptTimes = deptCompleted
        .map(t => t.completedAt!.getTime() - t.createdAt.getTime())

      return {
        departmentId: dept.id,
        metrics: {
          tasks: deptTasks.length,
          completionRate: (deptCompleted.length / deptTasks.length) * 100,
          averageTime: deptTimes.length > 0
            ? deptTimes.reduce((a, b) => a + b, 0) / deptTimes.length
            : 0,
          efficiency: this.calculateEfficiency(deptCompleted)
        }
      }
    })

    // Análisis de tendencias
    const trends = this.calculateTrends(tasks, startDate, endDate)

    return {
      overview: {
        totalTasks: tasks.length,
        completedTasks: completedTasks.length,
        completionRate: (completedTasks.length / tasks.length) * 100,
        averageCompletionTime: completionTimes.length > 0
          ? completionTimes.reduce((a, b) => a + b, 0) / completionTimes.length
          : 0
      },
      byDepartment: departmentMetrics,
      trends
    }
  },

  async analyzeResourceUtilization(
    startDate: Date,
    endDate: Date
  ): Promise<{
    overview: {
      totalResources: number
      utilizationRate: number
      peakUsageTime: Date
      lowUsageTime: Date
    }
    byType: Record<string, {
      count: number
      utilization: number
      availability: number
    }>
    usage: Array<{
      resourceId: string
      usageHours: number
      utilizationRate: number
      conflicts: number
    }>
  }> {
    const [resources, events] = await Promise.all([
      prisma.resource.findMany(),
      prisma.calendarEvent.findMany({
        where: {
          startDate: {
            gte: startDate,
            lte: endDate
          }
        },
        include: {
          resources: true
        }
      })
    ])

    // Análisis por tipo de recurso
    const byType: Record<string, {
      count: number
      utilization: number
      availability: number
    }> = {}

    resources.forEach(resource => {
      if (!byType[resource.type]) {
        byType[resource.type] = {
          count: 0,
          utilization: 0,
          availability: 0
        }
      }
      byType[resource.type].count++
    })

    // Análisis de uso por recurso
    const usage = resources.map(resource => {
      const resourceEvents = events.filter(e =>
        e.resources.some(r => r.id === resource.id)
      )

      const usageHours = resourceEvents.reduce((total, event) => {
        const duration = event.endDate.getTime() - event.startDate.getTime()
        return total + (duration / (1000 * 60 * 60))
      }, 0)

      const totalPossibleHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60)
      const utilizationRate = (usageHours / totalPossibleHours) * 100

      return {
        resourceId: resource.id,
        usageHours,
        utilizationRate,
        conflicts: this.calculateResourceConflicts(resourceEvents)
      }
    })

    // Encontrar picos de uso
    const usageByHour = this.calculateUsageByHour(events, startDate, endDate)
    const peakUsage = Math.max(...Object.values(usageByHour))
    const lowUsage = Math.min(...Object.values(usageByHour))

    const peakUsageTime = Object.entries(usageByHour)
      .find(([, value]) => value === peakUsage)?.[0]

    const lowUsageTime = Object.entries(usageByHour)
      .find(([, value]) => value === lowUsage)?.[0]

    return {
      overview: {
        totalResources: resources.length,
        utilizationRate: usage.reduce((sum, r) => sum + r.utilizationRate, 0) / resources.length,
        peakUsageTime: new Date(peakUsageTime || ''),
        lowUsageTime: new Date(lowUsageTime || '')
      },
      byType,
      usage
    }
  },

  async analyzeWorkload(
    startDate: Date,
    endDate: Date
  ): Promise<{
    overview: {
      totalWork: number
      averagePerEmployee: number
      distribution: {
        overloaded: number
        balanced: number
        underutilized: number
      }
    }
    byDepartment: Array<{
      departmentId: string
      workload: number
      capacity: number
      utilization: number
    }>
    recommendations: Array<{
      type: 'redistribution' | 'hiring' | 'training'
      description: string
      impact: 'high' | 'medium' | 'low'
    }>
  }> {
    const [employees, tasks, departments] = await Promise.all([
      prisma.employee.findMany({
        include: {
          department: true
        }
      }),
      prisma.task.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate
          }
        }
      }),
      prisma.department.findMany()
    ])

    // Análisis por empleado
    const employeeWorkloads = employees.map(employee => {
      const employeeTasks = tasks.filter(t => t.assignedTo === employee.id)
      return {
        employeeId: employee.id,
        departmentId: employee.departmentId,
        taskCount: employeeTasks.length,
        workload: this.calculateWorkload(employeeTasks)
      }
    })

    // Análisis por departamento
    const departmentWorkloads = departments.map(dept => {
      const deptEmployees = employeeWorkloads.filter(e => e.departmentId === dept.id)
      const totalWorkload = deptEmployees.reduce((sum, e) => sum + e.workload, 0)
      const capacity = deptEmployees.length * 40 // 40 horas semanales por empleado

      return {
        departmentId: dept.id,
        workload: totalWorkload,
        capacity,
        utilization: (totalWorkload / capacity) * 100
      }
    })

    // Análisis de distribución
    const workloadThresholds = {
      overloaded: 85, // > 85% utilización
      underutilized: 50 // < 50% utilización
    }

    const distribution = employeeWorkloads.reduce(
      (acc, employee) => {
        const utilization = (employee.workload / 40) * 100
        if (utilization > workloadThresholds.overloaded) {
          acc.overloaded++
        } else if (utilization < workloadThresholds.underutilized) {
          acc.underutilized++
        } else {
          acc.balanced++
        }
        return acc
      },
      { overloaded: 0, balanced: 0, underutilized: 0 }
    )

    // Generar recomendaciones
    const recommendations = this.generateWorkloadRecommendations(
      departmentWorkloads,
      distribution
    )

    return {
      overview: {
        totalWork: employeeWorkloads.reduce((sum, e) => sum + e.workload, 0),
        averagePerEmployee: employeeWorkloads.reduce((sum, e) => sum + e.workload, 0) / employees.length,
        distribution
      },
      byDepartment: departmentWorkloads,
      recommendations
    }
  },

  // Utilidades privadas
  private calculateEfficiency(tasks: any[]): number {
    if (tasks.length === 0) return 0

    const onTimeCompletions = tasks.filter(task => {
      const completionTime = task.completedAt!.getTime() - task.createdAt.getTime()
      const expectedTime = task.estimatedHours * 60 * 60 * 1000
      return completionTime <= expectedTime
    }).length

    return (onTimeCompletions / tasks.length) * 100
  },

  private calculateTrends(
    tasks: any[],
    startDate: Date,
    endDate: Date
  ): Array<{ date: Date; completedTasks: number; newTasks: number }> {
    const trends: Array<{ date: Date; completedTasks: number; newTasks: number }> = []
    let currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const dayTasks = tasks.filter(t =>
        t.createdAt.toDateString() === currentDate.toDateString()
      )

      const completedTasks = tasks.filter(t =>
        t.completedAt?.toDateString() === currentDate.toDateString()
      )

      trends.push({
        date: new Date(currentDate),
        completedTasks: completedTasks.length,
        newTasks: dayTasks.length
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return trends
  },

  private calculateResourceConflicts(events: any[]): number {
    let conflicts = 0

    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        if (
          (events[i].startDate <= events[j].endDate) &&
          (events[j].startDate <= events[i].endDate)
        ) {
          conflicts++
        }
      }
    }

    return conflicts
  },

  private calculateUsageByHour(
    events: any[],
    startDate: Date,
    endDate: Date
  ): Record<string, number> {
    const usage: Record<string, number> = {}
    let currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      const hour = currentDate.toISOString()
      usage[hour] = events.filter(event =>
        event.startDate <= currentDate && event.endDate >= currentDate
      ).length

      currentDate.setHours(currentDate.getHours() + 1)
    }

    return usage
  },

  private calculateWorkload(tasks: any[]): number {
    return tasks.reduce((total, task) => {
      const status = task.status
      const weight = status === 'completed' ? 1 : (status === 'in_progress' ? 0.5 : 0.25)
      return total + (task.estimatedHours * weight)
    }, 0)
  },

  private generateWorkloadRecommendations(
    departmentWorkloads: Array<{
      departmentId: string
      workload: number
      capacity: number
      utilization: number
    }>,
    distribution: {
      overloaded: number
      balanced: number
      underutilized: number
    }
  ): Array<{
    type: 'redistribution' | 'hiring' | 'training'
    description: string
    impact: 'high' | 'medium' | 'low'
  }> {
    const recommendations: Array<{
      type: 'redistribution' | 'hiring' | 'training'
      description: string
      impact: 'high' | 'medium' | 'low'
    }> = []

    // Analizar sobrecarga
    const overloadedDepts = departmentWorkloads.filter(d => d.utilization > 85)
    if (overloadedDepts.length > 0) {
      recommendations.push({
        type: 'hiring',
        description: `Se recomienda considerar nuevas contrataciones en ${overloadedDepts.length} departamentos con alta utilización`,
        impact: 'high'
      })
    }

    // Analizar distribución
    if (distribution.overloaded > distribution.underutilized) {
      recommendations.push({
        type: 'redistribution',
        description: 'Se recomienda redistribuir la carga de trabajo para equilibrar los equipos',
        impact: 'medium'
      })
    }

    // Analizar eficiencia
    const lowEfficiencyDepts = departmentWorkloads.filter(d => d.utilization < 50)
    if (lowEfficiencyDepts.length > 0) {
      recommendations.push({
        type: 'training',
        description: 'Se recomienda programar capacitaciones para mejorar la eficiencia',
        impact: 'medium'
      })
    }

    return recommendations
  }
} 