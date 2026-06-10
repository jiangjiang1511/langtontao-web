import { casesPageMeta } from '@/lib/content/cases'

export {
  caseStories,
  casesPageMeta,
  getAdjacentCaseStories,
  getCaseStory,
} from '@/lib/content/cases'
export type { CaseStory } from '@/lib/content/cases'

export const cases2Hero = {
  eyebrow: 'Case Lab · 050',
  titleLines: ['拆解50个', '高净值家庭财险配资方案'] as const,
  lead: casesPageMeta.lead,
} as const

export const cases2IndexMeta = {
  eyebrow: '拆解片段 · 04 / 050',
  title: '已公开案例',
  lead: '从保单结构、风险敞口与配资逻辑出发，呈现可复用的风控经验。',
} as const
