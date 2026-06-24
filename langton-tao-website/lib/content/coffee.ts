export type CoffeeInsuranceIntroItem = {
  id: string
  title: string
  summary: string
}

export type CoffeeInsuranceIntroBlock = {
  type: 'insuranceIntro'
  items: CoffeeInsuranceIntroItem[]
}

export type CoffeeInsurersBlock = {
  type: 'insurers'
  title: string
  names: string[]
}

export type CoffeeItemsBlock = {
  type: 'items'
  items: string[]
}

export type CoffeePlaceholderBlock = {
  type: 'placeholder'
  text: string
}

export type CoffeeSubTopicBlock = {
  type: 'subTopic'
  id: string
  title: string
  note?: string
  placeholder: string
}

export type CoffeeHighlightBlock = {
  type: 'highlight'
  id: string
  title: string
  subtitle?: string
  placeholder?: string
}

export type CoffeeNetworkLayoutBlock = {
  type: 'networkLayout'
}

export type CoffeeBlock =
  | CoffeeInsuranceIntroBlock
  | CoffeeInsurersBlock
  | CoffeeItemsBlock
  | CoffeePlaceholderBlock
  | CoffeeSubTopicBlock
  | CoffeeHighlightBlock
  | CoffeeNetworkLayoutBlock

export type CoffeeWaterfallSection = {
  id: string
  title: string
  blocks: CoffeeBlock[]
}

export const coffeeWaterfallSections: CoffeeWaterfallSection[] = [
  {
    id: 'invest',
    title: '投资',
    blocks: [],
  },
  {
    id: 'preservation',
    title: '保全',
    blocks: [
      {
        type: 'insuranceIntro',
        items: [
          {
            id: 'insurance-what',
            title: '什么是保险',
            summary:
              '风险转移与契约承诺——把不确定损失，换成可计算的敞口管理。',
          },
          {
            id: 'insurance-how',
            title: '如何理解保险',
            summary:
              '读懂条款、精算与执行——别被销售话术带走，回到工具理性。',
          },
          {
            id: 'insurance-why',
            title: '为什么要配置保险',
            summary:
              '在极端斯坦里，为现金流与家庭责任留一道确定性防火墙。',
          },
        ],
      },
      {
        type: 'insurers',
        title: '公司',
        names: [
          '富卫',
          '永明',
          '友邦',
          '安盛',
          '万通',
          '保诚',
          '太平',
          '立桥',
          '慕尼黑',
          '……',
        ],
      },
    ],
  },
  {
    id: 'debt',
    title: '化债',
    blocks: [],
  },
  {
    id: 'legacy',
    title: '传承',
    blocks: [
      {
        type: 'subTopic',
        id: 'tax-crs',
        title: '税务 CRS',
        note: '林',
        placeholder: '内容待补充',
      },
      {
        type: 'subTopic',
        id: 'identity',
        title: '身份规划',
        note: '普晖国际',
        placeholder: '内容待补充',
      },
    ],
  },
  {
    id: 'network',
    title: '一体双跨',
    blocks: [{ type: 'networkLayout' }],
  },
]
