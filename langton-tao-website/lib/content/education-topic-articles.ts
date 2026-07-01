export type EducationArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type EducationTopicArticleContent = {
  id: string
  headline: string
  outlet: string
  publishedAt?: string
  sourceUrl: string
  lead?: string
  blocks: readonly EducationArticleBlock[]
}

export const educationTopicArticles: readonly EducationTopicArticleContent[] = [
  {
    id: 'yu-life-science-procreation',
    headline: '生命科学与生育规划',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/member',
    lead: '备孕、丁克、冻卵、领养——没有标准答案，但很多家庭还没聊清：我们要的是孩子，还是「以后还能选」？',
    blocks: [
      {
        type: 'paragraph',
        text: '见过一对夫妻，嘴上都说「随缘」，体检报告却悄悄去做了——不是不想聊，是怕聊崩。生命科学把窗口留住了，却没替你们回答：要不要、何时要、怎么要。',
      },
      {
        type: 'paragraph',
        text: '生育和教育写的是同一张家庭时间表。有人已在备孕路口，有人主动选择了丁克或二人世界，也有人通过领养等方式成为父母。路径不同，却要面对同一类责任：我们愿意为哪种生活形态长期负责？',
      },
      {
        type: 'paragraph',
        text: '辅助生殖不是「买一个孩子」，而是在时间表上多留一格。冻卵冻精是在买时间——但时间买来后，若仍不聊「要不要」，只是把焦虑往后推。那一格很贵：身体、金钱、伴侣之间的分工与期待。',
      },
      {
        type: 'paragraph',
        text: '领养或其他方式，是把「成为父母」从单一路径里解绑——法律、情感、家族期待都要重新对齐。「先接受现在的样子」也不是躺平，是把彼此期待说清楚，不急着改结构，也能减少暗涌的怨怼。',
      },
      {
        type: 'paragraph',
        text: '有人把 IVF 费用算进养娃总账，才发现「生」和「养」原来是同一张现金流表上的两段——这反而让对话容易了：不是抽象道德题，而是「我们扛不扛得住、愿不愿意一起扛」。若重心在生育路上，需要的往往不只是信息，而是可分担的人：伴侣、医疗、家族边界。',
      },
      {
        type: 'paragraph',
        text: '今晚可以只问一句：如果技术明天就能帮你们，你们最不确定的，是身体、钱，还是彼此想要的不一样？',
      },
      {
        type: 'image',
        src: '/assets/edu/birth1.jpg',
        alt: '新生命与家庭起点',
        caption: '结构牵动保障、现金流和代际安排——先对齐语言，再谈选项。',
      },
    ],
  },
  {
    id: 'yu-pet-member-care',
    headline: '家庭宠物成员关怀',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/member',
    lead: '它叫「宠物」，却常是第一个被叫醒、最后一个被安顿的家庭成员——你们为它留过照护的预算吗？',
    blocks: [
      {
        type: 'paragraph',
        text: '丁克家庭里，有人半开玩笑：「它就是我们家的小孩。」笑归笑，大病那一夜谁守夜、手术费谁出、老了要不要安乐——很少在关系还好的时候摊开讲。',
      },
      {
        type: 'paragraph',
        text: '成员不限于血缘。愿意为它谈保障与终点，本身就是在练习：什么叫「家人」、什么叫「负责」。这和「要不要人类幼崽」可以并存——有人用四足伙伴练照护，有人用它们填满二人世界的节律。',
      },
      {
        type: 'paragraph',
        text: '宠物晚年并不浪漫：失禁、夜醒、专科费用。若从未聊过「到某一步怎么办」，危机来时往往只剩争吵和愧疚，而不是共同决定。陪伴也要被认真安排——责任不止于日常投喂。',
      },
      {
        type: 'paragraph',
        text: '若重心在宠物或另一位成员，同样是在问：谁照顾、谁出钱、谁有权决定，这些是否说清。不妨问彼此：如果它明天需要长期照护，我们分工怎么排？钱从哪张卡出？谁有权做最后的决定？',
      },
    ],
  },
  {
    id: 'yu-cyber-immortality',
    headline: '家庭成员赛博永生',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/member',
    lead: '相册里上万张图，孩子却未必知道爷爷那代人为何做那些选择——「留下什么」比「留下多少」更难聊。',
    blocks: [
      {
        type: 'paragraph',
        text: '赛博永生听起来像科幻，日常里却很简单：父母的故事、创业为什么坚持、某次失败怎么爬起来的——若没写下来、没录下来，孩子继承的往往只有账户和沉默。',
      },
      {
        type: 'paragraph',
        text: '数字时代，叙事也可以成为资产：一段口述、一封给未出生孙辈的信、一次认真整理的家庭访谈。价值不在「上传了没有」，而在：下一代读得懂你们为何这样活。',
      },
      {
        type: 'paragraph',
        text: '有人担心「赛博」太冷——其实冷的是只有密码没有上下文。密码会过期，方法和价值观若被讲清，才可能在代际里继续被尊重地执行。',
      },
      {
        type: 'paragraph',
        text: '可以聊：家里谁的故事最该被留下？我们希望孩子继承的是「提款权」，还是「为什么我们家是这样的人」？',
      },
    ],
  },
  {
    id: 'yu-proc-q1-stage',
    headline: '家庭阶段决定规划重心',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/coffee#life-education',
    lead: '家庭处在哪一段，决定了该先谈教育金、生育选项，还是未来还能不能改选——不能用同一张模板套所有片段。',
    blocks: [
      {
        type: 'paragraph',
        text: '孩子已经在日常里的家庭，焦虑往往落在教育金、接送与时间分配——以及「我们还有没有自己」。这不是奢侈题，是现金流和精力怎么排的真实账本。',
      },
      {
        type: 'paragraph',
        text: '还在备孕路口的家庭，重心自然转向医学选项、身心状态，以及彼此期待是否对齐。技术能延长时间，却替不了「我们要不要」这一步。',
      },
      {
        type: 'paragraph',
        text: '主动选择了丁克、二人世界或其他结构的家庭，同样要面对诚实的问题：未来若改变主意，选项还留不留得住？这不是诅咒，是把结构写进时间表。',
      },
      {
        type: 'paragraph',
        text: '阶段认清楚了，照护与保障才谈得准——不然很容易用「别人家怎么养」来填自己家的空白，越填越乱。',
      },
    ],
  },
  {
    id: 'yu-proc-q2-resources',
    headline: '富养与韧性：资源基调要谈清',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/coffee#life-education',
    lead: '给足视野体验，还是节制一点让他自己扛——背后是两种「好家长」想象，不对齐就会在内耗里烧钱。',
    blocks: [
      {
        type: 'paragraph',
        text: '「尽量给足」常来自「不能让孩子吃亏」——视野、体验、机会都想给最好的。但若给足的标准从未说清，很容易变成无底投入：报班、游学、装备堆上去，边界却越来越模糊。',
      },
      {
        type: 'paragraph',
        text: '「节制一点」强调韧性与吃苦——相信孩子要在真实风险里练本事。但若把该家庭扛的风险也推给孩子，韧性会变成冷漠，而不是成长。',
      },
      {
        type: 'paragraph',
        text: '两种想象没有简单对错，麻烦的是各执一词、却从不摊牌：一个觉得对方抠，一个觉得对方宠，钱花在暗涌里，孩子夹在中间。',
      },
      {
        type: 'paragraph',
        text: '资源基调要先对齐「我们要培养什么样的人」，再谈报班和预算——方向清楚了，富养与韧性才能落在同一张家庭账上，而不是各烧各的。',
      },
    ],
  },
  {
    id: 'yu-proc-responsibility-clarity',
    headline: '教育金与保障：先谈最挂心的一件',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/coffee#life-education',
    lead: '长线打算、照护分工、现金流——责任落在哪，预算和情绪就落在哪；比空泛焦虑更管用。',
    blocks: [
      {
        type: 'paragraph',
        text: '嘴上「为孩子好」很容易，难的是把「会不会发生」变成「发生时站得住」。教育金与保障，就是把不确定从抽象担心，落成看得见的现金流与分工。',
      },
      {
        type: 'paragraph',
        text: '责任感的落点决定了家庭优先谈哪一类安排：长线教育、突发医疗、照护轮换，还是现金流断档——落在哪，预算和情绪就跟到哪。挂心的事若一直模糊，夜里失眠，白天各忙各的。',
      },
      {
        type: 'paragraph',
        text: '全面焦虑往往因为什么都想顾、却什么都没谈清。先锁定最挂心的一件——教育金缺口、保障空白，或分工里那个一直没说清的角落——比同时开十个话题更有效。',
      },
      {
        type: 'paragraph',
        text: '把最挂心的一件写进家庭时间表，不是悲观，是诚实：发生时站得住，比「到时候再说」更能让人睡得着。',
      },
    ],
  },
  {
    id: 'jiao-education-door',
    headline: '孩子怎么长、往哪走',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/coffee#life-education',
    lead: '焦虑、路径、语言、升学——成长已在日程里，先说说此刻最占心思的那一件。',
    blocks: [
      {
        type: 'paragraph',
        text: '「教」不只在成绩单上——学识、价值观、视野，是在饭桌上、旅行里、失败后的复盘里传下去的。没有标准答案，但有此刻最占心思的那件事。',
      },
      {
        type: 'paragraph',
        text: '有人怕孩子跟不上世界在变，有人怕书读得多、生活接不上，有人怕升学一乱就失控。不同担心，补位方向完全不同——混着焦虑，往往哪头都顾不好。',
      },
      {
        type: 'paragraph',
        text: '一杯咖啡的时间，够把「我们要培养什么样的人」从口号变成可讨论的具体问题：你们最不想孩子二十岁时后悔什么？',
      },
    ],
  },
  {
    id: 'jiao-edu-q1-anxiety',
    headline: '躺平时，你们最常冒出来的担心是…',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/education',
    lead: '四种担心，四种不同的「下一步」——先认清楚是哪一种。',
    blocks: [
      {
        type: 'paragraph',
        text: '怕跟不上世界在变——往往是视野与语言的问题：信息隔着一堵墙，孩子还没练过「在外面怎么说话、怎么判断」。',
      },
      {
        type: 'paragraph',
        text: '怕书读得多、生活接不上——知识有，真实场域里的体感没有。讨论时可问：我们给过哪些「和社会轻轻交手」的机会？',
      },
      {
        type: 'paragraph',
        text: '怕不敢自己扛、怕升学失控——一条偏心性协作，一条偏路径拆解。你们更缺的是「敢」，还是「地图」？',
      },
    ],
  },
  {
    id: 'jiao-edu-q2-scene',
    headline: '如果让孩子多一种经历，你们更想是…',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/community#borui',
    lead: '经历塑造的不只是履历，更是「我是谁」的叙事。',
    blocks: [
      {
        type: 'paragraph',
        text: '跨文化对话——换语境，重新理解自己和世界。语言在这里不是科目，是连接的工具。',
      },
      {
        type: 'paragraph',
        text: '在真问题里动手做——项目式学习，让身体记住路线。世界不是地图上的点，是走过的路。',
      },
      {
        type: 'paragraph',
        text: '团队任务里长本事——分工、信任、一起扛结果。履历可以增色，更珍贵的是风暴过后的自我叙事。',
      },
      {
        type: 'paragraph',
        text: '有一条能照着走的计划——把升学拆成节点，焦虑从「未知」变成「可管理的项目」。',
      },
    ],
  },
  {
    id: 'jiao-edu-q3-language',
    headline: '在你们家，语言（尤其是英语）现在是…',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/education',
    lead: '英语是考试科目，还是一扇门——家庭里的定位，决定投入的节奏与心情。',
    blocks: [
      {
        type: 'paragraph',
        text: '若觉得是「推开更大世界的门」，讨论往往不在分数，而在：孩子有没有机会用这门语言连接外面——读、说、想，而不只是刷题。',
      },
      {
        type: 'paragraph',
        text: '若「不是眼下最急的」，也值得问：不急，是因为有更重要的场域要补，还是在回避一门需要长期耐心的能力？',
      },
      {
        type: 'paragraph',
        text: '若「和其他能力一起抓」——可以具体化：每周家庭里，语言占多少心力，协作、路径又占多少？平衡不是口号，是日历上的时间块。',
      },
    ],
  },
  {
    id: 'jiao-edu-q4-investment',
    headline: '你们更愿意把力气花在…',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/education',
    lead: '力气花在哪，孩子身上的印痕就在哪——先对齐优先级。',
    blocks: [
      {
        type: 'paragraph',
        text: '眼界、思维、表达——认知底子要慢慢垒，急不来。适合问：我们有没有给孩子「看见更大世界」的稳定输入，而不只是一次性旅行？',
      },
      {
        type: 'paragraph',
        text: '真实经历与场域——在不同地方轻轻交手，而非隔窗观火。适合问：最近一次「出了舒适区」是什么时候？',
      },
      {
        type: 'paragraph',
        text: '心性、协作、抗压——在挑战里练分工与信任。适合问：我们是在保护，还是在剥夺练习？',
      },
      {
        type: 'paragraph',
        text: '可执行的路径拆解——方向、节点、家庭节奏对齐。适合问：升学是孩子的项目，还是全家一起扛的项目？',
      },
    ],
  },
  {
    id: 'jiao-edu-q5-first-step',
    headline: '如果只能先迈一小步，你们希望是…',
    outlet: '熊比特 Coffee Chat',
    sourceUrl: '/education',
    lead: '小步对齐，比空泛焦虑更管用——关键是「小」且「可执行」。',
    blocks: [
      {
        type: 'paragraph',
        text: '先打开视野——变化来之前，先一步介入世界。可以是一门外语的固定练习，也可以是一次认真的跨文化对话，不必一步到位。',
      },
      {
        type: 'paragraph',
        text: '先和社会轻轻交手——用经历记住，而不是纸上谈。一次项目、一段游学、一场需要分工的任务，都算。',
      },
      {
        type: 'paragraph',
        text: '先在风浪里练协作——履历之外，更珍贵的是「我们一起扛过来过」。',
      },
      {
        type: 'paragraph',
        text: '先把路径拆清楚——留学不是终点，是家庭战略里的一段旅程。拆到「下个月做什么」，焦虑会降一档。',
      },
    ],
  },
]

export function getEducationTopicArticle(
  id: string
): EducationTopicArticleContent | undefined {
  return educationTopicArticles.find((article) => article.id === id)
}
