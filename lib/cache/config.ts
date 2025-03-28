export const CACHE_CONFIG = {
  // Configuración de caché para páginas estáticas
  staticPages: {
    maxAge: 60 * 60, // 1 hora
    staleWhileRevalidate: 60 * 5 // 5 minutos
  },
  
  // Configuración de caché para API endpoints
  api: {
    maxAge: 60 * 5, // 5 minutos
    staleWhileRevalidate: 60 // 1 minuto
  },
  
  // Configuración de caché para recursos estáticos
  static: {
    maxAge: 60 * 60 * 24 * 7, // 1 semana
    immutable: true
  }
}

export function getCacheControlHeader(type: keyof typeof CACHE_CONFIG): string {
  const config = CACHE_CONFIG[type]
  
  if (type === 'static' && config.immutable) {
    return `public, max-age=${config.maxAge}, immutable`
  }
  
  return `public, max-age=${config.maxAge}, s-maxage=${config.maxAge}, stale-while-revalidate=${config.staleWhileRevalidate}`
} 