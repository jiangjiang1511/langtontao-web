# 朗敦道官网 — v0.dev UI 生成 Prompt

> **使用方式**：将下方「主 Prompt」整段复制到 v0.dev。若单次生成过长，按文末「分片策略」分 3 次生成后合并。技术栈与 `webdesign-draft` 一致：Next.js 14 App Router、Tailwind CSS、shadcn/ui、移动端优先。

---

## 参考网站设计亮点分析（写入 v0 的设计 DNA）

### 网站 A — One New Bite (onenewbite.com)

| 维度 | 亮点 | 朗敦道迁移方式 |
|------|------|----------------|
| 排版 | 全屏 Hero + 超大字号分行标题（英文 slogan 两行断行）；正文区 `max-width` 居中、段落行高宽松 | Hero 用「VFO/MFO Leader in China」+ 中文副标题两行；section 统一 `max-w-[720px]` 叙事、`max-w-[1200px]` 卡片栅格 |
| 导航 | 顶栏固定、半透明毛玻璃；一级项 5–7 个 + 右侧主 CTA「加入我们」 | 三项一级导航 + 右侧「预约咨询」；移动端底部 Tab 或汉堡抽屉 |
| 交互 | **锚点长页滚动** + 模块依次入场（fade-up，仅触发一次）；「HOW IT WORKS」数字步骤 01–03 | 首页用 `#section-id` 锚点；关键模块 `scroll-margin-top: 80px`；步骤区用于「成立家办 / 加入家办 / 十年愿望」 |
| 社会证明 | 横向无限滚动用户评价，带城市标签 | 家办客户/合伙人语录轮播（可先用占位） |
| 内容陈列 | 书架横向滚动卡片、活动列表带类型标签 | 新型家办工具用 **横向 snap 卡片**；全球网络用 **logo 墙 + 地图点** |
| 转化 | 双 CTA：主按钮实心 + 次按钮描边；FAQ 手风琴收口 | 每屏最多 1 主 1 次 CTA；页脚前 FAQ |

### 网站 B — Jarsy (jarsy.com)

| 维度 | 亮点 | 朗敦道迁移方式 |
|------|------|----------------|
| 审美 | 金融科技高级感：大留白、冷灰白底、深色文字、细边框卡片 | 暖白底 `#FAF8F5` + 墨色 `#1A2332` + 香槟金点缀 `#C9A962`（家办信任感） |
| 动效 | Hero 区 **循环微动效**（抽象图形/光晕/blob 缓慢漂浮）；卡片 hover 轻微上浮 | Hero 背景 `framer-motion` 或 CSS 动画 3 个 blur 圆 slow float；卡片 `hover:-translate-y-1` |
| 信息层次 | H2 极大 + 一行价值句 + 三列 equal-height 特性卡 | 每个首页模块：Eyebrow 小标签 → H2 → 60–80 字导语 → 2–3 列卡片 |
| 信任 | 「Featured On / Backed by」横向 logo 条 | 「一体双跨」合作伙伴 logo 条，灰度 hover 彩色 |
| 叙事 | 分段标题如 “Private Markets were never meant to be this closed.” 制造张力 | 特色区用全宽引用条：「朗敦道不是通往财富的街…」 |

### 综合设计语言（v0 必须遵守）

- **布局**：Mobile-first；断点 `sm:640` `md:768` `lg:1024` `xl:1280`
- **间距**：Section 垂直 `py-16`（移动）/ `py-24`（桌面）；容器水平 `px-4 sm:px-6 lg:px-8`
- **圆角**：卡片 `rounded-2xl`；按钮 `rounded-full`（主 CTA）或 `rounded-lg`（次）
- **动效预算**：单元素入场 ≤500ms；`prefers-reduced-motion` 时禁用漂浮动画；仅 `transform`/`opacity`
- **字体**：标题 `font-serif`（Noto Serif SC 或 Georgia fallback）；正文 `font-sans`（Inter / Noto Sans SC）
- **图标**：lucide-react；勿用 emoji 作 UI 图标

