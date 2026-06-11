import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { coffee2LifeEvents } from '@/lib/content/coffee-manifesto'

export function Coffee2LifeEventsSection() {
  return (
    <section
      id="coffee-life-events"
      className="scroll-mt-28 border-b border-zinc-200 bg-zinc-50 py-16 md:py-24"
      aria-labelledby="coffee2-life-events-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p className="c2-eyebrow">Life Events · 人生大事</p>
          <h2
            id="coffee2-life-events-title"
            className="c2-display mt-4 text-3xl text-zinc-950 md:text-4xl"
          >
            五件人生大事
          </h2>
          <p className="mt-4 max-w-2xl text-base text-zinc-600 md:text-lg">
            活着、养老、教育、婚姻、传承——熊比特从「事」出发，先把人生框架讲清楚。
          </p>
        </Coffee2Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {coffee2LifeEvents.map((event, index) => (
            <Coffee2Reveal
              key={event.title}
              as="li"
              delay={index * 70}
              className="c2-card flex flex-col p-5 md:p-6"
            >
              <p className="text-2xl font-black text-zinc-950">{event.title}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
                {event.summary}
              </p>
            </Coffee2Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
