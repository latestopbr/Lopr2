import { Bot, CreditCard, FileText, Gauge, Orbit, ShieldCheck } from 'lucide-react'
import type { ComponentType } from 'react'
import type { FeatureId } from '@/types/estimator'
import { FEATURE_PRICES } from '@/lib/pricing'

export interface FeatureOption {
  id: FeatureId
  title: string
  description: string
  price: number
  icon: ComponentType<{ className?: string }>
}

export const FEATURES: FeatureOption[] = [
  {
    id: 'cms',
    title: 'Content Management System',
    description: 'Edit pages, posts, and media yourself without touching code.',
    price: FEATURE_PRICES.cms,
    icon: FileText,
  },
  {
    id: 'authDb',
    title: 'User Authentication & Database',
    description: 'Accounts, logins, and a persistent database for user data.',
    price: FEATURE_PRICES.authDb,
    icon: ShieldCheck,
  },
  {
    id: 'payments',
    title: 'Payment Gateway / Stripe',
    description: 'Accept payments with a secure, PCI-compliant checkout.',
    price: FEATURE_PRICES.payments,
    icon: CreditCard,
  },
  {
    id: 'motion3d',
    title: 'Custom 3D / WebGL Motion',
    description: 'Interactive 3D scenes and choreographed motion design.',
    price: FEATURE_PRICES.motion3d,
    icon: Orbit,
  },
  {
    id: 'seoSpeed',
    title: 'Technical SEO & Speed',
    description: 'Structured data, meta tuning, and Core Web Vitals optimization.',
    price: FEATURE_PRICES.seoSpeed,
    icon: Gauge,
  },
  {
    id: 'aiChatbot',
    title: 'AI Chatbot Integration',
    description: 'A trained conversational assistant embedded in your site.',
    price: FEATURE_PRICES.aiChatbot,
    icon: Bot,
  },
]
