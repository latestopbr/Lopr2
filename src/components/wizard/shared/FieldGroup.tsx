import type { ReactNode } from 'react'

interface FieldGroupProps {
  label: string
  htmlFor: string
  error?: string
  children: ReactNode
}

export function FieldGroup({ label, htmlFor, error, children }: FieldGroupProps) {
  const errorId = `${htmlFor}-error`

  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-pink-400">
          {error}
        </p>
      )}
    </div>
  )
}
