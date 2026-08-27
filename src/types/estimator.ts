export type ProjectTypeId = 'landing' | 'corporate' | 'ecommerce' | 'saas'

export type DesignLevelId = 'standard' | 'customBrand' | 'highEnd'

export type FeatureId = 'cms' | 'authDb' | 'payments' | 'motion3d' | 'seoSpeed' | 'aiChatbot'

export type DeliverySpeedId = 'standard' | 'fast' | 'emergency'

export type WizardStep = 1 | 2 | 3 | 4

export interface EstimatorState {
  step: WizardStep
  projectType: ProjectTypeId | null
  pageCount: number
  designLevel: DesignLevelId | null
  features: FeatureId[]
  deliverySpeed: DeliverySpeedId
}

export type LineItemKind = 'base' | 'pages' | 'design' | 'feature' | 'multiplier'

export interface LineItem {
  id: string
  label: string
  detail?: string
  amount: number
  kind: LineItemKind
}

export interface PricingResult {
  subtotal: number
  multiplier: number
  total: number
  lineItems: LineItem[]
}

export type BudgetRangeId = 'under-5k' | '5k-15k' | '15k-30k' | '30k-plus' | 'not-sure'

export interface BookingPayload {
  name: string
  email: string
  budgetRange: BudgetRangeId
  projectDescription: string
  estimate: {
    total: number
    lineItems: LineItem[]
    selections: {
      projectType: ProjectTypeId | null
      pageCount: number
      designLevel: DesignLevelId | null
      features: FeatureId[]
      deliverySpeed: DeliverySpeedId
    }
  }
  submittedAt: string
}
