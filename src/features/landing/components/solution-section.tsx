import { useEffect, useState } from 'react'
import { CheckCircle2, Eye, RotateCcw, Bell, ArrowRight } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { landingEvents } from '@/lib/analytics'

export function SolutionSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFlow, setActiveFlow] = useState(0)

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

  useEffect(() => {
    if (!isVisible) return
    
    const interval = setInterval(() => {
      setActiveFlow((prev) => (prev + 1) % 4)
    }, 2500)
    
    return () => clearInterval(interval)
  }, [isVisible])

  const features = [
    { icon: Eye, text: 'Full Visibility', description: 'See every webhook attempt' },
    { icon: RotateCcw, text: 'Auto Retry', description: 'Never lose an event' },
    { icon: Bell, text: 'Instant Alerts', description: 'Know when things fail' },
    { icon: CheckCircle2, text: 'Complete History', description: 'Audit and replay anytime' },
  ]

  return (
    <section id='solution' className='py-32 bg-white relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[10%] top-[20%] h-96 w-96 rounded-full bg-[#3ABFF8]/5 blur-3xl animate-pulse' />
        <div className='absolute right-[15%] bottom-[20%] h-80 w-80 rounded-full bg-green-500/5 blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
      </div>

      <div className='container px-4 max-w-6xl mx-auto relative z-10'>
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-200 mb-6'>
            <CheckCircle2 className='h-4 w-4 text-green-600' />
            <span className='text-sm font-semibold text-green-600'>
              The Solution
            </span>
          </div>
          <h2 className='mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900'>
            One reliable layer.
            <br />
            <span className='bg-gradient-to-r from-[#3ABFF8] to-green-500 bg-clip-text text-transparent'>
              Zero lost webhooks.
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Sigryn sits between your providers and your API—capturing, validating, and delivering every webhook with complete visibility.
          </p>
        </div>

        {/* Animated flow */}
        <div 
          className={`mb-20 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='relative p-10 rounded-2xl bg-gradient-to-br from-[#3ABFF8]/5 to-green-500/5 border-2 border-gray-200 backdrop-blur-sm shadow-xl'>
            <div className='flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12'>
              {/* Provider */}
              <div 
                className={`px-8 py-6 rounded-xl bg-white border-2 transition-all duration-500 shadow-sm ${
                  activeFlow === 0 ? 'border-[#3ABFF8] scale-110 shadow-[#3ABFF8]/20 shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className='text-center'>
                  <div className='text-3xl mb-2'>🔌</div>
                  <span className='text-sm font-semibold text-gray-700'>Provider</span>
                </div>
                {activeFlow === 0 && (
                  <div className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-[#3ABFF8] animate-ping' />
                )}
              </div>

              {/* Arrow 1 */}
              <div className='relative hidden md:block'>
                <ArrowRight className='h-8 w-8 text-[#3ABFF8]' />
                {activeFlow === 1 && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='h-2 w-2 rounded-full bg-[#3ABFF8] animate-ping' />
                  </div>
                )}
              </div>

              {/* Sigryn */}
              <div 
                className={`px-8 py-6 rounded-xl bg-gradient-to-br from-[#3ABFF8]/10 to-green-500/5 border-2 transition-all duration-500 shadow-lg ${
                  activeFlow === 2 ? 'border-[#3ABFF8] scale-125 shadow-[#3ABFF8]/30 shadow-2xl' : 'border-[#3ABFF8]/50'
                }`}
              >
                <div className='text-center'>
                  <span className='text-xl font-bold text-[#3ABFF8]'>Sigryn</span>
                  <div className='mt-3 flex gap-1 justify-center'>
                    <div className='h-1.5 w-1.5 rounded-full bg-[#3ABFF8] animate-pulse' />
                    <div className='h-1.5 w-1.5 rounded-full bg-[#3ABFF8] animate-pulse' style={{ animationDelay: '0.2s' }} />
                    <div className='h-1.5 w-1.5 rounded-full bg-[#3ABFF8] animate-pulse' style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
                {activeFlow === 2 && (
                  <div className='absolute inset-0 rounded-xl bg-[#3ABFF8]/10 animate-ping' />
                )}
              </div>

              {/* Arrow 2 */}
              <div className='relative hidden md:block'>
                <ArrowRight className='h-8 w-8 text-[#3ABFF8]' />
                {activeFlow === 3 && (
                  <div className='absolute inset-0 flex items-center justify-center'>
                    <div className='h-2 w-2 rounded-full bg-green-500 animate-ping' />
                  </div>
                )}
              </div>

              {/* Your API */}
              <div 
                className={`px-8 py-6 rounded-xl bg-white border-2 transition-all duration-500 shadow-sm ${
                  activeFlow === 3 ? 'border-green-500 scale-110 shadow-green-500/20 shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className='text-center'>
                  <div className='text-3xl mb-2'>✅</div>
                  <span className='text-sm font-semibold text-green-600'>Delivered</span>
                </div>
                {activeFlow === 3 && (
                  <div className='absolute -top-2 -right-2 h-4 w-4 rounded-full bg-green-500 animate-ping' />
                )}
              </div>
            </div>

            {/* Flow description */}
            <div className='mt-8 text-center'>
              <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm'>
                <span className='text-sm text-gray-600'>
                  {activeFlow === 0 && '📤 Webhook sent from provider'}
                  {activeFlow === 1 && '📥 Sigryn captures and validates'}
                  {activeFlow === 2 && '🔄 Auto retry with exponential backoff'}
                  {activeFlow === 3 && '✅ Guaranteed delivery to your API'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Key features grid */}
        <div 
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className='group p-6 rounded-xl bg-white border border-gray-200 hover:border-[#3ABFF8]/50 hover:shadow-lg transition-all hover:scale-105 cursor-pointer'
              >
                <div className='mb-4 inline-flex rounded-lg bg-[#3ABFF8]/10 p-3 group-hover:bg-[#3ABFF8]/20 transition-all'>
                  <Icon className='h-6 w-6 text-[#3ABFF8]' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {feature.text}
                </h3>
                <p className='text-sm text-gray-600'>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div 
          className={`text-center transition-all duration-1000 delay-900 ${
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
          <p className='mt-4 text-sm text-gray-500'>
            Free forever plan • No credit card required • 5 minute setup
          </p>
        </div>
      </div>
    </section>
  )
}
