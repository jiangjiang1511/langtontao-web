'use client'

import { SectionEyebrow } from '@/components/section-eyebrow'
import { ScrollReveal } from '@/components/scroll-reveal'

const problems = [
  {
    title: '财富',
    subtitle: '解决财富的问题',
    bullets: ['宏观诊断', '资产配置', '风险问诊'],
  },
  {
    title: '关系',
    subtitle: '解决关系的问题',
    bullets: ['血缘关系', '法律关系'],
  },
  {
    title: '选择',
    subtitle: '解决选择的问题',
    bullets: ['足够的财商', '足够的认知', '家庭的同频'],
  },
]

export function ProblemsSection() {
  return (
    <section
      id="problems"
      className="py-16 md:py-24"
      aria-labelledby="problems-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionEyebrow>我们解决什么问题</SectionEyebrow>
          <h2
            id="problems-heading"
            className="font-serif text-[26px] font-semibold text-foreground md:text-[40px]"
          >
            财富 · 关系 · 选择
          </h2>
        </ScrollReveal>

        {/* Cards - horizontal scroll on mobile, grid on desktop */}
        <div className="-mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 md:grid md:grid-cols-3 md:overflow-visible">
          {problems.map((problem, index) => (
            <ScrollReveal
              key={problem.title}
              delay={index * 0.1}
              className="w-[85vw] flex-shrink-0 snap-center sm:w-auto"
            >
              <div className="h-full rounded-2xl border-l-4 border-accent bg-card p-6 md:p-8">
                <h3 className="text-[18px] font-semibold text-foreground md:text-[20px]">
                  {problem.subtitle}
                </h3>
                <ul className="mt-4 space-y-2">
                  {problem.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-[15px] text-muted-foreground md:text-[17px]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
