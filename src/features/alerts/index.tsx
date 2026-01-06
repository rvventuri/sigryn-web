import { getRouteApi } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { Loader2 } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NotificationConfigsSection } from './components/notification-configs-section'
import { AlertRulesSection } from './components/alert-rules-section'
import { notificationsConfigsApi, alertRulesApi } from '@/lib/notifications-api'

const route = getRouteApi('/_authenticated/alerts/')

export function Alerts() {
  const search = route.useSearch() as { destinationId?: string }

  const { data: configs = [], isLoading: isLoadingConfigs } = useQuery({
    queryKey: ['notification-configs', search.destinationId],
    queryFn: () => notificationsConfigsApi.getAll(search.destinationId),
  })

  const { data: rules = [], isLoading: isLoadingRules } = useQuery({
    queryKey: ['alert-rules', search.destinationId],
    queryFn: () => alertRulesApi.getAll(search.destinationId),
  })

  const isLoading = isLoadingConfigs || isLoadingRules

  return (
    <>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Alerts & Notifications</h2>
          <p className='text-muted-foreground'>
            Configure alert rules and notification channels for webhook failures.
          </p>
        </div>

        {isLoading ? (
          <div className='flex h-96 items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin' />
          </div>
        ) : (
          <Tabs defaultValue='configs' className='w-full'>
            <TabsList>
              <TabsTrigger value='configs'>Notification Channels</TabsTrigger>
              <TabsTrigger value='rules'>Alert Rules</TabsTrigger>
            </TabsList>
            <TabsContent value='configs' className='mt-4'>
              <NotificationConfigsSection configs={configs} />
            </TabsContent>
            <TabsContent value='rules' className='mt-4'>
              <AlertRulesSection rules={rules} />
            </TabsContent>
          </Tabs>
        )}
      </Main>
    </>
  )
}

