import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStoryDetail } from '@/components/sections/cases/case-story-detail'
import { caseStories, getCaseStory } from '@/lib/content/cases'

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

  return <CaseStoryDetail story={story} />
}