---

# 主 Prompt（复制以下内容至 v0.dev）

```
Build a premium Chinese family-office marketing website "朗敦道 Langton Tao" using Next.js 14 App Router, TypeScript, Tailwind CSS, and shadcn/ui components. Mobile-first, fully responsive. Chinese primary copy exactly as specified below—do not paraphrase headlines.

## Design system
- Colors: background #FAF8F5, foreground #1C1C1C, primary #1A2332, accent #C9A962, muted text #5C5C5C, border #E8E4DE
- Container: max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8
- Section padding: py-16 md:py-24
- Typography mobile/desktop:
  - Hero H1: text-[32px] leading-[1.1] md:text-[56px] md:leading-[1.05] font-serif font-semibold
  - Section H2: text-[26px] md:text-[40px] font-serif
  - Section eyebrow: text-[12px] md:text-[13px] uppercase tracking-[0.2em] text-accent font-medium
  - Body: text-[15px] md:text-[17px] leading-[1.7] text-muted-foreground
  - Card title: text-[18px] md:text-[20px] font-semibold
- Sticky header: h-[64px] md:h-[72px], backdrop-blur-md bg-[#FAF8F5]/80 border-b border-[#E8E4DE], z-50
- Animations: framer-motion fade-up on scroll into view (once); hero has 3 slow-floating gradient blobs (CSS or motion, 8s loop); respect prefers-reduced-motion

## Global chrome

### Header (all pages)
- Left: wordmark "朗敦道" text-[20px] font-serif, links to /
- Center nav (hidden below md, show as bottom sheet on mobile):
  1. "首页" → /
  2. "何必家办" → /hebi
  3. "何以为家" → /heyi
- Right: Button primary "预约咨询" → opens shadcn Dialog (see Contact Dialog)
- Mobile: hamburger opens Sheet from right, same links + CTA full width h-[48px]
- Active route: underline accent 2px

### Contact Dialog (triggered by 预约咨询)
- Title: "预约顾问沟通"
- Fields: 姓名 (required), 手机 (required), 邮箱 (optional), 意向 (Select: 成立家办 / 加入家办 / 了解服务 / 其他)
- Submit button: "提交预约" h-[44px]
- On submit: toast "我们已收到您的信息，顾问将在 1 个工作日内联系您"
- Size: max-w-[440px], padding p-6

### Footer (all pages)
- min-h-[320px], bg primary #1A2332, text white/80
- Col1: 朗敦道 logo + tagline "为第二代华人财富传承提供系统解决方案" text-[14px] max-w-[280px]
- Col2 links: 首页, 何必家办, 何以为家
- Col3: 合规声明 text-[12px] leading-relaxed "本站内容仅供教育与交流，不构成投资建议。"
- Bottom bar: © 2026 朗敦道, Terms, Privacy placeholders
- Padding: py-12 md:py-16

---

## PAGE 1: Home `/`

Long-scroll landing with anchor sections. Include scroll spy optional. Order sections exactly as below.

### Section 1 — Hero `#hero`
- Layout: min-h-[100svh] flex flex-col justify-center relative overflow-hidden
- Background: 3 animated blur circles (accent/primary 20% opacity, 200–400px)
- Content max-w-[720px]:
  - Eyebrow: "VFO / MFO Leader in China" text-[13px] tracking-widest text-accent
  - H1 line1: "VFO/MFO Leader in China"
  - H1 line2 (Chinese): "为第二代华人财富传承提供系统解决方案" text-[28px] md:text-[40px] mt-4
  - Subcopy (optional): none in hero—keep minimal
- CTAs row mt-8 gap-3 flex flex-col sm:flex-row:
  - Primary "预约咨询" h-[48px] px-8 → opens Contact Dialog
  - Secondary outline "探索家办路径" h-[48px] px-8 → scroll to #tools or link /hebi
- Scroll hint: chevron bottom center, animate bounce, click scrolls to #mission
- Interaction: on load, headline stagger fade-in 100ms delay between lines (max 400ms total)

