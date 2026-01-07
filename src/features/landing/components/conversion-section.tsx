import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { landingEvents } from '@/lib/analytics'

export function ConversionSection() {
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
    <section className='py-32 bg-[#0B0F1A]'>
      <div className='container px-4 max-w-2xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='mb-6 text-4xl sm:text-5xl font-bold text-white'>
            Get early access to Sigryn
          </h2>
        </div>

        {submitted ? (
          <div className='text-center p-8 rounded-lg bg-gray-800/20 border border-gray-700/30'>
            <p className='text-lg text-gray-300'>
              Thanks! We'll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='flex flex-col sm:flex-row gap-4'>
              <Input
                type='email'
                placeholder='your@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='flex-1 h-12 bg-gray-800/30 border-gray-700 text-white placeholder:text-gray-500 focus:border-[#3ABFF8] focus:ring-[#3ABFF8]'
              />
              <Button
                type='submit'
                size='lg'
                className='h-12 px-8 bg-[#3ABFF8] hover:bg-[#2AA8E0] text-[#0B0F1A] font-semibold'
              >
                Request access
              </Button>
            </div>
            <p className='text-center text-sm text-gray-400'>
              No spam. No sales calls. Early users help shape the product.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

