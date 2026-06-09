import { CaseStoryCard } from '@/components/sections/cases/case-story-card'
import { Eyebrow, SectionSurface } from '@/components/layout/section-surface'
import { caseStories } from '@/lib/content/cases'

export function CaseStoryIndex() {
  return (
    <SectionSurface theme="paper" aria-labelledby="cases-grid-heading">
      <p id="cases-grid-heading" className="sr-only">
        拆解片段列表
      </p>
      <Eyebrow>拆解片段 · 04 / 050</Eyebrow>
      <p className="mt-4 max-w-2xl text-sm font-bold leading-relaxed text-[color:var(--section-muted)] md:text-base">
        每个案例聚焦一类典型配资误区：从保单结构、跨境边界、受益安排到流动性压力，帮你看懂「配置满」与「配得对」之间的距离。
      </p>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:gap-10">
        {caseStories.map((story) => (
          <CaseStoryCard key={story.slug} story={story} />
        ))}
      </div>
    </SectionSurface>
  )
}
