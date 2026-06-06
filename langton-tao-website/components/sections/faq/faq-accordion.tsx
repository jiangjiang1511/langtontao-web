'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ContactTrigger } from '@/components/contact-trigger'

type FaqItem = { question: string; answer: string }

export function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <>
      <Accordion type="single" collapsible className="mt-10">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-page-${index}`}>
            <AccordionTrigger>
              <span>
                <span className="mr-3 font-mono text-xs text-zinc-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-12 text-center">
        <ContactTrigger size="lg">预约咨询</ContactTrigger>
      </div>
    </>
  )
}
