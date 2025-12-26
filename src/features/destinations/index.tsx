import { getRouteApi } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
// import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
// import { ThemeSwitch } from '@/components/theme-switch'
import { destinationsApi } from '@/lib/destinations-api'
import { DestinationsDialogs } from './components/destinations-dialogs'
import { DestinationsPrimaryButtons } from './components/destinations-primary-buttons'
import { DestinationsProvider } from './components/destinations-provider'
import { DestinationsTable } from './components/destinations-table'
import { Loader2 } from 'lucide-react'
import { destinationListSchema } from './data/schema'

const route = getRouteApi('/_authenticated/destinations/')

export function Destinations() {
  const search = route.useSearch()
  const navigate = route.useNavigate()

  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ['destinations'],
    queryFn: async () => {
      const data = await destinationsApi.getAll()
      return destinationListSchema.parse(data)
    },
  })

  return (
    <DestinationsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Destinations</h2>
            <p className='text-muted-foreground'>
              Manage your webhook destinations here.
            </p>
          </div>
          <DestinationsPrimaryButtons />
        </div>
        {isLoading ? (
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        ) : (
          <DestinationsTable
            data={destinations}
            search={search}
            navigate={navigate}
          />
        )}
      </Main>

      <DestinationsDialogs />
    </DestinationsProvider>
  )
}

