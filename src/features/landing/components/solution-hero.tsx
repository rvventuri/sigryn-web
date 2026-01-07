import { ArrowRight, CheckCircle2, Shield, Zap, Eye, Database, Bell } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { landingEvents } from '@/lib/analytics'
import { SigrynLogoIcon } from '@/assets/sigryn-logo'

export function SolutionHero() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFlow, setActiveFlow] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('solution')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  // Animate flow steps
  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 4)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [isVisible])

  const benefits = [
    { icon: Eye, text: 'Complete Visibility', color: 'from-blue-500 to-cyan-500' },
    { icon: Database, text: 'Full History', color: 'from-purple-500 to-pink-500' },
    { icon: Zap, text: 'Auto Retry', color: 'from-green-500 to-emerald-500' },
    { icon: Shield, text: 'Secure Validation', color: 'from-orange-500 to-red-500' },
    { icon: Bell, text: 'Smart Alerts', color: 'from-indigo-500 to-blue-500' },
  ]

  return (
    <section
      id='solution'
      className='relative py-32 overflow-hidden bg-gradient-to-b from-background via-green-950/10 to-background'
    >
      {/* Background effects */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[20%] top-[10%] h-96 w-96 rounded-full bg-green-500/10 blur-3xl animate-pulse' />
        <div className='absolute right-[15%] bottom-[20%] h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl animate-pulse delay-1000' />
      </div>

      <div className='container px-4 relative z-10'>
        <div className='mx-auto max-w-6xl'>
          {/* Main headline */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-8'>
              <CheckCircle2 className='h-4 w-4 text-green-500' />
              <span className='text-sm font-semibold text-green-500'>
                The Solution for Reliable Webhooks
              </span>
            </div>

            <h2 className='mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Never lose{' '}
              <span className='bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 bg-clip-text text-transparent'>
                a webhook again
              </span>
            </h2>

            <p className='mb-4 text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium'>
              One reliable layer between your providers and your API.
            </p>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              Receive, validate, store, and guarantee delivery of every webhook.
              <br />
              <span className='text-green-500 font-semibold'>
                With complete history, automatic retries, and full visibility.
              </span>
            </p>
          </div>

          {/* Interactive flow diagram */}
          <div
            className={`mb-16 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className='relative p-8 rounded-2xl bg-gradient-to-br from-green-500/5 to-emerald-500/5 border-2 border-green-500/20 backdrop-blur-sm'>
              <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8'>
                {/* Provider */}
                <div
                  className={`group relative px-8 py-6 rounded-xl bg-muted border-2 transition-all duration-500 ${
                    activeFlow >= 0
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
                      : 'border-border scale-100'
                  }`}
                >
                  <div className='text-center'>
                    <div className='mb-2 text-2xl'>🔌</div>
                    <span className='font-semibold text-sm'>Providers</span>
                    <div className='mt-1 text-xs text-muted-foreground'>
                      Stripe, GitHub, etc.
                    </div>
                  </div>
                  {activeFlow === 0 && (
                    <div className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-blue-500 animate-ping' />
                  )}
                </div>

                {/* Arrow 1 */}
                <div className='relative'>
                  <ArrowRight className='h-8 w-8 text-muted-foreground hidden md:block' />
                  <div className='md:hidden rotate-90'>
                    <ArrowRight className='h-8 w-8 text-muted-foreground' />
                  </div>
                  {activeFlow === 0 && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='h-2 w-2 rounded-full bg-blue-500 animate-ping' />
                    </div>
                  )}
                </div>

                {/* Sigryn - The Solution */}
                <div
                  className={`group relative px-8 py-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 transition-all duration-500 ${
                    activeFlow >= 1
                      ? 'border-green-500 shadow-xl shadow-green-500/30 scale-110'
                      : 'border-green-500/50 scale-100'
                  }`}
                >
                  <div className='text-center'>
                    <div className='mb-2 flex items-center justify-center gap-2'>
                      <SigrynLogoIcon className='h-6 w-6' />
                    </div>
                    <span className='font-bold text-sm text-green-600 dark:text-green-400'>
                      Sigryn
                    </span>
                    <div className='mt-2 flex flex-wrap gap-1 justify-center'>
                      {benefits.slice(0, 3).map((benefit, idx) => {
                        const Icon = benefit.icon
                        return (
                          <div
                            key={idx}
                            className={`p-1 rounded bg-background/50 transition-all ${
                              activeFlow >= 1 ? 'scale-110' : ''
                            }`}
                          >
                            <Icon className='h-3 w-3 text-green-600 dark:text-green-400' />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  
                  {/* Pulse effect when active */}
                  {activeFlow >= 1 && (
                    <div className='absolute inset-0 rounded-xl bg-green-500/20 animate-ping opacity-75' />
                  )}
                </div>

                {/* Arrow 2 */}
                <div className='relative'>
                  <ArrowRight className='h-8 w-8 text-muted-foreground hidden md:block' />
                  <div className='md:hidden rotate-90'>
                    <ArrowRight className='h-8 w-8 text-muted-foreground' />
                  </div>
                  {activeFlow === 2 && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <div className='h-2 w-2 rounded-full bg-green-500 animate-ping' />
                    </div>
                  )}
                </div>

                {/* Your API */}
                <div
                  className={`group relative px-8 py-6 rounded-xl bg-muted border-2 transition-all duration-500 ${
                    activeFlow >= 3
                      ? 'border-green-500 shadow-lg shadow-green-500/20 scale-105'
                      : 'border-border scale-100'
                  }`}
                >
                  <div className='text-center'>
                    <div className='mb-2 text-2xl'>🚀</div>
                    <span className='font-semibold text-sm'>Your API</span>
                    <div className='mt-1 text-xs text-green-500 flex items-center justify-center gap-1'>
                      <CheckCircle2 className='h-3 w-3' />
                      <span>Guaranteed Delivery</span>
                    </div>
                  </div>
                  {activeFlow === 3 && (
                    <div className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-green-500 animate-ping' />
                  )}
                </div>
              </div>

              {/* Flow description */}
              <div className='mt-8 text-center'>
                <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10'>
                  <span className='text-sm text-muted-foreground'>
                    {activeFlow === 0 && '📤 Webhook sent by provider'}
                    {activeFlow === 1 && '🔍 Sigryn receives, validates and stores'}
                    {activeFlow === 2 && '⚡ Automatic retry until success'}
                    {activeFlow === 3 && '✅ Guaranteed delivery to your API'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Key benefits grid */}
          <div
            className={`grid gap-6 md:grid-cols-5 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div
                  key={idx}
                  className='group flex flex-col items-center gap-3 p-6 rounded-xl border bg-background hover:border-green-500 transition-all hover:shadow-lg hover:scale-105'
                >
                  <div className={`rounded-lg bg-gradient-to-br ${benefit.color} p-3 group-hover:scale-110 transition-transform`}>
                    <Icon className='h-6 w-6 text-white' />
                  </div>
                  <p className='font-medium text-center text-sm'>{benefit.text}</p>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <div
            className={`mt-16 text-center transition-all duration-1000 delay-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link to='/sign-up' onClick={landingEvents.heroCtaClick}>
              <Button 
                size='lg' 
                className='group text-lg px-8 py-6 h-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/50 hover:shadow-xl hover:shadow-green-500/50 transition-all'
              >
                Get Started Free
                <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <p className='mt-4 text-sm text-muted-foreground'>
              Setup in 5 minutes • No credit card required • 1,000 webhooks/month free
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
