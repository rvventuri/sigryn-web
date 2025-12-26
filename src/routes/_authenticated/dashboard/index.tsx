import { createFileRoute } from '@tanstack/react-router'
import { WebhookRequests } from '@/features/webhook-requests'
import { z } from 'zod'

const webhookRequestsSearchSchema = z.object({
  page: z.number().optional().catch(1),
  limit: z.number().optional().catch(20),
  destinationId: z.string().optional().catch(undefined),
  method: z.string().optional().catch(undefined),
  sourceIp: z.string().optional().catch(undefined),
  isValidSignature: z.enum(['true', 'false']).optional().catch(undefined),
  dateFrom: z.string().optional().catch(undefined),
  dateTo: z.string().optional().catch(undefined),
  sortBy: z.enum(['receivedAt', 'processingTimeMs']).optional().catch(undefined),
  sortOrder: z.enum(['ASC', 'DESC']).optional().catch(undefined),
})

export const Route = createFileRoute('/_authenticated/dashboard/')({
  validateSearch: webhookRequestsSearchSchema,
  component: WebhookRequests,
})

