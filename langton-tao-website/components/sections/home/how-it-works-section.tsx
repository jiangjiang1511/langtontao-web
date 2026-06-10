'use client'

import Link from 'next/link'
import { howItWorksSteps } from '@/lib/content/home-sections'
import { Button } from '@/components/ui/button'
import { Eyebrow, SectionSurface, SectionTitle } from '@/components/layout/section-surface'

export function HowItWorksSection() {
  return (
    <SectionSurface id="how-it-works" theme="dark" aria-labelledby="how-title">
      <Eyebrow>HOW IT WORKS</Eyebrow>
      <SectionTitle id="how-title" display>
        如何参与
      </SectionTitle>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {howItWorksSteps.map((step) => (
          <div
            key={step.step}
            className="pop-card rounded-lg border-2 border-pop-white bg-pop-white p-6 text-pop-black"
          >
            <p className="text-display text-5xl text-pop-paper">{step.step}</p>
            <p className="mt-2 text-sm font-black uppercase tracking-widest">
              {step.label}
            </p>
            <p className="mt-4 text-sm font-bold leading-relaxed text-[color:var(--section-muted)]">
              {step.description}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Button variant="default" asChild>
          <Link href="/member">了解会员</Link>
        </Button>
      </div>
    </SectionSurface>
  )
}
