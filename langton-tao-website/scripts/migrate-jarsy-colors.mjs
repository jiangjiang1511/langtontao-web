#!/usr/bin/env node
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SKIP = ['/app/home-backup/', '/components/sections/home/', '/node_modules/', '/scripts/']

const REPLACEMENTS = [
  [/#ffe600/gi, 'var(--jarsy-violet)'],
  [/var\(--pop-yellow\)/g, 'var(--jarsy-violet)'],
  [/pop-yellow/g, 'jarsy-violet'],
  [/shadow-pop-yellow/g, 'shadow-[var(--jarsy-glow)]'],
  [/4px 4px 0 0 var\(--jarsy-violet\)/g, 'var(--jarsy-glow)'],
  [/4px 4px 0 var\(--jarsy-violet\)/g, 'var(--jarsy-glow)'],
  [/6px 6px 0 0 var\(--jarsy-violet\)/g, 'var(--jarsy-glow)'],
  [/6px 6px 0 var\(--jarsy-violet\)/g, 'var(--jarsy-glow)'],
  [/rgb\(255 230 0/g, 'rgb(139 92 246'],
  [/rgb\(255, 230, 0/g, 'rgb(139, 92, 246'],
  [/from-pop-yellow/g, 'from-jarsy-violet'],
  [/via-amber-200/g, 'via-jarsy-rose/30'],
  [/rgba\(255, 230, 0/g, 'rgba(139, 92, 246'],
  [/rgba\(255,230,0/g, 'rgba(139,92,246'],
  [/#fbbf24/gi, '#a78bfa'],
  [/#fef3c7/gi, '#ede9fe'],
  [/#fff7ed/gi, '#f5f3ff'],
  [/#fffbeb/gi, '#f5f3ff'],
  [/#fff9c4/gi, '#ede9fe'],
  [/#f59e0b/gi, 'var(--jarsy-rose)'],
  [/4px 4px 0 0 var\(--pop-black\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 var\(--pop-black\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 0 var\(--el-ink\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 0 var\(--lb-ink\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 0 var\(--hz-ink\)/g, 'var(--ji-glow)'],
  [/4px 4px 0 #09090b/g, 'var(--ji-glow)'],
  [/#ff0040/g, '#ec4899'],
  [/#00d4ff/g, '#3b82f6'],
  [/--el-ink: var\(--pop-black\)/g, '--el-ink: var(--ji-ink)'],
  [/--lb-ink: var\(--pop-black\)/g, '--lb-ink: var(--ji-ink)'],
  [/linear-gradient\(90deg, #09090b, var\(--jarsy-violet\)\)/g, 'var(--jarsy-gradient)'],
]

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (SKIP.some((s) => p.includes(s))) continue
    const st = statSync(p)
    if (st.isDirectory()) walk(p, files)
    else if (/\.(css|tsx?)$/.test(name)) files.push(p)
  }
  return files
}

let changed = 0
for (const file of walk(ROOT)) {
  let src = readFileSync(file, 'utf8')
  let next = src
  for (const [re, rep] of REPLACEMENTS) next = next.replace(re, rep)
  if (next !== src) {
    writeFileSync(file, next)
    changed++
  }
}
console.log(`Updated ${changed} files`)
