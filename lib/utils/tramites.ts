import { toast } from "@/components/ui/use-toast"

export interface TramiteRequest {
  tipo: string
  numeroDocumento: string
  email: string
  telefono: string
  documentosAdjuntos?: File[]
  detalles?: string
}

export interface TramiteResponse {
  numeroTramite: string
  estado: 'pendiente' | 'en_proceso' | 'completado' | 'rechazado'
  fechaInicio: Date
  fechaActualizacion: Date
  detalles?: string
}

export const iniciarTramite = async (data: TramiteRequest): Promise<TramiteResponse> => {
  try {
    // Aquí iría la llamada a la API real
    const response = await fetch('/api/tramites/iniciar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Error al iniciar el trámite')
    }

    const result = await response.json()
    toast({
      title: "Trámite iniciado",
      description: `Su número de trámite es: ${result.numeroTramite}`,
    })
    return result
  } catch (error) {
    toast({
      title: "Error",
      description: "No se pudo iniciar el trámite. Intente nuevamente.",
      variant: "destructive",
    })
    throw error
  }
}

export const consultarTramite = async (numeroTramite: string): Promise<TramiteResponse> => {
  try {
    const response = await fetch(`/api/tramites/consultar/${numeroTramite}`)
    if (!response.ok) {
      throw new Error('Error al consultar el trámite')
    }
    return await response.json()
  } catch (error) {
    toast({
      title: "Error",
      description: "No se pudo consultar el trámite. Verifique el número ingresado.",
      variant: "destructive",
    })
    throw error
  }
}

export const subirDocumento = async (numeroTramite: string, documento: File): Promise<void> => {
  try {
    const formData = new FormData()
    formData.append('documento', documento)

    const response = await fetch(`/api/tramites/${numeroTramite}/documentos`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error('Error al subir el documento')
    }

    toast({
      title: "Documento subido",
      description: "El documento se ha subido correctamente.",
    })
  } catch (error) {
    toast({
      title: "Error",
      description: "No se pudo subir el documento. Intente nuevamente.",
      variant: "destructive",
    })
    throw error
  }
}

export const solicitarTurno = async (
  tipo: string,
  fecha: Date,
  horario: string,
  datos: {
    nombre: string
    documento: string
    email: string
    telefono: string
  }
): Promise<{ numeroTurno: string }> => {
  try {
    const response = await fetch('/api/turnos/solicitar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipo,
        fecha,
        horario,
        ...datos,
      }),
    })

    if (!response.ok) {
      throw new Error('Error al solicitar el turno')
    }

    const result = await response.json()
    toast({
      title: "Turno confirmado",
      description: `Su número de turno es: ${result.numeroTurno}`,
    })
    return result
  } catch (error) {
    toast({
      title: "Error",
      description: "No se pudo solicitar el turno. Intente nuevamente.",
      variant: "destructive",
    })
    throw error
  }
}

export const realizarPago = async (
  concepto: string,
  monto: number,
  datos: {
    numeroTramite?: string
    numeroDocumento: string
    email: string
  }
): Promise<{ comprobante: string }> => {
  try {
    const response = await fetch('/api/pagos/procesar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        concepto,
        monto,
        ...datos,
      }),
    })

    if (!response.ok) {
      throw new Error('Error al procesar el pago')
    }

    const result = await response.json()
    toast({
      title: "Pago procesado",
      description: `Su comprobante es: ${result.comprobante}`,
    })
    return result
  } catch (error) {
    toast({
      title: "Error",
      description: "No se pudo procesar el pago. Intente nuevamente.",
      variant: "destructive",
    })
    throw error
  }
} 