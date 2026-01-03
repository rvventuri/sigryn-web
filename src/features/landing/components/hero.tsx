import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
  Globe,
  Sparkles,
} from 'lucide-react'
import { landingEvents } from '@/lib/analytics'

export function Hero() {
  return (
    <section className='relative overflow-hidden border-b bg-gradient-to-b from-background via-background to-muted/20 py-24 sm:py-32 lg:py-40'>
      {/* Background decorations */}
      <div className='absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute left-[50%] top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute right-[20%] top-20 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl' />
      </div>

      <div className='container relative z-10 px-4'>
        <div className='mx-auto max-w-4xl text-center'>
          {/* Badge */}
          <div className='mb-8 flex flex-col items-center gap-4'>
            <div className='group relative inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 px-5 py-2.5 text-sm backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10'>
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <Globe className='h-4 w-4 text-primary' />
                  <Sparkles className='absolute -top-1 -right-1 h-2.5 w-2.5 text-primary animate-pulse' />
                </div>
                <span className='font-semibold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent'>
                  Trusted by great teams around the world
                </span>
              </div>
              {/* Shine effect */}
              <div className='absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-full group-hover:translate-x-full duration-1000' />
            </div>
          </div>

          {/* Main headline */}
          <h1 className='mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl'>
            Every{' '}
            <span className='bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent italic'>
              event
            </span>
            {' '}delivered, guaranteed.
          </h1>

          {/* Subheadline */}
          <p className='mb-10 text-lg text-muted-foreground sm:text-xl lg:text-2xl'>
            The control layer for reliable event delivery. Sigryn processes signals, validates signatures, and guarantees every event reaches its destination with complete visibility and enterprise-grade reliability.
          </p>
          
          {/* SEO: Hidden descriptive text for search engines */}
          <div className='sr-only'>
            <p>
              Sigryn is a webhook infrastructure platform that provides reliable event delivery, 
              webhook queueing, automatic retries, signature validation, multi-destination routing, 
              real-time monitoring, and event replay capabilities. Perfect for developers building 
              event-driven applications, API integrations, and webhook-based systems.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className='mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link to='/sign-up' onClick={landingEvents.heroCtaClick}>
              <Button size='lg' className='group text-lg px-8 py-6 h-auto'>
                Start for free
                <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
              onClick={landingEvents.heroDocsClick}
            >
              <Button
                size='lg'
                variant='outline'
                className='text-lg px-8 py-6 h-auto'
              >
                Read docs
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

