import { homeJarsyHero } from '@/lib/content/home-jarsy-page'

export const taoFiftyYearTimelineMeta = {
  eyebrow: 'TAO Path · 路径总览',
  title: homeJarsyHero.subtitle,
  lead: '沿时间轴进入从第一天到一百年的九段 TAO 旅程。下方的事业周期图，是「第一天」的微观镜像——孕育、盛年与老化的节律一览。',
} as const

export function summarizeStageBody(body: string | null | undefined, maxLength = 48): string {
  if (!body) return ''
  const firstSentence = body.split(/[。！？\n]/)[0]?.trim() ?? body
  if (firstSentence.length <= maxLength) return firstSentence
  return `${firstSentence.slice(0, maxLength).trim()}…`
}
