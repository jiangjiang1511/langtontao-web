import { faqItems } from '@/lib/content/home-sections'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { SectionSurface, SectionTitle } from '@/components/layout/section-surface'
import { PillLink } from '@/components/ui/pill-link'

export function FaqTeaserSection() {
  const items = faqItems.slice(0, 5)

  return (
    <SectionSurface id="faq" theme="paper" aria-labelledby="faq-title">
      <div className="flex items-center justify-between gap-4">
        <SectionTitle id="faq-title" display>
          FAQs
        </SectionTitle>
        <PillLink href="/faq" variant="outline">
          更多问题
        </PillLink>
      </div>
      <Accordion type="single" collapsible className="mt-8">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger>
              <span>
                <span className="mr-3 font-mono text-xs font-black text-[color:var(--section-muted)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {item.question}
              </span>
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionSurface>
  )
}
