import { useState } from 'react'
import { Printer } from 'lucide-react'
import { Modal } from '@/components/modals/Modal'
import { Button } from '@/components/ui/Button'
import { PROJECT_TYPES } from '@/data/projectTypes'
import { DESIGN_LEVELS } from '@/data/designLevels'
import { DELIVERY_SPEEDS } from '@/data/deliverySpeeds'
import { useEstimatorContext } from '@/context/EstimatorContext'
import { formatCurrency } from '@/lib/formatCurrency'
import { generateReferenceId } from '@/lib/referenceId'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const { state, pricing } = useEstimatorContext()
  const [referenceId] = useState(generateReferenceId)

  const projectType = PROJECT_TYPES.find((option) => option.id === state.projectType)
  const designLevel = DESIGN_LEVELS.find((option) => option.id === state.designLevel)
  const deliverySpeed = DELIVERY_SPEEDS.find((option) => option.id === state.deliverySpeed)
  const generatedOn = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Estimate">
      <div id="print-summary">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="print-gradient-text text-xl font-bold text-gradient">Web Development Estimate</h3>
            <p className="text-sm text-white/50">Reference #{referenceId} &middot; {generatedOn}</p>
          </div>
        </div>

        <dl className="space-y-3 text-sm">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <dt className="text-white/60">Project Type</dt>
            <dd className="font-medium text-white">{projectType?.title ?? 'Not selected'}</dd>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <dt className="text-white/60">Page Count</dt>
            <dd className="font-medium text-white">{state.pageCount}</dd>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <dt className="text-white/60">Design Level</dt>
            <dd className="font-medium text-white">{designLevel?.title ?? 'Not selected'}</dd>
          </div>
          <div className="flex justify-between border-b border-white/10 pb-2">
            <dt className="text-white/60">Delivery Speed</dt>
            <dd className="font-medium text-white">{deliverySpeed?.title}</dd>
          </div>
        </dl>

        <h4 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-white/50">
          Itemized Breakdown
        </h4>
        <ul className="space-y-2 text-sm">
          {pricing.lineItems.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span className="text-white/70">{item.label}</span>
              <span className="font-medium text-white">{formatCurrency(item.amount)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between border-t border-white/10 pt-4 text-lg font-bold">
          <span>Total Estimate</span>
          <span className="print-gradient-text text-gradient">{formatCurrency(pricing.total)}</span>
        </div>
      </div>

      <div className="mt-6 flex justify-end print:hidden">
        <Button variant="primary" icon={Printer} onClick={() => window.print()}>
          Print / Save as PDF
        </Button>
      </div>
    </Modal>
  )
}
