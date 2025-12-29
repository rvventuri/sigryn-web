import api from './api'
import axios from 'axios'

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'converted'
  | 'lost'

export interface Lead {
  id: string
  name: string
  email: string
  phone: string
  planSelected: string | null
  status: LeadStatus
  notes: string | null
  company: string | null
  createdAt: string
  updatedAt: string
}

export interface CreateLeadDto {
  name: string
  email: string
  phone: string
  planSelected?: string
  status?: LeadStatus
  notes?: string
  company?: string
}

export interface UpdateLeadDto {
  name?: string
  email?: string
  phone?: string
  planSelected?: string
  status?: LeadStatus
  notes?: string
  company?: string
}

// Public API instance for endpoints that don't require authentication
const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://webhook-pulse-api.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const leadsApi = {
  /**
   * Create a new lead (public endpoint - no authentication required)
   */
  async create(data: CreateLeadDto): Promise<Lead> {
    const response = await publicApi.post<Lead>('/leads', data)
    return response.data
  },

  /**
   * Get all leads (authenticated)
   */
  async getAll(status?: LeadStatus): Promise<Lead[]> {
    const params = status ? { status } : {}
    const response = await api.get<Lead[]>('/leads', { params })
    return response.data
  },

  /**
   * Get lead by ID (authenticated)
   */
  async getById(id: string): Promise<Lead> {
    const response = await api.get<Lead>(`/leads/${id}`)
    return response.data
  },

  /**
   * Update a lead (authenticated)
   */
  async update(id: string, data: UpdateLeadDto): Promise<Lead> {
    const response = await api.patch<Lead>(`/leads/${id}`, data)
    return response.data
  },

  /**
   * Delete a lead (authenticated)
   */
  async delete(id: string): Promise<void> {
    await api.delete(`/leads/${id}`)
  },
}

