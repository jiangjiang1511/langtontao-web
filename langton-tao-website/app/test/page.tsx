import type { Metadata } from 'next'
import { RubiksExperience } from '@/components/test/rubiks-experience'
import { fiftyYearPageTitle } from '@/lib/content/fifty-year-narrative'

export const metadata: Metadata = {
  title: 'Test | 朗敦道 Langton Tao',
  description: fiftyYearPageTitle,
}

export default function TestPage() {
  return <RubiksExperience />
}
