'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { RetirementCareCalculator } from '@/components/sections/coffee2/retirement-care-calculator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  defaultHomeCareInput,
  defaultInstitutionalCareInput,
  retirementSectionMeta,
} from '@/lib/content/coffee-retirement-page'
import {
  parseRetirementFromSearchParams,
  type RetirementCalculatorMode,
} from '@/lib/retirement/share-url'

function RetirementCalculatorsSectionInner() {
  const searchParams = useSearchParams()
  const [mode, setMode] = useState<RetirementCalculatorMode>('home')
  const [homeInput, setHomeInput] = useState(defaultHomeCareInput)
  const [institutionalInput, setInstitutionalInput] = useState(
    defaultInstitutionalCareInput
  )

  useEffect(() => {
    const parsed = parseRetirementFromSearchParams(searchParams)
    if (!parsed) return
    setMode(parsed.mode)
    setHomeInput(parsed.homeInput)
    setInstitutionalInput(parsed.institutionalInput)
  }, [searchParams])

  return (
    <Tabs
      value={mode}
      onValueChange={(value) => setMode(value as RetirementCalculatorMode)}
      className="retirement-calc-tabs"
    >
      <TabsList className="retirement-calc-tabs__list mx-auto flex w-full max-w-md justify-center">
        <TabsTrigger value="home">{retirementSectionMeta.homeTab}</TabsTrigger>
        <TabsTrigger value="institutional">
          {retirementSectionMeta.institutionalTab}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="home">
        <RetirementCareCalculator
          mode="home"
          homeInput={homeInput}
          institutionalInput={institutionalInput}
          onHomeInputChange={setHomeInput}
          onInstitutionalInputChange={setInstitutionalInput}
        />
      </TabsContent>
      <TabsContent value="institutional">
        <RetirementCareCalculator
          mode="institutional"
          homeInput={homeInput}
          institutionalInput={institutionalInput}
          onHomeInputChange={setHomeInput}
          onInstitutionalInputChange={setInstitutionalInput}
        />
      </TabsContent>
    </Tabs>
  )
}

export function RetirementCalculatorsSection() {
  return (
    <div className="retirement-calc-section mt-16 md:mt-24">
      <Coffee2Reveal
        delay={0}
        className="retirement-calc-section__intro mx-auto max-w-3xl text-center"
      >
        <p className="c2-eyebrow">{retirementSectionMeta.calcEyebrow}</p>
        <h3 className="retirement-calc-section__title mt-3 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
          {retirementSectionMeta.calcTitle}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500 md:text-base">
          {retirementSectionMeta.calcLead}
        </p>
        <p className="retirement-calc-section__hint mt-4 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-400">
          <span className="retirement-calc-section__hint-dot" aria-hidden />
          {retirementSectionMeta.calcHint}
        </p>
      </Coffee2Reveal>

      <Coffee2Reveal delay={120} className="mt-10 md:mt-12">
        <Suspense
          fallback={
            <div className="retirement-calc__panel rounded-2xl border border-zinc-200 p-8 text-center text-sm text-zinc-500">
              加载计算器…
            </div>
          }
        >
          <RetirementCalculatorsSectionInner />
        </Suspense>
      </Coffee2Reveal>
    </div>
  )
}
