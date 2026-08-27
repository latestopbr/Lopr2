import type { ReactNode } from 'react'
import clsx from 'clsx'

interface BadgeProps {
  children: ReactNode
  tone?: 'gradient' | 'neutral'
  className?: string
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        tone === 'gradient' ? 'bg-accent-gradient text-white' : 'bg-white/10 text-white/80',
        className,
      )}
    >
      {children}
    </span>
  )
}
