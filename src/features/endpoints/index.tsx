import { getRouteApi, Link } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, Loader2 } from 'lucide-react'
// import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
import { Button } from '@/components/ui/button'
import { endpointsApi } from '@/lib/endpoints-api'
import { destinationsApi } from '@/lib/destinations-api'
import { EndpointsDialogs } from './components/endpoints-dialogs'
import { EndpointsPrimaryButtons } from './components/endpoints-primary-buttons'
import { EndpointsProvider } from './components/endpoints-provider'
import { EndpointsTable } from './components/endpoints-table'
import { endpointListSchema } from './data/schema'

const route = getRouteApi('/_authenticated/destinations/$destinationId/endpoints/')

export function Endpoints() {
  const { destinationId } = route.useParams()
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { data: endpoints = [], isLoading: endpointsLoading } = useQuery({
    queryKey: ['endpoints', destinationId],
    queryFn: async () => {
      const data = await endpointsApi.getAll(destinationId)
      return endpointListSchema.parse(data)
    },
  })

  const { data: destination, isLoading: destinationLoading } = useQuery({
    queryKey: ['destination', destinationId],
    queryFn: () => destinationsApi.getById(destinationId),
    enabled: !!destinationId,
  })

  const isLoading = endpointsLoading || destinationLoading

  return (
    <EndpointsProvider>
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
              <h2 className='text-2xl font-bold tracking-tight'>
                Endpoints
              </h2>
              <p className='text-muted-foreground'>
                {destination
                  ? `Manage endpoints for "${destination.name}"`
                  : 'Manage webhook endpoints'}
              </p>
            </div>
          </div>
          <EndpointsPrimaryButtons />
        </div>
        {isLoading ? (
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        ) : (
          <EndpointsTable
            data={endpoints}
            search={search}
            navigate={navigate}
          />
        )}
      </Main>

      <EndpointsDialogs destinationId={destinationId} />
    </EndpointsProvider>
  )
}