### Section 2 — Mission `#mission`
- Eyebrow: "使命 · 愿景 · 价值观"
- H2: "提前思考十年后的路"
- Body (exact): "朗敦道不是通往财富的街，而是陪你提前思考十年后的路——普通人的诚实投资学与人生认知定投计划，绝非咨询服务，而是具身认知的陪跑。"
- Layout: 2-col md grid; left text, right 3 stacked value cards h-[120px] each:
  1. "使命" — "让二代华人家族在不确定时代拥有可执行的传承系统"
  2. "愿景" — "成为中国最具影响力的联合家族办公室生态"
  3. "价值观" — "合规 · 同频 · 具身 · 长期主义"
- Card style: bg white border rounded-2xl p-5, hover shadow-md transition 200ms
- Section min-height: auto; padding as global

### Section 3 — Who we are `#about`
- Eyebrow: "我们是什么"
- H2: "新型联合家族办公室（MFO）"
- Lead (exact): "为第二代华人财富传承提供系统解决方案，集结投资人、法税专家与战略先行者。"
- 4 feature tiles grid: 2x2 mobile, 4x1 desktop, each min-h-[160px]:
  | Title | Body |
  | 第二天的人生大事 | 关注家庭资产配置、教育/人生认知、二代传承 |
  | 业务涉及行业 | 跨境投资、教育、法税、保险、游学与商学院 |
  | 家庭敞口 | 系统化识别与管理家庭资产负债表风险 |
  | 家庭资产 | 跨周期、跨币种的资产配置与传承架构 |
- Interaction: tiles fade-up on scroll; icon 32px lucide per tile (calendar, building, shield, pie-chart)

### Section 4 — Problems we solve `#problems`
- Eyebrow: "我们解决什么问题"
- H2: "财富 · 关系 · 选择"
- Layout: 3 equal cards desktop, horizontal scroll snap mobile (card w-[85vw] snap-center gap-4)
- Card 1 财富: title "解决财富的问题"; bullets: 宏观诊断, 资产配置, 风险问诊
- Card 2 关系: title "解决关系的问题"; bullets: 血缘关系, 法律关系
- Card 3 选择: title "解决选择的问题"; bullets: 足够的财商, 足够的认知, 家庭的同频
- Each card: p-6 md:p-8, bg white, border-l-4 border-accent

### Section 5 — Who we serve `#serve`
- Full-width band bg #1A2332 text white py-20
- H2: "我们服务于谁"
- Quote exact: "致力于为高净值家庭提供跨越周期的「家族传承系统解决方案」。"
- Text center max-w-[640px] text-[18px] md:text-[22px] font-serif
- CTA: "了解何必家办" ghost white border → /hebi

### Section 6 — New family office tools `#tools`
- Eyebrow: "新型家办工具"
- H2: "AI + 专家 + 具身，三位一体"
- Sub: "顶级赛博顾问体系与 Family OS 中枢，连接智库、操盘组与数字化业务流。"
- **Horizontal scroll** container pb-4 snap-x, cards w-[300px] md:w-[340px] flex-shrink-0 gap-4:
  1. "Family OS 中枢" — "AI 智能化大脑：宏观经济、顶层架构与风险诊断"
  2. "宏观与传承智库" — "郑荣禄博士《代代幸福》底层逻辑；李稻葵博士等宏观经济与传承顶尖大脑"
  3. "实战操盘专家组" — "财富问诊体系、资深风险管家、跨境信托、国际法税合规"
  4. "龙虾助手" — "您的 7×24 数字化家办助理入口"
  5. "数字化体系" — "业务流 · 业务工具 · 分佣体系 · CRM"
  6. "具身体系" — "超级英雄之旅、线下读书会、投资沙龙、六人茶局、私董会"
  7. "新型商业模式" — "DOK 社交 · 付费社群 · COSTCO 会员制 · 工具类 OPC · 学习类"
