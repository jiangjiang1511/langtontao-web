export type AboutModuleId = 'life-events' | 'industries' | 'exposure' | 'assets'

export type AboutModuleGroup = {
  title: string
  items: string[]
}

export type AboutModule = {
  id: AboutModuleId
  title: string
  summary: string
  groups: AboutModuleGroup[]
}

export const aboutModules: AboutModule[] = [
  {
    id: 'life-events',
    title: '第二天的人生大事',
    summary: '关注家庭资产配置、教育/人生认知、二代传承',
    groups: [
      {
        title: '关注资产配置',
        items: ['地产', '化债', '物理地产变成金融地产'],
      },
      {
        title: '关注教育',
        items: [
          '要不要听爸爸妈妈的话',
          '贫穷的本质',
          '要不要存教育金',
          '认知',
        ],
      },
      { title: '关注二代', items: ['一切为了孩子', '成为一个好祖先'] },
      {
        title: '关注人性/信仰',
        items: ['自卑', '自我证明', '主体性', '贪婪/欲望', '恐惧/焦虑', '……'],
      },
    ],
  },
  {
    id: 'industries',
    title: '我们关注的行业',
    summary: '金融、法律、教育、生命、经营、健康、文脉',
    groups: [
      {
        title: '金融',
        items: [
          '银行',
          '开卡开户',
          '贷款',
          '手续费',
          '现金',
          '券商',
          '保险',
          '货币兑换与套利',
          '海外公司注册、管理',
          '地产',
          '债务',
          '化债',
        ],
      },
      { title: '法律', items: ['婚姻关系', '股权', '风险隔离', '税务', '税务身份'] },
      { title: '教育', items: ['伴学', '游学', '升学', '助学'] },
      {
        title: '生命',
        items: ['养老', '殡葬', '长辈', '宠物', '生育', 'IVF', '鉴定', '冻精冻卵'],
      },
      { title: '经营', items: [] },
      { title: '健康', items: ['营养', '医疗', '医美'] },
      { title: '文脉', items: ['IP', '自媒体'] },
    ],
  },
  {
    id: 'exposure',
    title: '家庭敞口',
    summary: '系统化识别与管理家庭资产负债表风险',
    groups: [
      { title: '现金流', items: [] },
      { title: '债务', items: ['贷款', '债权', '个人债务'] },
      {
        title: '婚姻关系',
        items: ['非婚关系', '同性关系', '再婚', '离异', '丧偶'],
      },
      {
        title: '认知风险',
        items: ['被骗/被收割', '私募/投资/信托/保险', '慈善'],
      },
      { title: '同频风险', items: ['财商的缺失'] },
      { title: '健康', items: ['基因筛查', '重疾', '意外', '不良习惯'] },
      { title: '合作关系', items: ['政商', '股权/期权'] },
      { title: '社会身份', items: ['党派身份', '行业身份', '高敏感职业'] },
      { title: '舆情', items: ['IP', '流量风险'] },
    ],
  },
  {
    id: 'assets',
    title: '家庭大类资产',
    summary: '跨周期、跨币种的资产配置与传承架构',
    groups: [
      {
        title: '数字资产',
        items: ['账号', '知识产权', '品牌', '著作', '藏品', '加密货币', '黄金'],
      },
      { title: '房产', items: [] },
      { title: '现金', items: [] },
      { title: '保险', items: [] },
      { title: '基金/债券', items: [] },
      { title: '股票', items: [] },
      { title: '人脉资源', items: [] },
    ],
  },
]

export const aboutModuleById = Object.fromEntries(
  aboutModules.map((m) => [m.id, m])
) as Record<AboutModuleId, AboutModule>
