import { Link, useSearch } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { UserAuthForm } from './components/user-auth-form'
import { ArrowRight } from 'lucide-react'

export function SignIn() {
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })

  return (
    <AuthLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold tracking-tight'>
            Welcome back
          </h1>
          <p className='text-muted-foreground'>
            Sign in to your account to continue
          </p>
        </div>

        {/* Card */}
        <Card className='border-2 shadow-lg'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>Sign in</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserAuthForm redirectTo={redirect} />
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <div className='text-center text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <Link
                to='/sign-up'
                className='group inline-flex items-center font-medium text-primary underline-offset-4 hover:underline'
              >
                Create account
                <ArrowRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </div>
            <p className='text-center text-xs text-muted-foreground'>
              By signing in, you agree to our{' '}
              <a
                href='/terms'
                className='underline underline-offset-4 hover:text-primary'
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href='/privacy'
                className='underline underline-offset-4 hover:text-primary'
              >
                Privacy Policy
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </AuthLayout>
  )
}
