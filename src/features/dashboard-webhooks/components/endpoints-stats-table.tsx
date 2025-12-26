import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { dashboardApi } from '@/lib/dashboard-api'
import { useQuery } from '@tanstack/react-query'
import { LongText } from '@/components/long-text'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EndpointsStatsTableProps {
  destinationId: string
}

export function EndpointsStatsTable({ destinationId }: EndpointsStatsTableProps) {
  const { data: endpoints, isLoading } = useQuery({
    queryKey: ['dashboard-endpoints', destinationId],
    queryFn: () => dashboardApi.getEndpointsStats(destinationId),
  })

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '—'
    try {
      const date = new Date(dateStr)
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date)
    } catch {
      return dateStr
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Endpoint Statistics</CardTitle>
          <CardDescription>Performance metrics by endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-muted-foreground'>Loading...</div>
        </CardContent>
      </Card>
    )
  }

  if (!endpoints || endpoints.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Endpoint Statistics</CardTitle>
          <CardDescription>Performance metrics by endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='text-muted-foreground'>No endpoints found</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Endpoint Statistics</CardTitle>
        <CardDescription>Performance metrics by endpoint</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='rounded-md border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Endpoint</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className='text-right'>Forwards</TableHead>
                <TableHead className='text-right'>Success</TableHead>
                <TableHead className='text-right'>Failed</TableHead>
                <TableHead className='text-right'>Retrying</TableHead>
                <TableHead className='text-right'>Success Rate</TableHead>
                <TableHead className='text-right'>Avg Response</TableHead>
                <TableHead>Last Forward</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endpoints.map((endpoint) => (
                <TableRow key={endpoint.endpointId}>
                  <TableCell className='font-medium'>
                    {endpoint.endpointName || '—'}
                  </TableCell>
                  <TableCell>
                    <LongText className='max-w-[200px] text-sm'>
                      {endpoint.targetUrl}
                    </LongText>
                  </TableCell>
                  <TableCell className='text-right'>
                    {endpoint.totalForwards.toLocaleString()}
                  </TableCell>
                  <TableCell className='text-right'>
                    <Badge
                      variant='outline'
                      className='border-green-500 text-green-700 dark:text-green-400'
                    >
                      {endpoint.successfulForwards.toLocaleString()}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    <Badge
                      variant='outline'
                      className='border-red-500 text-red-700 dark:text-red-400'
                    >
                      {endpoint.failedForwards.toLocaleString()}
                    </Badge>
                  </TableCell>
                  <TableCell className='text-right'>
                    {endpoint.retryingForwards > 0 ? (
                      <Badge
                        variant='outline'
                        className='border-yellow-500 text-yellow-700 dark:text-yellow-400'
                      >
                        {endpoint.retryingForwards.toLocaleString()}
                      </Badge>
                    ) : (
                      <span className='text-muted-foreground'>0</span>
                    )}
                  </TableCell>
                  <TableCell className='text-right'>
                    <span
                      className={cn(
                        'font-medium',
                        endpoint.successRate >= 95
                          ? 'text-green-600 dark:text-green-400'
                          : endpoint.successRate >= 80
                            ? 'text-yellow-600 dark:text-yellow-400'
                            : 'text-red-600 dark:text-red-400'
                      )}
                    >
                      {endpoint.successRate.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell className='text-right'>
                    {endpoint.averageResponseTime
                      ? `${endpoint.averageResponseTime}ms`
                      : '—'}
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {formatDate(endpoint.lastForwardAt)}
                  </TableCell>
                  <TableCell>
                    <Link
                      to='/destinations/$destinationId/endpoints'
                      params={{ destinationId }}
                    >
                      <Button variant='ghost' size='sm'>
                        <ExternalLink className='h-4 w-4' />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

