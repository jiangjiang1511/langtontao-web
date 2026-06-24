export type DebtArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type DebtTopicArticleContent = {
  id: string
  headline: string
  outlet: string
  publishedAt?: string
  sourceUrl: string
  lead?: string
  blocks: readonly DebtArticleBlock[]
}

export const debtTopicArticles: readonly DebtTopicArticleContent[] = [
  {
    id: 'story-mortgage-cycle',
    headline: '被「房贷倒挂」笼罩的深圳业主，还不起又不敢断供！',
    outlet: '深圳房地产信息网',
    publishedAt: '2024',
    sourceUrl: 'http://news.szhome.com/392495.html',
    lead: '房价下跌后，不少家庭第一次直面「欠银行的钱比房子市值还多」。',
    blocks: [
      {
        type: 'image',
        src: '/assets/debt-articles/story-mortgage-cycle/article-cover.jpg',
        alt: '深圳业主微信群：愿无偿赠房、接手者只需继续还贷',
        caption: '摘自深圳房地产信息网报道配图：业主愿「赠房」、只求接手月供。',
      },
      {
        type: 'paragraph',
        text: '近一两年，「房贷倒挂」成为热点：你欠银行的本息合计，比房子当前市价还高。即便把房卖掉，仍可能倒欠银行一笔钱。',
      },
      {
        type: 'paragraph',
        text: '媒体报道中，有深圳业主 2020 年高位购入学区房，首付约 200 万，剩余贷款本息合计 650 余万；而同类房源市价已跌至约 360 万。每月数万元月供与资产缩水叠加，压力集中在整个家庭现金流上。',
      },
      {
        type: 'paragraph',
        text: '更棘手的是心理与选择：自住房家庭往往「还不起又不敢断供」——断供意味着征信受损、法拍风险与周边房价进一步承压。银行虽推出缓期等安排，但合同义务并未因房价下跌而自动减少。',
      },
      {
        type: 'paragraph',
        text: '这类案例提醒我们：房贷不只是「还得起月供」，还要对齐「若房价继续调整，家庭净资产与现金流能否扛住」。',
      },
    ],
  },
  {
    id: 'story-guarantee-trap',
    headline: '司法解释可否加一条：企业破产避免夫妻连带责任',
    outlet: '财新网',
    publishedAt: '2023',
    sourceUrl: 'https://wuxiaobo.blog.caixin.com/archives/283667',
    lead: '企业贷款常要求股东夫妻连带担保——有限责任公司在关键时刻变成无限责任。',
    blocks: [
      {
        type: 'image',
        src: '/assets/debt-articles/story-guarantee-trap/cover.webp',
        alt: '家庭与担保关系示意图',
        caption: '为亲友或企业签字担保，法律上等同于自己的债务。',
      },
      {
        type: 'paragraph',
        text: '制造业企业主为扩产需要 500 万元资金，银行往往要求大股东及配偶签署个人连带担保。对公司是有限责任，对家庭却可能是「全部财产偿债」。',
      },
      {
        type: 'paragraph',
        text: '财新专栏指出：当有限责任公司进入破产清算，本应以出资为限承担责任；但一旦个人或夫妻担保合同生效，有限责任就可能变成无限责任——企业资不抵债时，家庭资产一并卷入。',
      },
      {
        type: 'paragraph',
        text: '帮亲戚担保亦同此理：担保不是「走个形式」，而是把对方的还款义务绑在自己名下。债务或许可以重组转移，信任与家庭关系却很难补票。',
      },
      {
        type: 'paragraph',
        text: '讨论焦点在于：能否通过个人破产、债务清理等制度，为善意经营但受连带担保困扰的家庭留出修复空间——这也是许多企业主家庭在化债前先要问清的风险边界。',
      },
    ],
  },
  {
    id: 'story-business-cashflow',
    headline: '10万亿经营贷兜不住了！违规挪用的后果，贷款者一个都跑不掉',
    outlet: '网易财经',
    sourceUrl: 'https://www.163.com/dy/article/KVS7PJNN0556CE4K.html',
    lead: '经营贷本意是给小微企业周转，挪去还贷、购房则会变成家庭账本上的隐形雷。',
    blocks: [
      {
        type: 'image',
        src: '/assets/debt-articles/story-business-cashflow/article-cover.jpg',
        alt: '经营贷置换房贷流程与规模增长示意图',
        caption: '摘自网易财经报道配图：经营贷增长与「置换房贷」灰色操作链条。',
      },
      {
        type: 'paragraph',
        text: '经营贷应服务于进货、付租、发工资等经营性周转。现实中，不少人把它当作「低息工具」：拿去置换房贷、填补消费，或在家企不分的情况下直接补贴家用。',
      },
      {
        type: 'paragraph',
        text: '监管罚单与法院判决反复说明：一旦发现挪用，银行有权要求提前收回全部贷款本息。广州中院曾支持银行对挪用 180 万元经营贷偿还房贷的借款人提前收贷。',
      },
      {
        type: 'paragraph',
        text: '经营贷还有期限错配：房贷可贷二三十年，经营贷往往几年需续贷一次。前期只还利息、到期还本的设计，在续贷失败时会瞬间变成家庭现金流冲击。',
      },
      {
        type: 'paragraph',
        text: '对企业主家庭而言，化债前先分清：哪些负债绑在生意上、哪些已经渗进家庭日常。续贷失败时，压力通常不会只停在公司账户里。',
      },
    ],
  },
  {
    id: 'story-education-advance',
    headline: '中产家庭晒账单：教育支出猛降40%，中产终于不再「焦虑跟风」',
    outlet: '网易',
    sourceUrl: 'https://www.163.com/dy/article/KNEUFOE205564PRP.html',
    lead: '教育账单下降的背后，是家庭重新计算「安全垫还剩多少」。',
    blocks: [
      {
        type: 'image',
        src: '/assets/debt-articles/story-education-advance/cover.jpg',
        alt: '教育与家庭支出示意图',
        caption: '教育支出与养老、应急储备常在同一本家庭账上竞争。',
      },
      {
        type: 'paragraph',
        text: '有家庭晒出教育支出对比：从一年约 36 万降至 21.5 万，降幅约 40%。变化不在「少花一点」，而是主动从国际学校、全覆盖辅导，转向公办为主、只补核心科目。',
      },
      {
        type: 'paragraph',
        text: '报道中的财务推演很直观：在「极致内卷」模式下，十年教育花费可高达 80 万，养老储备被大幅挤压；若改为平衡策略，十年可控制在约 40 万，并保留养老储蓄空间。',
      },
      {
        type: 'paragraph',
        text: '越来越多家长开始算「教育金缺口」：按通胀估算未来学费，再对照现有定投能否覆盖。若缺口靠透支信用卡、消费贷或动用应急资金填补，本质上是一笔未命名的债。',
      },
      {
        type: 'paragraph',
        text: '教育是否值得投入没有标准答案，但家庭需要诚实回答：今天的教育账单，有没有在动明天的安全垫？',
      },
    ],
  },
  {
    id: 'story-restructure',
    headline: '求是网罕见喊话「修复居民资产负债表」，这次事情可能真有些不一样了！',
    outlet: '网易财经',
    sourceUrl: 'https://www.163.com/dy/article/L00036GQ05568W0A.html',
    lead: '宏观上的「修复资产负债表」，落到家庭就是：资产缩水后，怎么跟家人一起重排规则。',
    blocks: [
      {
        type: 'image',
        src: '/assets/debt-articles/story-restructure/cover.jpg',
        alt: '家庭资产负债表示意图',
        caption: '资产端缩水时，负债端往往不会自动减轻。',
      },
      {
        type: 'paragraph',
        text: '《求是》相关讨论指出，部分居民在就业与收入承压、房产贬值预期下，消费意愿受限——需要加快修复居民资产负债表、稳定房地产市场预期。',
      },
      {
        type: 'paragraph',
        text: '数据层面，居民部门近年出现自发「缩表」：提前还贷增多、新增贷款走弱，存款意愿上升。这不是单靠刺激借贷就能扭转的，而是家庭在主动调整负债与储蓄。',
      },
      {
        type: 'paragraph',
        text: '对普通家庭而言，「资产重组」不一定是企业式破产重组，而可能是：卖资产、换贷、削减非刚性支出、重新约定谁掌握财务信息、谁有权拍板大额支出。',
      },
      {
        type: 'paragraph',
        text: '化债之后对话变多，往往因为规则需要重建——终点不只是数字归零，而是家人对「接下来怎么活、怎么花」形成新的共识。',
      },
    ],
  },
  {
    id: 'story-silent-debt',
    headline: '丈夫欠钱妻子还？最高院发话了：这些情况可以不还',
    outlet: '36氪',
    publishedAt: '2018',
    sourceUrl: 'https://m.36kr.com/p/1722196328449',
    lead: '「从来不开口谈债」的家庭，常在纠纷爆发时才第一次对齐口径。',
    blocks: [
      {
        type: 'image',
        src: '/assets/debt-articles/story-silent-debt/cover.jpg',
        alt: '夫妻与家庭债务沟通示意图',
        caption: '债务是否属于夫妻共同债务，取决于签字、用途与是否用于家庭日常生活。',
      },
      {
        type: 'paragraph',
        text: '最高人民法院明确：夫妻双方共同签字或一方事后追认的债务，属于夫妻共同债务；一方为家庭日常生活需要所负的债务，亦属共同债务。',
      },
      {
        type: 'paragraph',
        text: '反之，一方超出家庭日常生活需要所负的大额债务，原则上不属于夫妻共同债务——除非债权人能证明用于夫妻共同生活、共同生产经营或基于双方共同意思表示。',
      },
      {
        type: 'paragraph',
        text: '律师解读指出：这一规则有助于区分「家庭债务」与「个人债务」，减少配偶在不知情情况下「被负债」。但若家庭长期不谈谁欠了什么，执行层仍可能在纠纷中全面承压。',
      },
      {
        type: 'paragraph',
        text: '沉默有时是保护，有时把风险留给最后知道的那个人。谈债不必审问家人，但口径不一的账本，会让任何化债安排在执行时变形。',
      },
    ],
  },
]

export function getDebtTopicArticle(id: string) {
  return debtTopicArticles.find((article) => article.id === id)
}
