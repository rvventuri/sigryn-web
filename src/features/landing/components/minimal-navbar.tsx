import { Link } from '@tanstack/react-router'
import { SigrynLogo } from '@/assets/sigryn-logo'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { useState } from 'react'

export function MinimalNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className='sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md'>
      <div className='container flex h-16 items-center justify-between px-4'>
        {/* Logo */}
        <Link to='/' className='flex items-center'>
          <SigrynLogo className='h-8 w-auto text-gray-900' />
        </Link>

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-8'>
          <Link
            to='/blog'
            className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
          >
            Blog
          </Link>
          <Link
            to='/sign-in'
            className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors'
          >
            Sign In
          </Link>
          <Link to='/sign-up'>
            <Button
              size='sm'
              className='bg-[#3ABFF8] hover:bg-[#2AA8E0] text-white font-semibold transition-all shadow-sm hover:shadow-md'
            >
              Sign Up
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className='md:hidden p-2 text-gray-600 hover:text-gray-900'
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className='h-6 w-6' />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden border-t border-gray-200 bg-white'>
          <div className='container px-4 py-4 flex flex-col gap-4'>
            <Link
              to='/blog'
              className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors py-2'
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to='/sign-in'
              className='text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors py-2'
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link to='/sign-up' onClick={() => setMobileMenuOpen(false)}>
              <Button
                size='sm'
                className='w-full bg-[#3ABFF8] hover:bg-[#2AA8E0] text-white font-semibold transition-all shadow-sm hover:shadow-md'
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
