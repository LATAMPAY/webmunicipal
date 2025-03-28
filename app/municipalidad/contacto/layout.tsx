import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contacto | Municipalidad de General Mosconi",
  description: "Comuníquese con la Municipalidad de General Mosconi. Encuentre información de contacto de todas las áreas y envíe sus consultas.",
  keywords: ["contacto", "atención al vecino", "reclamos", "consultas", "áreas municipales", "General Mosconi"],
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 