import type { ReactNode } from 'react'
import { AnimatedBackground } from '@/components/background/AnimatedBackground'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <div className="grid-overlay pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />

      <div className="relative pb-28 lg:pb-0">
        <Header />
        <main className="mx-auto max-w-5xl px-4 pb-16">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
