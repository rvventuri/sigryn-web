import { Link } from '@tanstack/react-router'
import { Webhook } from 'lucide-react'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className='relative min-h-screen flex flex-col'>
      {/* Navbar */}
      <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container flex h-16 items-center justify-between px-4'>
          <Link to='/' className='flex items-center space-x-2'>
            <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
              <Webhook className='h-5 w-5' />
            </div>
            <span className='text-xl font-bold'>Sigryn</span>
          </Link>
        </div>
      </nav>

      {/* Main Content with gradient background */}
      <div className='relative flex-1 overflow-hidden'>
        {/* Background decorations */}
        <div className='absolute inset-0 -z-10 overflow-hidden'>
          <div className='absolute left-[50%] top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl' />
          <div className='absolute right-[20%] top-20 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl' />
          <div className='absolute bottom-[20%] left-[10%] h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl' />
        </div>

        {/* Content */}
        <div className='container relative z-10 flex h-[calc(100vh-4rem)] items-center justify-center px-4 py-12'>
          <div className='w-full max-w-md'>{children}</div>
        </div>
      </div>
    </div>
  )
}
