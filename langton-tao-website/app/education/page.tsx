import type { Metadata } from 'next'
import { EnglishShowcaseSection } from '@/components/sections/education/english-showcase-section'
import { ReadingBookshelfSection } from '@/components/sections/education/reading-bookshelf-section'

export const metadata: Metadata = {
  title: '教育 | 朗敦道 Langton Tao',
  description: '读书与英语——打开认知与世界入口的教育板块',
}

export default function EducationPage() {
  return (
    <>
      <ReadingBookshelfSection />
      <EnglishShowcaseSection />
    </>
  )
}
