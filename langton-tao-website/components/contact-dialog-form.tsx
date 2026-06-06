'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { contactIntents } from '@/lib/site-nav'

type ContactDialogFormProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultIntent?: string
}

export function ContactDialogForm({
  open,
  onOpenChange,
  defaultIntent = '',
}: ContactDialogFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    intent: defaultIntent,
  })

  useEffect(() => {
    if (open) {
      setFormData((prev) => ({ ...prev, intent: defaultIntent }))
    }
  }, [open, defaultIntent])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 600))
    toast.success('我们已收到您的信息，顾问将在 1 个工作日内联系您')
    onOpenChange(false)
    setFormData({ name: '', phone: '', email: '', intent: defaultIntent })
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>预约顾问沟通</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
              姓名 <span className="text-red-600">*</span>
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
              placeholder="请输入您的姓名"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
              手机 <span className="text-red-600">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
              placeholder="请输入您的手机"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
              邮箱
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="h-11 w-full rounded-lg border border-zinc-300 px-3 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
              placeholder="选填"
            />
          </div>
          <div>
            <label htmlFor="intent" className="mb-1.5 block text-sm font-medium">
              意向
            </label>
            <select
              id="intent"
              value={formData.intent}
              onChange={(e) =>
                setFormData({ ...formData, intent: e.target.value })
              }
              className="h-11 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
            >
              <option value="">请选择</option>
              {contactIntents.map((intent) => (
                <option key={intent} value={intent}>
                  {intent}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? '提交中…' : '提交预约'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
