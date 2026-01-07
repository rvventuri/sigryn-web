import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { landingEvents } from '@/lib/analytics'

export function CtaSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      landingEvents.heroCtaClick()
      // TODO: Add API call to submit email
      setSubmitted(true)
    }
  }

  return (
    <section className='py-32 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden'>
      {/* Background effects */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[50%] top-[50%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3ABFF8]/5 blur-3xl animate-pulse' />
      </div>

      <div className='container px-4 max-w-4xl mx-auto relative z-10'>
        <div className='text-center mb-12'>
          <h2 className='mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900'>
            Ready to stop losing webhooks?
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto mb-8'>
            Join hundreds of teams who trust Sigryn to deliver their critical webhooks
          </p>
        </div>

        {submitted ? (
          <div className='max-w-2xl mx-auto text-center p-12 rounded-2xl bg-gradient-to-br from-[#3ABFF8]/10 to-green-500/10 border-2 border-[#3ABFF8]/30 shadow-xl'>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3ABFF8]/20 mb-6'>
              <CheckCircle2 className='h-8 w-8 text-[#3ABFF8]' />
            </div>
            <h3 className='text-2xl font-bold text-gray-900 mb-3'>
              You're on the list!
            </h3>
            <p className='text-lg text-gray-600'>
              Check your inbox for next steps to get started with Sigryn.
            </p>
          </div>
        ) : (
          <div className='max-w-2xl mx-auto'>
            <form onSubmit={handleSubmit} className='mb-8'>
              <div className='flex flex-col sm:flex-row gap-4'>
                <Input
                  type='email'
                  placeholder='your@company.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className='flex-1 h-14 text-base bg-white border-2 border-gray-300 text-gray-900 placeholder:text-gray-400 focus:border-[#3ABFF8] focus:ring-[#3ABFF8] rounded-lg shadow-sm'
                />
                <Button
                  type='submit'
                  size='lg'
                  className='group h-14 px-10 text-base bg-[#3ABFF8] hover:bg-[#2AA8E0] text-white font-semibold transition-all shadow-lg shadow-[#3ABFF8]/30 hover:shadow-[#3ABFF8]/50 hover:scale-105'
                >
                  Start Free Trial
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                </Button>
              </div>
            </form>

            {/* Trust indicators */}
            <div className='flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500'>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='h-4 w-4 text-[#3ABFF8]' />
                <span>Free forever plan</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='h-4 w-4 text-[#3ABFF8]' />
                <span>No credit card required</span>
              </div>
              <div className='flex items-center gap-2'>
                <CheckCircle2 className='h-4 w-4 text-[#3ABFF8]' />
                <span>5 minute setup</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
