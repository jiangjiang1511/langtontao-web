export type PathArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type PathTopicArticleContent = {
  id: string
  headline: string
  outlet: string
  publishedAt?: string
  sourceUrl: string
  lead?: string
  blocks: readonly PathArticleBlock[]
}

export const pathTopicArticles: readonly PathTopicArticleContent[] = [
  // —— Day 1 · Step 1 ——
  {
    id: 'day1-english-munger-reading',
    headline: '芒格：我这辈子遇到的聪明人没有不每天阅读的',
    outlet: '穷查理宝典 · 摘录',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '顶尖认知资源大多以英文存在；阅读是扩大能力圈最低成本的杠杆。',
    blocks: [
      {
        type: 'paragraph',
        text: '芒格反复强调：他所认识的聪明人，没有一个是不每天阅读的——一个都没有。沃伦（巴菲特）是活的书架，他自己也是。',
      },
      {
        type: 'paragraph',
        text: '英语不只是一种语言，更是一套思维系统：精确、直接、逻辑前置。全球最前沿的商业、投资与科技文献，绝大多数首先以英文发表。掌握英语，等于把「能力圈」从翻译过的二手信息，拓展到一手源头。',
      },
    ],
  },
  {
    id: 'day1-english-buffett-letters',
    headline: '巴菲特股东信：写给合伙人的语言课',
    outlet: 'Berkshire Hathaway',
    publishedAt: '历年',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '股东信是免费、公开、持续更新的「商业英语」大师课。',
    blocks: [
      {
        type: 'paragraph',
        text: '巴菲特每年致股东信以平实英文写就，却浓缩了公司治理、资本配置与周期判断。许多非英语母语投资者把精读股东信当作年度必修课。',
      },
      {
        type: 'paragraph',
        text: '第一天建立英语能力，不是为了考试，而是为了直接接入这套持续五十年的公开认知库——不被翻译滞后与诠释偏差锁住视野。',
      },
    ],
  },
  {
    id: 'day1-invest-self-munger-worthy',
    headline: '要得到你想要的，先让自己配得上',
    outlet: '芒格语录',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '复利的第一笔本金不是银行账户里的数字，是你自己。',
    blocks: [
      {
        type: 'paragraph',
        text: '芒格说：「要得到你想要的某样东西，最好的办法是让你自己配得上它。」技能、声誉、认知与品格，才是不会被周期夺走的资产。',
      },
      {
        type: 'paragraph',
        text: '第一天投资自己，意味着把劳动从「可替代的单位」升级为「可识别、可信任、可溢价」的个体——这是后续一切复利与杠杆的前提。',
      },
    ],
  },
  {
    id: 'day1-invest-self-human-capital',
    headline: '人力资本：年轻时最被低估的资产类别',
    outlet: '第一财经',
    sourceUrl: 'https://www.yicai.com/',
    lead: '在收入曲线陡峭的年龄段，人力资本往往大于金融资本。',
    blocks: [
      {
        type: 'paragraph',
        text: '理财规划的经典框架把「未来劳动收入的现值」视为人力资本。年轻时人力资本占比极高，任何提升技能、健康与认知的投资，回报率常常高于追逐热点标的。',
      },
      {
        type: 'paragraph',
        text: '把 IP、专业声誉与可迁移技能当作资产来经营，与买股票一样需要长期主义——但前者在第一天完全由你掌控。',
      },
    ],
  },
  {
    id: 'day1-decision-munger-psychology',
    headline: '人类误判心理学：科学决策的底层清单',
    outlet: '穷查理宝典',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '第一天最贵的成本是试错成本；清单与概率思维是护城河。',
    blocks: [
      {
        type: 'paragraph',
        text: '芒格整理的心理误判清单涵盖从众、过度自信、沉没成本等系统性偏差。科学决策不是「预测更准」，而是识别自己何时正在犯蠢。',
      },
      {
        type: 'paragraph',
        text: '只在你理解的事情上下注、算概率而非赌方向、用 AI 做信息筛选而非情绪放大——都是把决策从「叙事」拉回「赔率」。',
      },
    ],
  },
  {
    id: 'day1-decision-bayesian',
    headline: '贝叶斯更新：在不确定中迭代判断',
    outlet: '霍华德·马克斯 · 备忘录',
    sourceUrl: 'https://www.oaktreecapital.com/insights',
    lead: '不预测，但随证据更新观点——是专业投资者与赌徒的分野。',
    blocks: [
      {
        type: 'paragraph',
        text: '马克斯强调：我们无法预知未来，但可以评估概率与赔率，并在新信息到来时更新判断。这与贝叶斯思维一脉相承。',
      },
      {
        type: 'paragraph',
        text: '第一天资源有限，更应避免「一次判死刑」式的决策，用小额试错与快速反馈降低单次错误的毁灭性。',
      },
    ],
  },
  {
    id: 'day1-allin-opportunity',
    headline: '郑荣禄：创富是抓住一次机遇的能力',
    outlet: '诚实投资学 · 课程摘录',
    sourceUrl: 'https://www.langtontao.com/',
    lead: 'All in 不是盲目冲动，是算过赔率后的选择性下注。',
    blocks: [
      {
        type: 'paragraph',
        text: '在平均斯坦里，大多数人一生都没有抓住那一次机遇——不是不够努力，而是机会来临时不敢出手。创富能力，本质是识别并承受非对称机会的能力。',
      },
      {
        type: 'paragraph',
        text: '真正的 All in 是贝叶斯更新、锁定下行、保留生存层之后的进攻——与赌徒的「孤注一掷」截然不同。',
      },
    ],
  },
  {
    id: 'day1-allin-concentration',
    headline: '芒格：机会来临时要敢于集中',
    outlet: 'Daily Journal 年会',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '一生只要抓住少数几次，就足够改变轨迹。',
    blocks: [
      {
        type: 'paragraph',
        text: '芒格与巴菲特都强调：当胜率与赔率极度有利时，分散反而是不负责任的。但「集中」的前提是深度理解与安全边际，而非情绪上的冲动。',
      },
      {
        type: 'paragraph',
        text: '第一天练的是「敢出手」的肌肉，但出手前必须回答：若错了，我还能不能回到生存层继续玩？',
      },
    ],
  },
  // —— Day 1 · Step 2 ——
  {
    id: 'day1-compound-unit-munger',
    headline: '复利的第一原则：非必要，勿中断',
    outlet: '芒格语录',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '复利单元的关键不是收益率，是纪律与连续性。',
    blocks: [
      {
        type: 'paragraph',
        text: '每月固定划出一笔，投入低成本、长期、不易被打断的工具——宽基、货基、国债皆可。中断一次，等于砍掉雪球未来很长一段坡道。',
      },
      {
        type: 'paragraph',
        text: '复利单元的真正价值在心理结构：有了不会归零的底仓，你才敢对烂机会说「不」，才敢在极端斯坦裂缝出现时加大下注。',
      },
    ],
  },
  {
    id: 'day1-compound-unit-habit',
    headline: '习惯与系统：让储蓄自动化',
    outlet: 'Morgan Housel · The Psychology of Money',
    sourceUrl: 'https://www.collaborativefund.com/blog/',
    lead: '行为比智商更能决定长期结果。',
    blocks: [
      {
        type: 'paragraph',
        text: 'Housel 指出：理财成功更多取决于行为而非智商。自动转账、固定比例、降低摩擦，比追求高几个点的收益更可靠。',
      },
      {
        type: 'paragraph',
        text: '把「不中断」写成系统，而不是靠意志力——这是第一天就能建立的复利基础设施。',
      },
    ],
  },
  {
    id: 'day1-compound-lilu-modernization',
    headline: '李录：现代化与知识复利',
    outlet: '李录 · 公众号',
    sourceUrl: 'https://www.himalaya-capital.com/cn/blog/',
    lead: '复利不只发生在账户里，也发生在文明进程里。',
    blocks: [
      {
        type: 'paragraph',
        text: '李录在《文明、现代化、价值投资与中国》中论述：现代化本质是知识的复利——自由市场与科学技术让知识交换与积累加速。',
      },
      {
        type: 'paragraph',
        text: '价值投资的精髓，是参与这条现代化复利曲线；第一天建立复利单元，是把自己挂在这条曲线上的最小接口。',
      },
    ],
  },
  {
    id: 'day1-compound-snowball',
    headline: '滚雪球：巴菲特的财富曲线',
    outlet: 'Berkshire Hathaway',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '巴菲特大部分财富在 60 岁之后才显现——时间是函数本身。',
    blocks: [
      {
        type: 'paragraph',
        text: '「人生就像滚雪球，重要的是找到又湿又长的雪道。」巴菲特 83 岁时的财富约为 52 岁时的数十倍，说明复利在后期才展现暴力美学。',
      },
      {
        type: 'paragraph',
        text: '第一天雪球很小，但坡很长。耐心与不中断，比短期暴利更符合数学。',
      },
    ],
  },
  // —— Day 1 · Step 3 ——
  {
    id: 'day1-leverage-crisis-buy',
    headline: '危机抄底：负债作为占位工具',
    outlet: '诚实投资学',
    sourceUrl: 'https://www.langtontao.com/',
    lead: '优质负债是在资产暴跌时用低成本资金买入优质资产。',
    blocks: [
      {
        type: 'paragraph',
        text: '郑荣禄提出：大约每十年一次的经济危机，是用保单现金价值借款等方式抄底优质资产的窗口。杠杆的另一端，必须拴在价值而非情绪上。',
      },
      {
        type: 'paragraph',
        text: '第一天资本少、机会大——负债是推力，但用不好是把你在泥潭里多摁十年的重力。',
      },
    ],
  },
  {
    id: 'day1-leverage-munger-debt',
    headline: '芒格：以更少的钱、更优的条款借',
    outlet: '伯克希尔年会',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '杠杆是工具，不是生活方式。',
    blocks: [
      {
        type: 'paragraph',
        text: '芒格对杠杆极度谨慎：「我们以更少的钱、更优的条款借。」伯克希尔的成功不靠高杠杆赌方向，而靠低资本成本与长期复利。',
      },
      {
        type: 'paragraph',
        text: '寻找极端斯坦裂缝时，提前占位需要杠杆，但规模必须受生存层与试错层约束。',
      },
    ],
  },
  {
    id: 'day1-value-buffett-owner',
    headline: '把股票当成一门生意',
    outlet: '巴菲特股东信',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '价值投资是世界观，不是选股技巧。',
    blocks: [
      {
        type: 'paragraph',
        text: '巴菲特：「你要把股票当成一门生意来看。」内在价值、安全边际、长期持有——第一天就要用「资产能否产生现金流」审视每一次人生决策。',
      },
      {
        type: 'paragraph',
        text: '李录强调：价值投资研究的是踏实投资于价值，让投资者与企业一起成长，分享价值增长中的回报。',
      },
    ],
  },
  {
    id: 'day1-value-lilu-purchasing',
    headline: '投资的本质是保持并增长购买力',
    outlet: '李录演讲',
    sourceUrl: 'https://www.himalaya-capital.com/cn/blog/',
    lead: '名义财富会骗人，购买力才是标尺。',
    blocks: [
      {
        type: 'paragraph',
        text: '李录：「投资的本质，是保持并增长购买力。」第一天建立价值视角，是为了不被通胀与泡沫叙事带偏。',
      },
      {
        type: 'paragraph',
        text: '用低于内在价值的价格买入未来能产生现金流的资产——这条原则适用于股票，也适用于职业与技能选择。',
      },
    ],
  },
  // —— Day 1 · Step 4 ——
  {
    id: 'day1-survival-labor-value',
    headline: '劳动创造价值：第一天的底线',
    outlet: '朗敦道 · 第一天叙事',
    sourceUrl: 'https://www.langtontao.com/',
    lead: '讲梦想之前先讲生存，讲 All in 之前先讲吃饭。',
    blocks: [
      {
        type: 'paragraph',
        text: '超级个体首先是一个能「用劳动创造价值」的人——技能必须是真实需求，必须有人愿意付费。生存层是试错层亏光之后还能回来攒筹码的地方。',
      },
      {
        type: 'paragraph',
        text: '不要看不起劳动与小钱。第一天最愚蠢的错误，是还没站稳就想着飞。',
      },
    ],
  },
  {
    id: 'day1-survival-side-hustle',
    headline: '边劳动边试错：双轨现金流',
    outlet: '网易财经',
    sourceUrl: 'https://money.163.com/',
    lead: '生存层与试错层并行，是理性冒险的前提。',
    blocks: [
      {
        type: 'paragraph',
        text: '许多创业者失败，是因为在主业现金流尚未稳固时就把全部筹码押在新项目上。保留可依赖的劳动收入，相当于为家庭资产负债表购买「下行保险」。',
      },
      {
        type: 'paragraph',
        text: '边挣饭钱边攒子弹——生存层是所有冒险的安全垫。',
      },
    ],
  },
  {
    id: 'day1-trial-optionality',
    headline: '塔勒布：选择权与有限损失',
    outlet: '反脆弱',
    sourceUrl: 'https://www.penguinrandomhouse.com/books/309649/antifragile-by-nassim-nicholas-taleb/',
    lead: '每月为自己买一张「期权」——系统化地撞极端斯坦。',
    blocks: [
      {
        type: 'paragraph',
        text: '塔勒布强调选择权：在下行有限、上行开放的结构中下注。试错层每月 5%–10% 收入做高赔率尝试，失败不致命，一次成功可覆盖多次失败。',
      },
      {
        type: 'paragraph',
        text: '生存层保你活着，试错层保你有机会——两者缺一不可。',
      },
    ],
  },
  {
    id: 'day1-trial-antifragile',
    headline: '反脆弱：从波动中受益',
    outlet: '纳西姆·塔勒布',
    sourceUrl: 'https://www.penguinrandomhouse.com/books/309649/antifragile-by-nassim-nicholas-taleb/',
    lead: '脆弱厌恶波动，坚韧承受波动，反脆弱从波动中获益。',
    blocks: [
      {
        type: 'paragraph',
        text: '第一天无法消除不确定性，但可以设计「小赌怡情」的结构：损失封顶、样本足够多、保留再赌一次的门票。',
      },
    ],
  },
  {
    id: 'day1-leverage-good-debt',
    headline: '好债务与坏债务',
    outlet: '罗伯特·清崎 · 富爸爸',
    sourceUrl: 'https://www.richdad.com/',
    lead: '杠杆层动用负债放大赌注，铁律：规模不超过生存层的 50%。',
    blocks: [
      {
        type: 'paragraph',
        text: '经典财商教育区分：能买来产生现金流的资产之债，与消费性债务截然不同。杠杆层只服务于已验证的机会，而非弥补消费缺口。',
      },
      {
        type: 'paragraph',
        text: '赌性坚强，是锁死下行风险后的放手一搏——盲目加杠杆是把核心资产变成赌博筹码。',
      },
    ],
  },
  {
    id: 'day1-leverage-margin',
    headline: '保证金与强制平仓：杠杆的暗面',
    outlet: '证券时报',
    sourceUrl: 'https://www.stcn.com/',
    lead: '杠杆不仅放大收益，也放大被迫卖出的风险。',
    blocks: [
      {
        type: 'paragraph',
        text: '融资买入在下跌中会触发追加保证金或强制平仓，把「暂时浮亏」变成「永久实亏」。第一天若使用杠杆，必须理解流动性与条款，而非只看收益率。',
      },
    ],
  },
  // —— Day 1 · Step 5 ——
  {
    id: 'day1-survivorship-taleb',
    headline: '幸存者偏差：我们只看见赢家',
    outlet: '纳西姆·塔勒布',
    sourceUrl: 'https://www.penguinrandomhouse.com/books/309649/antifragile-by-nassim-nicholas-taleb/',
    lead: '要问那些没活下来的人做了什么。',
    blocks: [
      {
        type: 'paragraph',
        text: '媒体与社交圈展示的是「活下来的那一个」。幸存者偏差让我们高估某些策略的普适性，低估沉默的大多数所犯的错误。',
      },
      {
        type: 'paragraph',
        text: '砍掉 90% 虚假勤奋的第一步，是承认：你看到的成功路径，可能只是无数条路径中可见的那一条。',
      },
    ],
  },
  {
    id: 'day1-survivorship-base-rates',
    headline: '基础比率：别被故事骗',
    outlet: '丹尼尔·卡尼曼 · 思考，快与慢',
    sourceUrl: 'https://www.penguinrandomhouse.com/books/165785/thinking-fast-and-slow-by-daniel-kahneman/',
    lead: '用统计基准替代个案叙事。',
    blocks: [
      {
        type: 'paragraph',
        text: '卡尼曼：人们在「代表性启发」下忽略基础比率。创业成功率、炒股胜率、副业变现概率——都应先问「这一类事情通常结果如何」。',
      },
    ],
  },
  {
    id: 'day1-diligence-busy-trap',
    headline: '忙碌的陷阱：第一天最大的敌人',
    outlet: '朗敦道 · 第一天叙事',
    sourceUrl: 'https://www.langtontao.com/',
    lead: '虚假勤奋比懒惰更危险。',
    blocks: [
      {
        type: 'paragraph',
        text: '只投资于能产生长期复利的行为：调研裂缝、打磨技能、积累筹码。砍掉消耗精力却无产出的「看起来很努力」。',
      },
      {
        type: 'paragraph',
        text: '芒格：「尽量别犯愚蠢的错误，而不是尽量表现得聪明。」',
      },
    ],
  },
  {
    id: 'day1-diligence-munger-stupid',
    headline: '蠢错误清单',
    outlet: '芒格',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '避免愚蠢，比追求聪明更可靠。',
    blocks: [
      {
        type: 'paragraph',
        text: '第一天时间最稀缺。用清单过滤：这件事一年后还重要吗？能复利吗？在能力圈内吗？若三者皆否，果断砍掉。',
      },
    ],
  },
  // —— Day 2 · 什么是钱 ——
  {
    id: 'day2-global-m2',
    headline: '全球货币与财富总量：M2 与资产价格',
    outlet: '第一财经',
    sourceUrl: 'https://www.yicai.com/',
    lead: '钱不是孤立的纸面数字，是全球体系里的分配凭证。',
    blocks: [
      {
        type: 'paragraph',
        text: '广义货币供应量、利率与汇率联动，塑造资产估值与通胀预期。理解「钱从哪来、往哪去」，才能读懂政策与市场的牵一发而动全身。',
      },
    ],
  },
  {
    id: 'day2-global-liquidity',
    headline: '全球流动性周期与资产轮动',
    outlet: '霍华德·马克斯 · 备忘录',
    sourceUrl: 'https://www.oaktreecapital.com/insights',
    lead: '流动性松紧是第二天读盘的重要维度。',
    blocks: [
      {
        type: 'paragraph',
        text: '马克斯多次讨论流动性如何推动资产价格超越基本面，又在收紧时引发回撤。超级英雄看数字背后的水位，而不只是涨跌本身。',
      },
    ],
  },
  {
    id: 'day2-purchasing-inflation',
    headline: '通胀与购买力：名义财富的幻觉',
    outlet: '美联储 · 教育资料',
    sourceUrl: 'https://www.federalreserve.gov/',
    lead: '守住购买力，才是守住财富的根。',
    blocks: [
      {
        type: 'paragraph',
        text: '同样数额的货币，在不同年代能买到的商品与服务截然不同。长期规划必须以实际购买力为尺，而非账户余额。',
      },
    ],
  },
  {
    id: 'day2-purchasing-real-return',
    headline: '实际回报率：扣除通胀后的真相',
    outlet: '晨星投资课堂',
    sourceUrl: 'https://www.morningstar.com/',
    lead: '投资的目标是保持并增长购买力。',
    blocks: [
      {
        type: 'paragraph',
        text: '李录所言「投资的本质」——在通胀侵蚀下，低收益「安全」资产也可能在实际上缩水。第二天配置要盯住实际回报，而非名义利息。',
      },
    ],
  },
  {
    id: 'day2-cashflow-buffett',
    headline: '现金流是商业的语言',
    outlet: '巴菲特股东信',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '钱的终极形态是持续进账的现金流。',
    blocks: [
      {
        type: 'paragraph',
        text: '巴菲特偏爱能产生稳定自由现金流的企业。无法产生现金流的纸面富贵，不过是随时可能消散的泡沫——这条标准适用于股票，也适用于事业选择。',
      },
    ],
  },
  {
    id: 'day2-cashflow-dividend',
    headline: '股息与租金：现金流资产入门',
    outlet: '诚实投资学',
    sourceUrl: 'https://www.langtontao.com/',
    lead: '真正的财富是能把钱持续放进你口袋里的东西。',
    blocks: [
      {
        type: 'paragraph',
        text: '股息、利息、租金、版权——现金流资产的共同点是所有权与持续分配。第二天从「价格博弈」转向「现金流思维」，是认知分水岭。',
      },
    ],
  },
  // —— Day 2 · 资产 ——
  {
    id: 'day2-growth-lilu',
    headline: '李录：参与现代化复利',
    outlet: '李录 · 公众号',
    sourceUrl: 'https://www.himalaya-capital.com/cn/blog/',
    lead: '增长维度：分享企业成长与时代红利。',
    blocks: [
      {
        type: 'paragraph',
        text: '通过价值投资参与优秀企业成长，本质是把家庭财富挂接在文明进步的复利曲线上。第二天仍要增长，但更重质量与可持续。',
      },
    ],
  },
  {
    id: 'day2-growth-index',
    headline: '指数化与长期增长',
    outlet: '约翰·博格',
    sourceUrl: 'https://www.vanguard.com/',
    lead: '宽基指数是普通人分享增长的最简工具之一。',
    blocks: [
      {
        type: 'paragraph',
        text: '博格倡导低成本、长期持有市场组合。增长不必来自押注单一赢家，而可来自整体经济与创新者的集合。',
      },
    ],
  },
  {
    id: 'day2-preservation-insurance',
    headline: '保险作为家庭压舱石',
    outlet: '朗敦道 · 财富健康体检',
    sourceUrl: 'https://www.langtontao.com/langtontao#checkup-cases',
    lead: '保全维度：抵御周期与意外风险。',
    blocks: [
      {
        type: 'paragraph',
        text: '寿险、重疾险与年金等工具，在架构正确的前提下，承担风险转移与长期储蓄功能。压舱石不是不增长，而是在风暴中让家庭资产负债表不断裂。',
      },
    ],
  },
  {
    id: 'day2-preservation-trust',
    headline: '家族信托：李嘉诚的「第三个儿子」',
    outlet: '界面新闻',
    sourceUrl: 'https://www.jiemian.com/article/2464850.html',
    lead: '合规架构完成代际传承。',
    blocks: [
      {
        type: 'paragraph',
        text: '界面新闻详解李氏家族信托如何把商业帝国与家族利益长期绑定。保全与传承，是第二天超级英雄区别于第一天投机者的核心功课。',
      },
    ],
  },
  {
    id: 'day2-isolation-structure',
    headline: '风险隔离：法人、信托与防火墙',
    outlet: 'CFWIA',
    sourceUrl: 'https://www.cfwia2020.org/',
    lead: '把个人资产与经营风险、债务风险切割。',
    blocks: [
      {
        type: 'paragraph',
        text: '合规的控股结构、信托与保险安排，可在法律框架内建立防火墙。任凭外界风雨，家族核心资产仍可按设计路径传承。',
      },
    ],
  },
  {
    id: 'day2-isolation-firewall',
    headline: '资产保全与债务牵连',
    outlet: '网易财经',
    sourceUrl: 'https://money.163.com/',
    lead: '第二天化债与隔离往往同时进行。',
    blocks: [
      {
        type: 'paragraph',
        text: '经营失败、担保连带责任等，可能一次击穿家庭资产负债表。提前规划隔离，比事后救火成本低得多。',
      },
    ],
  },
  // —— Day 2 · 债务 ——
  {
    id: 'day2-debt-good-bad',
    headline: '第二天：卸掉投机性杠杆',
    outlet: '朗敦道 · 化债',
    sourceUrl: 'https://www.langtontao.com/coffee#debt',
    lead: '第一天的债务可以是杠杆，第二天的债务往往是枷锁。',
    blocks: [
      {
        type: 'paragraph',
        text: '清理高息负债，只保留极低风险、有资产对应的优质负债。化债是第二天的核心动作——让结构轻装上阵，扛得住周期冲击。',
      },
    ],
  },
  {
    id: 'day2-debt-deleverage',
    headline: '去杠杆周期中的家庭策略',
    outlet: '霍华德·马克斯 · 备忘录',
    sourceUrl: 'https://www.oaktreecapital.com/insights',
    lead: '宏观去杠杆时，现金流比杠杆率更重要。',
    blocks: [
      {
        type: 'paragraph',
        text: '马克斯在多次危机后强调：幸存者优先来自保守的资产负债表。第二天家族掌舵者，要把去杠杆当作常态能力而非一次性事件。',
      },
    ],
  },
  // —— Day 2 · 能力圈 ——
  {
    id: 'day2-circle-buffett',
    headline: '能力圈：知道边界在哪里',
    outlet: '巴菲特股东信',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '圈的大小不重要，知道边界才重要。',
    blocks: [
      {
        type: 'paragraph',
        text: '巴菲特与芒格反复强调：在真正懂的领域里果断，在不懂的领域里敬畏。超级英雄不是无所不能，而是清醒。',
      },
    ],
  },
  {
    id: 'day2-circle-marks',
    headline: '马克斯：第二层次思维',
    outlet: '投资最重要的事',
    sourceUrl: 'https://www.oaktreecapital.com/insights',
    lead: '圈内决策，圈外敬畏。',
    blocks: [
      {
        type: 'paragraph',
        text: '「第一层思维」人人会说；「第二层思维」问的是：别人都知道之后，还成立吗？能力圈与第二层思维结合，避免在拥挤交易中成为流动性。',
      },
    ],
  },
  {
    id: 'day2-inverse-munger',
    headline: '反过来想，总是反过来想',
    outlet: '芒格',
    sourceUrl: 'https://www.berkshirehathaway.com/letters/letters.html',
    lead: '逆向思维是芒格一生的工具。',
    blocks: [
      {
        type: 'paragraph',
        text: '狂热时问风险在哪，恐慌时问机会在哪。超额收益常来自逆人性的理性——而非逆理性的情绪。',
      },
    ],
  },
  {
    id: 'day2-inverse-contrarian',
    headline: '逆向投资与群众心理',
    outlet: '霍华德·马克斯',
    sourceUrl: 'https://www.oaktreecapital.com/insights',
    lead: '人弃我取，但要有证据而非情怀。',
    blocks: [
      {
        type: 'paragraph',
        text: '逆向不是「故意作对」，而是在价格与情绪极端时，用第二层思维检验赔率。能力圈内逆向，才是超级英雄式勇敢。',
      },
    ],
  },
]

export function getPathTopicArticle(id: string): PathTopicArticleContent | undefined {
  return pathTopicArticles.find((article) => article.id === id)
}
