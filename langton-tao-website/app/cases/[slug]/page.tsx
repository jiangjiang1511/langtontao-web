import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Cases2Detail } from '@/components/sections/cases2/cases2-detail'
import { caseStories, getCaseStory } from '@/lib/content/cases2-page'
import '@/styles/jarsy-v2.css'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return caseStories.map((story) => ({ slug: story.slug }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const story = getCaseStory(slug)

  if (!story) {
    return { title: '案例未找到 | 朗敦道 Langton Tao' }
  }

  return {
    title: `${story.title} | 朗敦道 Langton Tao`,
    description: story.excerpt,
  }
}

export default async function CaseStoryPage({ params }: PageProps) {
  const { slug } = await params
  const story = getCaseStory(slug)

  if (!story) {
    notFound()
  }

  return <Cases2Detail story={story} />
}
