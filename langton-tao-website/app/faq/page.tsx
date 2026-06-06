import { allFaqs } from '@/lib/content/faq-page'
import { FaqAccordion } from '@/components/sections/faq/faq-accordion'
import { Section, SectionTitle } from '@/components/layout/section'

export default function FaqPage() {
  return (
    <Section className="pt-24" narrow aria-labelledby="faq-page-title">
      <SectionTitle id="faq-page-title">FAQ</SectionTitle>
      <p className="mt-3 text-lg text-zinc-600">以提问同频财富理解</p>
      <FaqAccordion items={allFaqs} />
    </Section>
  )
}
