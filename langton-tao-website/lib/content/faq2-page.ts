import { architectureFaqs } from '@/lib/content/faq-page'
import { membershipFaqs } from '@/lib/content/faq-membership'
import { faqItems } from '@/lib/content/home-sections'

export type Faq2Item = {
  id: string
  question: string
  answer: string
}

export type Faq2Category = {
  id: string
  label: string
  eyebrow: string
  summary: string
  items: Faq2Item[]
}

function withIds(
  items: readonly { question: string; answer: string }[],
  prefix: string
): Faq2Item[] {
  return items.map((item, index) => ({
    id: `${prefix}-${index + 1}`,
    question: item.question,
    answer: item.answer,
  }))
}

export const faq2Hero = {
  eyebrow: 'FAQ',
  titleLines: ['以提问', '同频财富理解'] as const,
  lead: '架构、会员与服务——朗敦道核心问题的诚实回答，按主题瀑布展开。',
} as const

export const faq2Categories: Faq2Category[] = [
  {
    id: 'architecture',
    label: '架构与 TAO',
    eyebrow: 'Architecture · TAO',
    summary: 'TAO 定律、家办、传承与风险敞口——理解朗敦道百年路径框架。',
    items: withIds(architectureFaqs, 'arch'),
  },
  {
    id: 'membership',
    label: '会员',
    eyebrow: 'Membership',
    summary: '会员价值、档位递进、财富体检与私董会——进入生态前的关键问答。',
    items: withIds(membershipFaqs, 'member'),
  },
  {
    id: 'service',
    label: '服务',
    eyebrow: 'Service',
    summary: '与传统家办差异、成立/加入家办、港陆协同——服务边界与交付方式。',
    items: withIds(faqItems, 'service'),
  },
]

export const faq2Contact = {
  title: '还有疑问？',
  lead: '预约咨询，与朗敦道团队一对一沟通您的家庭阶段与需求。',
  ctaLabel: '预约咨询',
} as const
