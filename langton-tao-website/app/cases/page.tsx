import type { Metadata } from 'next'
import { CaseStoryHero } from '@/components/sections/cases/case-story-hero'
import { CaseStoryIndex } from '@/components/sections/cases/case-story-index'
import { casesPageMeta } from '@/lib/content/cases'

export const metadata: Metadata = {
  title: `${casesPageMeta.title} | 朗敦道 Langton Tao`,
  description: casesPageMeta.description,
}

export default function CasesPage() {
  return (
    <>
      <CaseStoryHero />
      <CaseStoryIndex />
    </>
  )
}
