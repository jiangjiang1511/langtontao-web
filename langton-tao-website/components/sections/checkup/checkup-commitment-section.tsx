import {
  Briefcase,
  ClipboardCheck,
  Headphones,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import {
  checkupServiceCommitments,
  type CheckupCommitmentIcon,
} from '@/lib/content/checkup-page'
import { SectionSurface, SectionTitle } from '@/components/layout/section-surface'

const commitmentIcons: Record<CheckupCommitmentIcon, LucideIcon> = {
  'clipboard-check': ClipboardCheck,
  briefcase: Briefcase,
  'shield-check': ShieldCheck,
  headphones: Headphones,
}

export function CheckupCommitmentSection() {
  return (
    <SectionSurface
      theme="white"
      aria-labelledby="checkup-commitment-title"
    >
      <p className="text-center text-xs font-black uppercase tracking-[0.35em] text-pop-black/50">
        ——
      </p>
      <SectionTitle
        id="checkup-commitment-title"
        className="text-center"
      >
        {checkupServiceCommitments.title}
      </SectionTitle>
      <p className="text-center text-xs font-black uppercase tracking-[0.35em] text-pop-black/50">
        ——
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {checkupServiceCommitments.items.map((item) => {
          const Icon = commitmentIcons[item.icon]

          return (
            <article
              key={item.id}
              className="flex flex-col rounded-lg border-2 border-pop-black bg-pop-paper p-6 shadow-pop-black"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-pop-black bg-pop-yellow">
                <Icon className="h-6 w-6 text-pop-black" aria-hidden />
              </div>
              <h3 className="mt-5 text-base font-black text-pop-black">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm font-bold leading-relaxed text-pop-black/70">
                {item.description}
              </p>
            </article>
          )
        })}
      </div>
    </SectionSurface>
  )
}
