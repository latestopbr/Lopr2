import type { Ref } from 'react'
import { DELIVERY_SPEEDS } from '@/data/deliverySpeeds'
import { SelectCard } from '@/components/wizard/shared/SelectCard'
import { useEstimatorContext } from '@/context/EstimatorContext'
import { useRovingIndex } from '@/hooks/useRovingIndex'

export function Step4DeliverySpeed({ headingRef }: { headingRef: Ref<HTMLHeadingElement> }) {
  const { state, setDeliverySpeed } = useEstimatorContext()
  const activeIndex = DELIVERY_SPEEDS.findIndex((option) => option.id === state.deliverySpeed)
  const { setItemRef, handleKeyDown, getTabIndex } = useRovingIndex(DELIVERY_SPEEDS.length, Math.max(activeIndex, 0))

  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-white outline-none sm:text-3xl">
        Choose your delivery speed
      </h2>
      <p className="mt-2 text-white/60">Faster timelines apply a surcharge to your subtotal.</p>

      <div role="radiogroup" aria-label="Delivery speed" className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {DELIVERY_SPEEDS.map((option, index) => (
          <SelectCard
            key={option.id}
            groupId="delivery-speed"
            title={option.title}
            description={option.description}
            priceLabel={option.multiplier === 1 ? 'No surcharge' : `${option.multiplier}x multiplier`}
            icon={option.icon}
            selected={state.deliverySpeed === option.id}
            onSelect={() => setDeliverySpeed(option.id)}
            tabIndex={getTabIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            cardRef={setItemRef(index)}
          />
        ))}
      </div>
    </div>
  )
}
