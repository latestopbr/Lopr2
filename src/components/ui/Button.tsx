import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { Loader2 } from 'lucide-react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ComponentPropsWithoutRef<typeof motion.button> {
  variant?: ButtonVariant
  icon?: ComponentType<{ className?: string }>
  iconPosition?: 'left' | 'right'
  isLoading?: boolean
  children?: ReactNode
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-accent-gradient text-white shadow-lg shadow-accent-violet/25 hover:shadow-accent-violet/40',
  secondary: 'glass text-white hover:bg-white/10',
  ghost: 'text-white/70 hover:text-white hover:bg-white/5',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', icon: Icon, iconPosition = 'left', isLoading = false, className, children, disabled, ...rest },
  ref,
) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <motion.button
      ref={ref}
      whileHover={prefersReducedMotion || disabled ? undefined : { scale: 1.03 }}
      whileTap={prefersReducedMotion || disabled ? undefined : { scale: 0.97 }}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASSES[variant],
        className,
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      {children}
      {!isLoading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
    </motion.button>
  )
})
