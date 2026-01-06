import { useEffect, useState } from 'react'
import { ArrowRight, CheckCircle2, Code, Database, Zap } from 'lucide-react'

const steps = [
  {
    icon: Code,
    title: '1. Receive',
    description: 'Sigryn receives webhooks from all your providers',
    color: 'border-blue-500/50 bg-blue-500/10',
  },
  {
    icon: Database,
    title: '2. Store',
    description: 'Every webhook is stored with full payload and metadata',
    color: 'border-purple-500/50 bg-purple-500/10',
  },
  {
    icon: Zap,
    title: '3. Deliver',
    description: 'Automatic retries with exponential backoff until success',
    color: 'border-green-500/50 bg-green-500/10',
  },
  {
    icon: CheckCircle2,
    title: '4. Verify',
    description: 'Complete delivery history and observability',
    color: 'border-orange-500/50 bg-orange-500/10',
  },
]

export function HowItWorksTech() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id='how-it-works' className='py-32 bg-muted/30'>
      <div className='container px-4'>
        <div className='mx-auto max-w-5xl'>
          <div className='text-center mb-16'>
            <h2 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl'>
              How{' '}
              <span className='bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent'>
                Sigryn
              </span>{' '}
              works
            </h2>
            <p className='text-xl text-muted-foreground'>
              Simple flow, powerful results
            </p>
          </div>

          {/* Steps with animation */}
          <div className='relative'>
            {/* Connection line */}
            <div className='absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 hidden md:block' />

            <div className='grid gap-8 md:grid-cols-4 relative'>
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = activeStep === index
                return (
                  <div key={index} className='relative'>
                    {/* Arrow between steps */}
                    {index < steps.length - 1 && (
                      <div className='hidden md:block absolute top-1/2 -right-4 z-10'>
                        <ArrowRight className='h-6 w-6 text-muted-foreground' />
                      </div>
                    )}

                    <div
                      className={`relative p-6 rounded-lg border-2 transition-all duration-500 ${
                        step.color
                      } ${
                        isActive
                          ? 'scale-110 shadow-xl border-opacity-100'
                          : 'scale-100 border-opacity-50'
                      }`}
                    >
                      {/* Pulse effect when active */}
                      {isActive && (
                        <div className='absolute inset-0 rounded-lg bg-current opacity-20 animate-ping' />
                      )}

                      <div className='relative z-10'>
                        <div className='mb-4 flex items-center justify-center'>
                          <div
                            className={`rounded-lg bg-background p-3 transition-transform ${
                              isActive ? 'scale-110' : ''
                            }`}
                          >
                            <Icon className='h-6 w-6' />
                          </div>
                        </div>
                        <h3 className='mb-2 text-center font-semibold'>{step.title}</h3>
                        <p className='text-sm text-center text-muted-foreground'>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Code example */}
          <div className='mt-16 rounded-lg border bg-[#0d0d0d] p-6 font-mono text-sm'>
            <div className='mb-4 flex items-center gap-2 text-muted-foreground'>
              <div className='h-2 w-2 rounded-full bg-green-500' />
              <span>webhook-flow.ts</span>
            </div>
            <div className='space-y-2 text-green-400'>
              <div>
                <span className='text-blue-400'>const</span>{' '}
                <span className='text-yellow-400'>webhook</span> ={' '}
                <span className='text-purple-400'>await</span>{' '}
                <span className='text-cyan-400'>sigryn</span>.
                <span className='text-green-400'>receive</span>(payload)
              </div>
              <div>
                <span className='text-blue-400'>await</span>{' '}
                <span className='text-cyan-400'>sigryn</span>.
                <span className='text-green-400'>deliver</span>(webhook)
              </div>
              <div className='text-muted-foreground'>
                <span className='text-gray-500'>// Automatic retries, validation, history</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

