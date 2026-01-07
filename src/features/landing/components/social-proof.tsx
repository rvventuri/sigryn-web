import { Card, CardContent } from '@/components/ui/card'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import { Star, TrendingUp, Zap, Shield, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'CTO',
    company: 'FinTech Startup',
    image: '/api/placeholder/64/64',
    content:
      'We were losing critical payment events without knowing. With Sigryn, we have 100% visibility and zero losses. Completely changed our operation.',
    rating: 5,
    highlight: 'Zero losses since implementation',
  },
  {
    name: 'Michael Rodriguez',
    role: 'Software Engineer',
    company: 'E-commerce',
    image: '/api/placeholder/64/64',
    content:
      'The interface is incredible and automatic retry saved our business multiple times. Setup was literally 5 minutes. I recommend it to any team.',
    rating: 5,
    highlight: 'Setup in 5 minutes',
  },
  {
    name: 'Emily Johnson',
    role: 'Founder',
    company: 'SaaS Platform',
    image: '/api/placeholder/64/64',
    content:
      'As a startup, we didn\'t have resources to build webhook infrastructure. Sigryn gave us enterprise reliability from day 1.',
    rating: 5,
    highlight: 'Enterprise reliability',
  },
  {
    name: 'David Kim',
    role: 'DevOps Lead',
    company: 'Tech Company',
    image: '/api/placeholder/64/64',
    content:
      'Complete history and event replay allowed us to solve problems in minutes instead of hours. ROI was immediate.',
    rating: 5,
    highlight: 'Immediate ROI',
  },
  {
    name: 'Lisa Anderson',
    role: 'Product Manager',
    company: 'Marketplace',
    image: '/api/placeholder/64/64',
    content:
      'Smart alerts notify us before customers notice problems. Success rate went from 87% to 99.9% in one week.',
    rating: 5,
    highlight: '99.9% success rate',
  },
  {
    name: 'James Wilson',
    role: 'Engineering Manager',
    company: 'Enterprise',
    image: '/api/placeholder/64/64',
    content:
      'Automatic signature validation and enterprise-level security. Our compliance team approved on first review.',
    rating: 5,
    highlight: 'Compliance approved',
  },
]

const stats = [
  { 
    value: '99.9%', 
    label: 'Success Rate',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
  },
  { 
    value: '< 50ms', 
    label: 'Avg Latency',
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
  },
  { 
    value: '100%', 
    label: 'Visibility',
    icon: Shield,
    color: 'from-purple-500 to-pink-500',
  },
  { 
    value: '500+', 
    label: 'Companies Trust',
    icon: Users,
    color: 'from-orange-500 to-red-500',
  },
]

export function SocialProof() {
  const [visibleTestimonials, setVisibleTestimonials] = useState<number[]>([])
  const [animatedStats, setAnimatedStats] = useState<Record<number, number>>({})

  useEffect(() => {
    // Animate testimonials on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setTimeout(() => {
              setVisibleTestimonials((prev) => {
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

    const elements = document.querySelectorAll('[data-testimonial]')
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Animate stats
  useEffect(() => {
    stats.forEach((stat, index) => {
      const numericValue = parseFloat(stat.value.replace(/[^0-9.]/g, ''))
      if (!isNaN(numericValue)) {
        let current = 0
        const increment = numericValue / 50
        const interval = setInterval(() => {
          current += increment
          if (current >= numericValue) {
            current = numericValue
            clearInterval(interval)
          }
          setAnimatedStats((prev) => ({ ...prev, [index]: current }))
        }, 30)
      }
    })
  }, [])

  return (
    <section className='py-32 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden'>
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute left-[20%] top-[10%] h-96 w-96 rounded-full bg-primary/5 blur-3xl' />
        <div className='absolute right-[15%] bottom-[20%] h-80 w-80 rounded-full bg-blue-500/5 blur-3xl' />
      </div>

      <div className='container px-4 relative z-10'>
        {/* Stats Section */}
        <div className='mb-20'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4'>
              Numbers that{' '}
              <span className='bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent'>
                impress
              </span>
            </h2>
            <p className='text-muted-foreground'>
              Performance and reliability proven in production
            </p>
          </div>

          <div className='grid grid-cols-2 gap-6 md:grid-cols-4 max-w-4xl mx-auto'>
            {stats.map((stat, index) => {
              const Icon = stat.icon
              const animatedValue = animatedStats[index] ?? 0
              const displayValue = stat.value.includes('%') 
                ? `${animatedValue.toFixed(1)}%`
                : stat.value.includes('<')
                ? stat.value
                : stat.value.includes('+')
                ? `${Math.floor(animatedValue)}+`
                : stat.value

              return (
                <div
                  key={index}
                  className='group relative p-6 rounded-xl border-2 bg-card hover:border-primary transition-all hover:shadow-lg hover:scale-105'
                >
                  <div className='flex flex-col items-center text-center'>
                    <div className={`mb-3 rounded-lg bg-gradient-to-br ${stat.color} p-3 group-hover:scale-110 transition-transform`}>
                      <Icon className='h-6 w-6 text-white' />
                    </div>
                    <div className='text-3xl font-bold mb-1 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent'>
                      {displayValue}
                    </div>
                    <div className='text-sm text-muted-foreground font-medium'>
                      {stat.label}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Testimonials Header */}
        <header className='mx-auto max-w-3xl text-center mb-16'>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6'>
            <Star className='h-4 w-4 text-yellow-500 fill-yellow-500' />
            <span className='text-sm font-semibold text-primary'>
              Rated 5 stars
            </span>
          </div>
          <h2 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4'>
            Trusted by{' '}
            <span className='bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent'>
              developers
            </span>{' '}
            who can't fail
          </h2>
          <p className='text-lg text-muted-foreground'>
            See what our customers say about how Sigryn transformed their webhook infrastructure
          </p>
        </header>

        {/* Testimonials Grid */}
        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => {
            const isVisible = visibleTestimonials.includes(index)
            
            return (
              <Card
                key={index}
                data-testimonial
                data-index={index}
                className={`border-2 transition-all duration-500 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                } hover:shadow-xl hover:-translate-y-2 hover:border-primary`}
              >
                <CardContent className='p-6'>
                  {/* Rating */}
                  <div className='mb-4 flex gap-1'>
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className='h-4 w-4 fill-yellow-400 text-yellow-400'
                      />
                    ))}
                  </div>

                  {/* Highlight badge */}
                  {testimonial.highlight && (
                    <div className='mb-4 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 border border-green-500/20'>
                      <span className='text-xs font-semibold text-green-600 dark:text-green-400'>
                        ✓ {testimonial.highlight}
                      </span>
                    </div>
                  )}

                  {/* Content */}
                  <p className='mb-6 text-muted-foreground leading-relaxed italic'>
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className='flex items-center gap-3 pt-4 border-t'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage
                        src={testimonial.image}
                        alt={`${testimonial.name} avatar`}
                        loading='lazy'
                      />
                      <AvatarFallback className='bg-primary/10 text-primary'>
                        {testimonial.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='font-semibold'>{testimonial.name}</div>
                      <div className='text-sm text-muted-foreground'>
                        {testimonial.role}
                      </div>
                      <div className='text-xs text-muted-foreground'>
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
