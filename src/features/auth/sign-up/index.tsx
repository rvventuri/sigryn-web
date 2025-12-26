import { Link } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { AuthLayout } from '../auth-layout'
import { SignUpForm } from './components/sign-up-form'
import { ArrowLeft, Sparkles } from 'lucide-react'

export function SignUp() {
  return (
    <AuthLayout>
      <div className='space-y-6'>
        {/* Header */}
        <div className='space-y-2 text-center'>
          <div className='mb-4 inline-flex items-center gap-2 rounded-full border bg-primary/10 px-4 py-2 text-sm'>
            <Sparkles className='h-4 w-4 text-primary' />
            <span className='font-medium'>Start your free trial</span>
          </div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Create your account
          </h1>
          <p className='text-muted-foreground'>
            Join thousands of developers using Sigryn
          </p>
        </div>

        {/* Card */}
        <Card className='border-2 shadow-lg'>
          <CardHeader className='space-y-1'>
            <CardTitle className='text-2xl'>Sign up</CardTitle>
            <CardDescription>
              Enter your information to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter className='flex flex-col gap-4'>
            <div className='text-center text-sm text-muted-foreground'>
              Already have an account?{' '}
              <Link
                to='/sign-in'
                className='group inline-flex items-center font-medium text-primary underline-offset-4 hover:underline'
              >
                <ArrowLeft className='mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1' />
                Sign in
              </Link>
            </div>
            <p className='text-center text-xs text-muted-foreground'>
              By creating an account, you agree to our{' '}
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
