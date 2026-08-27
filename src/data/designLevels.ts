import { Palette, Sparkles, Wand2 } from 'lucide-react'
import type { ComponentType } from 'react'
import type { DesignLevelId } from '@/types/estimator'
import { DESIGN_LEVEL_UPCHARGE } from '@/lib/pricing'

export interface DesignLevelOption {
  id: DesignLevelId
  title: string
  description: string
  upcharge: number
  icon: ComponentType<{ className?: string }>
}

export const DESIGN_LEVELS: DesignLevelOption[] = [
  {
    id: 'standard',
    title: 'Clean Standard',
    description: 'Polished, professional layouts using a refined design system.',
    upcharge: DESIGN_LEVEL_UPCHARGE.standard,
    icon: Palette,
  },
  {
    id: 'customBrand',
    title: 'Custom Brand System',
    description: 'Bespoke type, color, and component system built around your brand.',
    upcharge: DESIGN_LEVEL_UPCHARGE.customBrand,
    icon: Wand2,
  },
  {
    id: 'highEnd',
    title: 'High-End 3D / Interactive',
    description: 'Immersive scroll storytelling, custom motion, and 3D visual design.',
    upcharge: DESIGN_LEVEL_UPCHARGE.highEnd,
    icon: Sparkles,
  },
]
