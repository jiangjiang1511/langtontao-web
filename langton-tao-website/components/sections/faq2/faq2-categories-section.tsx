'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { Coffee2AnnotatedText } from '@/components/sections/coffee2/coffee2-annotated-paragraph'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { faq2Categories } from '@/lib/content/faq2-page'
import { cn } from '@/lib/utils'

function FaqAnnotatedAnswer({ answer }: { answer: string }) {
  return (
    <>
      {answer.split('\n\n').map((paragraph, index) => (
        <Coffee2AnnotatedText
          key={index}
          text={paragraph}
          className={index > 0 ? 'mt-4' : undefined}
        />
      ))}
    </>
  )
}

export function Faq2CategoriesSection() {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    if (!hash) return
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' })
    })
  }, [])

  return (
    <div id="faq-categories">
      <nav
        aria-label="FAQ 主题导航"
        className="sticky top-16 z-10 border-b border-zinc-200 bg-white/95 py-3 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2 px-4 sm:px-6 lg:px-8">
          {faq2Categories.map((category) => (
            <Link
              key={category.id}
              href={`#faq-${category.id}`}
              className={cn(
                'inline-flex rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors',
                'hover:border-zinc-400 hover:bg-zinc-50 md:text-sm'
              )}
            >
              {category.label}
            </Link>
          ))}
        </div>
      </nav>

      {faq2Categories.map((category, categoryIndex) => (
        <section
          key={category.id}
          id={`faq-${category.id}`}
          className={cn(
            'scroll-mt-28 border-t border-zinc-200 py-16 md:py-24',
            categoryIndex % 2 === 1 ? 'bg-zinc-50/80' : 'bg-white'
          )}
          aria-labelledby={`faq2-${category.id}-title`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <JarsyReveal className="max-w-2xl">
              <p className="c2-eyebrow">{category.eyebrow}</p>
              <h2
                id={`faq2-${category.id}-title`}
                className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
              >
                {category.label}
              </h2>
              <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
                <Coffee2AnnotatedText text={category.summary} as="span" />
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                {category.items.length} 个问题
              </p>
            </JarsyReveal>

            <JarsyReveal delay={120} className="mt-10">
              <Accordion type="single" collapsible className="rounded-2xl border border-zinc-200 bg-white px-5 md:px-8">
                {category.items.map((item, itemIndex) => (
                  <AccordionItem
                    key={item.id}
                    value={item.id}
                    className="border-zinc-200"
                  >
                    <AccordionTrigger className="c2-faq-trigger text-left text-base md:text-lg">
                      <span className="mr-3 font-mono text-xs text-zinc-400">
                        {String(itemIndex + 1).padStart(2, '0')}
                      </span>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="c2-faq-content">
                      <FaqAnnotatedAnswer answer={item.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </JarsyReveal>
          </div>
        </section>
      ))}
    </div>
  )
}
