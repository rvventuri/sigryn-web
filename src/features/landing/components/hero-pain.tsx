import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { landingEvents } from '@/lib/analytics'

export function HeroPain() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section
      id='problem'
      className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20'
    >
      {/* Subtle background effects */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[50%] top-[20%] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute right-[20%] top-[40%] h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl' />
      </div>

      <div className='container relative z-10 px-4 py-20'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Badge */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20'>
              <Zap className='h-4 w-4 text-primary' />
              <span className='text-sm font-semibold text-primary'>
                Webhook Reliability Platform
              </span>
            </div>
          </div>

          {/* Main headline - Single impactful text */}
          <div
            className={`mb-12 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h1 className='mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl leading-tight'>
              <span className='block text-foreground'>Never lose</span>
              <span className='block bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent'>
                a webhook again
              </span>
            </h1>

            <p className='text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium'>
              Reliable infrastructure with complete visibility and automatic retries
            </p>
          </div>

          {/* CTA Section */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row mb-6'>
              <Link to='/sign-up' onClick={landingEvents.heroCtaClick}>
                <Button 
                  size='lg' 
                  className='group text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all'
                >
                  Get Started Free
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                </Button>
              </Link>
              <a
                href='#solution'
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <Button
                  size='lg'
                  variant='outline'
                  className='text-lg px-8 py-6 h-auto border-2 hover:bg-muted'
                >
                  See How It Works
                </Button>
              </a>
            </div>
            <p className='text-sm text-muted-foreground'>
              Setup in 5 minutes • No credit card required • 1,000 webhooks/month free
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
