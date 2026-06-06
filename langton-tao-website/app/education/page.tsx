import type { Metadata } from 'next'
import { bookshelf } from '@/lib/content/home-sections'
import { Section, SectionTitle } from '@/components/layout/section'

export const metadata: Metadata = {
  title: '教育 | 朗敦道 Langton Tao',
  description: '读书与英语——打开认知与世界入口的教育板块',
}

const englishSubsections = ['留学规划', '语言学习', '海外升学'] as const

export default function EducationPage() {
  return (
    <>
      <Section id="reading" aria-labelledby="reading-title" className="pt-24">
        <SectionTitle id="reading-title">读书</SectionTitle>
        <p className="mt-3 text-lg text-zinc-600">打开认知的入口</p>
        <ul className="mt-10 space-y-4">
          {bookshelf.map((book) => (
            <li
              key={`${book.title}-${book.date}`}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <p className="font-medium text-zinc-900">{book.title}</p>
              <p className="mt-1 text-sm text-zinc-600">
                {book.author} · {book.date}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        id="english"
        aria-labelledby="english-title"
        className="bg-zinc-50"
      >
        <SectionTitle id="english-title">英语</SectionTitle>
        <p className="mt-3 text-lg text-zinc-600">
          是一种思维方式，是一种打开世界的入口
        </p>
        <p className="mt-4 text-sm text-zinc-500">
          所有留学相关内容归属本区块
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {englishSubsections.map((title) => (
            <div
              key={title}
              className="rounded-xl border border-zinc-200 bg-white p-6"
            >
              <h3 className="font-semibold text-zinc-900">{title}</h3>
              <p className="mt-2 text-sm text-zinc-500">内容待补充</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
