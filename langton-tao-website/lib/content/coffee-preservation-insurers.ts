import { taoInsurerNames } from '@/lib/content/fifty-year-narrative'

export const coffeePreservationInsurerPanelTitle = {
  zh: '精选保司与渠道网络',
  en: 'Curated Insurers & Channels',
} as const

export type CoffeePreservationArticle = {
  id: string
  title: string
  coverSrc: string
  coverAlt?: string
  tags: readonly string[]
  href?: string
}

export type CoffeePreservationInsurer = {
  id: string
  name: string
  headline: string
  buyerTag: string
  intro: readonly string[]
  articles: readonly CoffeePreservationArticle[]
}

const insurerSlugByName: Record<(typeof taoInsurerNames)[number], string> = {
  富卫: 'fwd',
  永明: 'sun-life',
  友邦: 'aia',
  安盛: 'axa',
  万通: 'yf-life',
  保诚: 'prudential',
  太平: 'taiping',
  立桥: 'well-link',
  慕尼黑: 'munich-re',
}

type InsurerCopy = {
  headline: string
  buyerTag: string
  productFeatures: string
  historyObservation: string
  rationalRating: string
}

const insurerCopyById: Record<string, InsurerCopy> = {
  prudential: {
    headline: 'Prudential 保诚：英式分红的百年平滑算法',
    buyerTag: '老钱家族的长期时间杠杆与「资金平滑池」',
    productFeatures:
      '保诚的核心资产是其历史悠久的「多元分红基金（With-Profits Fund）」。它采用独特的英式分红机制（归原红利），底层逻辑是通过「平滑机制（Smoothing Mechanism）」：在市场大牛市时留存收益，在极端熊市时释放红利，从而人为抹平极端斯坦的市场波动，输出一条跨越周期的绝对平稳增长曲线。',
    historyObservation:
      '带着 170 余年大英帝国的风控基因，历经两次世界大战与多次全球债务金融风暴而屹立。现状是虽然面临组织架构的亚太化重组和本土化摩擦，但其百年积累的庞大主权资产底座与风险池，依然是华人家庭锁定跨代（50–100 年）持续现金流的首选低波动接口。',
    rationalRating:
      '极优。适合用作「代代幸福配置模型」中维持家族现有生活水准不下降的长期养根资金。',
  },
  aia: {
    headline: 'AIA 友邦：主权信用的蓝筹防线',
    buyerTag: '亚太资产版图的「资本压舱石」与清算锚点',
    productFeatures:
      '友邦在产品设计上极其克制，不盲目追求账面暴利，而是追求结构诚实与绝对的确定性。其储蓄险与终身寿险底层重仓全球政府债券与顶级蓝筹股，其 beta 收益基本与全球宏观生产力锚定。保单契约的法理架构极其刚性，是进行境内外切割、防范经营贷和债务穿透的标配防火墙。',
    historyObservation:
      '根植于亚太百年，作为恒生指数无可动摇的蓝筹权重，它早已不仅仅是一家保司，而是深度嵌入亚太金融合规体系的「制度资产」。现状是清算效率极高、市场认知度极强，虽然保费溢价相对较高，但其提供的制度确定性几乎没有违约风险。',
    rationalRating:
      '强。适合作为家族企业主剥离经营风险、筑牢家族现世尊严的物理防火墙。',
  },
  fwd: {
    headline: 'FWD 富卫：数字游民的后现代资产接口',
    buyerTag: '极端斯坦窗口期的高流动性「动态货币阀门」',
    productFeatures:
      '彻底颠覆了老牌保司的温吞水叙事，富卫在产品组合上将「多货币转换」与「现金价值高早期提取率」做到了极致。它允许高净值个体在数个离岸司法管辖区货币（美元、加币、欧元、新币等）之间进行算法套利与丝滑转换，流动性极强。',
    historyObservation:
      '作为李泽楷盈科拓展集团旗下的金融新贵，脱胎于现代创新基因。它没有传统保司的百年历史包袱，而是深度拥抱 AIGC 运营与数字化大健康体检。现状是资产规模扩张极其激进，通过全球化权益配置在全球通胀与降息周期里博取不确定的超额主动回报（alpha 收益）。',
    rationalRating:
      '敏捷。适合思维高度前沿、对资产流动性和跨国身份平移有高频需求的创一代。',
  },
  'sun-life': {
    headline: 'Sun Life 永明：加拿大老钱的固定收益算法',
    buyerTag: '应对百岁人生长寿时代的「确定性养老复利引擎」',
    productFeatures:
      '永明的产品哲学是典型的北美「反脆弱生存算法」。它在养老年金与储蓄险上的现金价值增值极其诚实，历史分红实现率（Dividend Fulfillment Ratio）常年稳定在 100% 附近。它拒绝零和游戏的激进投机，利用大额资金池重仓北美的长期优质固收类资产，利用时间的重力法则兑现复利奇迹。',
    historyObservation:
      '跨越 150 余年风雨的加拿大金融磐石。在中国市场和国际资本市场交手几十年，深谙「生存至上」的反脆弱逻辑。现状是其合规与风控标准极其严苛（如对投保人/受益人关系的穿透审计），虽然缺乏抓马的账面高收益故事，但在老钱圈层中拥有极高的资本信任度。',
    rationalRating:
      '坚固。适合作为长寿时代下全家百年养老规划的「最后一道确定性安全网」。',
  },
  axa: {
    headline: 'AXA 安盛：跨界法税的精密 Scaffolding（脚手架）',
    buyerTag: '跨境法税筹划与全球身份配置的「离岸结构接口」',
    productFeatures:
      '安盛的优势在于其无与伦比的跨司法管辖区结构工程设计（Structural Engineering）。它的万能险（VUL）和高端家财险方案，能够完美咬合海外信托、离岸控股公司（开曼/BVI）以及复杂的跨国税务身份。它的产品不是一张保单，而是一套可以由律师和会计师随意调度的法律架构。',
    historyObservation:
      '源自法国、制霸全球的系统重要性金融机构（G-SII）。现状是在全球大通缩与地缘动荡加剧的背景下，安盛通过在欧洲、香港、新加坡的多属地错位布局，为客户提供了一种「主权个人」层面的避险跳板，是穿透外部监管围猎的主动防御盾牌。',
    rationalRating:
      '高端精密。适合企业面临海外出海、多国身份重叠、需要做底层跨境架构重构的超级家族。',
  },
  'yf-life': {
    headline: 'YF Life 万通：Fintech 驱动的模块化工具箱',
    buyerTag: '科技二代接班人高度可控的「数字资产存折」',
    productFeatures:
      '它是华人资本赋能金融科技的标本。万通将设计思维（Design Thinking）引入了保险契约，其最强底层是「终身年金转换权益的无限灵活性」。它允许客户在持有保单数十年后，根据当时的身体和生育规划，自由定制年金的领取矩阵。',
    historyObservation:
      '云锋金融入主后，万通注入了强大的数字基因。现状是深度拥抱了离火时代的算力逻辑，其数字化平台和客户体检系统的交付极其漂亮。它精准切中了那些不愿被传统保司陈旧条款锁死的年轻一代、自媒体高净值人群，用工具理性解决了「既要自由、又要系统」的既要又要两难戏剧。',
    rationalRating:
      '灵活。适合有再创业野心、需要将保单工具转化为家族「隐形弹药库」的留学生二代。',
  },
  taiping: {
    headline: 'China Taiping 太平：国家信用跨境交汇的物理阀门',
    buyerTag: '境内外资本合法切割与化债安全的「红筹桥梁」',
    productFeatures:
      '太平的独特性在于它的双属地血统。作为央企红筹，它能产生 onshore（境内）流动性与 offshore（境外）制度资产之间的法理无缝咬合。它的大额保单在满足国内合规、化债诉求的同时，能丝滑对接香港的国际信用网络，为家企混同的制造业家庭筑牢一道牢固的离岸主权防线。',
    historyObservation:
      '拥有近百年历史的民族保司火种。现状是在中国高质量发展与大变局时代，它是唯一能同时听懂境内企业家无奈近渴、又能调动境外老钱管理三件套（信托、办公室、基金）的特殊节点。',
    rationalRating:
      '独特战略性。特别适合用作国内实体制造业企业主隔离经营担保风险、守护家庭基本盘。',
  },
  'well-link': {
    headline: 'Well Link 立桥：高性价比的次新精益资本',
    buyerTag: '追求极致性价比的非核心「高负债阿尔法防御」',
    productFeatures:
      '纯粹的精益管理思维（Lean Management）。立桥通过砍掉传统保司昂贵的线下 overhead（管理成本）和代理人佣金漏洞，将「高保证现金流（Guaranteed Cash Value）」和极具攻击性的保费定价给到了市场。它不跟老钱保司拼历史故事，它拼的是奥卡姆剃刀式的刚性条件和高杠杆 copy（复制）红利。',
    historyObservation:
      '香港本土近年崛起的黑马次新资本。现状是在市场情绪谨慎、高净值中产（3000 万–1 亿资产夹缝层）最容易被大机构敷衍的时代，立桥用极其直球、便宜的价格提供了一层基础防御。',
    rationalRating:
      '战术性。适合资产配置初期的年轻家庭进行低成本的「保命层」底层打底。',
  },
  'munich-re': {
    headline: 'Munich Re 慕尼黑再保险：终极概率算法的终点底座',
    buyerTag: '统摄所有风险源的「终极系统架构师」与墓志铭',
    productFeatures:
      '慕再不面向零售市场，它是保司背后的保司，是精算师背后的数学上帝。在朗敦道的买手店里，慕再代表着财富管理的最高常识。任何一家零售保司设计的重疾大额理赔、百万粉丝 IP 的数据确权与赛博永生信托，其底层的死亡率、违约率与巨灾概率模型，都是由慕再的超级计算机集群进行终极核算并核保的。',
    historyObservation:
      '创立于 1880 年的全球再保险之王。旧金山大地震、泰坦尼克号沉没，它都在背后默默履行了可验证的终极物理契约。现状是它已经进化成了离火时代人类生存不确定性的「贝叶斯更新中心」，手握全球最庞大的商业直觉、生存残损与风险记忆数据。',
    rationalRating:
      '终极底座。朗敦道引入慕再的核保视角，是为了帮会员看清：在别人还用情绪化思维看投资时，如何用世界上最诚实的数学算法定义家族的底牌。',
  },
}