- Card: h-[220px], gradient top border accent, illustration placeholder 80px abstract shape (animated pulse slow)
- Desktop: show arrow buttons to scroll ±1 card
- Interaction: drag scroll mobile; keyboard accessible

### Section 7 — Global network `#network`
- Eyebrow: "一体双跨 · Global Network"
- H2: "全球战略合作伙伴网络"
- Two columns md:
  - **国内大脑与架构中枢** — bullets: 顶层规划; 游学·博睿学者; 商学院·CXO; 教育·北美芝仕留学; 北美投资·以诺财富; 律所/税务/会计
  - **香港** — bullets: 比元家族办公室 BE ONE（香港前三）; 资遇资管 ZUU（300+ 持牌港险经纪）; 普晖国际（国际教育/身份规划）; 1/4/9 全金融牌照 · 两处香港一线海景职场
- Below: logo strip h-[64px] grayscale opacity-60 hover:opacity-100 (6 placeholder boxes)
- Optional: simplified SVG map dots HK + mainland

### Section 8 — Our differentiation `#features`
- Eyebrow: "我们的特色"
- H2: "工坊 · 活动 · 财商"
- 3 stat blocks row: "300+" label "场活动"; "工坊" label "小规模深度陪跑"; "财商课" label "诚实投资学"
- Program cards grid 1 col md:3:
  - "超级英雄之旅"
  - "千万富翁养成计划"
  - "COSTCO 模式" sub "会员体系 + 私董会，立体多维 MFO 生态"
- Pull quote full width bg accent/10 border-l-4 border-accent p-6 md:p-10 text-[17px] md:text-[19px] italic font-serif — use mission quote shortened if needed
- **朗敦道十纲** accordion (shadcn): single item expanded default — title "合规"; content exact: "通过【教育 + 财富】的双螺旋组织业务，严守金融合规底线。"

### Section 9 — Architecture `#architecture`
- Eyebrow: "我们的架构和业务"
- H2: "双螺旋业务版图"
- Diagram placeholder: centered box 100% max-w-[900px] h-[320px] md:h-[400px] border dashed rounded-2xl flex items-center justify-center text-muted "组织架构图占位 — 可替换为 SVG/图片"
- Caption: "教育 × 财富 · 国内中枢 × 香港交付"

### Section 10 — Testimonials `#stories` (One New Bite pattern)
- H2: "伙伴与客户说"
- Horizontal auto-scroll marquee pause on hover, card w-[320px]:
  - Placeholder quote 1: "社群让我开启了人生的第二种可能性。" — 客户 A · 上海
  - Placeholder quote 2: "在这里找到了同频的成长伙伴。" — 客户 B · 香港
  - Placeholder quote 3: "跨越周期的传承需要系统，而非单点产品。" — 客户 C · 新加坡
- Speed: 40s linear infinite; duplicate cards for seamless loop

### Section 11 — FAQ `#faq`
- H2: "常见问题"
- Accordion 5 items:
  1. Q "朗敦道与传统家办有何不同？" A "我们强调联合 MFO、AI Family OS、具身活动与全球双跨网络，是教育与财富的双螺旋生态，而非单一产品销售。"
  2. Q "是否提供投资建议？" A "本站与相关活动以教育、认知与架构咨询为主，不构成法定投资建议；具体产品由持牌合作方提供。"
  3. Q "如何成立或加入家办？" A "请通过「何必家办」了解成立家办、加入家办与十年愿望清单三条路径，或预约顾问沟通。"
  4. Q "服务哪些家庭？" A "面向关注二代传承、跨境资产、法税合规与教育规划的高净值及准高净值家庭。"
  5. Q "香港与内地如何协同？" A "内地负责顶层规划与资源矩阵，香港比元、资遇、普晖等负责跨境交付与牌照业务。"

### Section 12 — Final CTA `#cta`
- min-h-[280px] flex flex-col items-center justify-center text-center
- H2: "开启你的家族传承系统"
- Buttons: Primary 预约咨询, Secondary 前往何必家办 → /hebi

---

## PAGE 2: 何必家办 `/hebi`

