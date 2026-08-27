import { useMemo, useReducer } from 'react'
import { DEFAULT_PAGE_COUNT, MAX_PAGES, MIN_PAGES, calculatePricing } from '@/lib/pricing'
import type {
  DeliverySpeedId,
  DesignLevelId,
  EstimatorState,
  FeatureId,
  ProjectTypeId,
  WizardStep,
} from '@/types/estimator'

const INITIAL_STATE: EstimatorState = {
  step: 1,
  projectType: null,
  pageCount: DEFAULT_PAGE_COUNT,
  designLevel: null,
  features: [],
  deliverySpeed: 'standard',
}

type Action =
  | { type: 'SET_PROJECT_TYPE'; payload: ProjectTypeId }
  | { type: 'SET_PAGE_COUNT'; payload: number }
  | { type: 'SET_DESIGN_LEVEL'; payload: DesignLevelId }
  | { type: 'TOGGLE_FEATURE'; payload: FeatureId }
  | { type: 'SET_DELIVERY_SPEED'; payload: DeliverySpeedId }
  | { type: 'SET_STEP'; payload: WizardStep }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' }

function clampPageCount(value: number): number {
  return Math.min(MAX_PAGES, Math.max(MIN_PAGES, Math.round(value)))
}

function reducer(state: EstimatorState, action: Action): EstimatorState {
  switch (action.type) {
    case 'SET_PROJECT_TYPE':
      return { ...state, projectType: action.payload }
    case 'SET_PAGE_COUNT':
      return { ...state, pageCount: clampPageCount(action.payload) }
    case 'SET_DESIGN_LEVEL':
      return { ...state, designLevel: action.payload }
    case 'TOGGLE_FEATURE': {
      const isSelected = state.features.includes(action.payload)
      return {
        ...state,
        features: isSelected
          ? state.features.filter((id) => id !== action.payload)
          : [...state.features, action.payload],
      }
    }
    case 'SET_DELIVERY_SPEED':
      return { ...state, deliverySpeed: action.payload }
    case 'SET_STEP':
      return { ...state, step: action.payload }
    case 'NEXT_STEP':
      return { ...state, step: Math.min(4, state.step + 1) as WizardStep }
    case 'PREV_STEP':
      return { ...state, step: Math.max(1, state.step - 1) as WizardStep }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

export function canProceedFromStep(state: EstimatorState, step: WizardStep): boolean {
  switch (step) {
    case 1:
      return state.projectType !== null
    case 2:
      return state.designLevel !== null
    case 3:
      return true
    case 4:
      return true
    default:
      return true
  }
}

export function useEstimator() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  const pricing = useMemo(() => calculatePricing(state), [state])
  const canProceed = useMemo(() => canProceedFromStep(state, state.step), [state])

  const actions = useMemo(
    () => ({
      setProjectType: (id: ProjectTypeId) => dispatch({ type: 'SET_PROJECT_TYPE', payload: id }),
      setPageCount: (count: number) => dispatch({ type: 'SET_PAGE_COUNT', payload: count }),
      setDesignLevel: (id: DesignLevelId) => dispatch({ type: 'SET_DESIGN_LEVEL', payload: id }),
      toggleFeature: (id: FeatureId) => dispatch({ type: 'TOGGLE_FEATURE', payload: id }),
      setDeliverySpeed: (id: DeliverySpeedId) => dispatch({ type: 'SET_DELIVERY_SPEED', payload: id }),
      goToStep: (step: WizardStep) => dispatch({ type: 'SET_STEP', payload: step }),
      nextStep: () => dispatch({ type: 'NEXT_STEP' }),
      prevStep: () => dispatch({ type: 'PREV_STEP' }),
      reset: () => dispatch({ type: 'RESET' }),
    }),
    [],
  )

  return { state, pricing, canProceed, ...actions }
}

export type UseEstimatorReturn = ReturnType<typeof useEstimator>
