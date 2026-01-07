import { useEffect, useState } from 'react'
import { 
  Eye, 
  History, 
  RotateCcw, 
  Shield, 
  Bell, 
  BarChart3,
  Code,
  Search
} from 'lucide-react'

const features = [
  {
    icon: Eye,
    title: 'Complete Visibility',
    description: 'See every webhook attempt with full payload, headers, and response data. Never wonder what happened again.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: History,
    title: 'Delivery History',
    description: 'Every webhook is stored and searchable. Find any event in seconds, even months later.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: RotateCcw,
    title: 'Auto Retry & Replay',
    description: 'Automatic retries with exponential backoff. Manual replay with one click. No scripts needed.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Signature Validation',
    description: 'Automatic HMAC verification for Stripe, GitHub, and custom signatures. Know your webhooks are authentic.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Slack and email notifications when webhooks fail. Set custom thresholds and never be caught off guard.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: BarChart3,
    title: 'Real-time Analytics',
    description: 'Monitor success rates, latency, and failure patterns. Understand your webhook health at a glance.',
    color: 'from-teal-500 to-green-500',
  },
  {
    icon: Code,
    title: 'Developer-Friendly API',
    description: 'Simple REST API and SDKs. Integrate in minutes with clear documentation and code examples.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Search,
    title: 'Powerful Search',
    description: 'Filter by provider, endpoint, status, or custom fields. Find exactly what you need instantly.',
    color: 'from-pink-500 to-rose-500',
  },
]

export function FeaturesGridSection() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setTimeout(() => {
              setVisibleFeatures((prev) => {
                if (!prev.includes(index)) {
                  return [...prev, index]
                }
                return prev
              })
            }, index * 100)
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = document.querySelectorAll('[data-feature]')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section className='py-32 bg-gray-50 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[15%] top-[20%] h-96 w-96 rounded-full bg-[#3ABFF8]/5 blur-3xl' />
        <div className='absolute right-[20%] bottom-[20%] h-80 w-80 rounded-full bg-purple-500/5 blur-3xl' />
      </div>

      <div className='container px-4 max-w-7xl mx-auto relative z-10'>
        <div className='text-center mb-20'>
          <h2 className='mb-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900'>
            Everything you need.
            <br />
            <span className='bg-gradient-to-r from-[#3ABFF8] to-purple-500 bg-clip-text text-transparent'>
              Nothing you don't.
            </span>
          </h2>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Enterprise-grade webhook infrastructure, ready to use in minutes
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleFeatures.includes(index)
            
            return (
              <div
                key={index}
                data-feature
                data-index={index}
                className={`group relative p-6 rounded-xl border bg-white transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                } border-gray-200 hover:border-[#3ABFF8]/30 hover:shadow-lg hover:scale-105 cursor-pointer`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <div className='relative z-10'>
                  {/* Icon */}
                  <div
                    className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3 group-hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Icon className='h-6 w-6 text-white' />
                  </div>

                  {/* Title */}
                  <h3 className='mb-3 text-xl font-bold text-gray-900'>{feature.title}</h3>
                  
                  {/* Description */}
                  <p className='text-sm text-gray-600 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>

                {/* Shine effect on hover */}
                <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden'>
                  <div className='absolute -inset-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine' />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
