import type { Ref } from 'react'
import { FEATURES } from '@/data/features'
import { ToggleCard } from '@/components/wizard/shared/ToggleCard'
import { useEstimatorContext } from '@/context/EstimatorContext'
import { formatCurrency } from '@/lib/formatCurrency'

export function Step3Features({ headingRef }: { headingRef: Ref<HTMLHeadingElement> }) {
  const { state, toggleFeature } = useEstimatorContext()

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white outline-none sm:text-3xl">
        Features & integrations
      </h2>
      <p className="mt-2 text-white/60">Select any add-ons your project needs. Optional — skip if none apply.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <ToggleCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            priceLabel={`+${formatCurrency(feature.price)}`}
            icon={feature.icon}
            checked={state.features.includes(feature.id)}
            onToggle={() => toggleFeature(feature.id)}
          />
        ))}
      </div>
    </div>
  )
}
