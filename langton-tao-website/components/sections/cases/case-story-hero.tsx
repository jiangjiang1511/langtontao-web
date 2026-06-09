import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { casesPageMeta } from '@/lib/content/cases'

export function CaseStoryHero() {
  return (
    <SectionSurface
      theme="yellow"
      className="pt-24 md:pt-28"
      aria-labelledby="cases-hero-title"
    >
      <div className="mx-auto max-w-3xl rounded-lg border-2 border-pop-black bg-pop-yellow px-6 py-10 text-center shadow-pop-black md:px-12 md:py-14">
        <Eyebrow>{casesPageMeta.eyebrow}</Eyebrow>
        <SectionTitle id="cases-hero-title" display className="mt-4 text-[1.75rem] md:text-5xl lg:text-6xl">
          {casesPageMeta.title}
        </SectionTitle>
        <p className="mt-6 text-base font-bold leading-relaxed text-pop-black/80 md:text-lg">
          {casesPageMeta.lead}
        </p>
      </div>
    </SectionSurface>
  )
}
