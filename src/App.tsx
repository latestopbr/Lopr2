import { useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { Wizard } from '@/components/wizard/Wizard'
import { PriceSidebar } from '@/components/pricing/PriceSidebar'
import { PriceBar } from '@/components/pricing/PriceBar'
import { ExportModal } from '@/components/modals/ExportModal'
import { BookingModal } from '@/components/modals/BookingModal'
import { EstimatorProvider } from '@/context/EstimatorContext'

function EstimatorApp() {
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  return (
    <>
      <AppShell>
        <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-8">
          <div className="lg:col-span-2">
            <Wizard />
          </div>
          <div className="lg:col-span-1">
            <PriceSidebar onExport={() => setIsExportOpen(true)} onBook={() => setIsBookingOpen(true)} />
          </div>
        </div>
      </AppShell>

      <PriceBar onExport={() => setIsExportOpen(true)} onBook={() => setIsBookingOpen(true)} />

      <ExportModal isOpen={isExportOpen} onClose={() => setIsExportOpen(false)} />
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  )
}

function App() {
  return (
    <EstimatorProvider>
      <EstimatorApp />
    </EstimatorProvider>
  )
}

export default App
