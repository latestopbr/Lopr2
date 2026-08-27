import type { ComponentType, KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface SelectCardProps {
  title: string
  description: string
  priceLabel: string
  icon: ComponentType<{ className?: string }>
  selected: boolean
  onSelect: () => void
  tabIndex: number
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void
  cardRef?: (node: HTMLButtonElement | null) => void
  groupId: string
}

export function SelectCard({
  title,
  description,
  priceLabel,
  icon: Icon,
  selected,
  onSelect,
  tabIndex,
  onKeyDown,
  cardRef,
  groupId,
}: SelectCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.button
      ref={cardRef}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={tabIndex}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      className={clsx(
        'group relative flex h-full flex-col gap-3 rounded-2xl p-5 text-left transition-colors',
        selected ? 'glass-strong glow-ring' : 'glass hover:bg-white/[0.08]',
      )}
    >
      <div
        className={clsx(
          'flex h-11 w-11 items-center justify-center rounded-xl transition-colors',
          selected ? 'bg-accent-gradient text-white' : 'bg-white/10 text-white/70',
        )}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-white/60">{description}</p>
      </div>
      <span className={clsx('text-sm font-bold', selected ? 'text-gradient' : 'text-white/80')}>
        {priceLabel}
      </span>
      {selected && (
        <motion.div
          layoutId={`select-card-indicator-${groupId}`}
          className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-accent-violet/60"
          transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  )
}
