import { Metadata } from "next"

interface PageMetadataProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  type?: string
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image = "/og-image.jpg",
  type = "website",
}: PageMetadataProps): Metadata {
  return {
    title: `${title} | M.G.E.M`,
    description,
    keywords: [
      "municipalidad",
      "general mosconi",
      "gobierno local",
      "servicios municipales",
      ...keywords,
    ],
    openGraph: {
      title,
      description,
      images: [image],
      type,
      locale: "es_AR",
      siteName: "M.G.E.M",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
} 