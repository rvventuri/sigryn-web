import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'

export function SolutionHero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('solution')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  const benefits = [
    { icon: CheckCircle2, text: 'Full delivery history' },
    { icon: Shield, text: 'Signature validation' },
    { icon: Zap, text: 'Automatic retries' },
  ]

  return (
    <section
      id='solution'
      className='relative py-32 overflow-hidden bg-gradient-to-b from-muted/30 to-background'
    >
      <div className='container px-4'>
        <div className='mx-auto max-w-5xl'>
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Put one{' '}
              <span className='bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent'>
                reliable layer
              </span>{' '}
              in the middle
            </h2>

            <p className='mb-12 text-xl text-muted-foreground max-w-2xl mx-auto'>
              Instead of trusting dozens of providers,
              <br />
              trust one system designed for webhooks.
            </p>
          </div>

          {/* Flow diagram with animation */}
          <div
            className={`mt-16 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className='flex items-center justify-center gap-4 flex-wrap'>
              <div className='group px-6 py-4 rounded-lg bg-muted border-2 border-border transition-all hover:border-primary hover:shadow-lg'>
                <span className='font-mono text-sm font-semibold'>Providers</span>
                <div className='mt-2 text-xs text-muted-foreground'>
                  Stripe, GitHub, etc.
                </div>
              </div>

              <ArrowRight className='h-6 w-6 text-muted-foreground animate-pulse' />

              <div className='group relative px-6 py-4 rounded-lg bg-primary/10 border-2 border-primary transition-all hover:shadow-lg hover:scale-105'>
                <div className='flex items-center gap-2'>
                  <img
                    src='/images/sigryn_logo.png'
                    alt='Sigryn - Webhook Reliability Platform'
                    className='h-6 w-auto'
                    loading='lazy'
                  />
                  <span className='font-mono text-sm font-semibold'>Sigryn</span>
                </div>
                <div className='mt-2 flex gap-2'>
                  {benefits.map((benefit, idx) => {
                    const Icon = benefit.icon
                    return (
                      <div
                        key={idx}
                        className='flex items-center gap-1 text-xs text-muted-foreground'
                      >
                        <Icon className='h-3 w-3 text-primary' />
                      </div>
                    )
                  })}
                </div>
                {/* Pulse effect */}
                <div className='absolute inset-0 rounded-lg bg-primary/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity' />
              </div>

              <ArrowRight className='h-6 w-6 text-muted-foreground animate-pulse' />

              <div className='group px-6 py-4 rounded-lg bg-muted border-2 border-border transition-all hover:border-green-500 hover:shadow-lg'>
                <span className='font-mono text-sm font-semibold'>Your API</span>
                <div className='mt-2 text-xs text-green-500 flex items-center gap-1'>
                  <CheckCircle2 className='h-3 w-3' />
                  <span>Guaranteed delivery</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key benefits */}
          <div
            className={`mt-16 grid gap-6 md:grid-cols-3 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div
                  key={idx}
                  className='flex flex-col items-center gap-3 p-6 rounded-lg border bg-background hover:border-primary transition-all hover:shadow-md'
                >
                  <div className='rounded-lg bg-primary/10 p-3'>
                    <Icon className='h-6 w-6 text-primary' />
                  </div>
                  <p className='font-medium text-center'>{benefit.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