Theme: warm, life-model narrative. Page hero different from home.

### Hero
- min-h-[60vh] md:min-h-[70vh]
- Eyebrow: "何必家办"
- H1: "代代幸福的人生模型"
- Sub exact: "成立、加入、愿景——三条路径，指向同一个十年后的家庭。"
- CTA: "开始十年愿望清单" → #wishlist

### Path selector (tabs shadcn, sticky below header on scroll optional)
- Tabs: "成立家办" | "加入家办" | "十年愿望清单"
- Default tab: 成立家办
- Tab bar h-[48px], full width on mobile scrollable

### Tab content — 成立家办 `#setup`
- H2: "成立家办"
- Intro exact: "面向拟设立家族办公室的家庭，从顶层架构、法税合规到二代教育同频，一站式启动。"
- Steps (Jarsy/One New Bite 01-02-03 style), vertical mobile horizontal desktop:
  - 01 诊断 — "家庭资产负债表与传承目标问诊" — icon clipboard
  - 02 架构 — "境内外主体、信托与保险协同设计" — icon layers
  - 03 运行 — "Family OS 上线 + 顾问组陪跑" — icon cpu
- Card size each step: min-w-[260px] p-6 bg white rounded-2xl
- CTA bottom: "预约成立家办咨询" → Contact Dialog with 意向 pre-selected 成立家办

### Tab content — 加入家办 `#join`
- H2: "加入家办"
- Intro exact: "面向希望进入成熟家办生态的成员与合作伙伴，共享网络、活动与数字化工具。"
- Benefits grid 2x2: "全球活动网络", "专家智库课程", "私董会与六人茶局", "COSTCO 会员权益"
- Comparison strip: "个人投资者 · 创业者 · 法税顾问 · 教育伙伴" as clickable chips filtering nothing (UI only) OR static tags
- CTA: "申请加入生态" → Dialog field 意向=加入家办

### Tab content — 十年愿望清单 `#wishlist`
- H2: "你的家庭「十年」愿望清单"
- Intro exact: "用十年尺度重新审视家庭：资产、关系、教育、传承，写下可执行的愿望而非空泛口号。"
- Interactive checklist UI (client component):
  - 4 categories accordion: 财富目标, 关系与同频, 教育与二代, 传承与合规
  - Each category 3 checkbox items (placeholder text editable by user)
  - Bottom: "导出清单（PDF）" button disabled state with tooltip "即将上线" — OR generate simple print view
- Visual: progress ring showing % checked, size 120px, center on mobile top on desktop right column
- Layout: lg:grid lg:grid-cols-[1fr_280px] gap-8

### Bottom cross-link
- Card: "还在思考财富的本质？" link → /heyi#wealth

---

## PAGE 3: 何以为家 `/heyi`

Editorial / magazine feel. Calm typography, more whitespace.

### Hero
- min-h-[50vh]
- H1: "何以为家"
- Sub: "重新定义财富、美与香港的意义。"
- No heavy animation—slow fade only

### Article hub grid
- 2x2 md grid gap-6, cards min-h-[200px]:
  1. **何为财富** `/heyi#wealth` — teaser exact: "如果钱不是静止的，资产也不是静止的，那财富到底应该怎么衡量？" — tag "深度阅读"
  2. **何事惊慌** — teaser: "在波动时代，家庭何处寻找确定感？" — tag "随笔"
  3. **何为漂亮** — teaser: "审美、身份与家族形象的外在表达。" — tag "审美"
  4. **何谓香港** — teaser: "跨境枢纽如何塑造家办的坐标。" — tag "地标"
- Card interaction: entire card clickable; hover scale-[1.02] shadow-lg; arrow icon appears

### Article template sections (single page scroll anchors)

#### `#wealth` 何为财富
- Article max-w-[680px] mx-auto py-16
- H1: "何为财富"
- Deck (exact question as H2 style): "如果钱不是静止的，资产也不是静止的，那财富到底应该怎么衡量？"
- Body placeholder 3 paragraphs lorem-style BUT first paragraph must start: "朗敦道认为，财富是流动的关系网络，而非静态数字……" (generate 2 more coherent paragraphs about flow, family balance sheet, time horizon)
- Pull quote block h-[120px] border-l accent
- Related CTA: "回到家办工具" → /#tools

