import { networkSynergy, networkTeaser } from '@/lib/content/network-page'

export type LangtontaoYitishuangkuaCta =
  | { label: string; comingSoon: true }
  | { label: string; href: string }

export const langtontaoHongKongMeta = {
  eyebrow: '何为香港',
  title: '何为香港',
  lead: '香港是现代信用的历史火种——契约与法治的底座，华人家庭接入全球系统的物理契约锚点。',
} as const

export const langtontaoHongKongNarrative = {
  title: '何谓香港？',
  body: '若只把香港理解为「开户的地方」，就低估了它在华人家族传承中的位置。香港提供普通法、资本市场、银行与信托环境、监管规则，以及律师、券商、基金与国际投资者构成的专业服务网络。信用积累极慢、毁损极快；它是历史赠予华人家庭的防火墙与金融胚胎。',
  advantages: [
    {
      id: 'legal',
      title: '法治与契约',
      body: '普通法体系与可执行的监管规则，让跨时空的信任得以制度承载。',
    },
    {
      id: 'market',
      title: '资本市场接口',
      body: '连接零散资产成系统，连接当下资金与未来企业成长。',
    },
    {
      id: 'network',
      title: '专业服务网络',
      body: '律师、券商、基金与国际投资者构成跨境交付的基础能力。',
    },
    {
      id: 'license',
      title: '牌照与交付',
      body: '比元、资遇、普晖及 1/4/9 全金融牌照，承接保险、资管与身份规划的实际落地。',
    },
  ],
} as const

export const langtontaoYitishuangkua = {
  eyebrow: networkTeaser.eyebrow,
  title: networkTeaser.title,
  subtitle: networkTeaser.subtitle,
  definition:
    '一体，是同一套家族传承目标、Family OS 与双螺旋业务版图；双跨，是跨地域（内地中枢 + 香港交付）与跨领域（教育 × 财富）。',
  mainland: networkTeaser.hubs[0],
  hongkong: networkTeaser.hubs[1],
  synergyTitle: networkSynergy.title,
  synergyBody: networkSynergy.body,
  deliveryMap: [
    { business: '财富大健康体检', node: '内地诊断 + 香港持牌产品交付' },
    { business: '保险与资管配置', node: '资遇资管 · 300+ 持牌港险经纪' },
    { business: '家办级协同', node: '比元家族办公室 BE ONE' },
    { business: '国际教育/身份', node: '普晖国际' },
  ],
  cta: {
    label: '香港全球资产配置沙龙报名',
    comingSoon: true,
  } satisfies LangtontaoYitishuangkuaCta,
} as const
