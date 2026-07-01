'use client'

import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import type { EducationTopicArticleContent } from '@/lib/content/education-topic-articles'

type EducationTopicArticleDialogProps = {
  article: EducationTopicArticleContent | null
  onClose: () => void
}

function isExternalUrl(url: string) {
  return url.startsWith('http://') || url.startsWith('https://')
}

export function EducationTopicArticleDialog({
  article,
  onClose,
}: EducationTopicArticleDialogProps) {
  return (
    <Dialog
      open={article !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      {article ? (
        <DialogContent className="education-article-dialog inset-0 m-auto flex h-[min(90vh,52rem)] w-[calc(100%-2rem)] max-w-3xl translate-x-0 translate-y-0 flex-col overflow-hidden p-0">
          <DialogHeader className="shrink-0 border-b border-zinc-200 px-5 py-4 pr-14 text-left">
            <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-zinc-400">
              Coffee Chat · 家庭对话
            </p>
            <DialogTitle className="mt-2 text-xl font-semibold text-zinc-950 md:text-2xl">
              {article.headline}
            </DialogTitle>
            <p className="mt-1 text-sm text-zinc-500">
              来源：{article.outlet}
              {article.publishedAt ? ` · ${article.publishedAt}` : ''}
            </p>
          </DialogHeader>

          <div className="education-article-dialog__body min-h-0 flex-1 overflow-y-auto px-5 py-5">
            {article.lead ? (
              <p className="education-article-dialog__lead text-base leading-relaxed text-zinc-700 md:text-lg">
                {article.lead}
              </p>
            ) : null}

            <div className="education-article-dialog__blocks mt-5 space-y-5">
              {article.blocks.map((block, index) => {
                if (block.type === 'paragraph') {
                  return (
                    <p
                      key={`p-${index}`}
                      className="text-sm leading-relaxed text-zinc-600 md:text-base"
                    >
                      {block.text}
                    </p>
                  )
                }

                return (
                  <figure
                    key={`img-${block.src}`}
                    className="education-article-dialog__figure overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={block.src}
                      alt={block.alt}
                      className="education-article-dialog__image h-auto w-full object-contain"
                      loading="lazy"
                    />
                    {block.caption ? (
                      <figcaption className="px-4 py-3 text-xs leading-relaxed text-zinc-500">
                        {block.caption}
                      </figcaption>
                    ) : null}
                  </figure>
                )
              })}
            </div>
          </div>

          <div className="education-article-dialog__footer flex shrink-0 items-center justify-between gap-3 border-t border-zinc-200 bg-white px-5 py-4">
            <p className="text-xs text-zinc-500">延伸阅读 · {article.outlet}</p>
            {isExternalUrl(article.sourceUrl) ? (
              <Button type="button" variant="outline" size="sm" asChild>
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  阅读原文
                </a>
              </Button>
            ) : (
              <Button type="button" variant="outline" size="sm" asChild>
                <Link href={article.sourceUrl}>了解更多</Link>
              </Button>
            )}
          </div>

          <DialogClose
            className="absolute right-4 top-4 rounded-md border border-zinc-200 p-1 text-zinc-500 hover:bg-zinc-100"
            aria-label="关闭"
          />
        </DialogContent>
      ) : null}
    </Dialog>
  )
}
