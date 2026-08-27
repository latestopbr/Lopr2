import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { PartyPopper } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface ConfirmationScreenProps {
  referenceId: string
  onDone: () => void
}

export function ConfirmationScreen({ referenceId, onDone }: ConfirmationScreenProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#8b5cf6', '#ec4899'],
    })
  }, [prefersReducedMotion])

  return (
    <div className="flex flex-col items-center py-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-gradient">
        <PartyPopper className="h-8 w-8 text-white" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-bold text-white">Kickoff call requested!</h3>
      <p className="mt-2 max-w-sm text-sm text-white/60">
        We've received your project details and estimate. You'll hear back shortly to schedule your call.
      </p>
      <p className="mt-4 text-sm text-white/40">
        Reference <span className="font-mono text-white/70">#{referenceId}</span>
      </p>
      <p className="mt-6 max-w-sm text-xs text-white/30">
        This is a demo submission — no email was actually sent since this project has no backend configured yet.
      </p>
      <Button variant="primary" onClick={onDone} className="mt-6">
        Done
      </Button>
    </div>
  )
}
