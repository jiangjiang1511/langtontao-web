export type CoffeeInsuranceIntroBlock = {
  type: 'insuranceIntro'
  items: string[]
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
    blocks: [
      {
        type: 'items',
        items: ['房屋置换', '私募量化'],
      },
    ],
  },
  {
    id: 'preservation',
    title: '保全',
    blocks: [
      {
        type: 'insuranceIntro',
        items: ['什么是保险', '如何理解保险', '为什么要配置保险'],
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
    blocks: [{ type: 'placeholder', text: '内容待补充' }],
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
