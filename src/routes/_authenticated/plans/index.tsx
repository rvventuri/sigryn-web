import { createFileRoute } from '@tanstack/react-router'
import { PlansPage } from '@/features/plans'

export const Route = createFileRoute('/_authenticated/plans/' as any)({
  component: PlansPage,
})

