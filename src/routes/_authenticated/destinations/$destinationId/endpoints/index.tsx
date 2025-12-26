import { createFileRoute } from '@tanstack/react-router'
import { Endpoints } from '@/features/endpoints'

export const Route = createFileRoute(
  '/_authenticated/destinations/$destinationId/endpoints/'
)({
  component: Endpoints,
})

