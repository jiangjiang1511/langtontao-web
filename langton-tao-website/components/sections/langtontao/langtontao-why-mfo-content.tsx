import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoExposureShowcase } from '@/components/sections/langtontao/langtontao-exposure-showcase'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import {
  langtontaoMfoNeedLines,
  langtontaoWhyMfoMeta,
} from '@/lib/content/langtontao/langtontao-why-mfo'

export function LangtontaoWhyMfoContent() {
  return (
    <div id="why-mfo" className="scroll-mt-28">
      <LangtontaoSubsectionHeader
        eyebrow={langtontaoWhyMfoMeta.eyebrow}
        title={langtontaoWhyMfoMeta.title}
        lead={langtontaoWhyMfoMeta.lead}
        theme="home"
      />

      <div className="lt-exposure-showcase-block mt-10">
        <div className="lt-exposure-showcase__bg" aria-hidden>
          <div className="lt-exposure-showcase__bg-surface" />
          <div className="lt-exposure-showcase__glow lt-exposure-showcase__glow--a" />
          <div className="lt-exposure-showcase__glow lt-exposure-showcase__glow--b" />
        </div>
        <h4 className="relative z-10 lt-heading-l3 lt-heading-l3--center text-center">
          家庭风险敞口
        </h4>
        <p className="relative z-10 mt-2 text-center text-sm text-zinc-600">
          系统化识别与管理家庭资产负债表风险——点击分类筛选，在流动画面中查看关注等级。
        </p>
        <div className="relative z-10 mt-8">
          <LangtontaoExposureShowcase />
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {langtontaoMfoNeedLines.map((line, index) => (
          <Coffee2Reveal key={line.id} delay={80 + index * 60} as="article">
            <article className="c2-card h-full p-5">
              <h3 className="font-semibold text-zinc-950">{line.title}</h3>
              <p className="mt-1 text-xs text-zinc-500">{line.summary}</p>
              <ul className="mt-3 space-y-1">
                {line.items.map((item) => (
                  <li key={item} className="text-xs text-zinc-600">
                    · {item}
                  </li>
                ))}
              </ul>
            </article>
          </Coffee2Reveal>
        ))}
      </div>
    </div>
  )
}
