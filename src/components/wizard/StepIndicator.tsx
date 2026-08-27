import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import type { WizardStep } from '@/types/estimator'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const STEP_LABELS: Record<WizardStep, string> = {
  1: 'Project Type',
  2: 'Scale & Scope',
  3: 'Features',
  4: 'Delivery Speed',
}

const STEPS: WizardStep[] = [1, 2, 3, 4]

export function StepIndicator({ currentStep }: { currentStep: WizardStep }) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const progressPercent = ((currentStep - 1) / (STEPS.length - 1)) * 100

  return (
    <nav aria-label="Estimator progress">
      <ol className="relative flex items-start justify-between">
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-white/10" aria-hidden="true">
          <motion.div
            className="h-full bg-accent-gradient"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 30 }}
          />
        </div>

        {STEPS.map((step) => {
          const isComplete = step < currentStep
          const isActive = step === currentStep

          return (
            <li key={step} className="relative z-10 flex flex-1 flex-col items-center gap-2 first:items-start last:items-end">
              <span
                aria-current={isActive ? 'step' : undefined}
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors',
                  isActive && 'bg-accent-gradient text-white ring-4 ring-accent-violet/25',
                  isComplete && !isActive && 'bg-accent-violet text-white',
                  !isActive && !isComplete && 'glass text-white/50',
                )}
              >
                {isComplete ? <Check className="h-4 w-4" aria-hidden="true" /> : step}
              </span>
              <span
                className={clsx(
                  'hidden text-center text-xs font-medium sm:block',
                  isActive ? 'text-white' : 'text-white/40',
                )}
              >
                {STEP_LABELS[step]}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
