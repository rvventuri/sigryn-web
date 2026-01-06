import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight, AlertTriangle, X, CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { landingEvents } from '@/lib/analytics'

export function HeroPain() {
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowError(true), 1000)
    const timer2 = setTimeout(() => setShowSuccess(true), 2500)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  return (
    <section
      id='problem'
      className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-muted/20'
    >
      {/* Animated background grid */}
      <div className='absolute inset-0 opacity-20'>
        <div
          className='absolute inset-0 animated-grid'
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Terminal-like code block */}
      <div className='container relative z-10 px-4 py-20'>
        <div className='mx-auto max-w-5xl'>
          {/* Terminal header */}
          <div className='mb-4 flex items-center gap-2 rounded-t-lg bg-[#1e1e1e] px-4 py-2'>
            <div className='flex gap-1.5'>
              <div className='h-3 w-3 rounded-full bg-red-500' />
              <div className='h-3 w-3 rounded-full bg-yellow-500' />
              <div className='h-3 w-3 rounded-full bg-green-500' />
            </div>
            <span className='ml-4 text-xs text-muted-foreground font-mono'>
              webhook-delivery.log
            </span>
          </div>

          {/* Terminal content */}
          <div className='rounded-b-lg border border-[#1e1e1e] bg-[#0d0d0d] p-6 font-mono text-sm'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2 text-green-400'>
                <span className='text-muted-foreground'>$</span>
                <span>tail -f webhook-delivery.log</span>
              </div>
              
              <div className='mt-4 space-y-1'>
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <span className='text-blue-400'>[2024-01-15 10:30:15]</span>
                  <span>POST /webhooks/payment</span>
                  <CheckCircle2 className='h-4 w-4 text-green-500' />
                  <span className='text-green-500'>200 OK</span>
                </div>
                
                <div
                  className={`flex items-center gap-2 transition-all duration-500 ${
                    showError ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                >
                  <span className='text-blue-400'>[2024-01-15 10:30:16]</span>
                  <span>POST /webhooks/payment</span>
                  <X className='h-4 w-4 text-red-500' />
                  <span className='text-red-500'>Timeout</span>
                </div>

                <div
                  className={`flex items-center gap-2 transition-all duration-500 delay-300 ${
                    showSuccess ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                  }`}
                >
                  <span className='text-blue-400'>[2024-01-15 10:30:17]</span>
                  <span>Provider says: "Delivered ✓"</span>
                </div>

                <div className='mt-4 flex items-center gap-2 text-yellow-500'>
                  <AlertTriangle className='h-4 w-4 animate-pulse' />
                  <span>⚠️ No webhook received in your system</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main message */}
          <div className='mt-12 text-center'>
            <h1 className='mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
              <span className='block'>Everything was</span>
              <span className='block bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent'>
                working.
              </span>
              <span className='block mt-2 bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent'>
                Until it wasn't.
              </span>
            </h1>

            <p className='mb-8 text-xl text-muted-foreground max-w-2xl mx-auto'>
              Webhooks failed in production. Providers said "delivered".
              <br />
              <span className='text-destructive font-semibold'>
                Nothing reached your system.
              </span>
            </p>

            <div className='flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <Link to='/sign-up' onClick={landingEvents.heroCtaClick}>
                <Button size='lg' className='group text-lg px-8 py-6 h-auto'>
                  See how we fix this
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
                  className='text-lg px-8 py-6 h-auto'
                >
                  Learn more
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

