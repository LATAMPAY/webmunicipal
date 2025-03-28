import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Almacenamiento en memoria para las solicitudes (en producción deberías usar Redis)
const ipRequests = new Map<string, { count: number; timestamp: number }>()

// Configuración del rate limiting
const WINDOW_SIZE = 60 * 1000 // 1 minuto
const MAX_REQUESTS = 10 // máximo de solicitudes por ventana

export function rateLimit(request: NextRequest) {
  const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'unknown'
  const now = Date.now()
  const requestData = ipRequests.get(ip)

  if (!requestData) {
    // Primera solicitud desde esta IP
    ipRequests.set(ip, { count: 1, timestamp: now })
    return null
  }

  if (now - requestData.timestamp > WINDOW_SIZE) {
    // La ventana de tiempo ha expirado, reiniciar el contador
    ipRequests.set(ip, { count: 1, timestamp: now })
    return null
  }

  if (requestData.count >= MAX_REQUESTS) {
    // Se ha excedido el límite de solicitudes
    return new NextResponse(JSON.stringify({
      error: 'Too many requests',
      message: 'Por favor, intente nuevamente en un minuto'
    }), {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60'
      }
    })
  }

  // Incrementar el contador de solicitudes
  requestData.count++
  ipRequests.set(ip, requestData)
  return null
}

// Limpiar el mapa periódicamente para evitar fugas de memoria
setInterval(() => {
  const now = Date.now()
  for (const [ip, data] of ipRequests.entries()) {
    if (now - data.timestamp > WINDOW_SIZE) {
      ipRequests.delete(ip)
    }
  }
}, WINDOW_SIZE) 