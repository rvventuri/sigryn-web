import api from './api'

// Notification Config Types
export interface NotificationConfig {
  id: string
  destinationId: string | null
  organizationId: string | null
  channel: 'slack' | 'email'
  scope: 'destination' | 'organization'
  webhookUrl: string
  name: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateNotificationConfigDto {
  scope: 'destination' | 'organization'
  destinationId?: string
  channel: 'slack' | 'email'
  webhookUrl: string
  name?: string
  isActive?: boolean
}

export interface UpdateNotificationConfigDto {
  name?: string
  webhookUrl?: string
  isActive?: boolean
}

// Alert Rule Types
export type AlertCondition =
  | 'failed_forward'
  | 'multiple_failures'
  | 'all_endpoints_failed'
  | 'high_failure_rate'

export interface AlertRule {
  id: string
  destinationId: string | null
  organizationId: string | null
  scope: 'destination' | 'organization'
  condition: AlertCondition
  name: string
  description: string | null
  failureThreshold: number | null
  failureRateThreshold: number | null
  timeWindowMinutes: number | null
  cooldownMinutes: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateAlertRuleDto {
  scope: 'destination' | 'organization'
  destinationId?: string
  condition: AlertCondition
  name: string
  description?: string
  failureThreshold?: number
  failureRateThreshold?: number
  timeWindowMinutes?: number
  cooldownMinutes?: number
  isActive?: boolean
}

export interface UpdateAlertRuleDto {
  name?: string
  description?: string
  failureThreshold?: number
  failureRateThreshold?: number
  timeWindowMinutes?: number
  cooldownMinutes?: number
  isActive?: boolean
}

// Notification Configs API
export const notificationsConfigsApi = {
  /**
   * Get all notification configs
   */
  async getAll(destinationId?: string): Promise<NotificationConfig[]> {
    const params = destinationId ? { destinationId } : {}
    const response = await api.get<NotificationConfig[]>('/notifications/configs', {
      params,
    })
    return response.data
  },

  /**
   * Get notification config by ID
   */
  async getById(id: string): Promise<NotificationConfig> {
    const response = await api.get<NotificationConfig>(`/notifications/configs/${id}`)
    return response.data
  },

  /**
   * Create a new notification config
   */
  async create(data: CreateNotificationConfigDto): Promise<NotificationConfig> {
    const response = await api.post<NotificationConfig>('/notifications/configs', data)
    return response.data
  },

  /**
   * Update a notification config
   */
  async update(
    id: string,
    data: UpdateNotificationConfigDto
  ): Promise<NotificationConfig> {
    const response = await api.patch<NotificationConfig>(
      `/notifications/configs/${id}`,
      data
    )
    return response.data
  },

  /**
   * Delete a notification config
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/notifications/configs/${id}`)
  },
}

// Alert Rules API
export const alertRulesApi = {
  /**
   * Get all alert rules
   */
  async getAll(destinationId?: string): Promise<AlertRule[]> {
    const params = destinationId ? { destinationId } : {}
    const response = await api.get<AlertRule[]>('/notifications/alert-rules', {
      params,
    })
    return response.data
  },

  /**
   * Get alert rule by ID
   */
  async getById(id: string): Promise<AlertRule> {
    const response = await api.get<AlertRule>(`/notifications/alert-rules/${id}`)
    return response.data
  },

  /**
   * Create a new alert rule
   */
  async create(data: CreateAlertRuleDto): Promise<AlertRule> {
    const response = await api.post<AlertRule>('/notifications/alert-rules', data)
    return response.data
  },

  /**
   * Update an alert rule
   */
  async update(id: string, data: UpdateAlertRuleDto): Promise<AlertRule> {
    const response = await api.patch<AlertRule>(`/notifications/alert-rules/${id}`, data)
    return response.data
  },

  /**
   * Delete an alert rule
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/notifications/alert-rules/${id}`)
  },
}

