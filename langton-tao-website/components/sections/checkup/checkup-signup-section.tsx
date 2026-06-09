'use client'

import { ContactTrigger } from '@/components/contact-trigger'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { checkupSignup } from '@/lib/content/checkup-page'

export function CheckupSignupSection() {
  return (
    <SectionSurface
      id="checkup-signup"
      theme="yellow"
      narrow
      className="text-center"
      aria-labelledby="checkup-signup-title"
    >
      <div className="rounded-lg border-2 border-pop-black bg-pop-yellow px-6 py-10 shadow-pop-black md:px-12 md:py-14">
        <Eyebrow>{checkupSignup.eyebrow}</Eyebrow>
        <SectionTitle id="checkup-signup-title" display className="mt-4">
          {checkupSignup.title}
        </SectionTitle>
        <p className="mx-auto mt-6 max-w-xl text-base font-bold leading-relaxed text-pop-black/80 md:text-lg">
          {checkupSignup.lead}
        </p>
        <ContactTrigger
          intent={checkupSignup.contactIntent}
          size="lg"
          className="mt-8"
        >
          {checkupSignup.ctaLabel}
        </ContactTrigger>
      </div>
    </SectionSurface>
  )
}
