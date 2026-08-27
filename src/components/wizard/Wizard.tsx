import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { StepIndicator } from '@/components/wizard/StepIndicator'
import { WizardNav } from '@/components/wizard/WizardNav'
import { Step1ProjectType } from '@/components/wizard/steps/Step1ProjectType'
import { Step2ScaleScope } from '@/components/wizard/steps/Step2ScaleScope'
import { Step3Features } from '@/components/wizard/steps/Step3Features'
import { Step4DeliverySpeed } from '@/components/wizard/steps/Step4DeliverySpeed'
import { GlassCard } from '@/components/ui/GlassCard'
import { useEstimatorContext } from '@/context/EstimatorContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const STEP_ANNOUNCEMENTS = {
  1: 'Step 1 of 4: Project Type',
  2: 'Step 2 of 4: Scale and Scope',
  3: 'Step 3 of 4: Features and Integrations',
  4: 'Step 4 of 4: Delivery Speed',
} as const

export function Wizard() {
  const { state, canProceed, nextStep, prevStep } = useEstimatorContext()
  const prefersReducedMotion = usePrefersReducedMotion()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    headingRef.current?.focus()
  }, [state.step])

  const slideVariants = {
    initial: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    exit: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -24 },
  }

  return (
    <GlassCard className="p-6 sm:p-10">
      <StepIndicator currentStep={state.step} />

      <div aria-live="polite" className="sr-only">
        {STEP_ANNOUNCEMENTS[state.step]}
      </div>

      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.25, ease: 'easeOut' }}
          >
            {state.step === 1 && <Step1ProjectType headingRef={headingRef} />}
            {state.step === 2 && <Step2ScaleScope headingRef={headingRef} />}
            {state.step === 3 && <Step3Features headingRef={headingRef} />}
            {state.step === 4 && <Step4DeliverySpeed headingRef={headingRef} />}
          </motion.div>
        </AnimatePresence>
      </div>

      <WizardNav step={state.step} canProceed={canProceed} onBack={prevStep} onNext={nextStep} />
    </GlassCard>
  )
}
