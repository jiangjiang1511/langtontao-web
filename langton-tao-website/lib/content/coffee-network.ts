export const coffeeNetworkMeta = {
  eyebrow: 'Global Network',
  subtitle: '「一体双跨」的全球战略合作伙伴网络',
  definition:
    '一体：同一套家族传承目标、Family OS 与教育 × 财富双螺旋。双跨：跨地域（内地中枢 + 香港交付）与跨领域（教育 × 财富）。',
} as const

export type CoffeeNetworkPartner = {
  id: string
  title: string
  summary: string
  featured?: boolean
}

export type CoffeeNetworkHub = {
  id: 'mainland' | 'hongkong'
  label: string
  title: string
  badge?: string
  summary: string
  bullets: string[]
  partners?: CoffeeNetworkPartner[]
}

export const coffeeNetworkHubs: CoffeeNetworkHub[] = [
  {
    id: 'mainland',
    label: '内地',
    title: '国内的大脑与架构中枢',
    summary: '全面负责顶层规划，更深度链接丰沛的稀缺资源矩阵：',
    bullets: [
      '顶层规划',
      '游学（博睿学者）',
      '商学院（CXO）',
      '教育（北美芝仕留学）',
      '北美投资（以诺财富）',
      '律所 / 税务 / 会计',
    ],
  },
  {
    id: 'hongkong',
    label: '香港',
    title: '比元家族办公室 BE ONE',
    badge: '香港前三的家族办公室',
    summary:
      '总部位于香港，专注家族财富传承的顶层设计与全球化资产配置。在多牌照合规框架下，为高净值家庭提供稳健且具国际前瞻性的传承方案。',
    bullets: [
      '1/4/9 全金融牌照',
      '两处香港一线海景职场',
      '多维业务合作伙伴',
    ],
    partners: [
      {
        id: 'zuu',
        title: '资遇资管 ZUU',
        summary:
          '300+ 持牌港险经纪公司，支撑保险与资管配置——与上方「保全」板块的保险议题形成一体双跨交付闭环。',
        featured: true,
      },
      {
        id: 'puhui',
        title: '普晖国际',
        summary: '国际教育 / 身份规划',
      },
    ],
  },
]
