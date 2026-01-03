import api from './api'

/**
 * Response for retry webhook request
 */
export interface RetryWebhookRequestResponse {
  webhookRequestId: string
  forwardsCreated: number
}

/**
 * Response for retry forward
 */
export interface RetryForwardResponse {
  id: string
  webhookRequestId: string
  endpointId: string
  attemptNumber: number
  status: 'pending' | 'success' | 'failed' | 'retrying'
  sentAt: string | null
  requestHeaders: Record<string, string> | null
  requestBody: string | null
  responseStatusCode: number | null
  responseHeaders: Record<string, string> | null
  responseBody: string | null
  responseTimeMs: number | null
  errorMessage: string | null
  errorType: string | null
  nextRetryAt: string | null
  createdAt: string
}

/**
 * Request body for retry webhook request
 */
export interface RetryWebhookRequestDto {
  onlyFailed?: boolean
}

/**
 * Webhooks API functions
 */
export const webhooksApi = {
  /**
   * Retry a webhook request
   * Creates new forwards for all active endpoints or only failed ones
   */
  async retryWebhookRequest(
    webhookRequestId: string,
    options: RetryWebhookRequestDto = {}
  ): Promise<RetryWebhookRequestResponse> {
    const response = await api.post<RetryWebhookRequestResponse>(
      `/webhooks/requests/${webhookRequestId}/retry`,
      {
        onlyFailed: options.onlyFailed || false,
      }
    )
    return response.data
  },

  /**
   * Retry a specific forward
   * Creates a new forward with incremented attempt number
   */
  async retryForward(forwardId: string): Promise<RetryForwardResponse> {
    const response = await api.post<RetryForwardResponse>(
      `/webhooks/forwards/${forwardId}/retry`
    )
    return response.data
  },
}

