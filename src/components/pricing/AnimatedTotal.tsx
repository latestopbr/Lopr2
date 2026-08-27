import { useEffect, useState } from 'react'
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber'
import { formatCurrency } from '@/lib/formatCurrency'

export function AnimatedTotal({ total }: { total: number }) {
  const displayValue = useAnimatedNumber(total)
  const [announcedTotal, setAnnouncedTotal] = useState(total)

  useEffect(() => {
    const timeout = setTimeout(() => setAnnouncedTotal(total), 600)
    return () => clearTimeout(timeout)
  }, [total])

  return (
    <div>
      <p className="text-sm font-medium text-white/50">Estimated Total</p>
      <p className="mt-1 text-4xl font-extrabold text-gradient tabular-nums sm:text-5xl" aria-hidden="true">
        {formatCurrency(displayValue)}
      </p>
      <div aria-live="polite" className="sr-only">
        Estimated total: {formatCurrency(announcedTotal)}
      </div>
    </div>
  )
}
