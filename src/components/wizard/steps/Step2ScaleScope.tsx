import type { Ref } from 'react'
import { DESIGN_LEVELS } from '@/data/designLevels'
import { SelectCard } from '@/components/wizard/shared/SelectCard'
import { PageCountSlider } from '@/components/wizard/shared/PageCountSlider'
import { GlassCard } from '@/components/ui/GlassCard'
import { useEstimatorContext } from '@/context/EstimatorContext'
import { useRovingIndex } from '@/hooks/useRovingIndex'
import { formatCurrency } from '@/lib/formatCurrency'

export function Step2ScaleScope({ headingRef }: { headingRef: Ref<HTMLHeadingElement> }) {
  const { state, setPageCount, setDesignLevel } = useEstimatorContext()
  const activeIndex = DESIGN_LEVELS.findIndex((option) => option.id === state.designLevel)
  const { setItemRef, handleKeyDown, getTabIndex } = useRovingIndex(DESIGN_LEVELS.length, Math.max(activeIndex, 0))

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white outline-none sm:text-3xl">
        Define your scale & scope
      </h2>
      <p className="mt-2 text-white/60">How many pages, and how polished should the design be?</p>

      <GlassCard className="mt-8 p-6">
        <PageCountSlider value={state.pageCount} onChange={setPageCount} />
      </GlassCard>

      <h3 className="mt-8 text-sm font-semibold uppercase tracking-wide text-white/50">Design Level</h3>
      <div role="radiogroup" aria-label="Design level" className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DESIGN_LEVELS.map((option, index) => (
          <SelectCard
            key={option.id}
            groupId="design-level"
            title={option.title}
            description={option.description}
            priceLabel={option.upcharge === 0 ? 'Included' : `+${formatCurrency(option.upcharge)}`}
            icon={option.icon}
            selected={state.designLevel === option.id}
            onSelect={() => setDesignLevel(option.id)}
            tabIndex={getTabIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            cardRef={setItemRef(index)}
          />
        ))}
      </div>
    </div>
  )
}
