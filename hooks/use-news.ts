import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { News } from '@/types/database'

export function useNews() {
  const [news, setNews] = useState<News[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('published_at', { ascending: false })
          .limit(3)

        if (error) throw error
        setNews(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las noticias')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return { news, loading, error }
} 