import Link from 'next/link'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import type { FiftyYearProduct } from '@/lib/content/fifty-year-narrative'

type HomeJarsyTransitionStepsProps = {
  heading: string
  items: FiftyYearProduct[]
}

export function HomeJarsyTransitionSteps({
  heading,
  items,
}: HomeJarsyTransitionStepsProps) {
  return (
    <JarsyReveal delay={160} className="mx-auto mt-12 max-w-4xl">
      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 text-center md:p-8">
        <p className="c2-eyebrow">{heading}</p>
        <div className="home-jarsy-transition-steps mx-auto mt-8 grid max-w-3xl gap-4">
          {items.map((item, index) => {
            const stepNumber = String(index + 1).padStart(2, '0')
            const inner = (
              <>
                <p className="c2-step-number">{stepNumber}</p>
                <p className="mt-4 text-xl font-semibold tracking-tight text-zinc-950 md:text-2xl">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-zinc-500">
                  点击进入下一阶段路径
                </p>
              </>
            )

            if (item.href) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="home-jarsy-step text-center"
                >
                  {inner}
                </Link>
              )
            }

            return (
              <div key={item.label} className="home-jarsy-step text-center">
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </JarsyReveal>
  )
}
