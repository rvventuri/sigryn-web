import { z } from 'zod'

export const destinationSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  publicUrl: z.string(),
  provider: z.string().nullable(),
  description: z.string().nullable(),
  isActive: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Destination = z.infer<typeof destinationSchema>

export const destinationListSchema = z.array(destinationSchema)

