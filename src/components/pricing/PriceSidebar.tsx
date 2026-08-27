import { Calendar, FileDown } from 'lucide-react'
import { AnimatedTotal } from '@/components/pricing/AnimatedTotal'
import { BreakdownAccordion } from '@/components/pricing/BreakdownAccordion'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { useEstimatorContext } from '@/context/EstimatorContext'

interface PriceSidebarProps {
  onExport: () => void
  onBook: () => void
}

export function PriceSidebar({ onExport, onBook }: PriceSidebarProps) {
  const { pricing } = useEstimatorContext()

  return (
    <GlassCard strong className="sticky top-6 hidden flex-col gap-6 p-6 lg:flex">
      <AnimatedTotal total={pricing.total} />
      <BreakdownAccordion lineItems={pricing.lineItems} />
      <div className="flex flex-col gap-3">
        <Button variant="primary" icon={Calendar} onClick={onBook}>
          Book Kickoff Call
        </Button>
        <Button variant="secondary" icon={FileDown} onClick={onExport}>
          Export Estimate
        </Button>
      </div>
    </GlassCard>
  )
}
