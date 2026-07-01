'use client'

import { EducationGallerySection } from '@/components/sections/coffee2/education-gallery-section'
import { EducationTeachSection } from '@/components/sections/coffee2/education-teach-section'
import { EducationNurtureSection } from '@/components/sections/coffee2/education-nurture-section'

export function EducationSection() {
  return (
    <div className="education-section mt-12 md:mt-16">
      <EducationGallerySection />
      <EducationTeachSection />
      <EducationNurtureSection />
    </div>
  )
}
