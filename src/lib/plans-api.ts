import api from './api'

export interface Plan {
  id: string
  stripePriceId: string
  name: string
  description: string
  amount: number
  currency: string
  interval: 'month' | 'year'
  intervalCount: number
  planType: 'free' | 'production' | 'advanced'
  webhookLimit: number
  isActive: boolean
}

export const plansApi = {
  /**
   * Get all available plans
   */
  async getAll(): Promise<Plan[]> {
    const response = await api.get<Plan[]>('/plans')
    return response.data
  },

  /**
   * Get plan by ID
   */
  async getById(id: string): Promise<Plan> {
    const response = await api.get<Plan>(`/plans/${id}`)
    return response.data
  },

  /**
   * Seed default plans (admin only)
   */
  async seed(): Promise<void> {
    await api.post('/plans/seed')
  },
}

