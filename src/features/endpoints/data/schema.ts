import { z } from 'zod'

export const httpMethodSchema = z.enum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
export type HttpMethod = z.infer<typeof httpMethodSchema>

export const authTypeSchema = z.enum(['none', 'bearer', 'basic', 'api_key', 'custom'])
export type AuthType = z.infer<typeof authTypeSchema>

export const endpointSchema = z.object({
  id: z.string(),
  destinationId: z.string(),
  targetUrl: z.string(),
  name: z.string().nullable(),
  method: httpMethodSchema,
  authType: z.string().nullable(),
  authHeaderName: z.string().nullable(),
  maxRetries: z.number(),
  retryDelaySeconds: z.number(),
  timeoutSeconds: z.number(),
  customHeaders: z.record(z.string(), z.string()).nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Endpoint = z.infer<typeof endpointSchema>

export const endpointListSchema = z.array(endpointSchema)

