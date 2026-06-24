import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoChallengeCta } from '@/components/sections/langtontao/langtontao-challenge-cta'
import type { PanicWealthNode } from '@/lib/content/langtontao/langtontao-panic-wealth'
import {
  langtontaoWealthStructure,
  langtontaoWealthTimeline,
} from '@/lib/content/langtontao/langtontao-panic-wealth'
import { cn } from '@/lib/utils'

type LangtontaoMindmapNodeCardProps = {
  node: PanicWealthNode
  index?: number
}

export function LangtontaoMindmapNodeCard({
  node,
  index = 0,
}: LangtontaoMindmapNodeCardProps) {
  return (
    <Coffee2Reveal delay={60 + index * 50} as="article">
      <article className="lt-mindmap-node c2-card p-5 md:p-6">
        <h3 className="text-lg font-semibold text-zinc-950 md:text-xl">
          {node.title}
        </h3>
        <p className="mt-2 text-sm font-medium text-zinc-500">{node.summary}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600">{node.body}</p>
        {node.solutionIds.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {node.solutionIds.slice(0, 2).map((id) => (
              <LangtontaoChallengeCta
                key={id}
                challengeId={id}
                className="!min-w-0 !px-4 !py-2 !text-xs"
              />
            ))}
          </div>
        ) : null}
      </article>
    </Coffee2Reveal>
  )
}

export function LangtontaoWealthTimeline() {
  return (
    <div className="lt-timeline overflow-x-auto pb-4">
      <ol className="flex min-w-[640px] gap-0">
        {langtontaoWealthTimeline.map((stage, i) => (
          <li
            key={stage.era}
            className={cn(
              'lt-timeline__step flex-1 border-t-2 border-zinc-950 pt-4',
              i > 0 && 'border-l border-dashed border-zinc-300 pl-4'
            )}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">
              {stage.years}
            </p>
            <p className="mt-1 font-semibold text-zinc-950">{stage.era}</p>
            <p className="mt-1 text-sm text-zinc-600">{stage.label}</p>
            <p className="mt-1 text-xs text-zinc-400">{stage.note}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function LangtontaoWealthStructureChart() {
  return (
    <div className="space-y-3">
      {langtontaoWealthStructure.map((row) => (
        <div key={row.id} className="lt-structure-row">
          <div className="flex items-baseline justify-between gap-2 text-sm">
            <span className="font-semibold text-zinc-950">{row.label}</span>
            <span className="text-zinc-500">{row.amount}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="lt-structure-bar h-full rounded-full bg-zinc-950"
              style={{ width: `${Math.min(row.share, 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-zinc-500">{row.tagline}</p>
        </div>
      ))}
    </div>
  )
}
