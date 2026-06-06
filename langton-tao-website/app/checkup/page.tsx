import { CheckupCta } from '@/components/sections/checkup/checkup-cta'
import { Section, SectionTitle } from '@/components/layout/section'

export default function CheckupPage() {
  return (
    <Section className="pt-24" narrow aria-labelledby="checkup-title">
      <SectionTitle id="checkup-title">体检</SectionTitle>
      <p className="mt-6 leading-relaxed text-zinc-600">
        财富大健康体检：从资产结构、风险敞口与保障缺口出发，为家族建立可年检的风控体系。具体内容待补充，欢迎预约顾问初步沟通。
      </p>
      <CheckupCta />
    </Section>
  )
}
