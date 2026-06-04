'use client'

import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ContactDialog } from '@/components/contact-dialog'
import Link from 'next/link'

export function HeroSection() {
  const [hasMounted, setHasMounted] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  const shouldReduceMotion = !hasMounted || prefersReducedMotion

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0 : 0.5, ease: 'easeOut' as const },
    },
  }

  const scrollToMission = () => {
    document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-blob-1 absolute left-[10%] top-[20%] h-[300px] w-[300px] rounded-full bg-accent/20 blur-[80px] md:h-[400px] md:w-[400px]"
          aria-hidden="true"
        />
        <div
          className="animate-blob-2 absolute right-[15%] top-[40%] h-[250px] w-[250px] rounded-full bg-primary/20 blur-[80px] md:h-[350px] md:w-[350px]"
          aria-hidden="true"
        />
        <div
          className="animate-blob-3 absolute bottom-[20%] left-[30%] h-[200px] w-[200px] rounded-full bg-accent/15 blur-[80px] md:h-[300px] md:w-[300px]"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-[720px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={itemVariants}
            className="mb-4 block text-[13px] font-medium uppercase tracking-widest text-accent"
          >
            VFO / MFO Leader in China
          </motion.span>

          <motion.h1
            id="hero-heading"
            variants={itemVariants}
            className="font-serif text-[32px] font-semibold leading-[1.1] text-foreground md:text-[56px] md:leading-[1.05]"
          >
            VFO/MFO Leader in China
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 font-serif text-[28px] font-medium leading-[1.3] text-foreground/90 md:text-[40px]"
          >
            为第二代华人财富传承提供系统解决方案
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <ContactDialog>
              <Button className="h-[48px] bg-primary px-8 text-[15px] text-primary-foreground hover:bg-primary/90">
                预约咨询
              </Button>
            </ContactDialog>
            <Button
              variant="outline"
              className="h-[48px] border-border px-8 text-[15px] hover:bg-muted"
              asChild
            >
              <Link href="/hebi">探索家办路径</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.button
        onClick={scrollToMission}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="滚动到下一部分"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </motion.button>
    </section>
  )
}
