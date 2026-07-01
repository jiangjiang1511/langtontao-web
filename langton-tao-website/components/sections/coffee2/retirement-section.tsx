'use client'

import { RetirementTopicCardsSection } from '@/components/sections/coffee2/retirement-topic-cards-section'
import { RetirementCalculatorsSection } from '@/components/sections/coffee2/retirement-calculators-section'
import { RetirementSoulQuestions } from '@/components/sections/coffee2/retirement-soul-questions'

export function RetirementSection() {
  return (
    <div className="retirement-section mt-12 md:mt-16">
      <RetirementSoulQuestions />
      <RetirementCalculatorsSection />
      <RetirementTopicCardsSection />
    </div>
  )
}
