import { Sparkles } from 'lucide-react'

export function Header() {
  return (
    <header className="mx-auto max-w-5xl px-4 pb-8 pt-12 text-center sm:pt-16">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-gradient shadow-lg shadow-accent-violet/30">
        <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
        Get Your <span className="text-gradient">Project Estimate</span>
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-white/60">
        Configure your scope below and see real-time, itemized pricing for your next web project.
      </p>
    </header>
  )
}
