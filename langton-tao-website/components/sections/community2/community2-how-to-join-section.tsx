import { Community2Reveal } from '@/components/sections/community2/community2-reveal'
import { community2HowToJoin } from '@/lib/content/community2-page'

export function Community2HowToJoinSection() {
  return (
    <section
      id="how-to-join"
      className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="community2-howto-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Community2Reveal className="max-w-2xl">
          <p className="c2-eyebrow">How to Join</p>
          <h2
            id="community2-howto-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {community2HowToJoin.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
            {community2HowToJoin.subtitle}
          </p>
        </Community2Reveal>

        <div className="mt-14 space-y-12 md:mt-16">
          {community2HowToJoin.steps.map((step, index) => (
            <Community2Reveal
              key={step.id}
              as="article"
              delay={index * 100}
              className="grid gap-8 border-t border-zinc-200 pt-12 md:grid-cols-2 md:gap-16"
            >
              <div>
                <p className="c2-step-number">{step.number}.</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-zinc-600">
                  {step.summary}
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-8">
                <p className="text-base leading-relaxed text-zinc-700">
                  {step.detail}
                </p>
                <p className="mt-6 font-mono text-xs text-zinc-400">
                  {step.meta}
                </p>
              </div>
            </Community2Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
