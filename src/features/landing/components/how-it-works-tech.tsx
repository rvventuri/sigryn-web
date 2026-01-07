import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Code, Database, Zap, Shield } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { landingEvents } from '@/lib/analytics'

const steps = [
  {
    icon: Code,
    title: '1. Receive',
    description: 'Sigryn receives webhooks from all your providers',
    color: 'border-blue-500/50 bg-blue-500/10',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: '2. Validate',
    description: 'Automatic signature validation and security',
    color: 'border-purple-500/50 bg-purple-500/10',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Database,
    title: '3. Store',
    description: 'Every webhook is stored with full payload and metadata',
    color: 'border-indigo-500/50 bg-indigo-500/10',
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    icon: Zap,
    title: '4. Deliver',
    description: 'Automatic retries with exponential backoff until success',
    color: 'border-green-500/50 bg-green-500/10',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: CheckCircle2,
    title: '5. Verify',
    description: 'Complete history and full observability',
    color: 'border-orange-500/50 bg-orange-500/10',
    gradient: 'from-orange-500 to-red-500',
  },
]

export function HowItWorksTech() {
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('how-it-works')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [isVisible])

  return (
    <section id='how-it-works' className='py-32 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[15%] top-[20%] h-96 w-96 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute right-[20%] bottom-[20%] h-80 w-80 rounded-full bg-blue-500/5 blur-3xl' />
      </div>

      <div className='container px-4 relative z-10'>
        <div className='mx-auto max-w-6xl'>
          <div className='text-center mb-16'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
              <Zap className='h-4 w-4 text-primary' />
              <span className='text-sm font-semibold text-primary'>
                Simple & Powerful
              </span>
            </div>
            <h2 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              How{' '}
              <span className='bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent'>
                Sigryn
              </span>{' '}
              works
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Simple flow, powerful results. Setup in minutes, reliability forever.
            </p>
          </div>

          {/* Steps with animation */}
          <div className='relative mb-16'>
            {/* Connection line */}
            <div className='absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-indigo-500 via-green-500 to-orange-500 hidden md:block opacity-20' />

            <div className='grid gap-6 md:grid-cols-5 relative'>
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === index
                const isPast = activeStep > index
                
                return (
                  <div key={index} className='relative'>
                    {/* Arrow between steps */}
                    {index < steps.length - 1 && (
                      <div className='hidden md:block absolute top-1/2 -right-3 z-10'>
                        <ArrowRight 
                          className={`h-6 w-6 transition-all duration-500 ${
                            isPast || isActive 
                              ? 'text-primary' 
                              : 'text-muted-foreground'
                          } ${isActive ? 'scale-125' : ''}`} 
                        />
                      </div>
                    )}

                    <div
                      className={`relative p-6 rounded-xl border-2 transition-all duration-500 ${
                        step.color
                      } ${
                        isActive
                          ? 'scale-110 shadow-2xl border-opacity-100 bg-background'
                          : isPast
                          ? 'scale-105 border-opacity-75'
                          : 'scale-100 border-opacity-50'
                      } cursor-pointer hover:scale-105`}
                      onClick={() => setActiveStep(index)}
                    >
                      {/* Pulse effect when active */}
                      {isActive && (
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${step.gradient} opacity-20 animate-ping`} />
                      )}

                      {/* Glow effect when active */}
                      {isActive && (
                        <div className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${step.gradient} opacity-30 blur-xl -z-10`} />
                      )}

                      <div className='relative z-10'>
                        <div className='mb-4 flex items-center justify-center'>
                          <div
                            className={`rounded-xl bg-gradient-to-br ${step.gradient} p-4 transition-transform shadow-lg ${
                              isActive ? 'scale-125 rotate-6' : 'scale-100'
                            }`}
                          >
                            <Icon className='h-6 w-6 text-white' />
                          </div>
                        </div>
                        <h3 className='mb-2 text-center font-bold text-sm'>{step.title}</h3>
                        <p className='text-xs text-center text-muted-foreground leading-relaxed'>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <div className='mt-16 text-center'>
            <p className='mb-6 text-lg text-muted-foreground'>
              Ready to get started? Setup in less than 5 minutes.
            </p>
            <Link to='/sign-up' onClick={landingEvents.heroCtaClick}>
              <Button 
                size='lg' 
                className='group text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/50 transition-all'
              >
                Get Started Free
                <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
