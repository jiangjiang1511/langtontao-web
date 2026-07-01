import Image from 'next/image'
import { Coffee2Reveal } from '@/components/sections/coffee2/coffee2-reveal'
import { LangtontaoSubsectionHeader } from '@/components/sections/langtontao/langtontao-subsection-header'
import {
  langtontaoSuperheroExpeditions,
  langtontaoSuperheroExpeditionsMeta,
  type LangtontaoSuperheroExpeditionStatus,
} from '@/lib/content/langtontao/langtontao-superhero-journey'
import { cn } from '@/lib/utils'

const STATUS_LABEL: Record<LangtontaoSuperheroExpeditionStatus, string> = {
  open: '预约开放',
  upcoming: '筹备中',
  past: '已结束',
}

function ExpeditionCard({
  title,
  location,
  summary,
  status,
  statusLabel,
  dateLabel,
  coverSrc,
  href,
  delay,
}: {
  title: string
  location: string
  summary: string
  status: LangtontaoSuperheroExpeditionStatus
  statusLabel?: string
  dateLabel?: string
  coverSrc: string
  href?: string
  delay: number
}) {
  const content = (
    <>
      <div className="lt-superhero-expeditions__media relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={coverSrc}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 85vw, 320px"
        />
        <span
          className={cn(
            'lt-superhero-expeditions__status',
            status === 'open' && 'lt-superhero-expeditions__status--open',
            status === 'upcoming' && 'lt-superhero-expeditions__status--upcoming',
            status === 'past' && 'lt-superhero-expeditions__status--past'
          )}
        >
          {statusLabel ?? STATUS_LABEL[status]}
        </span>
      </div>

      <div className="lt-superhero-expeditions__body">
        <p className="lt-superhero-expeditions__location">{location}</p>
        <h4 className="lt-superhero-expeditions__title">{title}</h4>
        <p className="lt-superhero-expeditions__summary">{summary}</p>
        {dateLabel ? (
          <p className="lt-superhero-expeditions__date">{dateLabel}</p>
        ) : null}
      </div>
    </>
  )

  return (
    <Coffee2Reveal delay={delay} className="lt-superhero-expeditions__card-wrap">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="lt-superhero-expeditions__card lt-superhero-expeditions__card--link"
          aria-label={`${title}：打开小程序详情`}
        >
          {content}
        </a>
      ) : (
        <article className="lt-superhero-expeditions__card">{content}</article>
      )}
    </Coffee2Reveal>
  )
}

export function LangtontaoSuperheroExpeditions() {
  const hasExpeditions = langtontaoSuperheroExpeditions.length > 0

  return (
    <section
      id="superhero-expeditions"
      className="lt-superhero-expeditions scroll-mt-28 mt-16 md:mt-20"
      aria-labelledby="superhero-expeditions-title"
    >
      <LangtontaoSubsectionHeader
        id="superhero-expeditions-title"
        eyebrow={langtontaoSuperheroExpeditionsMeta.eyebrow}
        title={langtontaoSuperheroExpeditionsMeta.title}
        lead={langtontaoSuperheroExpeditionsMeta.lead}
        theme="superhero"
      />

      {hasExpeditions ? (
        <div className="lt-superhero-expeditions__track mt-8">
          {langtontaoSuperheroExpeditions.map((expedition, index) => (
            <ExpeditionCard
              key={expedition.id}
              title={expedition.title}
              location={expedition.location}
              summary={expedition.summary}
              status={expedition.status}
              statusLabel={expedition.statusLabel}
              dateLabel={expedition.dateLabel}
              coverSrc={expedition.coverSrc}
              href={expedition.href}
              delay={60 + index * 50}
            />
          ))}
        </div>
      ) : (
        <Coffee2Reveal delay={80}>
          <p className="lt-superhero-expeditions__empty mt-8">
            {langtontaoSuperheroExpeditionsMeta.emptyMessage}
          </p>
        </Coffee2Reveal>
      )}
    </section>
  )
}
