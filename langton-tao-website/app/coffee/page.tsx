import { CoffeeTabs } from '@/components/sections/coffee/coffee-tabs'
import { Section, SectionTitle } from '@/components/layout/section'

export default function CoffeePage() {
  return (
    <Section className="pt-24" aria-labelledby="coffee-title">
      <SectionTitle id="coffee-title">熊比特咖啡</SectionTitle>
      <p className="mt-4 max-w-2xl text-zinc-600">
        投资、保全、化债、传承、税务、身份规划、一体双跨——在可信赖的对话场景中展开复杂议题。
      </p>
      <CoffeeTabs />
    </Section>
  )
}
