export type News = {
  id: string
  title: string
  description: string
  image_url: string
  published_at: string
  author: string
  category: string
}

export type Event = {
  id: string
  title: string
  description: string
  start_date: string
  end_date: string
  location: string
  image_url: string
}

export type Service = {
  id: string
  title: string
  description: string
  icon: string
  category: string
  url: string
} 