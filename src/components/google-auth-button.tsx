import { GoogleLogin } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/stores/auth-store'
import { authApi, type ApiError } from '@/lib/auth-api'

interface GoogleAuthButtonProps {
  mode?: 'signin' | 'signup'
  redirectTo?: string
  className?: string
}

export function GoogleAuthButton({
  mode = 'signin',
  redirectTo,
  className,
}: GoogleAuthButtonProps) {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      const response = await authApi.googleAuth({
        credential: credentialResponse.credential,
      })

      // Set user and access token
      auth.setUser(response.user)
      auth.setAccessToken(response.access_token)

      // Redirect to the stored location or default to dashboard
      const targetPath = redirectTo || '/dashboard'
      navigate({ to: targetPath, replace: true })

      toast.success(
        mode === 'signin'
          ? `Welcome back, ${response.user.name}!`
          : `Welcome, ${response.user.name}!`
      )
    } catch (error) {
      if (error instanceof AxiosError) {
        const apiError = error.response?.data as ApiError | undefined
        const errorMessage =
          apiError?.message || 'Failed to authenticate with Google. Please try again.'
        toast.error(errorMessage)
      } else {
        toast.error('An error occurred. Please try again.')
      }
    }
  }

  const handleGoogleError = () => {
    toast.error('Google authentication failed. Please try again.')
  }

  return (
    <div className={className}>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        theme='outline'
        size='large'
        text='continue_with'
        shape='rectangular'
        width='100%'
      />
    </div>
  )
}

