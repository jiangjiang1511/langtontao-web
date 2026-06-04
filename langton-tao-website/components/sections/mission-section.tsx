'use client'

import { SectionEyebrow } from '@/components/section-eyebrow'
import { ScrollReveal } from '@/components/scroll-reveal'

const values = [
  {
    title: '使命',
    description: '让二代华人家族在不确定时代拥有可执行的传承系统',
  },
  {
    title: '愿景',
    description: '成为中国最具影响力的联合家族办公室生态',
  },
  {
    title: '价值观',
    description: '合规 · 同频 · 具身 · 长期主义',
  },
]

export function MissionSection() {
  return (
    <section
      id="mission"
      className="py-16 md:py-24"
      aria-labelledby="mission-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {/* Left: Text content */}
          <ScrollReveal>
            <SectionEyebrow>使命 · 愿景 · 价值观</SectionEyebrow>
            <h2
              id="mission-heading"
              className="font-serif text-[26px] font-semibold text-foreground md:text-[40px]"
            >
              提前思考十年后的路
            </h2>
            <p className="mt-6 text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
              朗敦道不是通往财富的街，而是陪你提前思考十年后的路——普通人的诚实投资学与人生认知定投计划，绝非咨询服务，而是具身认知的陪跑。
            </p>
          </ScrollReveal>

          {/* Right: Value cards */}
          <div className="flex flex-col gap-4">
            {values.map((value, index) => (
              <ScrollReveal key={value.title} delay={index * 0.1}>
                <div className="h-[120px] rounded-2xl border border-border bg-card p-5 transition-shadow duration-200 hover:shadow-md">
                  <h3 className="text-[18px] font-semibold text-foreground md:text-[20px]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
