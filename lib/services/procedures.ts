import { prisma } from '../db'

export interface Procedure {
  id: string
  userId: string
  type: string
  status: 'pending' | 'in_review' | 'approved' | 'rejected' | 'completed'
  documents: Document[]
  comments: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
  status: 'pending' | 'approved' | 'rejected'
  comments?: string
}

export const procedureService = {
  async createProcedure(data: {
    userId: string
    type: string
    documents: Omit<Document, 'id' | 'status'>[]
  }): Promise<Procedure> {
    return await prisma.procedure.create({
      data: {
        ...data,
        status: 'pending',
        comments: [],
        documents: {
          create: data.documents.map(doc => ({
            ...doc,
            status: 'pending'
          }))
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      include: {
        documents: true
      }
    })
  },

  async getProcedure(id: string): Promise<Procedure | null> {
    return await prisma.procedure.findUnique({
      where: { id },
      include: {
        documents: true
      }
    })
  },

  async getUserProcedures(userId: string): Promise<Procedure[]> {
    return await prisma.procedure.findMany({
      where: { userId },
      include: {
        documents: true
      },
      orderBy: { createdAt: 'desc' }
    })
  },

  async updateProcedureStatus(
    id: string,
    status: Procedure['status'],
    comment?: string
  ): Promise<Procedure> {
    const procedure = await prisma.procedure.findUnique({
      where: { id },
      include: { documents: true }
    })

    if (!procedure) {
      throw new Error('Trámite no encontrado')
    }

    const updates: any = {
      status,
      updatedAt: new Date()
    }

    if (comment) {
      updates.comments = [...procedure.comments, comment]
    }

    return await prisma.procedure.update({
      where: { id },
      data: updates,
      include: {
        documents: true
      }
    })
  },

  async updateDocumentStatus(
    procedureId: string,
    documentId: string,
    status: Document['status'],
    comment?: string
  ): Promise<Procedure> {
    const procedure = await prisma.procedure.findUnique({
      where: { id: procedureId },
      include: { documents: true }
    })

    if (!procedure) {
      throw new Error('Trámite no encontrado')
    }

    await prisma.document.update({
      where: { id: documentId },
      data: {
        status,
        comments: comment
      }
    })

    // Actualizar estado del trámite basado en documentos
    const allDocuments = await prisma.document.findMany({
      where: { procedureId }
    })

    let newStatus: Procedure['status'] = procedure.status
    if (allDocuments.every(doc => doc.status === 'approved')) {
      newStatus = 'approved'
    } else if (allDocuments.some(doc => doc.status === 'rejected')) {
      newStatus = 'rejected'
    }

    return await this.updateProcedureStatus(procedureId, newStatus)
  },

  async addDocument(
    procedureId: string,
    document: Omit<Document, 'id' | 'status'>
  ): Promise<Procedure> {
    const procedure = await prisma.procedure.findUnique({
      where: { id: procedureId },
      include: { documents: true }
    })

    if (!procedure) {
      throw new Error('Trámite no encontrado')
    }

    await prisma.document.create({
      data: {
        ...document,
        status: 'pending',
        procedureId
      }
    })

    return await this.getProcedure(procedureId) as Procedure
  },

  async deleteDocument(procedureId: string, documentId: string): Promise<Procedure> {
    const procedure = await prisma.procedure.findUnique({
      where: { id: procedureId },
      include: { documents: true }
    })

    if (!procedure) {
      throw new Error('Trámite no encontrado')
    }

    await prisma.document.delete({
      where: { id: documentId }
    })

    return await this.getProcedure(procedureId) as Procedure
  }
} 