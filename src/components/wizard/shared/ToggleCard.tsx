import type { ComponentType } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface ToggleCardProps {
  title: string
  description: string
  priceLabel: string
  icon: ComponentType<{ className?: string }>
  checked: boolean
  onToggle: () => void
}

export function ToggleCard({ title, description, priceLabel, icon: Icon, checked, onToggle }: ToggleCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onToggle}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      className={clsx(
        'group relative flex h-full flex-col gap-3 rounded-2xl p-5 text-left transition-colors',
        checked ? 'glass-strong glow-ring' : 'glass hover:bg-white/[0.08]',
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={clsx(
            'flex h-11 w-11 items-center justify-center rounded-xl transition-colors',
            checked ? 'bg-accent-gradient text-white' : 'bg-white/10 text-white/70',
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div
          className={clsx(
            'flex h-6 w-6 items-center justify-center rounded-md border transition-colors',
            checked ? 'border-transparent bg-accent-gradient' : 'border-white/20 bg-transparent',
          )}
        >
          {checked && <Check className="h-4 w-4 text-white" aria-hidden="true" />}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/60">{description}</p>
      </div>
      <span className={clsx('text-sm font-bold', checked ? 'text-gradient' : 'text-white/80')}>{priceLabel}</span>
    </motion.button>
  )
}
