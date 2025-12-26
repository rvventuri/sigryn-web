import { createFileRoute } from '@tanstack/react-router'
import { DashboardWebhooks } from '@/features/dashboard-webhooks'

export const Route = createFileRoute(
  '/_authenticated/destinations/$destinationId/dashboard/'
)({
  component: DashboardWebhooks,
})

