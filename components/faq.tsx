"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    question: "¿Cómo inicio un trámite municipal?",
    answer: "Para iniciar un trámite municipal, puede acercarse a la Mesa de Entradas en el horario de 8:00 a 14:00 hs. También puede iniciar algunos trámites en línea a través de nuestro portal de servicios digitales.",
  },
  {
    question: "¿Dónde puedo pagar mis tasas municipales?",
    answer: "Las tasas municipales pueden abonarse en la Tesorería Municipal, a través de la Wallet Municipal, o en los bancos autorizados. También puede realizar el pago en línea desde nuestro sitio web.",
  },
  {
    question: "¿Cómo solicito una audiencia con el Intendente?",
    answer: "Para solicitar una audiencia con el Intendente, debe completar el formulario correspondiente en la Secretaría Privada o enviar su solicitud a través de nuestro formulario de contacto seleccionando el motivo 'Audiencia'.",
  },
  {
    question: "¿Cuál es el horario de atención de las oficinas municipales?",
    answer: "Las oficinas municipales atienden de lunes a viernes de 8:00 a 14:00 hs. Algunos servicios específicos pueden tener horarios extendidos.",
  },
  {
    question: "¿Cómo presento una queja o reclamo?",
    answer: "Puede presentar su queja o reclamo a través de múltiples canales: personalmente en la Oficina de Atención al Vecino, mediante nuestro formulario web, o llamando al número de atención ciudadana.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="border rounded-lg">
          <Button
            variant="ghost"
            className="w-full flex justify-between items-center p-4"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="text-left font-medium">{faq.question}</span>
            {openIndex === index ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          {openIndex === index && (
            <div className="p-4 pt-0">
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}