#### `#panic` 何事惊慌
- H1: "何事惊慌"
- Placeholder structure: 3 subheads "市场 · 关系 · 传承" each 120–150 Chinese characters content
- CTA: 预约咨询

#### `#beauty` 何为漂亮
- H1: "何为漂亮"
- Image placeholder 16:9 rounded-2xl h-[200px] md:h-[320px] bg muted
- Short essay 2 sections

#### `#hongkong` 何谓香港
- H1: "何谓香港"
- Stats row 3 cols: "1/4/9" label "金融牌照"; "300+" label "港险经纪网络"; "2" label "一线海景职场"
- Link to home #network

---

## Shared components to implement
- `SiteHeader`, `SiteFooter`, `ContactDialog`, `SectionEyebrow`, `ScrollReveal` wrapper
- Use shadcn: Button, Dialog, Sheet, Tabs, Accordion, Card, Checkbox, Toast, Select
- All images: next/image with placeholder blur or abstract SVG gradients—no stock photo faces required in v1

## Accessibility & performance
- Focus visible rings, aria-labels on icon buttons
- Semantic landmarks: header, main, footer, section aria-labelledby
- Lazy load below-fold sections
- Chinese `lang="zh-CN"` on html

## Do NOT
- Do not use purple gradients or generic AI startup aesthetic
- Do not change specified Chinese copy
- Do not add blog or login in v1 except placeholder footer links
```

---

## 分片策略（v0  token 超限时）

| 次序 | Prompt 前缀加一句 | 生成范围 |
|------|-------------------|----------|
| 1 | "Generate ONLY global chrome + Home page sections #hero through #serve" | Header, Footer, Dialog, Hero～服务于谁 |
| 2 | "Use same design system. Generate Home #tools through #cta only" | 工具～FAQ～底部 CTA |
| 3 | "Same design system. Generate /hebi and /heyi pages only" | 何必家办 + 何以为家 |

合并时统一 `tailwind.config` 色板与 `components/ui` 路径。

---

## 模块尺寸速查表

| 元素 | 移动端 | 桌面端 |
|------|--------|--------|
| Header 高度 | 64px | 72px |
| Hero 最小高度 | 100svh | 100svh |
| 主按钮高度 | 48px | 48px |
| Section 上下留白 | 64px (py-16) | 96px (py-24) |
| 内容最大宽度（叙事） | 100% - 32px padding | 720px |
| 卡片栅格最大宽度 | 100% | 1200px |
| 横向工具卡片宽 | 300px | 340px |
| 评价卡片宽 | 320px | 320px |
| Footer 最小高度 | 320px | 320px |
| 架构图占位 | 高 320px | 高 400px |

---

## 交互逻辑速查

| 触发 | 行为 |
|------|------|
| 预约咨询 | 打开 Dialog；提交 Toast；意向可预选 |
| 探索家办路径 | 首页 → `#tools` 平滑滚动 |
| 了解何必家办 | `/hebi` 路由 |
| 导航三项 | 路由切换 + 当前项下划线 |
| 工具区卡片 | 横向 snap 滑动；桌面左右箭头 |
| 评价 marquee | 自动滚动；hover 暂停 |
| Accordion FAQ / 十纲 | 单击展开单项；默认可展开第一项 |
| 何必家办 Tabs | 切换三块内容；URL hash 可选 `#setup` `#join` `#wishlist` |
| 十年愿望清单 | Checkbox 本地 state；进度环随勾选更新 |
| 何以为家卡片 | 跳转至页内 anchor |
| 滚动入场 | 每模块首次进入视口 fade-up；不重复播放 |
| reduced-motion | 关闭 blob 与 marquee 动画 |

---

*文档版本：与 webdesign-draft 架构同步，2026-06-04*
