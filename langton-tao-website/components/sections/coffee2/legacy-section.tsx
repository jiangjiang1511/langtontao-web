'use client'

import { LegacyTopicCardsSection } from '@/components/sections/coffee2/legacy-topic-cards-section'
import { LegacySurveySection } from '@/components/sections/coffee2/legacy-survey-section'

export function LegacySection() {
  return (
    <div className="legacy-content mt-12 md:mt-16 space-y-16 md:space-y-20">
      <LegacyTopicCardsSection />
      <LegacySurveySection />
    </div>
  )
}
