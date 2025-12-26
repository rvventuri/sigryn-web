import { getRouteApi } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
// import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
import { dashboardApi } from '@/lib/dashboard-api'
import { destinationsApi } from '@/lib/destinations-api'
import { WebhookRequestsTable } from './components/webhook-requests-table'
import { WebhookRequestsFilters } from './components/webhook-requests-filters'
import { WebhookRequestsPagination } from './components/webhook-requests-pagination'
import { Loader2 } from 'lucide-react'
import { useMemo } from 'react'

const route = getRouteApi('/_authenticated/dashboard/')

export function WebhookRequests() {
  const navigate = route.useNavigate()
  const search = route.useSearch()

  // Build filters from URL search params
  const filters = useMemo(() => {
    const f: any = {
      page: search.page || 1,
      limit: search.limit || 20,
    }

    if (search.destinationId) f.destinationId = search.destinationId
    if (search.method) f.method = search.method
    if (search.sourceIp) f.sourceIp = search.sourceIp
    if (search.isValidSignature !== undefined)
      f.isValidSignature = search.isValidSignature === 'true'
    if (search.dateFrom) f.dateFrom = search.dateFrom
    if (search.dateTo) f.dateTo = search.dateTo
    if (search.sortBy) f.sortBy = search.sortBy
    if (search.sortOrder) f.sortOrder = search.sortOrder

    return f
  }, [search])

  const { data: webhookRequestsResponse, isLoading: isLoadingRequests } =
    useQuery({
      queryKey: ['webhook-requests', filters],
      queryFn: () => dashboardApi.getWebhookRequests(filters),
      refetchInterval: 5000, // Refetch every 5 seconds
    })

  const { data: destinations = [], isLoading: isLoadingDestinations } = useQuery(
    {
      queryKey: ['destinations'],
      queryFn: () => destinationsApi.getAll(),
    }
  )

  const handleFiltersChange = (newFilters: any) => {
    navigate({
      search: (prev: any) => {
        const updated = { ...prev, ...newFilters }
        // Remove undefined values
        Object.keys(updated).forEach((key) => {
          if (updated[key] === undefined) {
            delete updated[key]
          }
        })
        return updated
      },
      replace: true,
    })
  }

  const handlePageChange = (page: number) => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        page,
      }),
      replace: true,
    })
  }

  const handleLimitChange = (limit: number) => {
    navigate({
      search: (prev: any) => ({
        ...prev,
        page: 1,
        limit,
      }),
      replace: true,
    })
  }

  const isLoading = isLoadingRequests || isLoadingDestinations

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
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Webhook Requests
            </h2>
            <p className='text-muted-foreground'>
              View and filter all webhook requests across your destinations.
            </p>
          </div>
        </div>

        <WebhookRequestsFilters
          destinations={destinations}
          filters={filters}
          onFiltersChange={handleFiltersChange}
          isLoading={isLoading}
        />

        {isLoading ? (
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        ) : (
          <>
            <WebhookRequestsTable
              data={webhookRequestsResponse?.data || []}
              isLoading={isLoadingRequests}
            />
            {webhookRequestsResponse?.pagination && (
              <WebhookRequestsPagination
                page={webhookRequestsResponse.pagination.page}
                limit={webhookRequestsResponse.pagination.limit}
                total={webhookRequestsResponse.pagination.total}
                totalPages={webhookRequestsResponse.pagination.totalPages}
                hasNext={webhookRequestsResponse.pagination.hasNext}
                hasPrev={webhookRequestsResponse.pagination.hasPrev}
                onPageChange={handlePageChange}
                onLimitChange={handleLimitChange}
              />
            )}
          </>
        )}
      </Main>
    </>
  )
}

