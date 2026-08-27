import type { Ref } from 'react'
import { PROJECT_TYPES } from '@/data/projectTypes'
import { SelectCard } from '@/components/wizard/shared/SelectCard'
import { useEstimatorContext } from '@/context/EstimatorContext'
import { useRovingIndex } from '@/hooks/useRovingIndex'
import { formatCurrency } from '@/lib/formatCurrency'

export function Step1ProjectType({ headingRef }: { headingRef: Ref<HTMLHeadingElement> }) {
  const { state, setProjectType } = useEstimatorContext()
  const activeIndex = PROJECT_TYPES.findIndex((option) => option.id === state.projectType)
  const { setItemRef, handleKeyDown, getTabIndex } = useRovingIndex(PROJECT_TYPES.length, Math.max(activeIndex, 0))

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white outline-none sm:text-3xl">
        What are you building?
      </h2>
      <p className="mt-2 text-white/60">Pick the project type that best matches your goals.</p>

      <div role="radiogroup" aria-label="Project type" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PROJECT_TYPES.map((option, index) => (
          <SelectCard
            key={option.id}
            groupId="project-type"
            title={option.title}
            description={option.description}
            priceLabel={formatCurrency(option.price)}
            icon={option.icon}
            selected={state.projectType === option.id}
            onSelect={() => setProjectType(option.id)}
            tabIndex={getTabIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            cardRef={setItemRef(index)}
          />
        ))}
      </div>
    </div>
  )
}
