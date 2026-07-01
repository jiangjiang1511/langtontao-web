#!/usr/bin/env node
/**
 * Fetch WeChat articles for wealth checkup desensitized cases.
 *
 * Usage:
 *   node scripts/fetch-checkup-case-articles.mjs
 *   node scripts/fetch-checkup-case-articles.mjs --out scripts/.checkup-cases-fetched.json
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outArg = process.argv.indexOf('--out')
const outPath =
  outArg >= 0
    ? path.resolve(process.argv[outArg + 1])
    : path.join(__dirname, '.checkup-cases-fetched.json')

const WECHAT_UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.43(0x18002b2d) NetType/WIFI Language/zh_CN'

const sources = [
  {
    slug: 'manufacturing-policy-stack',
    url: 'https://mp.weixin.qq.com/s/Q9SsAQ28ozLM2drt-QiXQA',
  },
  {
    slug: 'cross-border-coverage-gap',
    url: 'https://mp.weixin.qq.com/s/VL3RYFinwE_GyxnQXh2lEA',
  },
  {
    slug: 'succession-beneficiary-mismatch',
    url: 'https://mp.weixin.qq.com/s/Fhf7-Nb7Eex7p5SjmwZTfg',
  },
  {
    slug: 'liquidity-risk-blindspot',
    url: 'https://mp.weixin.qq.com/s/1wR5hfNb7MlgIaFu0-nsKA',
  },
]

function decodeHtml(text) {
  return text
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(Number(num)))
    .replace(/\s+/g, ' ')
    .trim()
}

function extractTitle(html) {
  return (
    decodeHtml(
      html.match(/id="activity-name"[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? ''
    ).replace(/<[^>]+>/g, '') ||
    decodeHtml(html.match(/property="og:title"[^>]+content="([^"]+)"/i)?.[1] ?? '')
  )
}

function extractJsContent(html) {
  const start = html.indexOf('id="js_content"')
  if (start < 0) return ''

  const openEnd = html.indexOf('>', start)
  if (openEnd < 0) return ''

  const endMarkers = [
    'id="js_tags_preview"',
    'id="js_temp_bottom_area"',
    'id="js_tags"',
    'class="rich_media_tool_area"',
  ]

  let close = -1
  for (const marker of endMarkers) {
    const index = html.indexOf(marker, openEnd)
    if (index >= 0 && (close < 0 || index < close)) {
      close = index
    }
  }

  if (close < 0) return html.slice(openEnd + 1)

  return html.slice(openEnd + 1, close)
}

function extractParagraphs(contentHtml) {
  const paragraphs = []
  const tokenRe = /<p[^>]*>[\s\S]*?<\/p>/gi
  let match

  while ((match = tokenRe.exec(contentHtml)) !== null) {
    const text = decodeHtml(match[0].replace(/<[^>]+>/g, ''))
    if (text.length >= 8) {
      paragraphs.push(text)
    }
  }

  return paragraphs
}

async function fetchHtml(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': WECHAT_UA,
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'zh-CN,zh;q=0.9',
    },
    redirect: 'follow',
  })

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`)
  }

  return response.text()
}

async function processSource(source) {
  const html = await fetchHtml(source.url)
  const title = extractTitle(html)
  const contentHtml = extractJsContent(html)
  const paragraphs = extractParagraphs(contentHtml)
  const blocked =
    html.includes('环境异常') ||
    paragraphs.length === 0 ||
    title.length === 0

  return {
    slug: source.slug,
    sourceUrl: source.url,
    title,
    paragraphs,
    blocked,
  }
}

const results = []

for (const source of sources) {
  console.log(`Fetching ${source.slug}...`)
  try {
    const article = await processSource(source)
    results.push(article)
    console.log(
      `  ${article.blocked ? '[BLOCKED]' : '[OK]'} ${article.title || '(no title)'} — ${article.paragraphs.length} paragraphs`
    )
  } catch (error) {
    results.push({
      slug: source.slug,
      sourceUrl: source.url,
      title: '',
      paragraphs: [],
      blocked: true,
      error: error instanceof Error ? error.message : String(error),
    })
    console.log(`  [ERROR] ${error instanceof Error ? error.message : error}`)
  }
}

fs.writeFileSync(outPath, JSON.stringify(results, null, 2))
console.log(`\nWrote ${outPath}`)
