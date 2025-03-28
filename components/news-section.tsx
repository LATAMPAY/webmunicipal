import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock news data
const newsItems = [
  {
    id: 1,
    title: "Inauguración de la nueva plaza central",
    date: "15 de Marzo, 2025",
    excerpt:
      "El intendente inauguró la renovada plaza central con nuevos juegos infantiles y áreas verdes para el disfrute de todos los vecinos.",
    image: "/placeholder.svg?height=200&width=400",
    link: "/noticias/1",
  },
  {
    id: 2,
    title: "Programa de capacitación laboral",
    date: "10 de Marzo, 2025",
    excerpt:
      "Comienza el nuevo programa de capacitación laboral para jóvenes. Inscripciones abiertas hasta el 30 de marzo.",
    image: "/placeholder.svg?height=200&width=400",
    link: "/noticias/2",
  },
  {
    id: 3,
    title: "Mejoras en el servicio de recolección",
    date: "5 de Marzo, 2025",
    excerpt:
      "Se implementan mejoras en el servicio de recolección de residuos con nuevos camiones y ampliación de horarios.",
    image: "/placeholder.svg?height=200&width=400",
    link: "/noticias/3",
  },
]

export default function NewsSection() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Últimas Noticias</h2>
          <Link href="/noticias">
            <Button variant="outline">
              Ver todas <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsItems.map((news) => (
            <Card key={news.id} className="overflow-hidden">
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={news.image || "/placeholder.svg"}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardDescription>{news.date}</CardDescription>
                <CardTitle className="line-clamp-2">{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3">{news.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Link href={news.link} className="w-full">
                  <Button variant="outline" className="w-full">
                    Leer más <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

