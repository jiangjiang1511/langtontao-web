import Link from 'next/link'
import { pillarCards } from '@/lib/content/home-sections'
import { SectionSurface } from '@/components/layout/section-surface'
import { cn } from '@/lib/utils'

export function PillarsSection() {
  return (
    <SectionSurface id="pillars" theme="white" aria-labelledby="pillars-title">
      <div className="grid gap-5 md:grid-cols-3 md:gap-6">
        {pillarCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-pop-black shadow-pop-black transition-transform hover:-translate-y-1 md:aspect-[4/5]"
          >
            <div
              className={cn('absolute inset-0', card.imageClass)}
              aria-hidden
            />
            <div className="absolute inset-0 bg-pop-black/45" />
            <div className="relative flex h-full flex-col items-center justify-center p-6 text-center text-pop-white">
              <h3 className="text-display text-3xl md:text-4xl">{card.title}</h3>
              <p className="mt-4 text-sm font-bold leading-relaxed opacity-95 md:text-base">
                {card.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <p className="sr-only" id="pillars-title">
        社群 · 读书 · 活动
      </p>
    </SectionSurface>
  )
}
