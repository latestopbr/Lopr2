import { Suspense, lazy } from 'react'
import { SceneFallback } from '@/components/background/SceneFallback'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const Scene3D = lazy(() => import('@/components/background/Scene3D'))

export function AnimatedBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()

  if (prefersReducedMotion) {
    return <SceneFallback />
  }

  return (
    <Suspense fallback={<SceneFallback />}>
      <Scene3D />
    </Suspense>
  )
}
