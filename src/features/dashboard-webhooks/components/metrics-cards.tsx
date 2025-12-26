import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Activity,
  CheckCircle2,
  Clock,
  Globe,
  Link as LinkIcon,
  Server,
  XCircle,
} from 'lucide-react'
import { dashboardApi } from '@/lib/dashboard-api'
import { useQuery } from '@tanstack/react-query'

interface MetricsCardsProps {
  destinationId: string
}

export function MetricsCards({ destinationId }: MetricsCardsProps) {
  const { data: overview, isLoading } = useQuery({
    queryKey: ['dashboard-overview', destinationId],
    queryFn: () => dashboardApi.getOverview(destinationId),
  })

  if (isLoading || !overview) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {[...Array(8)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                <div className='h-4 w-24 animate-pulse rounded bg-muted' />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='h-8 w-32 animate-pulse rounded bg-muted' />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Endpoints</CardTitle>
          <Server className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>{overview.totalEndpoints}</div>
          <p className='text-xs text-muted-foreground'>
            {overview.activeEndpoints} active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Webhooks</CardTitle>
          <Globe className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {overview.totalWebhooks.toLocaleString()}
          </div>
          <p className='text-xs text-muted-foreground'>
            {overview.webhooksToday} today
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Forwards</CardTitle>
          <LinkIcon className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {overview.totalForwards.toLocaleString()}
          </div>
          <p className='text-xs text-muted-foreground'>
            {overview.successfulForwards.toLocaleString()} successful
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Success Rate</CardTitle>
          <CheckCircle2 className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {overview.successRate.toFixed(2)}%
          </div>
          <p className='text-xs text-muted-foreground'>
            {overview.failedForwards} failed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Avg Response Time</CardTitle>
          <Clock className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {overview.averageResponseTime
              ? `${overview.averageResponseTime}ms`
              : '—'}
          </div>
          <p className='text-xs text-muted-foreground'>Average response time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Last 7 Days</CardTitle>
          <Activity className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {overview.webhooksLast7Days.toLocaleString()}
          </div>
          <p className='text-xs text-muted-foreground'>Webhooks received</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Last 30 Days</CardTitle>
          <Activity className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>
            {overview.webhooksLast30Days.toLocaleString()}
          </div>
          <p className='text-xs text-muted-foreground'>Webhooks received</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Failed Forwards</CardTitle>
          <XCircle className='h-4 w-4 text-destructive' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold text-destructive'>
            {overview.failedForwards.toLocaleString()}
          </div>
          <p className='text-xs text-muted-foreground'>Permanent failures</p>
        </CardContent>
      </Card>
    </div>
  )
}

