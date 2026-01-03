import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function HowItWorks() {
  return (
    <section className='py-24 sm:py-32 bg-muted/30'>
      <div className='container px-4'>
        <div className='mx-auto max-w-4xl'>
          {/* Header */}
          <div className='text-center mb-16'>
            <h2 className='text-4xl font-bold tracking-tight sm:text-5xl mb-4'>
              How Sigryn works
            </h2>
            <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
              A transparent layer between providers and your application. No business logic changes required.
            </p>
          </div>

          {/* Flow Diagram */}
          <div className='mb-12'>
            <div className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8'>
              {/* Providers Box */}
              <Card className='flex-1 max-w-[280px] border-2 hover:shadow-lg transition-shadow'>
                <CardContent className='p-6 text-center'>
                  <h3 className='text-xl font-semibold mb-2'>Providers</h3>
                  <p className='text-sm text-muted-foreground'>
                    Stripe, GitHub, etc.
                  </p>
                </CardContent>
              </Card>

              {/* Arrow */}
              <ArrowRight className='h-8 w-8 text-primary flex-shrink-0 rotate-90 md:rotate-0' />

              {/* Sigryn Box */}
              <Card className='flex-1 max-w-[280px] border-2 border-primary shadow-lg hover:shadow-xl transition-shadow relative'>
                <div className='absolute -top-3 left-1/2 -translate-x-1/2'>
                  <span className='bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full'>
                    Sigryn
                  </span>
                </div>
                <CardContent className='p-6 text-center pt-8'>
                  <h3 className='text-xl font-semibold mb-2'>Sigryn</h3>
                  <p className='text-sm text-muted-foreground'>
                    Store, validate, track
                  </p>
                </CardContent>
              </Card>

              {/* Arrow */}
              <ArrowRight className='h-8 w-8 text-primary flex-shrink-0 rotate-90 md:rotate-0' />

              {/* Your App Box */}
              <Card className='flex-1 max-w-[280px] border-2 hover:shadow-lg transition-shadow'>
                <CardContent className='p-6 text-center'>
                  <h3 className='text-xl font-semibold mb-2'>Your App</h3>
                  <p className='text-sm text-muted-foreground'>
                    Business logic
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features List */}
          <div className='space-y-4'>
            <div className='flex items-start gap-3'>
              <CheckCircle2 className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
              <p className='text-base text-muted-foreground'>
                Receives and stores every webhook before processing
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <CheckCircle2 className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
              <p className='text-base text-muted-foreground'>
                Validates signatures (Stripe, HMAC, and more)
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <CheckCircle2 className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
              <p className='text-base text-muted-foreground'>
                Acts as a transparent proxy - no code changes needed
              </p>
            </div>
            <div className='flex items-start gap-3'>
              <CheckCircle2 className='h-5 w-5 text-primary mt-0.5 flex-shrink-0' />
              <p className='text-base text-muted-foreground'>
                Provides complete visibility and control over webhook delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

