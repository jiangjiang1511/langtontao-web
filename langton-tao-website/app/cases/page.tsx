import { spotlightStory } from '@/lib/content/home-sections'
import { Section, SectionTitle } from '@/components/layout/section'

const cases = [
  {
    title: '溪河案例',
    summary:
      '跨境资产结构梳理与传承路径设计，在合规框架下实现家族顶层架构落地。',
    metrics: ['周期：12 个月', '覆盖：内地 + 香港'],
  },
  {
    title: '二代接班规划',
    summary: '通过教育 + 财富双螺旋，建立可执行的代际沟通与决策机制。',
    metrics: ['工坊：6 期', '参与：核心家族 4 人'],
  },
] as const

export default function CasesPage() {
  return (
    <Section className="pt-24" aria-labelledby="cases-title">
      <SectionTitle id="cases-title">案例</SectionTitle>
      <p className="mt-3 text-lg text-zinc-600">溪河案例</p>

      <article className="mt-10 rounded-xl border border-zinc-900 bg-zinc-50 p-8">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-500">
          精选
        </p>
        <blockquote className="mt-4 text-lg leading-relaxed text-zinc-800">
          「{spotlightStory.quote}」
        </blockquote>
        <p className="mt-4 font-semibold">{spotlightStory.name}</p>
        <p className="text-sm text-zinc-500">{spotlightStory.subtitle}</p>
      </article>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {cases.map((item) => (
          <article
            key={item.title}
            className="rounded-xl border border-zinc-200 bg-white p-6"
          >
            <h3 className="text-lg font-semibold text-zinc-900">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {item.summary}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {item.metrics.map((m) => (
                <li
                  key={m}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-600"
                >
                  {m}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  )
}
