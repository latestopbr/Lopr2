import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { WizardStep } from '@/types/estimator'

interface WizardNavProps {
  step: WizardStep
  canProceed: boolean
  onBack: () => void
  onNext: () => void
}

export function WizardNav({ step, canProceed, onBack, onNext }: WizardNavProps) {
  const isFirstStep = step === 1
  const isLastStep = step === 4

  return (
    <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
      <Button variant="secondary" icon={ChevronLeft} onClick={onBack} disabled={isFirstStep}>
        Back
      </Button>
      {!isLastStep && (
        <Button variant="primary" icon={ChevronRight} iconPosition="right" onClick={onNext} disabled={!canProceed}>
          Continue
        </Button>
      )}
      {isLastStep && <p className="text-sm text-white/50">Your estimate is ready — see the summary below.</p>}
    </div>
  )
}
