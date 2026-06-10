import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import { checkupServiceProcess } from '@/lib/content/checkup2-page'
import { cn } from '@/lib/utils'

export function Checkup2ProcessSection() {
  return (
    <section
      id="checkup-process"
      className="scroll-mt-20 border-b border-zinc-200 bg-zinc-50/80 py-16 md:py-24"
      aria-labelledby="checkup2-process-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <JarsyReveal className="max-w-2xl">
          <p className="c2-eyebrow">Process</p>
          <h2
            id="checkup2-process-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {checkupServiceProcess.title}
          </h2>
        </JarsyReveal>

        <div className="mt-14 space-y-0">
          {checkupServiceProcess.steps.map((step, index) => (
            <JarsyReveal
              key={step.step}
              as="article"
              delay={index * 80}
              className={cn(
                'grid gap-6 border-t border-zinc-200 py-10 md:grid-cols-[minmax(0,8rem)_1fr] md:gap-12 md:py-12'
              )}
            >
              <div>
                <p className="c2-step-number">{String(step.step).padStart(2, '0')}</p>
                <p className="mt-2 text-xs font-medium uppercase tracking-widest text-zinc-400">
                  {step.label}
                </p>
              </div>
              <p className="self-center text-base leading-relaxed text-zinc-700 md:text-lg">
                {step.description}
              </p>
            </JarsyReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
