import {
  BookOpen,
  Coffee,
  Globe,
  Lightbulb,
  MessagesSquare,
  Network,
  Sun,
  type LucideIcon,
} from 'lucide-react'
import {
  offeringsBenefits,
  offeringsContent,
} from '@/lib/content/home-sections'
import { SectionSurface } from '@/components/layout/section-surface'

const iconMap: Record<string, LucideIcon> = {
  book: BookOpen,
  messages: MessagesSquare,
  globe: Globe,
  coffee: Coffee,
  sun: Sun,
  lightbulb: Lightbulb,
  network: Network,
}

export function OfferingsSection() {
  const quoteParts = offeringsContent.pullQuote.split('。')
  const lead = quoteParts[0] ? `${quoteParts[0]}。` : offeringsContent.pullQuote
  const highlight = quoteParts[1]?.replace('。', '') ?? ''

  return (
    <SectionSurface
      id="offerings"
      theme="paper"
      narrow
      aria-labelledby="offerings-title"
    >
      <h2
        id="offerings-title"
        className="text-display text-center text-4xl text-pop-black md:text-5xl lg:text-6xl"
      >
        {offeringsContent.themeLine}
      </h2>

      <p className="mt-8 text-center text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
        {offeringsContent.narrative}
      </p>

      <p className="mt-8 text-center text-lg font-bold leading-relaxed text-pop-black md:text-xl">
        {lead}
        {highlight ? (
          <>
            {' '}
            <span className="highlight-scribble">{highlight}</span>。
          </>
        ) : null}
      </p>

      <ul className="mt-12 space-y-5">
        {offeringsBenefits.map((item) => {
          const Icon = iconMap[item.icon] ?? BookOpen
          return (
            <li key={item.text} className="flex gap-4">
              <Icon
                className="mt-0.5 h-5 w-5 shrink-0 text-pop-black"
                strokeWidth={2}
                aria-hidden
              />
              <span className="text-sm font-bold leading-relaxed text-pop-black md:text-base">
                {item.text}
              </span>
            </li>
          )
        })}
      </ul>

      <div
        className="mt-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border-2 border-pop-black bg-gradient-to-br from-zinc-600 to-pop-black shadow-pop-black"
        role="img"
        aria-label="社群活动图片素材位"
      />
    </SectionSurface>
  )
}
