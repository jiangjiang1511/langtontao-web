import type { NarrativeBubble } from '@/lib/content/narrative-bubble'
import {
  day2BubbleReadings,
  day2SubsectionReadings,
} from '@/lib/content/path-topic-reading-refs'

export type DayTwoWhatSection = {
  id: 'what-is-day-two'
  title: '什么是第二天？'
  bubbles: NarrativeBubble[]
}

export type DayTwoCyclesSection = {
  id: 'what-is-cycle'
  title: '什么是周期？'
  bubbles: NarrativeBubble[]
}

export type DayTwoStep = {
  id: string
  title: string
  bubbles: NarrativeBubble[]
}

export type DayTwoSuperheroSection = {
  id: 'what-is-superhero'
  title: '什么是超级英雄？'
  steps: DayTwoStep[]
}

export type DayTwoSection =
  | DayTwoWhatSection
  | DayTwoCyclesSection
  | DayTwoSuperheroSection

export const dayTwoSuperheroCoverAssets = {
  'what-is-money': '/assets/100years/day2/day2-superhero-01.jpg',
  'global-wealth': '/assets/100years/day2/day2-superhero-01.jpg',
  'purchasing-power': '/assets/100years/day2/day2-superhero-02.jpg',
  'cash-flow': '/assets/100years/day2/day2-superhero-02.jpg',
  'what-is-asset': '/assets/100years/day2/day2-superhero-11.jpg',
  growth: '/assets/100years/day2/day2-superhero-11.jpg',
  preservation: '/assets/100years/day2/day2-superhero-12.jpg',
  'risk-isolation': '/assets/100years/day2/day2-superhero-13.jpg',
  'what-is-debt': '/assets/100years/day2/day2-superhero-21.jpg',
  'circle-of-competence': '/assets/100years/day2/day2-superhero-31.jpg',
  'circle-decision': '/assets/100years/day2/day2-superhero-31.jpg',
  'inverse-thinking': '/assets/100years/day2/day2-superhero-32.jpg',
} as const

export const dayTwoAccentMap: Record<string, string> = {
  'hero-awakening': '#ffe600',
  'day-two-clarity': '#6366f1',
  'build-alliance': '#22c55e',
  'cycle-theory': '#71717a',
  'cycle-history': '#ffe600',
  'present-cycle': '#0ea5e9',
  'what-is-money': '#f59e0b',
  'what-is-asset': '#22c55e',
  'what-is-debt': '#ef4444',
  'circle-of-competence': '#6366f1',
  'global-wealth': '#f59e0b',
  'purchasing-power': '#f59e0b',
  'cash-flow': '#f59e0b',
  growth: '#22c55e',
  preservation: '#22c55e',
  'risk-isolation': '#22c55e',
  'circle-decision': '#6366f1',
  'inverse-thinking': '#6366f1',
}

