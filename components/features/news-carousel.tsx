"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { useNews } from "@/hooks/use-news"
import Link from "next/link"

export function NewsCarousel() {
  const { news, loading, error } = useNews()

  if (loading) {
    return <div className="text-center py-8">Cargando noticias...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {news.map((item) => (
          <CarouselItem key={item.id}>
            <Card className="overflow-hidden">
              <div 
                className="relative h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${item.image_url})` }} 
              />
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {new Date(item.published_at).toLocaleDateString('es-AR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <Button asChild className="w-full">
                  <Link href={`/noticias/${item.id}`}>Leer más</Link>
                </Button>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}