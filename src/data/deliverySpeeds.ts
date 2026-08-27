import { Clock, Flame, Zap } from 'lucide-react'
import type { ComponentType } from 'react'
import type { DeliverySpeedId } from '@/types/estimator'
import { DELIVERY_MULTIPLIERS } from '@/lib/pricing'

export interface DeliverySpeedOption {
  id: DeliverySpeedId
  title: string
  description: string
  multiplier: number
  icon: ComponentType<{ className?: string }>
}

export const DELIVERY_SPEEDS: DeliverySpeedOption[] = [
  {
    id: 'standard',
    title: 'Standard Pace',
    description: 'The default timeline — no rush, no surcharge.',
    multiplier: DELIVERY_MULTIPLIERS.standard,
    icon: Clock,
  },
  {
    id: 'fast',
    title: 'Fast Track',
    description: 'Prioritized scheduling to compress the timeline.',
    multiplier: DELIVERY_MULTIPLIERS.fast,
    icon: Zap,
  },
  {
    id: 'emergency',
    title: 'Emergency Sprint',
    description: 'All-hands, fastest possible turnaround.',
    multiplier: DELIVERY_MULTIPLIERS.emergency,
    icon: Flame,
  },
]
