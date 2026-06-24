'use client'

import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { Coffee2PreservationInsurerHub } from '@/components/sections/coffee2/coffee2-preservation-insurer-hub'
import { Coffee2PreservationIntroGrid } from '@/components/sections/coffee2/coffee2-preservation-intro-grid'
import { WealthAccumulationExplorer } from '@/components/sections/coffee2/wealth-accumulation-explorer'
import { DebtSurveySection } from '@/components/sections/coffee2/debt-survey-section'
import { DebtTopicCardsSection } from '@/components/sections/coffee2/debt-topic-cards-section'
import type { CoffeeBlock } from '@/lib/content/coffee2-page'

export function InvestContent({ blocks: _blocks }: { blocks: CoffeeBlock[] }) {
  return (
    <div className="mt-8 space-y-16 md:space-y-20">
      <WealthAccumulationExplorer />
    </div>
  )
}

export function PreservationContent({ blocks }: { blocks: CoffeeBlock[] }) {
  const introBlock = blocks.find((block) => block.type === 'insuranceIntro')

  return (
    <div className="mt-8 space-y-8">
      {introBlock?.type === 'insuranceIntro' ? (
        <Coffee2PreservationIntroGrid items={introBlock.items} />
      ) : null}

      <div className="min-w-0 w-full max-w-full overflow-hidden">
        <Coffee2PreservationInsurerHub revealDelay={160} />
      </div>
    </div>
  )
}

export function DebtContent() {
  return (
    <div className="debt-content mt-10 space-y-16 md:mt-12 md:space-y-20">
      <DebtTopicCardsSection />
      <DebtSurveySection />
    </div>
  )
}

export function LegacyContent({ blocks }: { blocks: CoffeeBlock[] }) {
  const subTopics = blocks.filter((block) => block.type === 'subTopic')

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2 md:gap-6">
      {subTopics.map((block, blockIndex) => {
        if (block.type !== 'subTopic') return null

        return (
          <Coffee2Reveal
            key={block.id}
            as="article"
            id={block.id}
            delay={blockIndex * 100}
            className="scroll-mt-28 c2-legacy-card p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-xl font-semibold text-zinc-950 md:text-2xl">
                {block.title}
              </h4>
              {block.note ? (
                <span className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-500">
                  {block.note}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {block.placeholder}
            </p>
            <p className="mt-6 font-mono text-xs text-zinc-400">
              legacy · {block.id}
            </p>
          </Coffee2Reveal>
        )
      })}
    </div>
  )
}
