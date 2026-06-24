'use client'

import { ChildCostCalculatorsSection } from '@/components/sections/coffee2/child-cost-calculators-section'
import { EducationGallerySection } from '@/components/sections/coffee2/education-gallery-section'
import { EducationChildSurveySection } from '@/components/sections/coffee2/education-child-survey-section'

export function EducationSection() {
  return (
    <div className="education-section mt-12 md:mt-16">
      <EducationGallerySection />
      <EducationChildSurveySection />
      <ChildCostCalculatorsSection />
    </div>
  )
}
