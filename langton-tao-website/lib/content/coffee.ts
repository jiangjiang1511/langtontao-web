export const coffeeSections = [
  {
    id: 'invest',
    title: '投资',
    items: ['房屋置换', '私募量化'],
  },
  {
    id: 'preservation',
    title: '保全',
    items: [
      '总纲：什么是保险',
      '总纲：如何理解保险',
      '总纲：为什么要配置保险',
    ],
    insurers: [
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
  {
    id: 'debt',
    title: '化债',
    placeholder: '内容待补充',
  },
  {
    id: 'legacy',
    title: '传承',
    placeholder: '内容待补充',
  },
  {
    id: 'tax-crs',
    title: '税务 CRS',
    note: '林',
    placeholder: '内容待补充',
  },
  {
    id: 'identity',
    title: '身份规划',
    note: '普惠国际',
    placeholder: '内容待补充',
  },
  {
    id: 'network',
    title: '一体双跨',
    items: ['比元', 'ZUU'],
    highlight: 'ZUU',
  },
] as const
