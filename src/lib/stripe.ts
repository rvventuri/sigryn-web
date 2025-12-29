import api from './api'

// Dynamic import to avoid errors if @stripe/stripe-js is not installed
let stripeModule: any = null
let stripePromise: Promise<any> | null = null

async function loadStripeModule() {
  if (!stripeModule) {
    try {
      // @ts-ignore - Dynamic import, module may not be installed
      stripeModule = await import('@stripe/stripe-js')
    } catch (error) {
      console.warn('@stripe/stripe-js is not installed. Run: pnpm add @stripe/stripe-js')
      return null
    }
  }
  return stripeModule
}

export async function getStripe(): Promise<any> {
  const module = await loadStripeModule()
  if (!module) return null

  if (!stripePromise) {
    const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    if (!publishableKey) {
      console.warn('Stripe publishable key not found. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file')
      return null
    }
    stripePromise = module.loadStripe(publishableKey)
  }
  return stripePromise
}

export interface CreateCheckoutSessionRequest {
  priceId: string
  organizationId: string
}

export interface CreateCheckoutSessionResponse {
  sessionId: string
  url: string
}

/**
 * Create a Stripe checkout session
 */
export async function createCheckoutSession(
  priceId: string,
  organizationId: string
): Promise<CreateCheckoutSessionResponse | null> {
  try {
    const response = await api.post<CreateCheckoutSessionResponse>(
      '/stripe/checkout',
      { priceId, organizationId }
    )
    return response.data
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return null
  }
}

