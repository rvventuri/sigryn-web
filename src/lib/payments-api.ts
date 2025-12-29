import api from './api'

export type PaymentStatus =
  | 'pending'
  | 'succeeded'
  | 'failed'
  | 'canceled'
  | 'refunded'

export interface Payment {
  id: string
  subscriptionId: string
  organizationId: string
  stripePaymentIntentId: string
  amount: number
  currency: string
  status: PaymentStatus
  paidAt: string | null
  failureReason: string | null
  createdAt: string
}

export const paymentsApi = {
  /**
   * Get all payments for an organization
   */
  async getByOrganization(organizationId: string): Promise<Payment[]> {
    const response = await api.get<Payment[]>(
      `/payments/organization/${organizationId}`
    )
    return response.data
  },

  /**
   * Get all payments for a subscription
   */
  async getBySubscription(subscriptionId: string): Promise<Payment[]> {
    const response = await api.get<Payment[]>(
      `/payments/subscription/${subscriptionId}`
    )
    return response.data
  },
}

