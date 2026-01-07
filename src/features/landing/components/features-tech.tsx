import { useEffect, useState } from 'react'
import {
  History,
  RotateCcw,
  Bell,
  BarChart3,
  Eye,
  Shield,
  Zap,
  CheckCircle2,
} from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { landingEvents } from '@/lib/analytics'

const features = [
  {
    icon: Eye,
    title: 'Complete Visibility',
    description: 'See every webhook in real-time. Full payloads, headers, responses, and detailed timelines. Never be in the dark again.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    stat: '100%',
    statLabel: 'of webhooks tracked',
  },
  {
    icon: History,
    title: 'Full History',
    description: 'Every delivery attempt is recorded and searchable. Find any webhook in seconds, even months later.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    stat: '∞',
    statLabel: 'unlimited history',
  },
  {
    icon: RotateCcw,
    title: 'Smart Retry',
    description: 'Automatic retries with exponential backoff. Replay events with one click. No scripts, no manual calls.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    stat: '99.9%',
    statLabel: 'success rate',
  },
  {
    icon: Shield,
    title: 'Signature Validation',
    description: 'Automatic HMAC verification. Know your webhooks are authentic before processing anything.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    stat: '100%',
    statLabel: 'security guaranteed',
  },
  {
    icon: Bell,
    title: 'Smart Alerts',
    description: 'Slack and email notifications. Get alerted before your customers notice problems. Configure custom rules.',
    color: 'from-indigo-500 to-blue-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    stat: '0ms',
    statLabel: 'alert time',
  },
  {
    icon: BarChart3,
    title: 'Real-time Metrics',
    description: 'Success rates, failure patterns, performance, and latency. Understand your webhook system health.',
    color: 'from-teal-500 to-green-500',
    bgColor: 'bg-teal-500/10',
    borderColor: 'border-teal-500/20',
    stat: '24/7',
    statLabel: 'monitoring',
  },
]

export function FeaturesTech() {
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([])
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

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
    <section id='features' className='py-32 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[10%] top-[20%] h-96 w-96 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute right-[15%] bottom-[20%] h-80 w-80 rounded-full bg-blue-500/5 blur-3xl' />
      </div>

      <div className='container px-4 relative z-10'>
        <div className='mx-auto max-w-6xl'>
          {/* Header */}
          <div className='text-center mb-16'>
            <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8'>
              <Zap className='h-4 w-4 text-primary' />
              <span className='text-sm font-semibold text-primary'>
                Everything You Need
              </span>
            </div>
            <h2 className='mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>
              Features that{' '}
              <span className='bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent'>
                transform
              </span>{' '}
              your infrastructure
            </h2>
            <p className='text-xl text-muted-foreground max-w-2xl mx-auto'>
              Enterprise-grade webhook infrastructure, ready to use
            </p>
          </div>

          {/* Features Grid */}
          <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-16'>
            {features.map((feature, index) => {
              const Icon = feature.icon
              const isVisible = visibleFeatures.includes(index)
              const isHovered = hoveredFeature === index
              
              return (
                <div
                  key={index}
                  data-feature
                  data-index={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`group relative p-6 rounded-xl border-2 bg-card transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  } ${
                    feature.borderColor
                  } hover:shadow-2xl hover:scale-105 cursor-pointer`}
                >
                  {/* Gradient background on hover */}
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Animated border glow */}
                  {isHovered && (
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${feature.color} opacity-20 blur-xl -z-10 animate-pulse`}
                    />
                  )}

                  <div className='relative z-10'>
                    {/* Icon */}
                    <div className='mb-4 flex items-center justify-between'>
                      <div
                        className={`inline-flex rounded-xl bg-gradient-to-br ${feature.color} p-3 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        <Icon className='h-6 w-6 text-white' />
                      </div>
                      {isHovered && (
                        <div className='text-2xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent'>
                          {feature.stat}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className='mb-3 text-xl font-bold'>{feature.title}</h3>
                    
                    {/* Description */}
                    <p className='text-sm text-muted-foreground leading-relaxed mb-4'>
                      {feature.description}
                    </p>

                    {/* Stat badge */}
                    {!isHovered && (
                      <div className='mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-xs font-medium'>
                        <CheckCircle2 className='h-3 w-3 text-green-500' />
                        <span>{feature.statLabel}</span>
                      </div>
                    )}
                  </div>

                  {/* Shine effect on hover */}
                  <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden'>
                    <div className='absolute -inset-10 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine' />
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className='text-center'>
            <div className='inline-block p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-500/10 border-2 border-primary/20'>
              <h3 className='text-2xl font-bold mb-2'>
                Ready to never lose a webhook again?
              </h3>
              <p className='text-muted-foreground mb-6 max-w-xl mx-auto'>
                Join hundreds of developers who trust Sigryn to guarantee delivery of their critical webhooks.
              </p>
              <Link to='/sign-up' onClick={landingEvents.heroCtaClick}>
                <Button 
                  size='lg' 
                  className='group text-lg px-8 py-6 h-auto bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white shadow-lg shadow-primary/50 hover:shadow-xl hover:shadow-primary/50 transition-all'
                >
                  Get Started Free Now
                  <ArrowRight className='ml-2 h-5 w-5 transition-transform group-hover:translate-x-1' />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
