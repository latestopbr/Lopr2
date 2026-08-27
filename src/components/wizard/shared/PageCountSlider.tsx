import { MAX_PAGES, MIN_PAGES, PRICE_PER_PAGE } from '@/lib/pricing'
import { formatCurrency } from '@/lib/formatCurrency'

interface PageCountSliderProps {
  value: number
  onChange: (value: number) => void
}

export function PageCountSlider({ value, onChange }: PageCountSliderProps) {
  const cost = value * PRICE_PER_PAGE
  const percent = ((value - MIN_PAGES) / (MAX_PAGES - MIN_PAGES)) * 100

  return (
    <div>
      <div className="mb-4 flex items-end justify-between">
        <label htmlFor="page-count" className="text-sm font-semibold text-white/80">
          Page Count
        </label>
        <span className="text-2xl font-bold text-gradient">
          {value} page{value === 1 ? '' : 's'}
        </span>
      </div>
      <input
        id="page-count"
        type="range"
        min={MIN_PAGES}
        max={MAX_PAGES}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-valuetext={`${value} pages, ${formatCurrency(cost)}`}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent-violet"
        style={{
          background: `linear-gradient(to right, #6366f1, #8b5cf6 ${percent}%, rgb(255 255 255 / 0.1) ${percent}%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-xs text-white/50">
        <span>{MIN_PAGES} page</span>
        <span>${PRICE_PER_PAGE} / page &middot; {formatCurrency(cost)} subtotal</span>
        <span>{MAX_PAGES} pages</span>
      </div>
    </div>
  )
}
