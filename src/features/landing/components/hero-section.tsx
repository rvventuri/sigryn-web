import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { landingEvents } from '@/lib/analytics'
import { useEffect, useState } from 'react'

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white'>
      {/* Animated background effects */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[20%] top-[20%] h-96 w-96 rounded-full bg-[#3ABFF8]/5 blur-3xl animate-pulse' />
        <div className='absolute right-[15%] bottom-[20%] h-80 w-80 rounded-full bg-purple-500/5 blur-3xl animate-pulse' 
          style={{ animationDelay: '1s' }} 
        />
      </div>
      
      <div className='container relative z-10 px-4 py-20 max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          {/* Badge */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3ABFF8]/10 border border-[#3ABFF8]/30 mb-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className='h-2 w-2 rounded-full bg-[#3ABFF8] animate-pulse' />
            <span className='text-sm font-semibold text-[#3ABFF8]'>
              Webhook Reliability Platform
            </span>
          </div>

          {/* Headline */}
          <h1 
            className={`mb-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Never miss a webhook
            <br />
            <span className='bg-gradient-to-r from-[#3ABFF8] to-[#2AA8E0] bg-clip-text text-transparent'>
              ever again
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            className={`mb-10 text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Complete visibility, automatic retries, and instant alerts for every webhook your business depends on
          </p>

          {/* CTAs */}
          <div 
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 transition-all duration-1000 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link to='/sign-up' onClick={landingEvents.heroCtaClick}>
              <Button 
                size='lg' 
                className='group text-lg px-10 py-7 h-auto bg-[#3ABFF8] hover:bg-[#2AA8E0] text-white font-semibold transition-all shadow-lg shadow-[#3ABFF8]/30 hover:shadow-[#3ABFF8]/50 hover:scale-105'
              >
                Start Free Trial
                <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
            <a
              href='#demo'
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <Button
                size='lg'
                variant='outline'
                className='text-lg px-10 py-7 h-auto border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:border-[#3ABFF8]/50 transition-all'
              >
                Watch Demo
              </Button>
            </a>
          </div>

          {/* Social proof */}
          <div 
            className={`flex items-center justify-center gap-6 text-sm text-gray-500 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-[#3ABFF8]' />
              <span>No credit card required</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-[#3ABFF8]' />
              <span>5 minute setup</span>
            </div>
            <div className='flex items-center gap-2'>
              <CheckCircle2 className='h-4 w-4 text-[#3ABFF8]' />
              <span>Free forever plan</span>
            </div>
          </div>
        </div>

        {/* Interactive flow diagram */}
        <div 
          className={`max-w-4xl mx-auto transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='relative p-8 rounded-2xl bg-white border border-gray-200 shadow-xl'>
            <div className='flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8'>
              {/* Provider */}
              <div className='group px-8 py-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-[#3ABFF8]/30 transition-all hover:scale-105'>
                <div className='text-center'>
                  <div className='text-3xl mb-2'>🔌</div>
                  <span className='text-sm font-semibold text-gray-700'>Provider</span>
                  <div className='text-xs text-gray-500 mt-1'>Stripe, GitHub...</div>
                </div>
              </div>

              {/* Arrow with pulse */}
              <div className='relative'>
                <ArrowRight className='h-8 w-8 text-[#3ABFF8] hidden md:block' />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='h-2 w-2 rounded-full bg-[#3ABFF8] animate-ping' />
                </div>
                <div className='md:hidden rotate-90'>
                  <ArrowRight className='h-8 w-8 text-[#3ABFF8]' />
                </div>
              </div>

              {/* Sigryn - highlighted */}
              <div className='group relative px-8 py-6 rounded-xl bg-gradient-to-br from-[#3ABFF8]/10 to-[#2AA8E0]/5 border-2 border-[#3ABFF8] transition-all hover:scale-110 shadow-lg shadow-[#3ABFF8]/20'>
                <div className='text-center'>
                  <div className='mb-2 flex items-center justify-center'>
                    <span className='text-xl font-bold text-[#3ABFF8]'>Sigryn</span>
                  </div>
                  <div className='text-xs text-gray-600 font-medium'>Gateway Layer</div>
                  <div className='mt-3 flex gap-1 justify-center'>
                    <div className='h-1.5 w-1.5 rounded-full bg-[#3ABFF8] animate-pulse' />
                    <div className='h-1.5 w-1.5 rounded-full bg-[#3ABFF8] animate-pulse' style={{ animationDelay: '0.2s' }} />
                    <div className='h-1.5 w-1.5 rounded-full bg-[#3ABFF8] animate-pulse' style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                <div className='absolute inset-0 rounded-xl bg-[#3ABFF8]/5 animate-pulse opacity-50' />
              </div>

              {/* Arrow with pulse */}
              <div className='relative'>
                <ArrowRight className='h-8 w-8 text-[#3ABFF8] hidden md:block' />
                <div className='absolute inset-0 flex items-center justify-center'>
                  <div className='h-2 w-2 rounded-full bg-[#3ABFF8] animate-ping' />
                </div>
                <div className='md:hidden rotate-90'>
                  <ArrowRight className='h-8 w-8 text-[#3ABFF8]' />
                </div>
              </div>

              {/* Your API - success state */}
              <div className='group px-8 py-6 rounded-xl bg-gray-50 border border-gray-200 hover:border-green-500/30 transition-all hover:scale-105'>
                <div className='text-center'>
                  <div className='text-3xl mb-2'>✅</div>
                  <span className='text-sm font-semibold text-gray-700'>Your API</span>
                  <div className='text-xs text-green-600 mt-1 flex items-center justify-center gap-1'>
                    <CheckCircle2 className='h-3 w-3' />
                    <span>Delivered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
