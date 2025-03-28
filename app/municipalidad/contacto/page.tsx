"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { FAQ } from "@/components/faq"
import { ContactForm } from "../../../components/contact-form"
import { submitContactForm } from "@/lib/actions"

export default function ContactPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)

    try {
      const result = await submitContactForm(formData)

      if (result.success) {
        toast({
          title: "Mensaje enviado",
          description: "Su mensaje ha sido enviado correctamente. Nos pondremos en contacto con usted a la brevedad.",
          variant: "default",
        })

        // Reset form
        const form = document.getElementById("contactForm") as HTMLFormElement
        form.reset()
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al procesar la solicitud",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Inicio", href: "/" },
          { label: "Municipalidad", href: "/municipalidad" },
          { label: "Contacto", href: "/municipalidad/contacto" }
        ]}
      />
      <h1 className="text-3xl font-bold mb-8">Contacto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ContactForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
        <div>
          <FAQ />
        </div>
      </div>
    </div>
  )
}