export const dayTwoNarrative = {
  theme: '成为超级英雄',
  opening: [
    '第一天，你在平均斯坦的泥泞中肉身撞墙，以试错期权撬开极端斯坦的大门，锻造出不可替代的超级个体；第二天，你站在财富积累的分水岭，以认知为铠甲，以周期为罗盘，正式觉醒为执掌家族命运的超级英雄。',
    '第一天拼的是敢冲敢闯的爆发力；第二天拼的是行稳致远的穿透力。所有关于财富的终极答案，都藏在第二天的认知里。',
  ],
  sections: [
    {
      id: 'what-is-day-two',
      title: '什么是第二天？',
      bubbles: [
        {
          id: 'hero-awakening',
          label: '英雄觉醒',
          hook: '现金流挣脱重力的那一刻，英雄正式觉醒',
          summary:
            '当稳定的现金流足以覆盖生存开支，当你不再需要靠出卖劳动换取温饱，你就正式跨过了第一天与第二天的边界。这绝非终点，而是一场更宏大征程的起点——你不再只为自己谋生，你将为整个家族掌舵。',
          body:
            '太多人误以为财富自由就是卸下铠甲、坐享其成，但真正的英雄觉醒，是看清了更大的责任与更远的征途。第一天你是自己的战士，第二天你是家族的守护者。你不再被生存焦虑驱赶，你将主动定义财富的生命周期与最终去向。',
        },
        {
          id: 'day-two-clarity',
          label: '第二天的了然',
          hook: '清醒自持，是第二天的生存底色',
          summary:
            '真正走进第二天的人，都拥有两份了然于心的定力，是穿越所有周期的底层心法。',
          subsections: [
            {
              title: '斯多葛式冷峻',
              paragraphs: [
                '你清晰划分可控与不可控的边界。市场涨跌、舆论风向、他人的财富增速，皆为不可控之事，不必为之内耗；而你的决策原则、风险底线、认知边界，是你完全可以掌控的主场。',
                '不被情绪裹挟，不被欲望牵引，在狂热中保持克制，在恐慌中保持坚定，这是比任何投资技巧都强大的力量。',
              ],
            },
            {
              title: '分布式系统',
              paragraphs: [
                '你深知单一赛道的脆弱，从不把所有筹码押注在同一块土地上。资产分布、地域分布、赛道分布，用多元结构对冲不确定性，让整个财富体系具备反脆弱性。',
                '哪怕局部遭遇冲击，整体盘面依然稳如磐石，不会因单点风险全盘崩塌。',
              ],
            },
          ],
        },
        {
          id: 'build-alliance',
          label: '建立联盟',
          hook: '独行快，众行远，英雄从不孤军奋战',
          summary:
            '第二天的征程，从来不是单打独斗。你需要链接各领域的专业者，搭建属于自己的财富联盟——在你擅长的领域里你做主，在你认知的边界外，有靠谱的盟友为你站岗。',
          href: '/network',
          body:
            '一个人的认知永远有边界，一个人的力量永远有上限。懂周期的经济学家、懂法律的信托专家、懂全球市场的投资人、懂资产保全的规划师——联盟不是依赖，是用他人的专业拓宽自己的能力半径，是用群体的智慧穿越漫长的周期。',
        },
      ],
    },
    {
      id: 'what-is-cycle',
      title: '什么是周期？',
      bubbles: [
        {
          id: 'cycle-theory',
          label: '周期理论',
          hook: '四层嵌套的潮汐，是财富运行的底层规律',
          summary:
            '经济从来不是一条平稳向上的直线，而是四套周期层层嵌套的潮汐运动，每一套周期都对应着不同的财富决策逻辑。霍华德·马克斯说：「周期永远不会消失，因为人性永远不会改变。」',
          subsections: [
            {
              title: '基钦周期（3–4 年）',
              paragraphs: [
                '由企业库存供需波动驱动的短周期，也叫库存周期。它决定着一年维度的波段机会与短期操作节奏，是价值投机的核心参考标尺。',
              ],
            },
            {
              title: '朱格拉周期（8–10 年）',
              paragraphs: [
                '由设备更新与产业投资驱动的中周期。它对应着产业更迭的浪潮，划定三年维度的投资主线与成长赛道，是价值投资的重要坐标。',
              ],
            },
            {
              title: '库兹涅茨周期（15–25 年）',
              paragraphs: [
                '由建筑与地产兴衰驱动的中长周期，也叫房地产周期。它锚定着不动产等长期资产的价格走势，是十年维度资产底盘的核心参考。',
              ],
            },
            {
              title: '康德拉季耶夫周期（50–60 年）',
              paragraphs: [
                '由技术革命驱动的长周期，也就是常说的康波。它决定着一代人的财富天花板与时代级机遇，是五十年维度家族布局的底层逻辑。',
              ],
            },
          ],
        },
        {
          id: 'cycle-history',
          label: '历史上的周期',
          hook: '太阳底下没有新鲜事，历史总在押韵',
          summary:
            '读懂四层周期，你就看懂了财富涨跌的底层密码。从工业革命到互联网泡沫，从康波萧条到技术革命——历史从不会简单重复，但总在押韵。',
          scrollTarget: 'coffee-cycles',
          scrollCtaLabel: '探索周期时间轴 ↓',
        },
        {
          id: 'present-cycle',
          label: '现在是什么周期',
          hook: '站在 2.5 文明的关口，身处丰裕社会的起点',
          summary:
            '我们正处在新旧周期的交界点，两个核心坐标定义了当下的时代方位。这是旧周期的尾声，也是新时代的序章。看懂这个坐标，才能选对下一条雪道。',
          subsections: [
            {
              title: '2.5 文明',
              paragraphs: [
                '我们正处于传统工业文明向 3.0 科技文明跃迁的过渡阶段。旧的增长动力在消退，以 AI、生物科技为核心的新一轮技术革命正在全面展开，知识的复利效应正在以前所未有的速度释放，下一条又湿又长的雪道正在铺就。',
              ],
            },
            {
              title: '丰裕社会',
              paragraphs: [
                '物质短缺的时代彻底结束，社会核心矛盾从「匮乏」转向「丰裕中的分配与意义」。资产的逻辑从「增量争夺」转向「存量保值 + 质量提升」，核心资产的稀缺性会持续凸显，财富分化的速度也会进一步加快。',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'what-is-superhero',
      title: '什么是超级英雄？',
      steps: [
        {
          id: 'step-money',
          title: '重新定义财富，才能真正驾驭财富',
          bubbles: [
            {
              id: 'what-is-money',
              label: '什么是钱',
              coverSrc: dayTwoSuperheroCoverAssets['what-is-money'],
              hook: '第一天的人看数字，第二天的超级英雄看透本质',
              summary:
                '李录说：「投资的本质，是保持并增长购买力。」读懂钱的本质，才不会被数字幻觉迷惑，才能守住真正的财富。',
              subsections: [
                {
                  id: 'global-wealth',
                  title: '全球财富总量',
                  coverSrc: dayTwoSuperheroCoverAssets['global-wealth'],
                  readings: day2SubsectionReadings['global-wealth'],
                  paragraphs: [
                    '钱不是孤立的纸面数字，是全球财富体系里的分配凭证，联动着全球市场的通胀、利率与汇率，牵一发而动全身。',
                  ],
                },
                {
                  id: 'purchasing-power',
                  title: '购买力',
                  coverSrc: dayTwoSuperheroCoverAssets['purchasing-power'],
                  readings: day2SubsectionReadings['purchasing-power'],
                  paragraphs: [
                    '钱的真正价值，是它能兑换多少商品、服务与资源。通胀会悄悄稀释名义财富，只有购买力才是真实的财富，守住购买力才是守住财富的根。',
                  ],
                },
                {
                  id: 'cash-flow',
                  title: '现金流',
                  coverSrc: dayTwoSuperheroCoverAssets['cash-flow'],
                  readings: day2SubsectionReadings['cash-flow'],
                  paragraphs: [
                    '钱的终极形态是现金流。一笔能持续产生正向现金流的资产，才是真正的财富；无法产生现金流的纸面富贵，不过是随时可能消散的泡沫。',
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'step-asset',
          title: '资产，是能把钱持续放进你口袋里的东西',
          bubbles: [
            {
              id: 'what-is-asset',
              label: '哪些是资产',
              coverSrc: dayTwoSuperheroCoverAssets['what-is-asset'],
              summary:
                '资产承载着三重核心价值：通过价值投资分享时代红利，作为家庭压舱石抵御周期波动，通过合规架构完成代际传承。',
              subsections: [
                {
                  id: 'growth',
                  title: '增长',
                  coverSrc: dayTwoSuperheroCoverAssets.growth,
                  readings: day2SubsectionReadings.growth,
                  paragraphs: [
                    '通过价值投资，分享企业成长与时代红利，实现财富的持续增值，让复利滚出更大的雪球。',
                  ],
                },
                {
                  id: 'preservation',
                  title: '保全',
                  coverSrc: dayTwoSuperheroCoverAssets.preservation,
                  readings: day2SubsectionReadings.preservation,
                  paragraphs: [
                    '作为家庭压舱石，通过风险隔离机制，抵御周期波动、意外风险与债务牵连，守住财富的基本盘，最终完成代际传承。',
                  ],
                },
                {
                  id: 'risk-isolation',
                  title: '风险隔离',
                  coverSrc: dayTwoSuperheroCoverAssets['risk-isolation'],
                  readings: day2SubsectionReadings['risk-isolation'],
                  paragraphs: [
                    '通过合规的架构设计，将个人资产与经营风险、债务风险做切割，任凭外界风雨，家族财富始终安如磐石。',
                  ],
                },
              ],
            },
          ],
        },
        {
          id: 'step-debt',
          title: '债务是把钱持续从你口袋里拿走的东西',
          bubbles: [
            {
              id: 'what-is-debt',
              label: '哪些是债务',
              coverSrc: dayTwoSuperheroCoverAssets['what-is-debt'],
              hook: '化债，是第二天的核心动作',
              summary:
                '第一天的债务可以是撬动机会的杠杆，第二天的债务却往往是拖垮财富的枷锁——卸掉投机性杠杆，清理高息负债，只保留极低风险的优质负债，让债务结构轻装上阵。',
              readings: day2BubbleReadings['what-is-debt'],
              body:
                '化债，是第二天的核心动作。只保留极低风险的优质负债，让债务结构轻装上阵，扛得住周期的冲击。第一天用负债提前占位，第二天用化债守住底盘——这是英雄与个体最本质的分野之一。',
            },
          ],
        },
        {
          id: 'step-competence',
          title: '圈内果断决策，圈外心怀敬畏',
          bubbles: [
            {
              id: 'circle-of-competence',
              label: '什么是能力圈',
              coverSrc: dayTwoSuperheroCoverAssets['circle-of-competence'],
              hook: '芒格一生践行的边界智慧',
              summary:
                '真正的超级英雄，从来不是无所不能，而是无比清醒地知道自己的边界。能力圈的大小不重要，知道边界在哪里，才最重要。',
              subsections: [
                {
                  id: 'circle-decision',
                  title: '圈内决策，圈外敬畏',
                  coverSrc: dayTwoSuperheroCoverAssets['circle-decision'],
                  readings: day2SubsectionReadings['circle-decision'],
                  paragraphs: [
                    '在你真正看懂、摸透的领域里，可以果断出击、重仓下注；在你认知之外的赛道上，哪怕诱惑再大、神话再多，也保持敬畏，不轻易入场。',
                  ],
                },
                {
                  id: 'inverse-thinking',
                  title: '逆向思维',
                  coverSrc: dayTwoSuperheroCoverAssets['inverse-thinking'],
                  readings: day2SubsectionReadings['inverse-thinking'],
                  paragraphs: [
                    '「反过来想，总是反过来想。」当所有人狂热时，反过来思考风险在哪里；当所有人恐慌时，反过来思考机会在哪里。所有超额收益，都来自逆人性的理性决策。',
                    '芒格说：「尽量别犯愚蠢的错误，而不是尽量表现得聪明。」守住能力圈，就是第二天最顶级的聪明。',
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ] satisfies DayTwoSection[],
  closing: [
    '看懂周期，守住能力圈，分清资产与负债，建好财富联盟——你就拥有了穿越周期的底气。',
    '从一年的波段机遇，到百年的永续传承，所有的远方，都始于第二天的每一步清醒抉择。',
  ],
} as const

export function getDayTwoWhatSection(): DayTwoWhatSection {
  return dayTwoNarrative.sections[0] as DayTwoWhatSection
}

export function getDayTwoCyclesSection(): DayTwoCyclesSection {
  return dayTwoNarrative.sections[1] as DayTwoCyclesSection
}

export function getDayTwoSuperheroSection(): DayTwoSuperheroSection {
  return dayTwoNarrative.sections[2] as DayTwoSuperheroSection
}
