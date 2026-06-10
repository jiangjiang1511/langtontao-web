import {
  Briefcase,
  ClipboardCheck,
  Headphones,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import {
  checkupServiceCommitments,
  type CheckupCommitmentIcon,
} from '@/lib/content/checkup-page'

const iconMap: Record<CheckupCommitmentIcon, LucideIcon> = {
  'clipboard-check': ClipboardCheck,
  briefcase: Briefcase,
  'shield-check': ShieldCheck,
  headphones: Headphones,
}

export function Checkup2CommitmentSection() {
  return (
    <section
      className="border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="checkup2-commitment-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <JarsyReveal className="max-w-2xl">
          <p className="c2-eyebrow">Commitment</p>
          <h2
            id="checkup2-commitment-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            {checkupServiceCommitments.title}
          </h2>
        </JarsyReveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-6">
          {checkupServiceCommitments.items.map((item, index) => {
            const Icon = iconMap[item.icon]
            return (
              <JarsyReveal
                key={item.id}
                delay={index * 80}
                className="c2-card p-6 md:p-8"
              >
                <Icon className="h-6 w-6 text-zinc-400" strokeWidth={1.5} />
                <h3 className="mt-4 text-lg font-semibold text-zinc-950">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {item.description}
                </p>
              </JarsyReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
