import type {
  DeliverySpeedId,
  DesignLevelId,
  EstimatorState,
  FeatureId,
  LineItem,
  PricingResult,
  ProjectTypeId,
} from '@/types/estimator'

export const PROJECT_TYPE_PRICES: Record<ProjectTypeId, number> = {
  landing: 800,
  corporate: 1800,
  ecommerce: 3000,
  saas: 5000,
}

export const PRICE_PER_PAGE = 150
export const MIN_PAGES = 1
export const MAX_PAGES = 30
export const DEFAULT_PAGE_COUNT = 5

// Design Level upcharges. "Clean Standard" is the included baseline; the two
// upgraded tiers are scaled to sit proportionately against the $150/page rate
// and the $450-$1,500 feature prices already defined below.
export const DESIGN_LEVEL_UPCHARGE: Record<DesignLevelId, number> = {
  standard: 0,
  customBrand: 850,
  highEnd: 2600,
}

export const FEATURE_PRICES: Record<FeatureId, number> = {
  cms: 600,
  authDb: 1200,
  payments: 800,
  motion3d: 1500,
  seoSpeed: 450,
  aiChatbot: 1000,
}

export const DELIVERY_MULTIPLIERS: Record<DeliverySpeedId, number> = {
  standard: 1,
  fast: 1.25,
  emergency: 1.5,
}

const PROJECT_TYPE_LABELS: Record<ProjectTypeId, string> = {
  landing: 'Single Landing Page',
  corporate: 'Corporate Site',
  ecommerce: 'E-Commerce Store',
  saas: 'Custom Web App / SaaS',
}

const DESIGN_LEVEL_LABELS: Record<DesignLevelId, string> = {
  standard: 'Clean Standard Design',
  customBrand: 'Custom Brand System',
  highEnd: 'High-End 3D / Interactive Design',
}

const FEATURE_LABELS: Record<FeatureId, string> = {
  cms: 'Content Management System',
  authDb: 'User Authentication & Database',
  payments: 'Payment Gateway / Stripe Integration',
  motion3d: 'Custom 3D / WebGL / Motion Design',
  seoSpeed: 'Technical SEO & Speed Optimization',
  aiChatbot: 'AI Chatbot Integration',
}

const DELIVERY_SPEED_LABELS: Record<DeliverySpeedId, string> = {
  standard: 'Standard Pace',
  fast: 'Fast Track',
  emergency: 'Emergency Sprint',
}

export function calculatePricing(state: EstimatorState): PricingResult {
  const lineItems: LineItem[] = []

  if (state.projectType) {
    lineItems.push({
      id: 'project-type',
      label: PROJECT_TYPE_LABELS[state.projectType],
      amount: PROJECT_TYPE_PRICES[state.projectType],
      kind: 'base',
    })
  }

  if (state.pageCount > 0) {
    lineItems.push({
      id: 'pages',
      label: `${state.pageCount} page${state.pageCount === 1 ? '' : 's'}`,
      detail: `${state.pageCount} × $${PRICE_PER_PAGE}`,
      amount: state.pageCount * PRICE_PER_PAGE,
      kind: 'pages',
    })
  }

  if (state.designLevel && DESIGN_LEVEL_UPCHARGE[state.designLevel] > 0) {
    lineItems.push({
      id: 'design-level',
      label: DESIGN_LEVEL_LABELS[state.designLevel],
      amount: DESIGN_LEVEL_UPCHARGE[state.designLevel],
      kind: 'design',
    })
  }

  for (const feature of state.features) {
    lineItems.push({
      id: `feature-${feature}`,
      label: FEATURE_LABELS[feature],
      amount: FEATURE_PRICES[feature],
      kind: 'feature',
    })
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0)
  const multiplier = DELIVERY_MULTIPLIERS[state.deliverySpeed]
  const total = Math.round(subtotal * multiplier)

  if (multiplier !== 1) {
    lineItems.push({
      id: 'delivery-speed',
      label: `${DELIVERY_SPEED_LABELS[state.deliverySpeed]} surcharge`,
      detail: `+${((multiplier - 1) * 100).toFixed(0)}%`,
      amount: total - subtotal,
      kind: 'multiplier',
    })
  }

  return { subtotal, multiplier, total, lineItems }
}
