import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Calendar, ChevronUp, FileDown } from 'lucide-react'
import { BreakdownAccordion } from '@/components/pricing/BreakdownAccordion'
import { Button } from '@/components/ui/Button'
import { useEstimatorContext } from '@/context/EstimatorContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { formatCurrency } from '@/lib/formatCurrency'

interface PriceBarProps {
  onExport: () => void
  onBook: () => void
}

export function PriceBar({ onExport, onBook }: PriceBarProps) {
  const { pricing } = useEstimatorContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.25 }}
            className="glass-strong overflow-hidden border-b-0"
          >
            <div className="flex flex-col gap-4 p-4">
              <BreakdownAccordion lineItems={pricing.lineItems} />
              <div className="flex flex-col gap-2">
                <Button variant="primary" icon={Calendar} onClick={onBook}>
                  Book Kickoff Call
                </Button>
                <Button variant="secondary" icon={FileDown} onClick={onExport}>
                  Export Estimate
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-expanded={isExpanded}
        className="glass-strong flex w-full items-center justify-between border-t border-white/10 px-5 py-4"
      >
        <span className="text-left">
          <span className="block text-xs font-medium text-white/50">Estimated Total</span>
          <span className="block text-xl font-bold text-gradient tabular-nums">{formatCurrency(pricing.total)}</span>
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-white/80">
          {isExpanded ? 'Close' : 'View Estimate'}
          <ChevronUp className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} aria-hidden="true" />
        </span>
      </button>
    </div>
  )
}
