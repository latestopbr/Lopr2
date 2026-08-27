import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { useEstimator } from '@/hooks/useEstimator'
import type { UseEstimatorReturn } from '@/hooks/useEstimator'

const EstimatorContext = createContext<UseEstimatorReturn | null>(null)

export function EstimatorProvider({ children }: { children: ReactNode }) {
  const estimator = useEstimator()
  return <EstimatorContext.Provider value={estimator}>{children}</EstimatorContext.Provider>
}

export function useEstimatorContext(): UseEstimatorReturn {
  const context = useContext(EstimatorContext)
  if (!context) {
    throw new Error('useEstimatorContext must be used within an EstimatorProvider')
  }
  return context
}
