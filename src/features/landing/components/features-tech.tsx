import { useEffect, useState } from 'react'
import {
  History,
  RotateCcw,
  Bell,
  BarChart3,
  Eye,
  Shield,
} from 'lucide-react'

const features = [
  {
    icon: History,
    title: 'Full Delivery History',
    description: 'Every webhook attempt recorded and searchable. Never lose track of what happened.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Eye,
    title: 'Complete Visibility',
    description: 'Raw payloads, headers, responses, and timelines. See exactly what was sent and received.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: RotateCcw,
    title: 'Safe Retry & Replay',
    description: 'Fix issues and replay events with one click. No scripts, no provider calls needed.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Shield,
    title: 'Signature Validation',
    description: 'Automatic HMAC verification. Know your webhooks are authentic before processing.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Slack and email notifications. Get alerted before customers notice problems.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: BarChart3,
    title: 'Real-time Metrics',
    description: 'Success rates, failure patterns, and performance metrics. Understand your system health.',
    color: 'from-teal-500 to-green-500',
  },
]

export function FeaturesTech() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setTimeout(() => {
              setVisibleFeatures((prev) => [...prev, index])
            }, index * 100)
          }
        })
      },
      { threshold: 0.2 }
    )

    const elements = document.querySelectorAll('[data-feature]')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return (
    <section id='features' className='py-32 bg-background'>
      <div className='container px-4'>
        <div className='mx-auto max-w-6xl'>
          <div className='text-center mb-16'>
            <h2 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl'>
              What you gain{' '}
              <span className='bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent'>
                instantly
              </span>
            </h2>
            <p className='text-xl text-muted-foreground'>
              Production-grade webhook infrastructure, ready to use
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isVisible = visibleFeatures.includes(index)
              return (
                <div
                  key={index}
                  data-feature
                  data-index={index}
                  className={`group relative p-6 rounded-lg border bg-card transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  } hover:border-primary hover:shadow-lg hover:scale-105`}
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  />

                  <div className='relative z-10'>
                    <div
                      className={`mb-4 inline-flex rounded-lg bg-gradient-to-br ${feature.color} p-3`}
                    >
                      <Icon className='h-6 w-6 text-white' />
                    </div>
                    <h3 className='mb-2 text-lg font-semibold'>{feature.title}</h3>
                    <p className='text-sm text-muted-foreground'>{feature.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

