import { useEffect, useState } from 'react'
import { AlertTriangle, X, Clock } from 'lucide-react'

export function ProblemSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setShowError(true), 800)
        }
      },
      { threshold: 0.2 }
    )

    const element = document.getElementById('problem')
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  return (
    <section id='problem' className='py-32 bg-gray-50 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute right-[10%] top-[20%] h-96 w-96 rounded-full bg-red-500/5 blur-3xl' />
      </div>

      <div className='container px-4 max-w-5xl mx-auto relative z-10'>
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200 mb-6'>
            <AlertTriangle className='h-4 w-4 text-red-500' />
            <span className='text-sm font-semibold text-red-600'>
              The Problem
            </span>
          </div>
          <h2 className='mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900'>
            Webhooks fail silently.
            <br />
            <span className='text-gray-500'>You don't know until it's too late.</span>
          </h2>
        </div>

        {/* Interactive error scenario */}
        <div 
          className={`mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='rounded-xl border-2 border-red-200 bg-white shadow-xl overflow-hidden'>
            {/* Terminal header */}
            <div className='flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200'>
              <div className='flex items-center gap-2'>
                <div className='flex gap-1.5'>
                  <div className='h-3 w-3 rounded-full bg-red-500' />
                  <div className='h-3 w-3 rounded-full bg-yellow-500' />
                  <div className='h-3 w-3 rounded-full bg-green-500' />
                </div>
                <span className='ml-2 text-xs text-gray-500 font-mono'>production-logs.log</span>
              </div>
              <div className='text-xs text-red-500 font-semibold flex items-center gap-1'>
                <X className='h-3 w-3' />
                <span>3 failures</span>
              </div>
            </div>

            {/* Terminal content */}
            <div className='p-6 font-mono text-sm space-y-2 bg-gray-900'>
              <div className='flex items-center gap-2 text-green-400'>
                <span className='text-gray-500'>[10:30:15]</span>
                <span>POST /webhooks/payment</span>
                <span className='text-green-400'>200 OK</span>
              </div>

              <div 
                className={`flex items-center gap-2 transition-all duration-500 ${
                  showError ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <span className='text-gray-500'>[10:30:16]</span>
                <span className='text-gray-300'>POST /webhooks/payment</span>
                <X className='h-4 w-4 text-red-500' />
                <span className='text-red-500 font-semibold'>TIMEOUT</span>
              </div>

              <div 
                className={`flex items-center gap-2 transition-all duration-500 delay-200 ${
                  showError ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
              >
                <span className='text-gray-500'>[10:30:17]</span>
                <span className='text-yellow-400'>Provider dashboard: "Delivered ✓"</span>
              </div>

              <div 
                className={`mt-4 p-3 rounded bg-red-500/10 border border-red-500/30 transition-all duration-500 delay-400 ${
                  showError ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <div className='flex items-center gap-2 text-red-400 mb-2'>
                  <AlertTriangle className='h-4 w-4 animate-pulse' />
                  <span className='font-semibold'>No webhook received in your system</span>
                </div>
                <div className='text-xs text-gray-400'>
                  Customer payment not processed • No notification sent • No trace in logs
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pain points */}
        <div 
          className={`grid md:grid-cols-3 gap-6 transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className='p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
            <X className='h-8 w-8 text-red-500 mb-3' />
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>No Visibility</h3>
            <p className='text-gray-600'>
              You can't see what was sent or when it failed
            </p>
          </div>
          <div className='p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
            <Clock className='h-8 w-8 text-yellow-500 mb-3' />
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Manual Recovery</h3>
            <p className='text-gray-600'>
              Hours spent debugging and replaying events manually
            </p>
          </div>
          <div className='p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow'>
            <AlertTriangle className='h-8 w-8 text-orange-500 mb-3' />
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Customer Impact</h3>
            <p className='text-gray-600'>
              Customers notice before you do—broken features, missing updates
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
