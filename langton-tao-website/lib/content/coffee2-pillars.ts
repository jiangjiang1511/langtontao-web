export type Coffee2PillarId = 'community' | 'reading' | 'events'

export type Coffee2PillarCard = {
  id: Coffee2PillarId
  number: string
  title: string
  description: string
  href: string
  accent: string
  backgroundSrc: string
}

export const coffee2PillarsMeta = {
  eyebrow: '社群 · 读书 · 活动',
  title: '三条认知路径',
} as const

export const coffee2PillarCards: readonly Coffee2PillarCard[] = [
  {
    id: 'community',
    number: '01',
    title: '社群',
    description:
      '这不是普通的会员社群，而是一个深度链接全球同频家庭、改变传承轨迹的联合体。',
    href: '#coffee2-manifesto-gallery',
    accent: '#09090b',
    backgroundSrc: '/assets/bearbitcoffee/pillars/community.jpg',
  },
  {
    id: 'reading',
    number: '02',
    title: '读书',
    description:
      '开启人生认知定投——为家庭与社群夯实同频的认知底层，在五件人生大事上建立共通语言。',
    href: '#reading',
    accent: '#ffe600',
    backgroundSrc: '/assets/bearbitcoffee/pillars/reading.jpg',
  },
  {
    id: 'events',
    number: '03',
    title: '活动',
    description:
      '具身认知定投——沙龙、徒步、游学与私董会，在真实场域里把默会知识练成家庭与社群可同频的共同体技艺。',
    href: '#millionaire-plan',
    accent: '#71717a',
    backgroundSrc: '/assets/bearbitcoffee/pillars/event.jpg',
  },
] as const
