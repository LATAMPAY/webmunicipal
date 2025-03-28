import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export function FAQ({ items }: FAQProps) {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
      {items.map((item, index) => (
        <AccordionItem
          key={`item-${index}`}
          value={`item-${index}`}
          itemScope
          itemProp="mainEntity"
          itemType="https://schema.org/Question"
        >
          <AccordionTrigger className="text-left" itemProp="name">
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
          >
            <div itemProp="text">{item.answer}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
} 