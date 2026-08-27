import { useEffect, useState } from 'react'
import { useMotionValue, useMotionValueEvent, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function useAnimatedNumber(targetValue: number): number {
  const prefersReducedMotion = usePrefersReducedMotion()
  const motionValue = useMotionValue(targetValue)
  const springValue = useSpring(motionValue, { stiffness: 120, damping: 24, mass: 1 })
  const [displayValue, setDisplayValue] = useState(targetValue)

  useEffect(() => {
    motionValue.set(targetValue)
  }, [targetValue, motionValue])

  useMotionValueEvent(springValue, 'change', (latest) => {
    setDisplayValue(Math.round(latest))
  })

  return prefersReducedMotion ? targetValue : displayValue
}
