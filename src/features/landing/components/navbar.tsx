import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'
import { landingEvents } from '@/lib/analytics'

const sections = [
  { id: 'problem', label: 'The Problem' },
  { id: 'solution', label: 'The Solution' },
  { id: 'features', label: 'Features' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'pricing', label: 'Pricing' },
]

export function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      
      // Find active section
      const scrollPosition = window.scrollY + 100
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-sm'
          : 'bg-background/80 backdrop-blur-sm'
      }`}
    >
      <div className='container flex h-16 items-center justify-between px-4'>
        <Link to='/' className='flex items-center'>
          <img
            src='/images/sigryn_logo.png'
            alt='Sigryn - Webhook Reliability Platform'
            className='h-10 w-auto transition-transform hover:scale-105'
            width='120'
            height='40'
            loading='eager'
          />
        </Link>
        
        <div className='hidden md:flex items-center gap-1'>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeSection === section.id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        <div className='flex items-center gap-4'>
          <Link to={'/blog' as any} onClick={landingEvents.navbarBlogClick}>
            <Button variant='ghost' className='hidden sm:inline-flex'>Blog</Button>
          </Link>
          <Link to='/sign-in' onClick={landingEvents.navbarSignInClick}>
            <Button variant='ghost' className='hidden sm:inline-flex'>Sign In</Button>
          </Link>
          <Link to='/sign-up' onClick={landingEvents.navbarSignUpClick}>
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
