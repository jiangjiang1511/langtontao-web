export type BookshelfPhase = 'awakening' | 'foundation' | 'weapon' | 'dragon'

export type BookshelfItem = {
  id: string
  title: string
  author: string
  englishTitle?: string
  phase: BookshelfPhase
  phaseLabel: string
  quote: string
  coverSrc: string
  coverAlt: string
  href: string
}

const phaseLabels: Record<BookshelfPhase, string> = {
  awakening: '第一阶段 · 觉醒',
  foundation: '第二阶段 · 基石',
  weapon: '第三阶段 · 利剑',
  dragon: '第四阶段 · 屠龙',
}

function book(
  item: Omit<BookshelfItem, 'phaseLabel' | 'href' | 'coverAlt'> & {
    phaseLabel?: string
    href?: string
  }
): BookshelfItem {
  return {
    ...item,
    phaseLabel: item.phaseLabel ?? phaseLabels[item.phase],
    coverAlt: `${item.title}封面`,
    href: item.href ?? '/education#reading',
  }
}

/** 朗敦道围读会书单 — 来源：朗敦有道读书会书单.docx */
export const bookshelf: BookshelfItem[] = [
  book({
    id: 'civilization-value-investing',
    title: '文明、现代化、价值投资与中国',
    author: '李录',
    phase: 'awakening',
    quote:
      '被称为「中国版巴菲特」，芒格评价他是「最成功的投资人之一」。',
    coverSrc: '/books/civilization-value-investing-front.jpg',
  }),
  book({
    id: 'millionaire-next-door',
    title: '邻家的百万富翁',
    author: 'Thomas J. Stanley',
    englishTitle: 'The Millionaire Next Door',
    phase: 'awakening',
    quote: '真正的财富，往往藏在简朴的生活方式里，而非光鲜的收入数字中。',
    coverSrc: '/books/millionaire-next-door.jpg',
  }),
  book({
    id: 'your-money-or-your-life',
    title: '钱：你要钱还是要命',
    author: 'Vicki Robin',
    englishTitle: 'Your Money Or Your Life',
    phase: 'awakening',
    quote: '金钱是你用生命能量换来的——值得问一句：这笔交换划算吗？',
    coverSrc: '/books/your-money-or-your-life.jpg',
  }),
  book({
    id: 'psychology-of-money',
    title: '金钱心理学',
    author: 'Morgan Housel',
    englishTitle: 'The Psychology of Money',
    phase: 'awakening',
    quote: '理财成败，与智商关系不大，与行为方式关系极大。',
    coverSrc: '/books/psychology-of-money.jpg',
  }),
  book({
    id: 'early-retirement-extreme',
    title: '极限早退休',
    author: 'Jacob Lund Fisker',
    englishTitle: 'Early Retirement Extreme',
    phase: 'awakening',
    quote: '极端储蓄不是苦行，而是一套用更低消耗换取更大自由的系统。',
    coverSrc: '/books/early-retirement-extreme.jpg',
  }),
  book({
    id: 'second-day-money-evolution',
    title: '第二天：金钱进化论',
    author: '方言',
    englishTitle: 'The Second Day: Money Evolution',
    phase: 'awakening',
    quote:
      '财富积累之后，如何在「第二天」守住财富、避免返贫——理性、复利与终身学习，方能成为幸福的有钱人。',
    coverSrc: '/books/second-day-money-evolution.jpg',
  }),
  book({
    id: 'economics-of-money',
    title: '货币金融学',
    author: 'Frederic Mishkin',
    englishTitle: 'The Economics of Money, Banking, and Financial Markets',
    phase: 'foundation',
    quote: '理解货币与信用，是读懂现代金融周期的起点。',
    coverSrc: '/books/economics-of-money.jpg',
  }),
  book({
    id: 'random-walk-wall-street',
    title: '漫步华尔街',
    author: 'Burton Malkiel',
    englishTitle: 'A Random Walk Down Wall Street',
    phase: 'foundation',
    quote: '市场短期像投票机，长期像称重机——价格终将回归价值。',
    coverSrc: '/books/random-walk-wall-street.jpg',
  }),
  book({
    id: 'americana',
    title: '美国资本主义史',
    author: 'Bhu Srinivasan',
    englishTitle: 'Americana',
    phase: 'foundation',
    quote: '资本主义的故事，也是创新与风险如何改写国家命运的故事。',
    coverSrc: '/books/americana.jpg',
  }),
  book({
    id: 'big-short',
    title: '大空头',
    author: 'Michael Lewis',
    englishTitle: 'The Big Short',
    phase: 'foundation',
    quote: '当所有人都在狂欢，少数看清泡沫的人，反而成了最孤独的人。',
    coverSrc: '/books/big-short.jpg',
  }),
  book({
    id: 'devil-take-hindmost',
    title: '投机狂潮',
    author: 'Edward Chancellor',
    englishTitle: 'Devil Take the Hindmost',
    phase: 'foundation',
    quote: '投机从未消失，它只是换了一件新外衣，再次诱惑后来者。',
    coverSrc: '/books/devil-take-hindmost.jpg',
  }),
  book({
    id: 'lords-of-finance',
    title: '金融之王',
    author: 'Liaquat Ahamed',
    englishTitle: 'Lords of Finance',
    phase: 'foundation',
    quote: '央行行长的每一个决定，都可能改写一代人的财富命运。',
    coverSrc: '/books/lords-of-finance.jpg',
  }),
  book({
    id: 'common-sense-investing',
    title: '共同基金常识',
    author: 'John C. Bogle',
    englishTitle: 'The Little Book of Common Sense Investing',
    phase: 'weapon',
    quote: '不要找针，买下整个草堆——低成本指数基金是普通人的利器。',
    coverSrc: '/books/common-sense-investing.jpg',
  }),
  book({
    id: 'millionaire-teacher',
    title: '老师的理财课',
    author: 'Andrew Hallam',
    englishTitle: 'The Millionaire Teacher',
    phase: 'weapon',
    quote: '普通人也能成为百万富翁，关键是纪律、低成本与长期主义。',
    coverSrc: '/books/millionaire-teacher.svg',
  }),
  book({
    id: 'simple-path-to-wealth',
    title: '致富之路',
    author: 'JL Collins',
    englishTitle: 'The Simple Path to Wealth',
    phase: 'weapon',
    quote: '财富之路可以很简单：多储蓄、少折腾、长期持有指数基金。',
    coverSrc: '/books/simple-path-to-wealth.jpg',
  }),
  book({
    id: 'invested',
    title: '投资的养成',
    author: 'Danielle Town',
    englishTitle: 'Invested',
    phase: 'dragon',
    quote: '投资是一生的事业——像巴菲特与芒格那样，用一生打磨判断力。',
    coverSrc: '/books/invested.jpg',
  }),
  book({
    id: 'one-up-on-wall-street',
    title: '战胜华尔街',
    author: 'Peter Lynch',
    englishTitle: 'One Up On Wall Street',
    phase: 'dragon',
    quote: '了解你所持有的每一只股票，胜过追逐一百个你不懂的故事。',
    coverSrc: '/books/one-up-on-wall-street.jpg',
  }),
  book({
    id: 'intelligent-investor',
    title: '聪明的投资者',
    author: 'Benjamin Graham',
    englishTitle: 'The Intelligent Investor',
    phase: 'dragon',
    quote: '安全边际是投资的核心——以低于价值的价格买入，留出犯错的空间。',
    coverSrc: '/books/intelligent-investor.jpg',
  }),
]
