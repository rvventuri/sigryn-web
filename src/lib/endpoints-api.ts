import api from './api'

// Types based on API documentation
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type AuthType = 'none' | 'bearer' | 'basic' | 'api_key' | 'custom'

export interface Endpoint {
  id: string
  destinationId: string
  targetUrl: string
  name: string | null
  method: HttpMethod
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

export interface CreateEndpointDto {
  targetUrl: string
  name?: string
  method?: HttpMethod
  authType?: AuthType
  authHeaderName?: string
  authHeaderValue?: string
  maxRetries?: number
  retryDelaySeconds?: number
  timeoutSeconds?: number
  customHeaders?: Record<string, string>
  isActive?: boolean
}

export interface UpdateEndpointDto {
  targetUrl?: string
  name?: string
  method?: HttpMethod
  authType?: AuthType
  authHeaderName?: string
  authHeaderValue?: string
  maxRetries?: number
  retryDelaySeconds?: number
  timeoutSeconds?: number
  customHeaders?: Record<string, string>
  isActive?: boolean
}

export interface ApiError {
  statusCode: number
  message: string | string[]
  error: string
}

// Endpoints API functions
export const endpointsApi = {
  /**
   * Get all endpoints for a destination
   */
  async getAll(destinationId: string): Promise<Endpoint[]> {
    const response = await api.get<Endpoint[]>(
      `/destinations/${destinationId}/endpoints`
    )
    return response.data
  },

  /**
   * Get endpoint by ID
   */
  async getById(
    destinationId: string,
    endpointId: string
  ): Promise<Endpoint> {
    const response = await api.get<Endpoint>(
      `/destinations/${destinationId}/endpoints/${endpointId}`
    )
    return response.data
  },

  /**
   * Create a new endpoint
   */
  async create(
    destinationId: string,
    data: CreateEndpointDto
  ): Promise<Endpoint> {
    const response = await api.post<Endpoint>(
      `/destinations/${destinationId}/endpoints`,
      data
    )
    return response.data
  },

  /**
   * Update an endpoint
   */
  async update(
    destinationId: string,
    endpointId: string,
    data: UpdateEndpointDto
  ): Promise<Endpoint> {
    const response = await api.patch<Endpoint>(
      `/destinations/${destinationId}/endpoints/${endpointId}`,
      data
    )
    return response.data
  },

  /**
   * Delete an endpoint
   */
  async delete(destinationId: string, endpointId: string): Promise<void> {
    await api.delete(`/destinations/${destinationId}/endpoints/${endpointId}`)
  },
}

