import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { landingEvents } from '@/lib/analytics'

export function Navbar() {
  return (
    <nav className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between px-4'>
        <Link to='/' className='flex items-center'>
          <img
            src='/images/sigryn_logo.png'
            alt='Sigryn Logo'
            className='h-12 w-auto'
          />
        </Link>
        <div className='flex items-center gap-4'>
          <Link to={'/blog' as any} onClick={landingEvents.navbarBlogClick}>
            <Button variant='ghost'>Blog</Button>
          </Link>
          <Link to='/sign-in' onClick={landingEvents.navbarSignInClick}>
            <Button variant='ghost'>Sign In</Button>
          </Link>
          <Link to='/sign-up' onClick={landingEvents.navbarSignUpClick}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

