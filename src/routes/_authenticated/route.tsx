import { createFileRoute, redirect } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { useAuthStore } from '@/stores/auth-store'
import { authApi } from '@/lib/auth-api'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { auth } = useAuthStore.getState()
    
    if (!auth.isAuthenticated()) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      })
    }

    // If user is not loaded but token exists, fetch user info
    if (!auth.user && auth.accessToken) {
      try {
        const user = await authApi.getMe()
        auth.setUser(user)
      } catch (error) {
        // Token might be invalid, clear auth and redirect
        auth.reset()
        throw redirect({
          to: '/sign-in',
          search: {
            redirect: location.href,
          },
        })
      }
    }
  },
  component: AuthenticatedLayout,
})
