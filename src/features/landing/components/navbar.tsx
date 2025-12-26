import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Webhook } from 'lucide-react'

export function Navbar() {
  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between px-4'>
        <Link to='/' className='flex items-center space-x-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <Webhook className='h-5 w-5' />
          </div>
          <span className='text-xl font-bold'>Sigryn</span>
        </Link>
        <div className='flex items-center gap-4'>
          <Link to='/sign-in'>
            <Button variant='ghost'>Sign In</Button>
          </Link>
          <Link to='/sign-up'>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

