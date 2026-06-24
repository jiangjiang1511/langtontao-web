import { Cases2IndexSection } from '@/components/sections/cases2/cases2-index-section'
import { Checkup2ItemsSection } from '@/components/sections/checkup2/checkup2-items-section'
import { Checkup2ProcessSection } from '@/components/sections/checkup2/checkup2-process-section'
import { Checkup2SignupSection } from '@/components/sections/checkup2/checkup2-signup-section'
import { Community2HowToJoinSection } from '@/components/sections/community2/community2-how-to-join-section'
import { Community2ProgramsSection } from '@/components/sections/community2/community2-programs-section'
import { Education2EnglishSection } from '@/components/sections/education2/education2-english-section'
import { LangtontaoSolutionPanel } from '@/components/sections/langtontao/langtontao-solution-panel'
import { JarsyJoinBand } from '@/components/jarsy/jarsy-join-band'
import { education2EnglishJoin } from '@/lib/content/education2-page'

export function LangtontaoEmbeddedSolutions() {
  return (
    <div className="space-y-12">
      <LangtontaoSolutionPanel
        id="beautiful-checkup"
        eyebrow="财富养成 · 体检"
        title="财富大健康体"
        philosophy="先年检敞口与结构，再谈配置——资产负债表问诊与年度陪跑。"
      >
        <Checkup2ItemsSection />
        <div className="mt-8">
          <Checkup2ProcessSection />
        </div>
        <div className="mt-8">
          <Checkup2SignupSection />
        </div>
      </LangtontaoSolutionPanel>

      <LangtontaoSolutionPanel
        id="beautiful-cases"
        eyebrow="财富养成 · 案例"
        title="溪河案例"
        philosophy="真实案例看见问题如何被识别、拆解与修复。"
      >
        <Cases2IndexSection />
      </LangtontaoSolutionPanel>

      <LangtontaoSolutionPanel
        id="beautiful-education"
        eyebrow="超级英雄 · 英语钥匙"
        title="卓越世代 · 英语钥匙"
        philosophy="语言与国际升学路径，是就业冰河时代的人力资本长期期权。"
      >
        <Education2EnglishSection />
        <JarsyJoinBand
          id="langtontao-beautiful-education-join"
          statement={education2EnglishJoin.statement}
          tagline={education2EnglishJoin.tagline}
          ctaLabel={education2EnglishJoin.ctaLabel}
          ctaHref={education2EnglishJoin.ctaHref}
        />
      </LangtontaoSolutionPanel>

      <LangtontaoSolutionPanel
        id="beautiful-community"
        eyebrow="超级英雄 · 勇气历练"
        title="勇气历练 · 认知兑现"
        philosophy="具身陪跑与诚实投资学场域——默会知识在共同挑战中传递。"
      >
        <Community2ProgramsSection />
        <div className="mt-8">
          <Community2HowToJoinSection />
        </div>
      </LangtontaoSolutionPanel>

      <LangtontaoSolutionPanel
        id="beautiful-leader"
        eyebrow="财富养成 · 传承"
        title="家族领袖计划"
        philosophy="身份规划、信托设立、家族宪章——传承的顶层外壳与治理规则。"
      >
        <p className="text-sm leading-relaxed text-zinc-600">
          家族领袖计划涵盖身份规划、《家族宪章》、信托设立、海内外身份规划、生命科学与家庭数字资产等模块。具体方案按家庭阶段定制，请通过预约咨询与顾问对齐路径。
        </p>
      </LangtontaoSolutionPanel>

      <LangtontaoSolutionPanel
        id="beautiful-allocation"
        eyebrow="财富养成 · 配置"
        title="全球资产配置"
        philosophy="跨币种、跨周期、跨境法税——在宏观结构中定位家庭坐标。"
      >
        <p className="text-sm leading-relaxed text-zinc-600">
          全球权益、跨币种配置、跨境法务税务、企业上市前规划、数字资产确权与加密货币配置等，均在一体双跨网络中协同交付。下方专业工具可帮助理解港险与融资保单等概念。
        </p>
      </LangtontaoSolutionPanel>

      <LangtontaoSolutionPanel
        id="beautiful-cognition"
        eyebrow="超级英雄 · 认知"
        title="认知兑现圈"
        philosophy="读书会、财富沙龙、私董会——认知定投的长期场域。"
      >
        <p className="text-sm leading-relaxed text-zinc-600">
          认知定投读书会、财富投资沙龙、麦理浩径超级挑战与私董会，构成朗敦道「具身」底色的核心活动矩阵。加入会员可参与全年 300+ 场赋能活动。
        </p>
      </LangtontaoSolutionPanel>
    </div>
  )
}
