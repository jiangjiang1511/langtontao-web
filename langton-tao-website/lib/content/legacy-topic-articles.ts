export type LegacyArticleBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'image'; src: string; alt: string; caption?: string }

export type LegacyTopicArticleContent = {
  id: string
  headline: string
  outlet: string
  publishedAt?: string
  sourceUrl: string
  lead?: string
  blocks: readonly LegacyArticleBlock[]
}

export const legacyTopicArticles: readonly LegacyTopicArticleContent[] = [
  {
    id: 'story-li-trust-third-son',
    headline: '家族信托教科书级案例：揭秘李嘉诚家族信托',
    outlet: '界面新闻',
    sourceUrl: 'https://www.jiemian.com/article/2464850.html',
    lead: '李嘉诚曾说：用分家来传承，而不是在自己去世后让下一代用诉讼来分家。',
    blocks: [
      {
        type: 'image',
        src: '/assets/legacy-articles/story-li-trust-third-son/article-cover.jpg',
        alt: '李嘉诚家族信托结构示意图',
        caption: '摘自界面新闻：李氏家族信托与长和系资产架构。',
      },
      {
        type: 'paragraph',
        text: '李氏家族信托包括多个全权信托与单位信托，由受托人代表信托持有长和系资产。受益人包括李泽钜及其妻子子女，以及李泽楷——全家人以信托受益人身份共享家族财富。',
      },
      {
        type: 'paragraph',
        text: '李嘉诚的继任计划将「继任」与「分产」分开：长子李泽钜掌舵商业帝国，次子李泽楷获现金支持自行创业。这样既确保控制权不因分家旁落，又保障其他家人权益。',
      },
      {
        type: 'paragraph',
        text: '他把家族信托视为心中的「第三个儿子」——让商业帝国正常运转，让两个儿子「可以有兄弟做」。这是华人首富在传承上教科书级的安排。',
      },
    ],
  },
  {
    id: 'story-four-families-succession',
    headline: '香港四大家族接班启示录：万亿财富平稳传承',
    outlet: '界面新闻',
    sourceUrl: 'https://www.jiemian.com/article/3134774.html',
    lead: '万亿财富平稳传承，是个高难度技术活——秘籍往往是家族信托。',
    blocks: [
      {
        type: 'image',
        src: '/assets/legacy-articles/story-four-families-succession/article-cover.jpg',
        alt: '香港四大家族财富传承',
        caption: '摘自界面新闻：四大家族接班与家族信托布局。',
      },
      {
        type: 'paragraph',
        text: '李嘉诚至少设立四支全权信托持有旗下公司股份，并分别指定受益人。把庞大资产注入不同信托，好比把鸡蛋放在不同篮子——某一类资产出险时，整体仍能「不差钱」。',
      },
      {
        type: 'paragraph',
        text: '权益类与财产类信托把两个儿子指定为不同受益人：为长子接班布局，也以「坐等分红」给予次子真金白银，防止内斗导致家族财富缩水。',
      },
      {
        type: 'paragraph',
        text: '信托受益人仅限于家族子孙，且不可撤销——将信托终止的可能性降至最低，确保财富代代相传。一系列资本腾挪，令信托保护下的财富有如穿了「金钟罩」。',
      },
    ],
  },
  {
    id: 'story-kwok-beneficiary-exclusion',
    headline: '信托受益人名单：最狠的家族规则',
    outlet: 'CFWIA',
    sourceUrl: 'https://www.cfwia2020.org/post/%E6%8F%AD%E7%A7%98%EF%BC%9A%E9%A6%99%E6%B8%AF%E3%80%8C%E5%9B%9B%E5%A4%A7%E5%AE%B6%E6%97%8F%E3%80%8D%E5%A6%82%E4%BD%95%E5%81%9A%E8%B2%A1%E5%AF%8C%E5%82%B3%E6%89%BF%EF%BC%9F',
    lead: '受益人名单不是写一次就完——它往往是家族权力与信息同频的晴雨表。',
    blocks: [
      {
        type: 'image',
        src: '/assets/legacy-articles/story-kwok-beneficiary-exclusion/article-cover.jpg',
        alt: '香港四大家族财富传承与受益人安排',
        caption: '摘自 CFWIA：四大家族如何做财富传承。',
      },
      {
        type: 'paragraph',
        text: '新鸿基郭氏兄弟的内斗是反面教材：2010 年郭炳湘被剔除出家族信托受益人名单，当时新鸿基已是市值千亿的地产巨头，除名相当于令其损失上百亿港元级别的家族权益。',
      },
      {
        type: 'paragraph',
        text: '与李嘉诚家族形成对照：李氏信托在 2012 年前即公布方案，说明受益人范围与接班路径，避免兄弟间在分家时产生内斗。',
      },
      {
        type: 'paragraph',
        text: '朗敦道关注的不是「谁上名单」，而是全家是否在同一张架构图里——保单、信托、股权若各说各话，继承层冲突往往早已埋下。',
      },
    ],
  },
  {
    id: 'story-beneficiary-mismatch',
    headline: '保单写满，股权传承却对不上',
    outlet: '朗敦道案例库',
    sourceUrl: 'https://www.caitc.cn/website/info/12967',
    lead: '人身险是「活文件」，但多数家庭从未按架构迭代同步更新。',
    blocks: [
      {
        type: 'image',
        src: '/assets/legacy-articles/story-beneficiary-mismatch/article-cover.png',
        alt: '家族信托与保单受益人架构',
        caption: '摘自长安信托消费者保护：李氏信托实现多重隔离。',
      },
      {
        type: 'paragraph',
        text: '一位制造业企业主为二代接班筹备多年：股权信托、公司章程、董事会席位都已安排。然而多张保单的受益人仍是配偶与子女个人，与企业债务、信托条款完全脱节。',
      },
      {
        type: 'paragraph',
        text: '若企业主突发变故，理赔金可能直接进入个人账户，绕开信托架构，甚至与企业债权人主张交织——纸面传承与真实资金流不是同一条路。',
      },
      {
        type: 'paragraph',
        text: '长安信托消费者保护文指出：李氏信托实现多重隔离，即便委托人面临经营问题，信托资产仍受保护。关键不在「有没有保单」，而在保单是否与整体架构同频。',
      },
    ],
  },
  {
    id: 'story-three-generations',
    headline: '富不过三代：体力衰退还是系统缺席',
    outlet: '人民文摘',
    sourceUrl: 'https://paper.people.com.cn/rmwz/html/2013-07/01/content_1264523.htm',
    lead: '富不过三代，往往不是子弟败家那么简单——更是家族系统缺席。',
    blocks: [
      {
        type: 'image',
        src: '/assets/legacy-articles/story-three-generations/article-cover.jpg',
        alt: '华人首富家族财富传承',
        caption: '人民文摘对比洛克菲勒与李嘉诚：家族信托让财富悄然传承。',
      },
      {
        type: 'paragraph',
        text: '人民文摘对比洛克菲勒与李嘉诚：洛克菲勒子孙不再经营钢铁帝国，但家族信托让财富悄然传承；邵逸夫因子女无意继承家业而出售 TVB——并非每个富家子弟都想接班。',
      },
      {
        type: 'paragraph',
        text: '富人借家族信托把股东与营运者角色分开：可放手任用职业经理人，也保障继承人即使不经营也能生活无忧——传承的是规则与现金流，而非强迫接班。',
      },
      {
        type: 'paragraph',
        text: '朗敦道在 FAQ 中强调：三代体力衰退叠加系统衰退，宏观周期、家族生命周期与监管拐点会同时压来——没有 Family OS 与年检机制，富不过三代不是诅咒，是概率。',
      },
    ],
  },
  {
    id: 'story-withdrawer-vs-citizen',
    headline: '「提款人」还是「合格家族公民」',
    outlet: '朗敦道保全',
    sourceUrl: 'https://www.jiemian.com/article/2464850.html',
    lead: '心理所有权、金融所有权与家族共同利益，往往在三代人里错位。',
    blocks: [
      {
        type: 'image',
        src: '/assets/legacy-articles/story-withdrawer-vs-citizen/article-cover.jpg',
        alt: '李泽钜与李泽楷：同一父亲，不同传承路径',
        caption: '摘自界面新闻：李嘉诚家族信托与兄弟分产安排。',
      },
      {
        type: 'paragraph',
        text: '李泽楷选择另起炉灶，李泽钜接手帝国——同一父亲，不同路径。传承不是复制粘贴，而是让每个人在架构里找到可执行的位子。',
      },
      {
        type: 'paragraph',
        text: '朗敦道思维导图追问：下一代继承的是账户，还是方法与价值观？家族是在培养「提款人」，还是「合格家族公民」？默会知识无法写进遗嘱，却决定信托能否被尊重地执行。',
      },
      {
        type: 'paragraph',
        text: '成为好祖先，不是留最多钱，而是留认知、责任与共同体——观念、价值观、信息三同频，才是打破富不过三代的软基础设施。',
      },
    ],
  },
]

export function getLegacyTopicArticle(id: string) {
  return legacyTopicArticles.find((article) => article.id === id)
}
