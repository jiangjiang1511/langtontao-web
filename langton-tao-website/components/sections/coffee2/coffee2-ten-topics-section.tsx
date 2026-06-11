import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import {
  coffee2TenTopics,
  coffee2TenTopicsVerse,
} from '@/lib/content/coffee-manifesto'

export function Coffee2TenTopicsSection() {
  return (
    <section
      id="coffee-ten-topics"
      className="scroll-mt-28 border-b border-zinc-200 py-16 md:py-24"
      aria-labelledby="coffee2-ten-topics-title"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Coffee2Reveal>
          <p className="c2-eyebrow">Ten Topics · 十纲</p>
          <h2
            id="coffee2-ten-topics-title"
            className="c2-display mt-4 text-3xl text-zinc-950 md:text-4xl"
          >
            十个人生话题：朗敦道十纲
          </h2>
        </Coffee2Reveal>

        <Coffee2Reveal delay={100} className="mt-10">
          <blockquote className="c2-card mx-auto max-w-2xl p-8 text-center">
            {coffee2TenTopicsVerse.map((line) => (
              <p
                key={line}
                className="text-xl font-black leading-relaxed tracking-wide text-zinc-950 md:text-2xl"
              >
                {line}
              </p>
            ))}
          </blockquote>
        </Coffee2Reveal>

        <Coffee2Reveal delay={180} className="mt-12">
          <Accordion type="single" collapsible className="mx-auto max-w-3xl">
            {coffee2TenTopics.map((topic, index) => (
              <AccordionItem key={topic.number} value={`tenet-${index}`}>
                <AccordionTrigger className="text-left font-bold">
                  <span className="mr-3 text-zinc-400">{topic.number}</span>
                  {topic.title}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600">
                  <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                    {topic.verseLine}
                  </p>
                  {'summary' in topic && topic.summary ? (
                    <p className="mt-2 leading-relaxed">{topic.summary}</p>
                  ) : (
                    <p className="mt-2 leading-relaxed text-zinc-500">
                      展开文案待补充。
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Coffee2Reveal>
      </div>
    </section>
  )
}
