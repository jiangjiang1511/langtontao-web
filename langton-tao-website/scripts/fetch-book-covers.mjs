#!/usr/bin/env node
/**
 * Fetch book covers from Open Library into public/books/
 * Usage: node scripts/fetch-book-covers.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../public/books')

const books = [
  {
    slug: 'civilization-value-investing',
    title: '文明、现代化、价值投资与中国',
    author: '李录',
    englishTitle: 'Civilization Modernization Value Investing China',
  },
  { slug: 'millionaire-next-door', englishTitle: 'The Millionaire Next Door', author: 'Thomas Stanley' },
  { slug: 'your-money-or-your-life', englishTitle: 'Your Money Or Your Life', author: 'Vicki Robin' },
  { slug: 'psychology-of-money', englishTitle: 'The Psychology of Money', author: 'Morgan Housel' },
  { slug: 'early-retirement-extreme', englishTitle: 'Early Retirement Extreme', author: 'Jacob Lund Fisker' },
  { slug: 'economics-of-money', englishTitle: 'The Economics of Money Banking and Financial Markets', author: 'Frederic Mishkin' },
  { slug: 'random-walk-wall-street', englishTitle: 'A Random Walk Down Wall Street', author: 'Burton Malkiel' },
  { slug: 'americana', englishTitle: 'Americana A 400 Year History of American Capitalism', author: 'Bhu Srinivasan' },
  { slug: 'big-short', englishTitle: 'The Big Short', author: 'Michael Lewis' },
  { slug: 'devil-take-hindmost', englishTitle: 'Devil Take the Hindmost', author: 'Edward Chancellor' },
  { slug: 'lords-of-finance', englishTitle: 'Lords of Finance', author: 'Liaquat Ahamed' },
  { slug: 'common-sense-investing', englishTitle: 'The Little Book of Common Sense Investing', author: 'John Bogle' },
  { slug: 'millionaire-teacher', englishTitle: 'The Millionaire Teacher', author: 'Andrew Hallam' },
  { slug: 'simple-path-to-wealth', englishTitle: 'The Simple Path to Wealth', author: 'JL Collins' },
  { slug: 'invested', englishTitle: 'Invested', author: 'Danielle Town' },
  { slug: 'one-up-on-wall-street', englishTitle: 'One Up On Wall Street', author: 'Peter Lynch' },
  { slug: 'intelligent-investor', englishTitle: 'The Intelligent Investor', author: 'Benjamin Graham' },
]

async function searchCover(book) {
  const q = new URLSearchParams({
    title: book.englishTitle,
    author: book.author,
    limit: '1',
  })
  const res = await fetch(`https://openlibrary.org/search.json?${q}`)
  const data = await res.json()
  const doc = data.docs?.[0]
  if (!doc) return null
  if (doc.cover_i) {
    return `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg`
  }
  const isbn = doc.isbn?.[0]
  if (isbn) {
    return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`
  }
  return null
}

async function download(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  fs.writeFileSync(dest, buf)
}

fs.mkdirSync(outDir, { recursive: true })

const results = []
for (const book of books) {
  const dest = path.join(outDir, `${book.slug}.jpg`)
  try {
    const url = await searchCover(book)
    if (url) {
      await download(url, dest)
      results.push({ slug: book.slug, ok: true, url })
      console.log(`OK  ${book.slug}`)
    } else {
      results.push({ slug: book.slug, ok: false, reason: 'no match' })
      console.log(`MISS ${book.slug}`)
    }
  } catch (e) {
    results.push({ slug: book.slug, ok: false, reason: String(e) })
    console.log(`FAIL ${book.slug}: ${e.message}`)
  }
}

fs.writeFileSync(
  path.join(outDir, 'fetch-results.json'),
  JSON.stringify(results, null, 2)
)
