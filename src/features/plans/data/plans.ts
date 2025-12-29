export interface Plan {
  id: 'free' | 'basic' | 'pro'
  name: string
  description: string
  price: number
  priceId: string
  currency: string
  features: string[]
  color: string
  popular?: boolean
}

export const plans: Plan[] = [
  {
    id: 'free',
    name: 'Sigryn Free',
    description: 'For testing and development',
    price: 0,
    priceId: 'price_1SjeYMRkir6oz0CXTxkaGd0a',
    currency: 'usd',
    color: 'default',
    features: [
      'Up to 2 destinations',
      '1,000 events / month',
      '7-day event history',
      'Manual retry',
      'Full payload & headers visibility',
      'Basic webhook monitoring',
    ],
  },
  {
    id: 'basic',
    name: 'Sigryn Basic',
    description: 'Production-ready webhook monitoring',
    price: 19.9,
    priceId: 'price_1SjeZyRkir6oz0CX8JbgGzoa',
    currency: 'usd',
    color: 'blue',
    popular: true,
    features: [
      'Up to 5 destinations',
      '50,000 events / month',
      '30-day event history',
      'Manual retry & replay',
      'Full event timeline',
      'Production-ready dashboard',
    ],
  },
  {
    id: 'pro',
    name: 'Sigryn Pro',
    description: 'Advanced webhook reliability',
    price: 79.9,
    priceId: 'price_1SjeahRkir6oz0CXVG0sJC0i',
    currency: 'usd',
    color: 'purple',
    features: [
      'Unlimited destinations',
      '500,000 events / month',
      '90-day event history',
      'Automatic retries with backoff',
      'Manual & automated replay',
      'Alerts (Slack & Email)',
      'Webhook health metrics',
    ],
  },
]

export function getPlanById(id: string): Plan | undefined {
  return plans.find((plan) => plan.id === id)
}

export function getPlanByPriceId(priceId: string): Plan | undefined {
  return plans.find((plan) => plan.priceId === priceId)
}

