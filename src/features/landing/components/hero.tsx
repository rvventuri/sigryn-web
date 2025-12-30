import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  ArrowRight,
} from 'lucide-react'

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
          {/* Badges */}
          <div className='mb-8 flex flex-col items-center gap-4'>
            <div className='inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm'>
              <span className='font-medium text-muted-foreground'>
                Trusted by great teams around the world
              </span>
            </div>
            <a
              href='https://www.producthunt.com/products/sigryn?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-sigryn'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-opacity hover:opacity-80'
            >
              <img
                alt='Sigryn - Never lose a webhook again | Product Hunt'
                width='250'
                height='54'
                src='https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1055854&theme=light&t=1767059159536'
                className='h-auto w-[250px]'
              />
            </a>
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

          {/* CTA Buttons */}
          <div className='mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row'>
            <Link to='/sign-up'>
              <Button size='lg' className='group text-lg px-8 py-6 h-auto'>
                Start for free
                <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <a
              href='#'
              target='_blank'
              rel='noopener noreferrer'
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

