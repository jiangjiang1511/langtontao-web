import { ContactTrigger } from '@/components/contact-trigger'
import { JarsyReveal } from '@/components/jarsy/jarsy-reveal'
import {
  checkupPageMeta,
  wealthHealthCheckupItems,
} from '@/lib/content/checkup2-page'

export function Checkup2ItemsSection() {
  return (
    <section
      id="checkup-items"
      className="scroll-mt-20 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="checkup2-items-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <JarsyReveal className="max-w-2xl">
          <p className="c2-eyebrow">Plus 及以上会员</p>
          <h2
            id="checkup2-items-title"
            className="c2-display mt-4 text-4xl text-zinc-950 md:text-5xl"
          >
            六项体检内容
          </h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-600 md:text-lg">
            {checkupPageMeta.lead}
          </p>
        </JarsyReveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:gap-6">
          {wealthHealthCheckupItems.map((item, index) => (
            <JarsyReveal
              key={item.title}
              delay={index * 70}
              className="c2-card p-6 md:p-8"
            >
              <p className="c2-step-number text-3xl md:text-4xl">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="mt-4 text-lg font-semibold text-zinc-950 md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
                {item.description}
              </p>
            </JarsyReveal>
          ))}
        </div>

        <JarsyReveal delay={200} className="mt-12">
          <ContactTrigger className="c2-btn-primary">
            预约咨询
          </ContactTrigger>
        </JarsyReveal>
      </div>
    </section>
  )
}
