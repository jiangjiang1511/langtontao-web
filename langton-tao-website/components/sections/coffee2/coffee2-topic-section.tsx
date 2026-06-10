import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  coffee2TopicMeta,
  type Coffee2TopicId,
  type CoffeeBlock,
  type CoffeeWaterfallSection,
} from '@/lib/content/coffee2-page'
import { cn } from '@/lib/utils'

type TopicSectionProps = {
  topic: CoffeeWaterfallSection & { id: Coffee2TopicId }
  index: number
}

function TopicHeader({
  topic,
}: {
  topic: TopicSectionProps['topic']
}) {
  const meta = coffee2TopicMeta[topic.id]

  return (
    <Coffee2Reveal
      className="grid gap-6 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-12"
    >
      <div>
        <p className="c2-topic-number">{meta.number}</p>
        <h2
          id={`coffee-section-${topic.id}`}
          className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 md:text-4xl"
        >
          {topic.title}
        </h2>
      </div>
      <p className="self-end text-base leading-relaxed text-zinc-600 md:text-lg">
        {meta.summary}
      </p>
    </Coffee2Reveal>
  )
}

function InvestContent({ blocks }: { blocks: CoffeeBlock[] }) {
  const itemsBlock = blocks.find((block) => block.type === 'items')
  if (!itemsBlock || itemsBlock.type !== 'items') return null

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {itemsBlock.items.map((item, itemIndex) => (
        <Coffee2Reveal
          key={item}
          delay={itemIndex * 80}
          className="c2-invest-card group p-6 md:p-8"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
            0{itemIndex + 1}
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-950 md:text-3xl">
            {item}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            在 Coffee Chat 中拆解路径、交换判断与实操心得。
          </p>
        </Coffee2Reveal>
      ))}
    </div>
  )
}

function PreservationContent({ blocks }: { blocks: CoffeeBlock[] }) {
  const introBlock = blocks.find((block) => block.type === 'insuranceIntro')
  const insurersBlock = blocks.find((block) => block.type === 'insurers')

  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
      {introBlock?.type === 'insuranceIntro' ? (
        <Coffee2Reveal delay={80} className="c2-card p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            保险认知
          </p>
          <ol className="mt-6 space-y-4">
            {introBlock.items.map((item, itemIndex) => (
              <li
                key={item}
                className="flex gap-4 border-b border-zinc-100 pb-4 last:border-0 last:pb-0"
              >
                <span className="text-sm font-semibold tabular-nums text-zinc-300">
                  {String(itemIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-base leading-relaxed text-zinc-800">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </Coffee2Reveal>
      ) : null}

      {insurersBlock?.type === 'insurers' ? (
        <Coffee2Reveal
          delay={160}
          className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 md:p-8"
        >
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
            {insurersBlock.title}
          </p>
          <p className="mt-2 text-sm text-zinc-500">
            合作保司与渠道网络
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {insurersBlock.names.map((name) => (
              <span key={name} className="c2-chip bg-white">
                {name}
              </span>
            ))}
          </div>
        </Coffee2Reveal>
      ) : null}
    </div>
  )
}

function DebtContent({ blocks }: { blocks: CoffeeBlock[] }) {
  const placeholder = blocks.find((block) => block.type === 'placeholder')

  return (
    <Coffee2Reveal delay={80} className="mt-10">
      <div className="c2-debt-empty mx-auto max-w-2xl px-8 py-16 text-center md:py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
          Coming Soon
        </p>
        <p className="mt-4 text-lg font-medium text-zinc-600">
          {placeholder?.type === 'placeholder'
            ? placeholder.text
            : '内容待补充'}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          化债议题将在后续 Coffee Chat 中逐步展开。
        </p>
      </div>
    </Coffee2Reveal>
  )
}

function LegacyContent({ blocks }: { blocks: CoffeeBlock[] }) {
  const subTopics = blocks.filter((block) => block.type === 'subTopic')

  return (
    <div className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6">
      {subTopics.map((block, blockIndex) => {
        if (block.type !== 'subTopic') return null

        return (
          <Coffee2Reveal
            key={block.id}
            as="article"
            id={block.id}
            delay={blockIndex * 100}
            className="scroll-mt-28 c2-legacy-card p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold text-zinc-950 md:text-2xl">
                {block.title}
              </h3>
              {block.note ? (
                <span className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-500">
                  {block.note}
                </span>
              ) : null}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {block.placeholder}
            </p>
            <p className="mt-6 font-mono text-xs text-zinc-400">
              legacy · {block.id}
            </p>
          </Coffee2Reveal>
        )
      })}
    </div>
  )
}

export function Coffee2TopicSection({ topic, index }: TopicSectionProps) {
  return (
    <section
      id={topic.id}
      className={cn(
        'scroll-mt-28 border-t border-zinc-200 py-12 md:py-16',
        index % 2 === 1 ? 'bg-zinc-50/80' : 'bg-white'
      )}
      aria-labelledby={`coffee-section-${topic.id}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TopicHeader topic={topic} />

        {topic.id === 'invest' ? <InvestContent blocks={topic.blocks} /> : null}
        {topic.id === 'preservation' ? (
          <PreservationContent blocks={topic.blocks} />
        ) : null}
        {topic.id === 'debt' ? <DebtContent blocks={topic.blocks} /> : null}
        {topic.id === 'legacy' ? <LegacyContent blocks={topic.blocks} /> : null}
      </div>
    </section>
  )
}
