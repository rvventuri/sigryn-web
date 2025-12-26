import api from './api'

// Types based on API documentation
export interface Destination {
  id: string
  organizationId: string
  name: string
  publicUrl: string
  provider: string | null
  description: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateDestinationDto {
  name: string
  provider?: string
  description?: string
}

export interface UpdateDestinationDto {
  name?: string
  provider?: string
  description?: string
  isActive?: boolean
}

export interface ApiError {
  statusCode: number
  message: string | string[]
  error: string
}

// Destinations API functions
export const destinationsApi = {
  /**
   * Get all destinations
   */
  async getAll(): Promise<Destination[]> {
    const response = await api.get<Destination[]>('/destinations')
    return response.data
  },

  /**
   * Get destination by ID
   */
  async getById(id: string): Promise<Destination> {
    const response = await api.get<Destination>(`/destinations/${id}`)
    return response.data
  },

  /**
   * Create a new destination
   */
  async create(data: CreateDestinationDto): Promise<Destination> {
    const response = await api.post<Destination>('/destinations', data)
    return response.data
  },

  /**
   * Update a destination
   */
  async update(id: string, data: UpdateDestinationDto): Promise<Destination> {
    const response = await api.patch<Destination>(`/destinations/${id}`, data)
    return response.data
  },

  /**
   * Delete a destination
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/destinations/${id}`)
  },
}

