import { useId, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { LineItem } from '@/types/estimator'
import { formatCurrency } from '@/lib/formatCurrency'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function BreakdownAccordion({ lineItems }: { lineItems: LineItem[] }) {
  const [isOpen, setIsOpen] = useState(true)
  const contentId = useId()
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="rounded-xl border border-white/10">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-white/80"
      >
        Itemized Scope Breakdown
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={contentId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {lineItems.length === 0 ? (
              <p className="px-4 pb-4 text-sm text-white/40">Make selections to see your breakdown.</p>
            ) : (
              <ul className="space-y-2 px-4 pb-4">
                {lineItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-white/70">
                      {item.label}
                      {item.detail && <span className="ml-1.5 text-white/40">({item.detail})</span>}
                    </span>
                    <span className="whitespace-nowrap font-medium text-white/90">
                      {item.amount < 0 ? '-' : '+'}
                      {formatCurrency(Math.abs(item.amount))}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
