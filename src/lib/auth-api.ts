import api from './api'

// Types based on API documentation
export interface User {
  id: number
  name: string
  email: string
  phone?: string
  createdAt: string
  updatedAt: string
}

export interface LoginResponse {
  access_token: string
  user: User
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  phone?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface ApiError {
  statusCode: number
  message: string
  error: string
}

// Auth API functions
export const authApi = {
  /**
   * Register a new user
   */
  async register(data: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register', data)
    return response.data
  },

  /**
   * Login user
   */
  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', data)
    return response.data
  },

  /**
   * Get current user information
   */
  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me')
    return response.data
  },
}

