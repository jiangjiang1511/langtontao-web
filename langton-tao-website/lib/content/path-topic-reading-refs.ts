import type { NarrativeReadingRef } from '@/lib/content/narrative-bubble'

export const day1BubbleReadings: Record<string, NarrativeReadingRef[]> = {
  english: [
    {
      id: 'day1-english-munger-reading',
      title: '芒格：聪明人没有不每天阅读的',
      outlet: '穷查理宝典',
    },
    {
      id: 'day1-english-buffett-letters',
      title: '巴菲特股东信：商业英语大师课',
      outlet: 'Berkshire',
    },
  ],
  'invest-self': [
    {
      id: 'day1-invest-self-munger-worthy',
      title: '先让自己配得上你想要的',
      outlet: '芒格语录',
    },
    {
      id: 'day1-invest-self-human-capital',
      title: '人力资本：最被低估的资产',
      outlet: '第一财经',
    },
  ],
  'scientific-decision': [
    {
      id: 'day1-decision-munger-psychology',
      title: '人类误判心理学清单',
      outlet: '穷查理宝典',
    },
    {
      id: 'day1-decision-bayesian',
      title: '贝叶斯更新与概率思维',
      outlet: '霍华德·马克斯',
    },
  ],
  'all-in-here': [
    {
      id: 'day1-allin-opportunity',
      title: '创富是抓住一次机遇的能力',
      outlet: '诚实投资学',
    },
    {
      id: 'day1-allin-concentration',
      title: '机会来临时要敢于集中',
      outlet: '芒格',
    },
  ],
  'compound-unit': [
    {
      id: 'day1-compound-unit-munger',
      title: '复利第一原则：勿中断',
      outlet: '芒格语录',
    },
    {
      id: 'day1-compound-unit-habit',
      title: '习惯与系统：让储蓄自动化',
      outlet: 'Morgan Housel',
    },
  ],
  'compound-effect': [
    {
      id: 'day1-compound-lilu-modernization',
      title: '李录：现代化与知识复利',
      outlet: '李录 · 公众号',
    },
    {
      id: 'day1-compound-snowball',
      title: '滚雪球：巴菲特的财富曲线',
      outlet: 'Berkshire',
    },
  ],
  'leverage-debt': [
    {
      id: 'day1-leverage-crisis-buy',
      title: '危机抄底：负债作为占位工具',
      outlet: '诚实投资学',
    },
    {
      id: 'day1-leverage-munger-debt',
      title: '以更少的钱、更优的条款借',
      outlet: '芒格',
    },
  ],
  'value-investing': [
    {
      id: 'day1-value-buffett-owner',
      title: '把股票当成一门生意',
      outlet: '巴菲特股东信',
    },
    {
      id: 'day1-value-lilu-purchasing',
      title: '投资的本质是增长购买力',
      outlet: '李录演讲',
    },
  ],
  'survival-layer': [
    {
      id: 'day1-survival-labor-value',
      title: '劳动创造价值：第一天的底线',
      outlet: '朗敦道',
    },
    {
      id: 'day1-survival-side-hustle',
      title: '边劳动边试错：双轨现金流',
      outlet: '网易财经',
    },
  ],
  'trial-layer': [
    {
      id: 'day1-trial-optionality',
      title: '塔勒布：选择权与有限损失',
      outlet: '反脆弱',
    },
    {
      id: 'day1-trial-antifragile',
      title: '反脆弱：从波动中受益',
      outlet: '塔勒布',
    },
  ],
  'leverage-layer': [
    {
      id: 'day1-leverage-good-debt',
      title: '好债务与坏债务',
      outlet: '富爸爸',
    },
    {
      id: 'day1-leverage-margin',
      title: '保证金与强制平仓',
      outlet: '证券时报',
    },
  ],
  'survivorship-bias': [
    {
      id: 'day1-survivorship-taleb',
      title: '幸存者偏差：我们只看见赢家',
      outlet: '塔勒布',
    },
    {
      id: 'day1-survivorship-base-rates',
      title: '基础比率：别被故事骗',
      outlet: '卡尼曼',
    },
  ],
  'cut-fake-diligence': [
    {
      id: 'day1-diligence-busy-trap',
      title: '忙碌的陷阱',
      outlet: '朗敦道',
    },
    {
      id: 'day1-diligence-munger-stupid',
      title: '蠢错误清单',
      outlet: '芒格',
    },
  ],
}

export const day2SubsectionReadings: Record<string, NarrativeReadingRef[]> = {
  'global-wealth': [
    {
      id: 'day2-global-m2',
      title: '全球货币与 M2',
      outlet: '第一财经',
    },
    {
      id: 'day2-global-liquidity',
      title: '全球流动性周期',
      outlet: '霍华德·马克斯',
    },
  ],
  'purchasing-power': [
    {
      id: 'day2-purchasing-inflation',
      title: '通胀与购买力',
      outlet: '美联储',
    },
    {
      id: 'day2-purchasing-real-return',
      title: '实际回报率',
      outlet: '晨星',
    },
  ],
  'cash-flow': [
    {
      id: 'day2-cashflow-buffett',
      title: '现金流是商业的语言',
      outlet: '巴菲特股东信',
    },
    {
      id: 'day2-cashflow-dividend',
      title: '股息与租金入门',
      outlet: '诚实投资学',
    },
  ],
  growth: [
    {
      id: 'day2-growth-lilu',
      title: '参与现代化复利',
      outlet: '李录',
    },
    {
      id: 'day2-growth-index',
      title: '指数化与长期增长',
      outlet: '约翰·博格',
    },
  ],
  preservation: [
    {
      id: 'day2-preservation-insurance',
      title: '保险作为压舱石',
      outlet: '朗敦道',
    },
    {
      id: 'day2-preservation-trust',
      title: '家族信托案例',
      outlet: '界面新闻',
    },
  ],
  'risk-isolation': [
    {
      id: 'day2-isolation-structure',
      title: '风险隔离与防火墙',
      outlet: 'CFWIA',
    },
    {
      id: 'day2-isolation-firewall',
      title: '资产保全与债务牵连',
      outlet: '网易财经',
    },
  ],
  'circle-decision': [
    {
      id: 'day2-circle-buffett',
      title: '能力圈：知道边界',
      outlet: '巴菲特',
    },
    {
      id: 'day2-circle-marks',
      title: '第二层次思维',
      outlet: '霍华德·马克斯',
    },
  ],
  'inverse-thinking': [
    {
      id: 'day2-inverse-munger',
      title: '反过来想',
      outlet: '芒格',
    },
    {
      id: 'day2-inverse-contrarian',
      title: '逆向投资与群众心理',
      outlet: '霍华德·马克斯',
    },
  ],
}

export const day2BubbleReadings: Record<string, NarrativeReadingRef[]> = {
  'what-is-debt': [
    {
      id: 'day2-debt-good-bad',
      title: '卸掉投机性杠杆',
      outlet: '朗敦道 · 化债',
    },
    {
      id: 'day2-debt-deleverage',
      title: '去杠杆周期中的策略',
      outlet: '霍华德·马克斯',
    },
  ],
}
