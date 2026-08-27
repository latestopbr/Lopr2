import { Building2, Cpu, Rocket, ShoppingCart } from 'lucide-react'
import type { ComponentType } from 'react'
import type { ProjectTypeId } from '@/types/estimator'
import { PROJECT_TYPE_PRICES } from '@/lib/pricing'

export interface ProjectTypeOption {
  id: ProjectTypeId
  title: string
  description: string
  price: number
  icon: ComponentType<{ className?: string }>
}

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'landing',
    title: 'Single Landing Page',
    description: 'One focused, high-converting page for a launch, product, or campaign.',
    price: PROJECT_TYPE_PRICES.landing,
    icon: Rocket,
  },
  {
    id: 'corporate',
    title: 'Corporate Site',
    description: 'A multi-page brand presence — About, Services, Team, Contact.',
    price: PROJECT_TYPE_PRICES.corporate,
    icon: Building2,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Store',
    description: 'A full storefront with catalog, cart, and checkout flow.',
    price: PROJECT_TYPE_PRICES.ecommerce,
    icon: ShoppingCart,
  },
  {
    id: 'saas',
    title: 'Custom Web App / SaaS',
    description: 'A bespoke application with custom logic, dashboards, and workflows.',
    price: PROJECT_TYPE_PRICES.saas,
    icon: Cpu,
  },
]