const fwdFeaturedArticle: CoffeePreservationArticle = {
  id: 'fwd-article-richard-li',
  title: '李泽楷，华人家族第二代的完美典范——从"薅李家羊毛"到家族传承',
  coverSrc: '/assets/fuwei/fuwei-cover1.jpg',
  coverAlt: '富卫产品背后的商业观察文章封面',
  tags: ['家族传承', '富卫', '商业观察'],
  href: 'https://mp.weixin.qq.com/s/F6WChaheUpmJXlE_4jOgtw',
}

const insurerArticlesById: Record<string, readonly CoffeePreservationArticle[]> = {
  fwd: [fwdFeaturedArticle],
}

function buildIntro(copy: InsurerCopy): readonly string[] {
  return [
    copy.productFeatures,
    copy.historyObservation,
    `工具理性评级：${copy.rationalRating}`,
  ]
}

export const coffeePreservationInsurers: readonly CoffeePreservationInsurer[] =
  taoInsurerNames.map((name) => {
    const id = insurerSlugByName[name]
    const copy = insurerCopyById[id]

    return {
      id,
      name,
      headline: copy.headline,
      buyerTag: copy.buyerTag,
      intro: buildIntro(copy),
      articles: insurerArticlesById[id] ?? [],
    }
  })

export type CoffeePreservationInsurerId =
  (typeof coffeePreservationInsurers)[number]['id']

export function getCoffeePreservationInsurer(id: string) {
  return coffeePreservationInsurers.find((insurer) => insurer.id === id)
}
