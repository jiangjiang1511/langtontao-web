'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionSurface, SectionTitle } from '@/components/layout/section-surface'

export function JoinCtaSection() {
  return (
    <SectionSurface
      id="join-cta"
      theme="dark"
      narrow
      aria-labelledby="join-cta-title"
    >
      <div className="border-2 border-pop-yellow p-10 text-center">
        <SectionTitle
          id="join-cta-title"
          display
          className="text-pop-white"
        >
          成为朗敦道会员
        </SectionTitle>
        <p className="mt-4 text-sm font-bold text-[color:var(--section-muted)]">
          生态入局——开启认知定投
        </p>
        <Button variant="default" size="lg" className="mt-8" asChild>
          <Link href="/member2">了解会员</Link>
        </Button>
      </div>
    </SectionSurface>
  )
}
