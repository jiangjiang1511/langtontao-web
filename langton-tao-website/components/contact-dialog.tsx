'use client'

import { useState, cloneElement, isValidElement } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

interface ContactDialogProps {
  children: React.ReactNode
  defaultIntent?: string
}

export function ContactDialog({ children, defaultIntent }: ContactDialogProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    intent: defaultIntent || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    toast.success('我们已收到您的信息，顾问将在 1 个工作日内联系您')
    setOpen(false)
    setFormData({ name: '', phone: '', email: '', intent: defaultIntent || '' })
    setIsSubmitting(false)
  }

  // Clone the child element and add onClick handler
  const trigger = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
        onClick: () => setOpen(true),
      })
    : children

  return (
    <>
      {trigger}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[440px] p-6">
          <DialogHeader>
            <DialogTitle className="font-serif text-[20px]">预约顾问沟通</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-[14px] font-medium">
                姓名 <span className="text-destructive">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-[44px] w-full rounded-lg border border-border bg-background px-3 text-[15px] outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="请输入您的姓名"
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-[14px] font-medium">
                手机 <span className="text-destructive">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="h-[44px] w-full rounded-lg border border-border bg-background px-3 text-[15px] outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="请输入您的手机号"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium">
                邮箱
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-[44px] w-full rounded-lg border border-border bg-background px-3 text-[15px] outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="选填"
              />
            </div>
            <div>
              <label htmlFor="intent" className="mb-1.5 block text-[14px] font-medium">
                意向
              </label>
              <Select
                value={formData.intent}
                onValueChange={(value) =>
                  setFormData({ ...formData, intent: value ?? '' })
                }
              >
                <SelectTrigger className="h-[44px] w-full text-[15px]">
                  <SelectValue placeholder="请选择" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="成立家办">成立家办</SelectItem>
                  <SelectItem value="加入家办">加入家办</SelectItem>
                  <SelectItem value="了解服务">了解服务</SelectItem>
                  <SelectItem value="其他">其他</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-[44px] w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? '提交中...' : '提交预约'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
