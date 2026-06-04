'use client'

import { Calendar, Building2, Shield, PieChart } from 'lucide-react'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { ScrollReveal } from '@/components/scroll-reveal'

const features = [
  {
    icon: Calendar,
    title: '第二天的人生大事',
    description: '关注家庭资产配置、教育/人生认知、二代传承',
  },
  {
    icon: Building2,
    title: '业务涉及行业',
    description: '跨境投资、教育、法税、保险、游学与商学院',
  },
  {
    icon: Shield,
    title: '家庭敞口',
    description: '系统化识别与管理家庭资产负债表风险',
  },
  {
    icon: PieChart,
    title: '家庭资产',
    description: '跨周期、跨币种的资产配置与传承架构',
  },
]

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionEyebrow>我们是什么</SectionEyebrow>
          <h2
            id="about-heading"
            className="font-serif text-[26px] font-semibold text-foreground md:text-[40px]"
          >
            新型联合家族办公室（MFO）
          </h2>
          <p className="mt-4 max-w-[640px] text-[15px] leading-[1.7] text-muted-foreground md:text-[17px]">
            为第二代华人财富传承提供系统解决方案，集结投资人、法税专家与战略先行者。
          </p>
        </ScrollReveal>

        {/* Feature tiles */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 0.1}>
              <div className="flex min-h-[160px] flex-col rounded-2xl border border-border bg-card p-5 transition-shadow duration-200 hover:shadow-md">
                <feature.icon className="h-8 w-8 text-accent" aria-hidden="true" />
                <h3 className="mt-4 text-[18px] font-semibold text-foreground md:text-[20px]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
