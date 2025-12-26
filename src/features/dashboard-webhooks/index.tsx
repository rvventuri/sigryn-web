import { getRouteApi, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Loader2, BarChart3 } from 'lucide-react'
// import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { destinationsApi } from '@/lib/destinations-api'
import { MetricsCards } from './components/metrics-cards'
import { TimeSeriesChart } from './components/time-series-chart'
import { EndpointsStatsTable } from './components/endpoints-stats-table'
import { RecentWebhooks } from './components/recent-webhooks'

const route = getRouteApi(
  '/_authenticated/destinations/$destinationId/dashboard/'
)

export function DashboardWebhooks() {
  const { destinationId } = route.useParams()

  const { data: destination, isLoading: destinationLoading } = useQuery({
    queryKey: ['destination', destinationId],
    queryFn: () => destinationsApi.getById(destinationId),
    enabled: !!destinationId,
  })

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          {/* <ThemeSwitch /> */}
          {/* <ConfigDrawer /> */}
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center gap-4'>
            <Link to='/destinations'>
              <Button variant='ghost' size='icon'>
                <ArrowLeft className='h-4 w-4' />
              </Button>
            </Link>
            <div>
              <h2 className='text-2xl font-bold tracking-tight flex items-center gap-2'>
                <BarChart3 className='h-6 w-6' />
                Dashboard
              </h2>
              <p className='text-muted-foreground'>
                {destination
                  ? `Metrics and analytics for "${destination.name}"`
                  : 'Webhook metrics and analytics'}
              </p>
            </div>
          </div>
          <div className='flex gap-2'>
            <Link
              to='/destinations/$destinationId/endpoints'
              params={{ destinationId }}
            >
              <Button variant='outline'>Manage Endpoints</Button>
            </Link>
          </div>
        </div>

        {destinationLoading ? (
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        ) : (
          <div className='space-y-4'>
            <MetricsCards destinationId={destinationId} />
            <TimeSeriesChart destinationId={destinationId} />
            <EndpointsStatsTable destinationId={destinationId} />
            <RecentWebhooks destinationId={destinationId} />
          </div>
        )}
      </Main>
    </>
  )
}

