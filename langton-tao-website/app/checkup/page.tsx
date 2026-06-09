import type { Metadata } from 'next'
import { CheckupCommitmentSection } from '@/components/sections/checkup/checkup-commitment-section'
import { CheckupCta } from '@/components/sections/checkup/checkup-cta'
import { CheckupProcessSection } from '@/components/sections/checkup/checkup-process-section'
import { CheckupSignupSection } from '@/components/sections/checkup/checkup-signup-section'
import {
  Eyebrow,
  SectionSurface,
  SectionTitle,
} from '@/components/layout/section-surface'
import { checkupPageMeta } from '@/lib/content/checkup-page'
import { wealthHealthCheckupItems } from '@/lib/content/membership-v2'

export const metadata: Metadata = {
  title: '财富大健康体检 | 朗敦道 Langton Tao',
  description: checkupPageMeta.lead,
}

export default function CheckupPage() {
  return (
    <>
      <SectionSurface
        theme="yellow"
        className="pt-24 md:pt-28"
        narrow
        aria-labelledby="checkup-title"
      >
        <Eyebrow>WEALTH HEALTH CHECKUP</Eyebrow>
        <SectionTitle id="checkup-title" display>
          {checkupPageMeta.title}
        </SectionTitle>
        <p className="mt-6 text-base font-bold leading-relaxed text-[color:var(--section-muted)] md:text-lg">
          {checkupPageMeta.lead}
        </p>
        <ul className="mt-10 space-y-6">
          {wealthHealthCheckupItems.map((item, index) => (
            <li
              key={item.title}
              className="rounded-lg border-2 border-pop-black bg-pop-white p-5 shadow-pop-black"
            >
              <p className="text-xs font-black uppercase tracking-widest text-pop-black/50">
                0{index + 1}
              </p>
              <h2 className="mt-2 text-base font-black text-pop-black md:text-lg">
                {item.title}
              </h2>
              <p className="mt-2 text-sm font-bold leading-relaxed text-pop-black/70">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
        <CheckupCta />
      </SectionSurface>

      <CheckupProcessSection />
      <CheckupCommitmentSection />
      <CheckupSignupSection />
    </>
  )
}
