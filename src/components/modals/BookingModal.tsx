import { useState } from 'react'
import type { FormEvent } from 'react'
import { Send } from 'lucide-react'
import { Modal } from '@/components/modals/Modal'
import { ConfirmationScreen } from '@/components/modals/ConfirmationScreen'
import { Button } from '@/components/ui/Button'
import { FieldGroup } from '@/components/wizard/shared/FieldGroup'
import { useEstimatorContext } from '@/context/EstimatorContext'
import { submitBooking } from '@/lib/submitBooking'
import { formatCurrency } from '@/lib/formatCurrency'
import type { BudgetRangeId } from '@/types/estimator'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const BUDGET_RANGES: { id: BudgetRangeId; label: string }[] = [
  { id: 'under-5k', label: 'Under $5,000' },
  { id: '5k-15k', label: '$5,000 – $15,000' },
  { id: '15k-30k', label: '$15,000 – $30,000' },
  { id: '30k-plus', label: '$30,000+' },
  { id: 'not-sure', label: 'Not sure yet' },
]

type Phase = 'form' | 'submitting' | 'success'

interface FormValues {
  name: string
  email: string
  budgetRange: BudgetRangeId
  projectDescription: string
}

const EMPTY_FORM: FormValues = {
  name: '',
  email: '',
  budgetRange: 'not-sure',
  projectDescription: '',
}

function validate(values: FormValues) {
  const errors: Partial<Record<keyof FormValues, string>> = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  return errors
}

export function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const { state, pricing } = useEstimatorContext()
  const [phase, setPhase] = useState<Phase>('form')
  const [values, setValues] = useState<FormValues>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [referenceId, setReferenceId] = useState('')

  function handleClose() {
    setPhase('form')
    setValues(EMPTY_FORM)
    setErrors({})
    onClose()
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setPhase('submitting')
    const result = await submitBooking({
      name: values.name,
      email: values.email,
      budgetRange: values.budgetRange,
      projectDescription: values.projectDescription,
      estimate: {
        total: pricing.total,
        lineItems: pricing.lineItems,
        selections: {
          projectType: state.projectType,
          pageCount: state.pageCount,
          designLevel: state.designLevel,
          features: state.features,
          deliverySpeed: state.deliverySpeed,
        },
      },
      submittedAt: new Date().toISOString(),
    })
    setReferenceId(result.referenceId)
    setPhase('success')
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={phase === 'success' ? 'Request Sent' : 'Book Kickoff Call'}>
      {phase === 'success' ? (
        <ConfirmationScreen referenceId={referenceId} onDone={handleClose} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-white/40">Your Estimate</p>
            <p className="mt-1 text-2xl font-bold text-gradient">{formatCurrency(pricing.total)}</p>
            <p className="mt-1 text-xs text-white/40">This will be attached to your request automatically.</p>
          </div>

          <FieldGroup label="Full Name" htmlFor="booking-name" error={errors.name}>
            <input
              id="booking-name"
              type="text"
              value={values.name}
              onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
              aria-invalid={Boolean(errors.name)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent-violet focus:outline-none"
              placeholder="Jane Doe"
            />
          </FieldGroup>

          <FieldGroup label="Email" htmlFor="booking-email" error={errors.email}>
            <input
              id="booking-email"
              type="email"
              value={values.email}
              onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
              aria-invalid={Boolean(errors.email)}
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent-violet focus:outline-none"
              placeholder="jane@company.com"
            />
          </FieldGroup>

          <FieldGroup label="Budget Range" htmlFor="booking-budget">
            <select
              id="booking-budget"
              value={values.budgetRange}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, budgetRange: event.target.value as BudgetRangeId }))
              }
              className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white focus:border-accent-violet focus:outline-none"
            >
              {BUDGET_RANGES.map((range) => (
                <option key={range.id} value={range.id} className="bg-[#111827]">
                  {range.label}
                </option>
              ))}
            </select>
          </FieldGroup>

          <FieldGroup label="Project Description" htmlFor="booking-description">
            <textarea
              id="booking-description"
              rows={3}
              value={values.projectDescription}
              onChange={(event) => setValues((prev) => ({ ...prev, projectDescription: event.target.value }))}
              className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-accent-violet focus:outline-none"
              placeholder="Tell us a bit about your project goals..."
            />
          </FieldGroup>

          <p className="text-xs text-white/30">
            Demo form — submissions are simulated locally since this project has no backend configured yet.
          </p>

          <Button type="submit" variant="primary" icon={Send} isLoading={phase === 'submitting'} className="w-full">
            {phase === 'submitting' ? 'Sending...' : 'Request Kickoff Call'}
          </Button>
        </form>
      )}
    </Modal>
  )
}
