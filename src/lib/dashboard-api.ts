import api from './api'

// Types based on API documentation
export interface DashboardOverview {
  totalEndpoints: number
  activeEndpoints: number
  totalWebhooks: number
  totalForwards: number
  successfulForwards: number
  failedForwards: number
  successRate: number
  averageResponseTime: number | null
  webhooksToday: number
  webhooksLast7Days: number
  webhooksLast30Days: number
}

export interface EndpointStats {
  endpointId: string
  endpointName: string
  targetUrl: string
  totalForwards: number
  successfulForwards: number
  failedForwards: number
  retryingForwards: number
  successRate: number
  averageResponseTime: number | null
  totalRequests: number
  lastForwardAt: string | null
}

export interface TimeSeriesData {
  date: string
  count: number
  success: number
  failed: number
}

export interface StatusBreakdown {
  status: 'pending' | 'success' | 'failed' | 'retrying'
  count: number
}

export interface RecentWebhook {
  id: string
  destinationId: string
  method: string
  headers: Record<string, string>
  body: string
  bodySizeBytes: number
  queryParams: Record<string, string> | null
  sourceIp: string
  userAgent: string | null
  signature: string | null
  isValidSignature: boolean | null
  receivedAt: string
  processedAt: string | null
  processingTimeMs: number | null
  forwards: Array<{
    id: string
    status: string
    responseStatusCode: number | null
    sentAt: string
  }>
}

export interface WebhookRequest {
  id: string
  destinationId: string
  method: string
  headers: Record<string, string>
  body: string
  bodySizeBytes: number
  queryParams: Record<string, string> | null
  sourceIp: string
  userAgent: string | null
  signature: string | null
  isValidSignature: boolean | null
  receivedAt: string
  processedAt: string | null
  processingTimeMs: number | null
  destination: {
    id: string
    name: string
    publicUrl: string
  }
  forwards: Array<{
    id: string
    status: string
    responseStatusCode: number | null
    sentAt: string
    errorMessage: string | null
  }>
}

export interface WebhookRequestsResponse {
  data: WebhookRequest[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

export interface WebhookRequestsFilters {
  page?: number
  limit?: number
  destinationId?: string
  method?: string
  sourceIp?: string
  isValidSignature?: boolean
  dateFrom?: string
  dateTo?: string
  sortBy?: 'receivedAt' | 'processingTimeMs'
  sortOrder?: 'ASC' | 'DESC'
}

export interface EndpointDetailStats {
  endpoint: {
    id: string
    destinationId: string
    targetUrl: string
    name: string | null
    method: string
    authType: string | null
    authHeaderName: string | null
    maxRetries: number
    retryDelaySeconds: number
    timeoutSeconds: number
    customHeaders: Record<string, string> | null
    isActive: boolean
    createdAt: string
    updatedAt: string
  }
  forwards: any[]
  statistics: Array<{
    status: string
    count: number
    avgResponseTime: number | null
    minResponseTime: number | null
    maxResponseTime: number | null
  }>
}

// Dashboard API functions
export const dashboardApi = {
  /**
   * Get dashboard overview
   */
  async getOverview(destinationId: string): Promise<DashboardOverview> {
    const response = await api.get<DashboardOverview>(
      `/destinations/${destinationId}/dashboard/overview`
    )
    return response.data
  },

  /**
   * Get statistics for all endpoints
   */
  async getEndpointsStats(destinationId: string): Promise<EndpointStats[]> {
    const response = await api.get<EndpointStats[]>(
      `/destinations/${destinationId}/dashboard/endpoints`
    )
    return response.data
  },

  /**
   * Get time series data
   */
  async getTimeSeries(
    destinationId: string,
    days: number = 30
  ): Promise<TimeSeriesData[]> {
    const response = await api.get<TimeSeriesData[]>(
      `/destinations/${destinationId}/dashboard/timeseries`,
      {
        params: { days },
      }
    )
    return response.data
  },

  /**
   * Get recent webhooks
   */
  async getRecentWebhooks(
    destinationId: string,
    limit: number = 50
  ): Promise<RecentWebhook[]> {
    const response = await api.get<RecentWebhook[]>(
      `/destinations/${destinationId}/dashboard/recent`,
      {
        params: { limit },
      }
    )
    return response.data
  },

  /**
   * Get detailed endpoint statistics
   */
  async getEndpointDetail(
    destinationId: string,
    endpointId: string
  ): Promise<EndpointDetailStats> {
    const response = await api.get<EndpointDetailStats>(
      `/destinations/${destinationId}/dashboard/endpoints/${endpointId}`
    )
    return response.data
  },

  /**
   * Get status breakdown
   */
  async getStatusBreakdown(
    destinationId: string
  ): Promise<StatusBreakdown[]> {
    const response = await api.get<StatusBreakdown[]>(
      `/destinations/${destinationId}/dashboard/status-breakdown`
    )
    return response.data
  },

  /**
   * Get all webhook requests with pagination and filters
   */
  async getWebhookRequests(
    filters: WebhookRequestsFilters = {}
  ): Promise<WebhookRequestsResponse> {
    const response = await api.get<WebhookRequestsResponse>(
      '/dashboard/webhook-requests',
      {
        params: filters,
      }
    )
    return response.data
  },
}

