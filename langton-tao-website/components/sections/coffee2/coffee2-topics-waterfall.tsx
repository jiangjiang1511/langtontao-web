'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Coffee2TopicSection } from '@/components/sections/coffee2/coffee2-topic-section'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  coffee2Topics,
  coffee2TopicsMeta,
  getCoffee2TopicCounts,
  type Coffee2TopicId,
} from '@/lib/content/coffee2-page'
import { cn } from '@/lib/utils'

export function Coffee2TopicsWaterfall() {
  const counts = getCoffee2TopicCounts()

  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return

    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  return (
    <div id="coffee-topics">
      <section
        className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
        aria-labelledby="coffee2-topics-title"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Coffee2Reveal>
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="c2-eyebrow">{coffee2TopicsMeta.eyebrow}</p>
                <h2
                  id="coffee2-topics-title"
                  className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
                >
                  {coffee2TopicsMeta.title}
                </h2>
                <p className="mt-2 text-2xl font-semibold tracking-tight text-zinc-400 md:text-3xl">
                  {coffee2TopicsMeta.subtitle}
                </p>
                <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
                  {coffee2TopicsMeta.lead}
                </p>
              </div>

              <ul className="flex flex-wrap gap-3 lg:max-w-md lg:justify-end">
                {coffee2Topics.map((topic, index) => (
                  <Coffee2Reveal
                    key={topic.id}
                    as="li"
                    delay={index * 70}
                    className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-center"
                  >
                    <p className="text-2xl font-semibold leading-none text-zinc-950">
                      {counts[topic.id as Coffee2TopicId]}
                    </p>
                    <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-zinc-500">
                      {topic.title}
                    </p>
                  </Coffee2Reveal>
                ))}
              </ul>
            </div>
          </Coffee2Reveal>
        </div>
      </section>

      <nav
        aria-label="熊比特咖啡议题导航"
        className="c2-topic-nav sticky top-16 z-10 border-b border-zinc-200 bg-white/95 py-3 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 sm:px-6 lg:px-8">
          {coffee2Topics.map((topic) => (
            <Link
              key={topic.id}
              href={`#${topic.id}`}
              className={cn(
                'inline-flex rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors',
                'hover:border-zinc-400 hover:bg-zinc-50 md:text-sm'
              )}
            >
              {topic.title}
            </Link>
          ))}
        </div>
      </nav>

      <div>
        {coffee2Topics.map((topic, index) => (
          <Coffee2TopicSection
            key={topic.id}
            topic={topic}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
