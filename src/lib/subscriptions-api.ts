import api from './api'
import type { Plan } from './plans-api'

export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'past_due'
  | 'unpaid'
  | 'incomplete'
  | 'incomplete_expired'
  | 'trialing'
  | 'paused'

export interface Subscription {
  id: string
  organizationId: string
  planId: string
  stripeSubscriptionId: string
  stripeCustomerId: string
  status: SubscriptionStatus
  currentPeriodStart: string
  currentPeriodEnd: string
  cancelAt: string | null
  cancelAtPeriodEnd: boolean
  canceledAt: string | null
  trialStart: string | null
  trialEnd: string | null
  plan: Plan
}

export const subscriptionsApi = {
  /**
   * Get active subscription for an organization
   */
  async getByOrganization(organizationId: string): Promise<Subscription | null> {
    const response = await api.get<Subscription | null>(
      `/subscriptions/organization/${organizationId}`
    )
    return response.data
  },

  /**
   * Get subscription by ID
   */
  async getById(id: string): Promise<Subscription> {
    const response = await api.get<Subscription>(`/subscriptions/${id}`)
    return response.data
  },

  /**
   * Cancel a subscription
   */
  async cancel(
    id: string,
    cancelAtPeriodEnd: boolean = true
  ): Promise<Subscription> {
    const response = await api.post<Subscription>(`/subscriptions/${id}/cancel`, {
      cancelAtPeriodEnd,
    })
    return response.data
  },

  /**
   * Resume a canceled subscription
   */
  async resume(id: string): Promise<Subscription> {
    const response = await api.post<Subscription>(`/subscriptions/${id}/resume`)
    return response.data
  },
}

